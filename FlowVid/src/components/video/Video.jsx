import { VideoPlayer } from "react-smart-video-player";
import { Link } from "react-router-dom";
import "./video.css";
import VideoComments from "./VideoComments";
import VideoInfo from "./VideoInfo";
import Like from "../Like";
import Avatar from "../Avatar";
import Subscribe from "../Subscribe";
import { convertMilliseconds, getTimeDifference } from "../../Utilities";

const videos_base_url = import.meta.env.VITE_IMAGEKIT_BASE_URL;

export default function Video({ videoData }) {
  const miliseconds = getTimeDifference(videoData["date-uploaded"]);
  const tags = videoData.tags ? videoData.tags.split(", ") : null;
  const comments = videoData.comments
    ? [...Object.values(videoData.comments)]
    : null;

  return (
    <div className="video-container">
      <VideoPlayer
        poster={videoData.thumb}
        controls={true}
        src={videos_base_url + videoData.id + ".mp4"}
        title={videoData.title}
        theme="dark"
      />
      <h2 className="text-2xl">{videoData.title}</h2>
      <div className="channel-info-container">
        <div className="channel-info">
          <Avatar>{videoData.channelName[0]}</Avatar>
          <div>
            <Link to={`/channel/${videoData.channelId}`}>
              <strong>{videoData.channelName}</strong>
            </Link>
            <br />
            <p className="subsection">
              {videoData.subscribers
                ? videoData.subscribers.toLocaleString()
                : "0"}{" "}
              Subscribers
            </p>
          </div>
        </div>
        <Subscribe activeSubscription={true} />
        <Like totalLikes={videoData.likes} />
      </div>
      <div className="tags">
        {tags ? tags.map((tag) => <p key={tag}>#{tag}</p>) : null}
      </div>
      <VideoInfo
        uploadDate={convertMilliseconds(miliseconds)}
        description={videoData.description}
        views={videoData.views}
      />
      <VideoComments allComments={comments} videoId={videoData.id} />
    </div>
  );
}
