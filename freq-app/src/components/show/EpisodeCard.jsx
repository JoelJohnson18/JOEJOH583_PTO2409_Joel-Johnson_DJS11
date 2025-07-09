import "./EpisodeCard.css";
import { useFavorites } from "../store/FavoritesContext";
import React, { useEffect, useState } from "react";

export default function EpisodeCard({
  episode,
  showId,
  showName,
  season,
  thumbnail,
}) {
  const placeholderAudio =
  // Placeholder audio URL for all episodes //
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (fav) =>
      fav.showId === showId &&
      fav.season === season &&
      fav.episode === episode.episode
  );

  const handleToggleFavorite = () => {
    const favEpisode = {
      showId,
      showName,
      season,
      episode: episode.episode,
      title: episode.title,
      description: episode.description,
      thumbnail,
    };
    toggleFavorite(favEpisode);
  };

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const episodeKey = `${showId}-season${season}-episode${episode.episode}`;
    const completed = localStorage.getItem(episodeKey);
    setIsCompleted(!!completed);
  }, [showId, season, episode.episode]);


  // EpisodeCards with episode details & audio //
  return (
    <div className="episode-card">
      <h3 className="episode-title">
        {episode.title}
        {isCompleted && <span className="completed-badge">✅ Completed</span>}
      </h3>
      <p className="episode-description">{episode.description}</p>
      
      <div className="episode-audio">
        <p className="audio-label">🎧 Listen to this episode:</p>
        <audio
          controls
          src={placeholderAudio}
          className="audio-tag"
          onEnded={() => {
            const episodeKey = `${showId}-season${season}-episode${episode.episode}`;
            localStorage.setItem(episodeKey, "completed");
            setIsCompleted(true); // trigger UI update
          }}
        />
      </div>
      <button onClick={handleToggleFavorite} className="favorite-button">
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}
