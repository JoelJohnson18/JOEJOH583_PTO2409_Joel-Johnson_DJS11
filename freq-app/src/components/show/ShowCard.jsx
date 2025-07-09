import { Link } from "react-router-dom";
import genreMap from "../../data/genreMap";
import "./ShowCard.css";

export default function ShowCard({ show }) {
  const previewImage = show?.image;
  const numberOfSeasons = show?.seasons;
  const genreTitles = show?.genres?.map((id) => genreMap[id]).filter(Boolean);

  const formattedUpdatedDate = show?.updated // Formats the updated date to a readable format //
    ? new Date(show.updated).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return ( // Displays show card with title, description, image, seasons, genres, and updated date //
    <div className="show-card"> 
      {previewImage && (
        <Link to={`/show/${show.id}`}>
          <img
            src={previewImage}
            alt={`${show.title} Preview`}
            className="show-image"
          />
        </Link>
      )}

      {/* Show title with navigation to detail page */}
      <Link to={`/show/${show.id}`} className="show-title">
        {show?.title}
      </Link>

      {/* Shortened description with read more link */}
      <div className="show-description">
        {show?.description?.length > 100 ? (
          <>
            {show.description.slice(0, 100)}...
            <Link to={`/show/${show.id}`} className="read-more"> 
              {" "}
              Read more →
            </Link>
          </>
        ) : (
          show?.description
        )}
      </div>

      {/* Show seasons if it exists and is > 0 */}
      {numberOfSeasons > 0 && (
        <p className="show-seasons">
          📽️ {numberOfSeasons} Season{numberOfSeasons !== 1 ? "s" : ""}  {/* Displays no. of episodes in season*/}
        </p>
      )}

      {/* Display genre titles */}
      {genreTitles.length > 0 && (
        <div className="show-genres">
          {genreTitles.map((genre, index) => (
            <span key={index} className="genre-pill">
              {genre}
            </span>
          ))}
        </div>
      )} {/* Displays updated date in card */}
      {formattedUpdatedDate && (
        <p className="show-updated">🕓 Updated: {formattedUpdatedDate}</p>
      )}
    </div>
  );
}
