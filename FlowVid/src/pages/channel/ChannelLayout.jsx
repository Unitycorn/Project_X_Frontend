import React from "react";
import Loader from "../../components/Loader";
import ChannelHero from "./ChannelHero";
import { LoadChannel } from "../../Utilities";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function ChannelLayout() {
  const params = useParams();
  const [channelData, setChannelData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
  };
  React.useEffect(() => {
    async function getChannelInfo() {
      setLoading(true);
      try {
        const data = await LoadChannel(params.id);
        setChannelData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getChannelInfo();
  }, [params.id]);

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  if (loading) {
    return (
      <section className="channel-page">
        <Loader />
      </section>
    );
  }

  if (channelData) {
    return (
      <section className="channel-page">
        <div className="channel-intro">
          <ChannelHero>
            <img src={channelData.icon} alt="logo" />
            <h1 className="text-4xl">{channelData.name}</h1>
          </ChannelHero>
        </div>
        <nav className="channel-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Info
          </NavLink>
          <NavLink
            to="videos"
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Videos
          </NavLink>
          <NavLink
            to="playlists"
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Playlists
          </NavLink>
        </nav>
        <Outlet context={{ channelData }} />
      </section>
    );
  }
}
