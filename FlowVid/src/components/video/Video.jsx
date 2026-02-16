import React from "react";
import { VideoPlayer } from "react-smart-video-player";
import { Link, useParams } from "react-router-dom";
import "./video.css";
import VideoComments from "./VideoComments";
import VideoInfo from "./VideoInfo";
import Avatar from "../Avatar";
import Like from "../Like";
import Subscribe from "../Subscribe";
import { convertMilliseconds, getTimeDifference } from "../../Utilities";

export default function Video({ videoData }) {
  const miliseconds = getTimeDifference(videoData["date-uploaded"]);
  const tags = videoData.tags ? videoData.tags.split(", ") : null;
  const comments = [...Object.values(videoData.comments)];
  const qualities = {
    "1080p": "w-1920,q-90",
    "720p": "w-1280,q-70",
    "480p": "w-854,q-60",
    low: "w-720,q-40",
  };
  const imagekit_base_url = import.meta.env.VITE_IMAGEKIT_BASE_URL;
  const video_name = "BfhLq5jZtME_1080p.mp4";

  return (
    <div className="video-container">
      <VideoPlayer
        //src={videoData.url}
        src={`${imagekit_base_url}${video_name}?tr=${qualities["low"]}`}
        poster={videoData.thumb}
        controls={true}
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
