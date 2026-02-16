import VideoList from "../sample_data/recs.json";
import { Link, useSearchParams } from "react-router-dom";

function getTimeDifference(timestamp) {
  const uploadDate = new Date(timestamp);
  const currentDate = Date.now();
  return currentDate - uploadDate;
}

function convertMilliseconds(ms) {
  const months = Math.floor(ms / 2592000000);
  ms %= 2592000000;
  const days = Math.floor(ms / 86400000);
  ms %= 86400000;
  const hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  if (months > 0) {
    return months + (months === 1 ? " month ago" : " months ago");
  } else if (days > 0) {
    return days + (days === 1 ? " day ago" : " days ago");
  } else {
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  }
}

export default function Recomendations({ tags = null, channel }) {
  const [filterParams, setFilterParams] = useSearchParams();

  const videos = VideoList.Videos;

  const appliedFilter = filterParams.get("filter");

  const filteredRecommendations = !appliedFilter
    ? videos
    : videos.filter((video) =>
        appliedFilter === "channel"
          ? video.channel === channel
          : tags.some((tag) => video.tags.includes(tag))
      );
  return (
    <aside>
      <h2 className="text-lg">Recommended for you:</h2>
      {tags ? (
        <nav>
          <Link className={!appliedFilter ? "button active" : "button"} to=".">
            All
          </Link>
          <Link
            className={appliedFilter === "channel" ? "button active" : "button"}
            to="?filter=channel"
          >
            Channel
          </Link>
          <Link
            to="?filter=tags"
            className={appliedFilter === "tags" ? "button active" : "button"}
          >
            Tags
          </Link>
        </nav>
      ) : null}
      {filteredRecommendations.map((video) => {
        let milliseconds = getTimeDifference(video["date-uploaded"]);
        return (
          <Link
            key={video["date-uploaded"]}
            to={`/video/${video.id}`}
            className="recommended-video"
          >
            <img src={video.thumb} />
            <div>
              <p>
                <strong>{video.title}</strong>
              </p>
              <p className="subsection">{video.channel}</p>
              <p className="subsection">
                {video.views} views &emsp;{convertMilliseconds(milliseconds)}
              </p>
            </div>
          </Link>
        );
      })}
    </aside>
  );
}
