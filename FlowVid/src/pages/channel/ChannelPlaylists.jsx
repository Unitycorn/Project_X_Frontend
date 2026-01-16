import { useOutletContext } from "react-router-dom";

export default function ChannelPlaylists() {
  const { channelData } = useOutletContext();
  return (
    <section className="channel-playlists">
      {channelData.playlists ? (
        <p>{channelData.playlists}</p>
      ) : (
        <p>Its very empty here...</p>
      )}
    </section>
  );
}
