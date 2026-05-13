import VideoList from "../sample_data/recs.json";
import { Link, useSearchParams } from "react-router-dom";
import { convertMilliseconds, getTimeDifference } from "../Utilities";

export default function Recomendations({ tags = null, channel }) {
  const [filterParams] = useSearchParams();

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
