import { useOutletContext } from "react-router-dom";

export default function ChannelDescription() {
  const { channelData } = useOutletContext();

  return (
    <section className="channel-description">
      <p>{channelData.about}</p>
    </section>
  );
}
