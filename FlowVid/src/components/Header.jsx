import Search from "./Search";
import Avatar from "./Avatar";
import video_logo from "/video_logo.png";
import { Outlet, Link, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/useAuth";

export default function Header() {
  const { user, logOut, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <>
      <header>
        <Link to="/" className="text-4xl text-white font-bold">
          <img src={video_logo} alt="FlowVid logo" title="A new experience" />
          FlowVid
        </Link>
        <Search />
        <div className="user-menu">
          {isAuthenticated ? (
            <Link to={`/channel/${user.id}`}>
              {user.icon ? (
                <Avatar src={user.icon} alt={user.name} />
              ) : (
                <Avatar>{user.name[0]}</Avatar>
              )}
            </Link>
          ) : (
            <Link
              to="/login"
              state={{
                from: location.pathname,
              }}
            >
              <Avatar />
            </Link>
          )}
          {isAuthenticated ? (
            <button className="button active" onClick={logOut}>
              Logout
            </button>
          ) : null}
          {isAuthenticated ? (
            <Link className="button active" to="/upload">
              <b>Create+</b>
            </Link>
          ) : null}
        </div>
      </header>
      <Outlet />
    </>
  );
}
