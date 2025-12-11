import React from "react";
import { VideoPlayer } from "react-smart-video-player";
import "./video.css";
import VideoData from "../../sample_data/video.json";
import VideoComments from "./VideoComments";
import VideoInfo from "./VideoInfo";
import Avatar from "../Avatar";
import Like from "../Like";
import Subscribe from "../Subscribe";

function getTimeDifference() {
  const uploadDate = new Date(VideoData["date-uploaded"]);
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

export default function Video() {
  const comments = VideoData.comments;
  const miliseconds = getTimeDifference();
  return (
    <div className="video-container">
      <VideoPlayer
        src={VideoData.url}
        poster={VideoData.thumb}
        title={VideoData.title}
        theme="dark"
      />
      <h2 className="text-3xl">{VideoData.title}</h2>
      <div className="channel-info-container">
        <div className="channel-info">
          <Avatar>
            <img src={VideoData.icon} />
          </Avatar>
          <div>
            <strong>{VideoData.channel}</strong>
            <br />
            {VideoData.subscribers.toLocaleString()} Subscribers
          </div>
        </div>
        <Subscribe activeSubscription={true} />
        <Like totalLikes={VideoData.likes} />
      </div>
      <VideoInfo
        uploadDate={convertMilliseconds(miliseconds)}
        description={VideoData.description}
        views={VideoData.views}
      />
      <VideoComments comments={comments} />
    </div>
  );
}
