import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import Season from "../show/Season";
import "./ShowDetailsPage.css";

import { useFavorites } from "../store/FavoritesContext";


export default function ShowDetailsPage() {
  const { showId } = useParams(); // Extract showId from route parameters //

  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();
  // Fetch show details using id from URL params //
  useEffect(() => {
    setLoading(true); // loading state while initial data is being loaded //
    fetch(`https://podcast-api.netlify.app/id/${showId}`) //Fetch specific show by ID from API //
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch show details");
        return res.json();
      })
      .then((data) => {
        setShow(data); // Sets show data in state //
        setLoading(false); // Sets loading state to false once data is fetched //
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [showId]);

  // Opens modal & sets selected season //
  const openModal = (season) => {
    setSelectedSeason(season);
    setIsModalOpen(true);
  };

  if (loading) return <p>Loading show details...</p>; // Displays loading state while initially fetching data //
  if (loading) return <p>Loading...</p>; // loading state while new data is being loaded //
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>No show found</p>;

  return (
    <div className="details-container">
      <h1 className="show-title">{show.title}</h1>
      <p className="show-descriptions">{show.description}</p>

      {/* Displays seasons of show */}
      <h2 className="section-heading">Seasons</h2> 
      <div className="season-grid">
        {show.seasons.map((season) => (
          <div
            key={`season-${season.season}`}
            className="season-card"
            onClick={() => openModal(season)}
          >
            <img
              src={season.image}
              alt={`Season ${season.season} Preview`}
              className="season-image"
            />
            <div className="season-info">
              <h3>Season {season.season}</h3>
              <p>
                {season.episodes?.length ?? 0} Episode
                {season.episodes?.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedSeason && (
          <Season
            season={selectedSeason}
            onClose={() => setIsModalOpen(false)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            showId={showId} 
            showName={show.title}
          />
        )}
      </Modal>
    </div>
  );
}
