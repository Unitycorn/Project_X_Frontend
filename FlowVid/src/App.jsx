import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./components/404.jsx";
import Login from "./components/Login.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import Register from "./components/Register.jsx";
import Home from "./pages/Home.jsx";
import Upload from "./pages/Upload.jsx";
import ChannelLayout from "./pages/channel/ChannelLayout.jsx";
import ChannelDescription from "./pages/channel/ChannelDescription";
import ChannelVideos from "./pages/channel/ChannelVideos.jsx";
import ChannelPlaylists from "./pages/channel/ChannelPlaylists.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
import AuthRequired from "./components/AuthRequired.jsx";

import "./server.js";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route element={<AuthRequired />}>
              <Route path="/upload" element={<Upload />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/channel/:id" element={<ChannelLayout />}>
              <Route index element={<ChannelDescription />} />
              <Route path="videos" element={<ChannelVideos />} />
              <Route path="playlists" element={<ChannelPlaylists />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </UserProvider>
  );
}
