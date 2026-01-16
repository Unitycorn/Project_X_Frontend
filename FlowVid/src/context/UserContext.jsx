import React from "react";

const UserContext = React.createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      setUser(JSON.parse(stored));
    } catch {
      setUser(stored); // fallback if plain string
    }
  }, []);

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
    console.log(data.user);
    setUser(data.user);
  }

  async function loginUser(creds) {
    const res = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status,
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
