import { useOutletContext } from "react-router-dom";

export default function ChannelDescription() {
  const { channelData } = useOutletContext();

  return (
    <section className="channel-description">
      <h2 className="text-2xl">About {channelData.name}: </h2>
      <p>{channelData.about}</p>
    </section>
  );
}
