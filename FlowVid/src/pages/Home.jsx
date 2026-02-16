import VideoList from "../sample_data/recs.json";
import { Link } from "react-router-dom";
import { randomizer } from "../Utilities";

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

export default function Home() {
  const shuffledList = randomizer(Object.values(VideoList.Videos));
  return (
    <>
      <h2 className="text-xl">Todays top-video selection:</h2>
      <div className="main-video-list">
        {shuffledList.map((video) => {
          let milliseconds = getTimeDifference(video["date-uploaded"]);
          return (
            <Link to={`/video/${video.id}`} key={video["date-uploaded"]}>
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
      </div>
    </>
  );
}
