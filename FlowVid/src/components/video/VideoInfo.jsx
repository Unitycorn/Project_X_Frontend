import { useState } from "react";

export default function VideoInfo({ uploadDate, description, views }) {
  const [showFullDescription, setFullDescription] = useState(false);

  const showFullDescriptionHandler = () => {
    setFullDescription(!showFullDescription);
  };

  const formattedDescription = description ? description : "";

  return (
    <div className="description-box">
      <p>
        <strong>
          {views} Views &emsp;{uploadDate}
        </strong>
        <br />
        <br />
      </p>
      {showFullDescription
        ? formattedDescription
        : formattedDescription.slice(0, 3)}
      <button onClick={showFullDescriptionHandler}>
        Read {showFullDescription ? "Less" : "More"}
      </button>
    </div>
  );
}
