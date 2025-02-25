import { FaHeart, FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import './FavListFilter.css'
import { useState } from 'react';

interface FavFilterProps {
    onFilterChange: (ratingState: string, Type: string) => void;
}

  const FavListFilter: React.FC<FavFilterProps>  = ({ onFilterChange }) => {
    const [activeType, setActiveType] = useState<string>("All");
    const [activeRating, setActiveRating] = useState<string>("");

    const updateFilters = (ratingState: string, Type: string) => {
        // Update the active type if a type button was clicked
        if (Type) {
            setActiveType(Type);
            onFilterChange(activeRating, Type);
        }
        
        // Update the active rating if a rating button was clicked
        if (ratingState) {
            // Toggle rating if already active
            const newRating = activeRating === ratingState ? "" : ratingState;
            setActiveRating(newRating);
            onFilterChange(newRating, activeType);
        }
    };

    return (
        <div className='fav-list-filter-container'>
            <div className="fav-filter">
            <button 
                    className={`filter-button ${activeType === "All" ? "active" : ""}`}
                    onClick={() => updateFilters("", "All")}
                >
                    All
                </button>
                <button 
                    className={`filter-button ${activeType === "Movies" ? "active" : ""}`}
                    onClick={() => updateFilters("", "movie")}
                >
                    Movies
                </button>
                <button 
                    className={`filter-button ${activeType === "Series" ? "active" : ""}`}
                    onClick={() => updateFilters("", "series")}
                >
                    Series
                </button>
                <button 
                    className={`filter-button ${activeType === "Games" ? "active" : ""}`}
                    onClick={() => updateFilters("", "game")}
                >
                    Games
                </button>
                <div className="vertical-separator"></div>
                <button 
                    className={`filter-button ${activeRating === "love" ? "active" : ""}`}
                    onClick={() => updateFilters("love", "")}
                >
                    Love <span className='filter-button-span'><FaHeart size={20} /></span>
                </button>
                <button 
                    className={`filter-button ${activeRating === "like" ? "active" : ""}`}
                    onClick={() => updateFilters("like", "")}
                >
                    Like <span className='filter-button-span thumbsUp'><FaThumbsUp size={20} /></span>
                </button>
                <button 
                    className={`filter-button ${activeRating === "dislike" ? "active" : ""}`}
                    onClick={() => updateFilters("dislike", "")}
                >
                    Meh <span className='filter-button-span'><FaThumbsDown size={20} /></span>
                </button>
            </div>
        </div>
    );
};

export default FavListFilter;