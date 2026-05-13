import React from "react";
import { AuthContext } from "./AuthContext";
import { requestJson } from "../Utilities";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function UserProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return stored;
    }
  });

  const isAuthenticated = !!user;

  function isOwner(userId, id) {
    return userId === id;
  }

  function logOut() {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("user");
    setUser(null);
  }

  async function login(credentials) {
    const data = await loginUser(credentials);
    localStorage.setItem("loggedin", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function loginUser(creds) {
    return requestJson(
      `${backend}/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      },
      "Login failed"
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logOut, isAuthenticated, isOwner }}
    >
      {children}
    </AuthContext.Provider>
  );
}
