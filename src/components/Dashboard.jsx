import React from "react";
import Logout from "./Logout";
function Dashboard() {
  return (
    <div>
      <h2>📊 Dashboard</h2>
      <p>
        Welcome to your dashboard, <strong>User</strong>!
      </p>
      <p>This page is accessible only when logged in.</p>
      <Logout />
    </div>
  );
}

export default Dashboard;
