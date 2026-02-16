import React from "react";

const backend = import.meta.env.VITE_BACKEND_URL;

const UserContext = React.createContext(null);

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
    console.log(data);
    if (!data.error) {
      localStorage.setItem("loggedin", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      return data;
    }
  }

  async function loginUser(creds) {
    const res = await fetch(`${backend}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await res.json();
    if (res.error) {
      throw {
        message: res.error,
        statusText: res.error,
        status: res,
      };
    }
    return data;
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logOut, isAuthenticated, isOwner }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(UserContext);
  if (!context) throw new Error("Context not found");
  return context;
}
