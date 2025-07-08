import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function Logout() {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(logout())} style={{ marginTop: "1rem" }}>
      🔓 Logout
    </button>
  );
}

export default Logout;
