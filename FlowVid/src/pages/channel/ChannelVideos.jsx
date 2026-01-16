import { useOutletContext, Link } from "react-router-dom";

export default function ChannelVideos() {
  const { channelData } = useOutletContext();

  return (
    <section className="channel-videos">
      <div className="main-video-list">
        {Object.values(channelData.videos).map((video) => {
          console.log(video);
          return (
            <Link to={`/video/1`}>
              <img src={video.thumb} />
              <div>
                <p>
                  <strong>{video.title}</strong>
                </p>
                <p className="subsection">{video.channel}</p>
                <p className="subsection">{video.views} views &emsp;</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
