import Navbar from "./Navbar";
import Search from "./Search";
import Avatar from "./Avatar";
import video_logo from "/video_logo.png";

export default function Header() {
  return (
    <header>
      <a href="/" className="text-4xl text-white font-bold">
        <img src={video_logo} alt="FlowVid logo" title="A new experience" />
        FlowVid
      </a>
      <Search />
      <Avatar />
    </header>
  );
}
