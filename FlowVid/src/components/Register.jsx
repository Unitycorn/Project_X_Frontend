import React from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [Data, setData] = React.useState({
    name: "",
    description: "",
    login_name: "",
    image: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  }

  async function register() {
    const res = await fetch(`${backend}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    const data = await res.json();
    if (res.error) {
      throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status,
      };
    }
    return data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function checkRegister() {
      try {
        setStatus("submitting");
        const res = await register();
        setStatus("idle");
        if (res.error) {
          setError(res.error);
          return;
        }
        await login({ email: Data.login_name, password: Data.password });
        navigate("/");
      } catch (err) {
        setError(err);
        setStatus("idle");
      }
    }

    checkRegister();
  }

  return (
    <div className="container">
      <h1 className="text-2xl">Register a new account</h1>
      {error && <p>There was an error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Desired channel name:</label>
        <input type="text" onChange={handleChange} name="name"></input>
        <label htmlFor="image">Upload a logo (optional):</label>
        <input type="file" name="image"></input>
        <label htmlFor="login_name">Your email address:</label>
        <input type="text" onChange={handleChange} name="login_name"></input>
        <label htmlFor="password">Password:</label>
        <input type="password" onChange={handleChange} name="password"></input>
        <button className="button active" type="submit">
          {status === "idle" ? "Create Account" : "Submitting data.."}
        </button>
      </form>
    </div>
  );
}
