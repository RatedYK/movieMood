import { useState } from "react";
import "../styles/MovieCard.css";

const imdbLogo = require("../assets/icons/imdb.png");


type MovieCardProps = {
  movieData: any[]
  onClose: () => void
};

const MovieCard = ({ movieData, onClose }: MovieCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const goToNextCard = () => {
    if (currentCardIndex < movieData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(movieData.length - 1);
    }
  };

  const currentMovie = movieData[currentCardIndex];

  return (
      <div className="card--container" key={currentMovie.title}>
        <h5 className="card-result">{currentCardIndex + 1}/{movieData.length}</h5>
        <button className='close-btn' type='button' onClick={onClose}>X</button>
        <img className="card-img" src={currentMovie.poster_img} alt={currentMovie.title} />
        <article className="card-info-container">
          <div className="card-title-rated-container">
            <h2>{currentMovie.title}</h2>
            <div>
                <span className="card-rated">{currentMovie.rated}</span>
            </div>
          </div>
          <p className="card-genre">{currentMovie.genres}</p>
          <p className="card-plot">{currentMovie.plot}</p>
        </article>
        <article className="card-data-container">
          <p className="card-rating"><img className="imdb-logo" src={imdbLogo} alt="imdb rating"/>{currentMovie.imdb_rating}</p>
          <p>{currentMovie.language}</p>
          <p>{currentMovie.runtime}</p>
          <p>{currentMovie.year}</p>
          <p>Starring: {currentMovie.actors}</p>
          <p>Directed By: {currentMovie.director}</p>
          <p>Country: {currentMovie.country}</p>
        </article>
        <div className="button-container">
            <button 
            className="card-btn" 
            onClick={goToPreviousCard} >
            Previous
            </button>

            <button
            className="card-btn"
            onClick={goToNextCard}
            >
            Next
            </button>
        </div>
      </div>
  );
};

export default MovieCard;
