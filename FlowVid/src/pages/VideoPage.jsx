import Loader from "../components/Loader";
import Recomendations from "../components/Recommendations";
import Video from "../components/video/Video";
import React from "react";
import { useParams } from "react-router-dom";

import { LoadVideo } from "../Utilities";

export default function VideoPage() {
  const [videoData, setVideoData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const params = useParams();

  React.useEffect(() => {
    async function getVideo() {
      setLoading(true);
      setError(false);
      setVideoData(null);

      try {
        const data = await LoadVideo(params.id);
        setVideoData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getVideo();
  }, [params.id]);

  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  if (loading) {
    return (
      <section aria-live="polite" className="video-page">
        <Loader />
        <Recomendations />
      </section>
    );
  }

  if (videoData) {
    return (
      <section className="video-page">
        <Video videoData={videoData} />
        <Recomendations
          tags={videoData.tags ? videoData.tags.split(", ") : null}
          channel={videoData.channelName}
        />
      </section>
    );
  }
}
