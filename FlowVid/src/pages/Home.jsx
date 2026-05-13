import VideoList from "../sample_data/recs.json";
import { Link } from "react-router-dom";
import {
  convertMilliseconds,
  getTimeDifference,
  randomizer,
} from "../Utilities";

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
