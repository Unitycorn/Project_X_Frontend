import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function Login() {
  const location = useLocation();
  const origin = "/";
  const { login } = useAuth();
  const [loginFormData, setLoginFormData] = React.useState({
    login_name: "",
    password: "",
  });
  const [error, setError] = React.useState(false);
  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    async function checkLogin(credentials) {
      try {
        setStatus("submitting");
        const res = await login(credentials);
        console.log(res);
        if (res.error) {
          setError(res.error);
          setStatus("idle");
          return;
        }
        setStatus("idle");
        navigate(origin);
      } catch (err) {
        setError(err);
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
