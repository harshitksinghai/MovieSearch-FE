import { useState } from 'react';
import './MovieCard.css';
import placeholder from "../assets/placeholder1.jpg";
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown, FaRegHeart, FaHeart, FaPlus, FaCheck } from "react-icons/fa6";

interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [ratingState, setRatingState] = useState<'none' | 'dislike' | 'like' | 'love'>('none');
  const [isAddedToList, setIsAddedToList] = useState(false);

  const handleRating = (rating: 'dislike' | 'like' | 'love') => {
    setRatingState(rating === ratingState ? 'none' : rating);
  };

  const handleAddToList = () => {
    setIsAddedToList(!isAddedToList);
  };

  let ratingIcon;
  if (ratingState === 'none') {
    ratingIcon = <FaRegThumbsUp size={14} color="white" />;
  } else if (ratingState === 'like') {
    ratingIcon = <FaThumbsUp size={14} />;
  } else if (ratingState === 'dislike') {
    ratingIcon = <FaThumbsDown size={14} />;
  } else if (ratingState === 'love') {
    ratingIcon = <FaHeart size={14} />;
  }

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="card-overlay">
        <div className="rating-container">
          <button
            className={`action-button ${(ratingState !== 'none') ? 'active' : ''}`}
          >
            {ratingIcon}
          </button>

          <div className="rating-options">
            <button
              className={`action-button ${ratingState === 'dislike' ? 'active' : ''}`}
              onClick={() => handleRating('dislike')}
            >
              {ratingState === 'dislike' ? 
              <FaThumbsDown size={14} /> : 
              <FaRegThumbsDown size={14} color="white" />
            }
              <span className="tooltip">Not for me</span>
            </button>
            <button
            className={`action-button ${ratingState === 'like' ? 'active' : ''}`}
            onClick={() => handleRating('like')}
          >
            {ratingState === 'like' ? 
              <FaThumbsUp size={14} /> : 
              <FaRegThumbsUp size={14} color="white" />
            }
            <span className="tooltip">I like this</span>
          </button>
            <button
              className={`action-button ${ratingState === 'love' ? 'active' : ''}`}
              onClick={() => handleRating('love')}
            >
              {ratingState === 'love' ? 
              <FaHeart size={14} /> : 
              <FaRegHeart size={14} color="white" />
            }
              <span className="tooltip">Love this!</span>
            </button>
          </div>
        </div>

        <button
          className={`action-button ${isAddedToList ? 'active' : ''}`}
          onClick={handleAddToList}
        >
          {isAddedToList ? 
            <FaCheck size={14} /> : 
            <FaPlus size={14} color="white" />
          }
          <span className="tooltip">{isAddedToList ? 'Remove from My List' : 'Add to My List'}</span>
        </button>

        <div className="movie-info">
          <p>{movie.Type.toUpperCase()}</p>
          <p>{movie.Year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;