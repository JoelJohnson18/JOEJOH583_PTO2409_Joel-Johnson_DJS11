import './Season.css';
import EpisodeCard from './EpisodeCard';

export default function Season({ season, onClose, showId, showName }) {
  return (
    <div className="season-detail">
      {/* User can click back to return to main show view  */}
      <button onClick={onClose} className="back-button">← Back to Show</button> 

      <h2 className="season-title">Season {season?.season}</h2>

      <div className="episode-list"> {/* Only renders selected episodes for the selected season */}
        {season?.episodes?.map((episode) => (
          <EpisodeCard
            key={`${episode.episode}-${episode.title}`} /* Creates unique key using episode number & title */
            episode={episode}
            showId={showId}          
            showName={showName} 
            season={season.season}
            thumbnail={season.image}
          />
        ))}
      </div>
    </div>
  );
}
