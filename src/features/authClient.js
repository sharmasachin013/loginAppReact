export function getAuthClient(config = {}) {
  const defaultConfig = {
    base: "http://reactdrupal.lndo.site:8000",
    token_name: "drupal-oauth-token",
    client_id: "cb0379f2-7c9f-48bb-8973-f0f11b6064d5",
    client_secret: "app",
    scope: "oauth",
    expire_margin: 0,
  };

  config = { ...defaultConfig, ...config };

  const saveToken = (data) => {
    const now = Math.floor(Date.now() / 1000);
    const token = {
      ...data,
      date: now,
      expires_at: now + data.expires_in,
    };
    localStorage.setItem(config.token_name, JSON.stringify(token));
    return token;
  };

  const login = async (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("client_id", config.client_id);
    formData.append("client_secret", config.client_secret);
    formData.append("scope", config.scope);
    formData.append("grant_type", "password");

    try {
      const res = await fetch(`${config.base}/oauth/token`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error_description || data.error);
      console.log("Login Call");

      console.log(data);
      return saveToken(data);
    } catch (err) {
      console.log("Login error:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem(config.token);
    return true;
  };

  const isLoggedIn = () => {};

  return { login, logout };
}
