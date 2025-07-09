import React, { useState } from "react";
import { useFavorites } from "../store/FavoritesContext";
import { Link } from "react-router-dom";
import "./FavoritesPage.css"; 

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites(); //Access the list of favourite episodes and toggle logic //
  const [sortMethod, setSortMethod] = useState("title-asc");

  // State to manage the sorting method selected by the user //
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortMethod === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortMethod === "title-desc") {
      return b.title.localeCompare(a.title);
    } else if (sortMethod === "date-newest") {
      return new Date(b.addedAt) - new Date(a.addedAt);
    } else if (sortMethod === "date-oldest") {
      return new Date(a.addedAt) - new Date(b.addedAt);
    }
    return 0;
  });

  // Group favorites episodes by show and season //
  const groupedFavorites = sortedFavorites.reduce((acc, ep) => {
    const key = `${ep.showName}||Season ${ep.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ep);
    return acc;
  }, {});

  return (
    <div className="favorites-container">
      <h1 className="favorites-heading">Your Favourite Episodes</h1>

      {favorites.length > 0 && (
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="date-newest">Most Recently Added</option>
            <option value="date-oldest">Latest Added</option>
          </select>
        </div>
      )}

      {favorites.length === 0 ? ( // Prompt user to add favorites //
        <div className="favorites-empty">
          <p>You haven’t added any favourite episodes yet.</p>
          <Link to="/" className="favorites-link">
            Browse shows
          </Link>
        </div>
      ) : (
        // Group favorites by show & season //
        <div className="favorites-grouped-list">
          {Object.entries(groupedFavorites).map(([groupKey, episodes]) => {
            const [showTitle, seasonLabel] = groupKey.split('||');
            return (
              <div key={groupKey} className="favorites-group">
                <h2 className="group-title">{showTitle} – {seasonLabel}</h2>
                <div className="favorites-grid">
                  {episodes.map((ep) => (
                    <div
                      key={`${ep.showId}-${ep.season}-${ep.episode}`}
                      className="episode-card"
                    > 
                      {/* Show episode thumbnail*/}
                      {ep.thumbnail && (
                        <img
                          src={ep.thumbnail}
                          alt={ep.title}
                          className="episode-thumbnail"
                        />
                      )}
                      <h3 className="episode-title">{ep.title}</h3>
                      <p className="episode-meta">
                        S{ep.season}E{ep.episode}
                      </p>

                      {/* Display the timestamp when show was made a favorite */}
                      {ep.addedAt && (
                        <p className="episode-added-at">
                          <em>Added: {new Date(ep.addedAt).toLocaleString()}</em>
                        </p>
                      )}
                      
                      {/* Remove episode from favorites */}
                      <button
                        onClick={() => toggleFavorite(ep)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}