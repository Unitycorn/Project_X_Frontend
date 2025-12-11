import { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

export default function Like({ totalLikes }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(totalLikes);

  function handleClick() {
    setLiked((prevLiked) => {
      setLikes((prevLikes) => prevLikes + (prevLiked ? -1 : +1));
      return !prevLiked;
    });
  }

  return (
    <button className="button-like" onClick={handleClick} value={likes}>
      {liked ? <FaThumbsUp /> : <FaRegThumbsUp />} {likes}
    </button>
  );
}
