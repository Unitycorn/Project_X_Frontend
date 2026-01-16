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
  const tags = videoData.tags.split(", ");
  const comments = [...Object.values(videoData.comments)];
  return (
    <div className="video-container">
      <VideoPlayer
        src={videoData.url}
        poster={videoData.thumb}
        title={videoData.title}
        theme="dark"
      />
      <h2 className="text-2xl">{videoData.title}</h2>
      <div className="channel-info-container">
        <div className="channel-info">
          <Avatar>
            <img src={videoData.icon} />
          </Avatar>
          <div>
            <Link to="/channel/1">
              <strong>{videoData.channel}</strong>
            </Link>
            <br />
            <p className="subsection">
              {videoData.subscribers.toLocaleString()} Subscribers
            </p>
          </div>
        </div>
        <Subscribe activeSubscription={true} />
        <Like totalLikes={videoData.likes} />
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <p key={tag}>#{tag}</p>
        ))}
      </div>
      <VideoInfo
        uploadDate={convertMilliseconds(miliseconds)}
        description={videoData.description}
        views={videoData.views}
      />
      <VideoComments comments={comments} />
    </div>
  );
}
