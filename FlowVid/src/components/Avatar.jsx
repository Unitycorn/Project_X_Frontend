import React from "react";
import { IoPersonSharp } from "react-icons/io5";

export default function Avatar({ src, alt, children }) {
  if (src) {
    return (
      <div className="avatar">
        <img src={src} alt={alt} />
      </div>
    );
  }
  if (children) {
    return <div className="avatar avatar-letters">{children}</div>;
  } else {
    return (
      <div className="avatar avatar-icon" title="not logged in">
        <IoPersonSharp />
      </div>
    );
  }
}
