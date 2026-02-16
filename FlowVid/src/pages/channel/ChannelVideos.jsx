import { useOutletContext, Link } from "react-router-dom";
import { getTimeDifference, convertMilliseconds } from "../../Utilities";

export default function ChannelVideos() {
  const { channelData } = useOutletContext();
  return (
    <section className="channel-videos">
      <div className="main-video-list">
        {Object.values(channelData.videos).map((video) => {
          let milliseconds = getTimeDifference(video["date-uploaded"]);
          return (
            <Link to={`/video/${video.id}`} key={video.id}>
              <img src="/images/wpthumb.avif" />
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
    </section>
  );
}
