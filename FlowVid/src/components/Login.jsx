import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const location = useLocation();
  const origin = location.state?.from || "/";
  const { login } = useAuth();
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    async function checkLogin(credentials) {
      setError(null);
      setStatus("submitting");
      try {
        await login(credentials);
        navigate(origin);
      } catch (err) {
        setError(err.message || "Login failed");
      } finally {
        setStatus("idle");
      }
    }
    checkLogin(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="container">
      {location.state?.message && (
        <h3 className="error-msg">{location.state.message}</h3>
      )}
      <h1 className="text-2xl">Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting" ? true : false}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
      {error ? <p>{error}</p> : null}
      <p>
        Dont have an account yet?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
}
