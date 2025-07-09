import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MainLayout from "./components/layout/MainLayout";
import AudioPlayer from "./components/audio/AudioPlayer";

import HomePage from "./components/pages/HomePage";
import ShowDetailsPage from "./components/pages/ShowDetailsPage";
import GenrePage from "./components/pages/GenrePage";
import FavoritesPage from "./components/pages/FavoritesPage";
import NotFoundPage from "./components/pages/NotFoundPage";

import { FavoritesProvider } from "./components/store/FavoritesContext";

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/show/:showId" element={<ShowDetailsPage />} />
            <Route path="/genre/:id" element={<GenrePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>

        <AudioPlayer audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
