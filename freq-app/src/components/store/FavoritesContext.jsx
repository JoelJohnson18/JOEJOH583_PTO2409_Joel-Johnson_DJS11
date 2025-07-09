import { createContext, useContext, useState, useEffect } from "react";

// Context to manage the global state of favorite episodes //
const FavoritesContext = createContext();

// Provides access to favorites //
export function FavoritesProvider({ children }) {
  // Initialize favorites state from localStorage to persist user data across sessions //
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  });
// Persists updated favorites on every change to localStorage //
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  // Add or remove episodes from favorites //
  const toggleFavorite = (episode) => {
    setFavorites((prev) => {
      // Check if episode already exists in favorites  //
      const exists = prev.some(
        (fav) =>
          fav.showId === episode.showId &&
          fav.season === episode.season &&
          fav.episode === episode.episode
      );

      if (exists) {
        // If it exists, remove it from favorites //
        return prev.filter(
          (fav) =>
            !(
              fav.showId === episode.showId &&
              fav.season === episode.season &&
              fav.episode === episode.episode
            )
        );
      } else {
        // if not present, add to favorites with a timestamp //
        const episodeWithTimestamp = {
          ...episode,
          addedAt: new Date().toISOString(), 
        };
        return [...prev, episodeWithTimestamp];
      }
    });
  };

  // Check if an episode is in favorites //
  const isFavorite = (episode) =>
    favorites.some(
      (fav) =>
        fav.showId === episode.showId &&
        fav.season === episode.season &&
        fav.episode === episode.episode
    );

  return ( // Provide the favorites list and helper functions to children components //
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
