import { useState } from "react";

export default function Subscribe({ activeSubscription = false }) {
  const [subscribed, setSubscribed] = useState(activeSubscription);

  function handleClick() {
    setSubscribed((oldSubscribed) => (oldSubscribed = !oldSubscribed));
  }
  return (
    <button
      className={`button ${subscribed ? "active" : ""}`}
      onClick={handleClick}
    >
      <strong>{subscribed ? "Subscribed" : "Subscribe"}</strong>
    </button>
  );
}
