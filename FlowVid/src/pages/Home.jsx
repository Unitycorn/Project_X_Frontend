//import VideoList from "../sample_data/recs.json";
import "/images/05.avif";
import { Link } from "react-router-dom";
import {
  convertMilliseconds,
  getTimeDifference,
  getAllVideos,
  randomizer,
} from "../Utilities";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const videoList = await getAllVideos();
        const shuffledList = randomizer(Object.values(videoList));
        console.log(shuffledList);
        setVideos(shuffledList);
        console.log(videos);
      } catch (err) {
        console.error("Fehler beim Laden der Videos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <>
        <h2 className="text-xl">Todays top-video selection:</h2>{" "}
        <section aria-live="polite" className="video-page">
          <Loader />
        </section>
      </>
    );
  }
  if (videos) {
    return (
      <>
        <h2 className="text-xl">Todays top-video selection:</h2>
        <div className="main-video-list">
          {videos.map((video) => {
            let milliseconds = getTimeDifference(video["date-uploaded"]);
            return (
              <Link to={`/video/${video.id}`} key={video["date-uploaded"]}>
                <img src={video.thumb ? video.thumb : "/images/05.avif"} />
                <div>
                  <p>
                    <strong>{video.title}</strong>
                  </p>
                  <p className="subsection">{video.channel}</p>
                  <p className="subsection">
                    {video.views || "0"} views &emsp;
                    {convertMilliseconds(milliseconds)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}
