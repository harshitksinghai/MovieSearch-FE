import { useState } from 'react';
import './FavListFilter.css'
import { GenreCount, getGenreCount, getUniqueYears } from '../utils/storage';

interface FilterProps {
    onFilterChange: (filters: {
      Type: string;
      rating: string;
      Year: string;
      genres: string[];
    }) => void;
  }
  
  const FavListFilter = ({ onFilterChange }: FilterProps) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [year, setYear] = useState('');
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('all');
    const [selectedRating, setSelectedRating] = useState('none');
    
    const genres: GenreCount = getGenreCount();
    const years: string[] = getUniqueYears();

    const handleTypeSelect = (Type: string) => {
        const newType = selectedType === Type ? 'all' : Type;
        setSelectedType(newType);
        updateFilters(newType, selectedRating, year, selectedGenres);
    };

    const handleRatingSelect = (rating: string) => {
        const newRating = selectedRating === rating ? 'none' : rating;
        setSelectedRating(newRating);
        updateFilters(selectedType, newRating, year, selectedGenres);
    };

    const handleGenreToggle = (genre: string) => {
        const newGenres = selectedGenres.includes(genre)
            ? selectedGenres.filter(g => g !== genre)
            : [...selectedGenres, genre];
        setSelectedGenres(newGenres);
        updateFilters(selectedType, selectedRating, year, newGenres);
    };

    const handleYearSelect = (selectedYear: string) => {
        setYear(selectedYear);
        setIsYearOpen(false);
        updateFilters(selectedType, selectedRating, selectedYear, selectedGenres);
    };

    const updateFilters = (Type: string, rating: string, selectedYear: string, genreList: string[]) => {
        onFilterChange({
            Type: Type,
            rating: rating,
            Year: selectedYear,
            genres: genreList
        });
    };

    return (
        <div className='fav-list-filter-container'>
            <div className='left-filter'>
                <button 
                    className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
                    onClick={() => handleTypeSelect('all')}
                >All</button>
                <button 
                    className={`filter-button ${selectedType === 'movie' ? 'active' : ''}`}
                    onClick={() => handleTypeSelect('movie')}
                >Movies</button>
                <button 
                    className={`filter-button ${selectedType === 'series' ? 'active' : ''}`}
                    onClick={() => handleTypeSelect('series')}
                >Series</button>
                <button 
                    className={`filter-button ${selectedType === 'game' ? 'active' : ''}`}
                    onClick={() => handleTypeSelect('game')}
                >Games</button>
                <div className='vertical-line'></div>
                <button 
                    className={`filter-button ${selectedRating === 'love' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('love')}
                >Love</button>
                <button 
                    className={`filter-button ${selectedRating === 'like' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('like')}
                >Like</button>
                <button 
                    className={`filter-button ${selectedRating === 'meh' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('meh')}
                >Meh</button>
            </div>
            <div className='right-filter'>
                <div className="select-dropdown">
                    <button
                        onClick={() => setIsGenreOpen(!isGenreOpen)}
                        onBlur={() => setTimeout(() => setIsGenreOpen(false), 200)}
                        className="select-button"
                    >
                        {selectedGenres.length ? `${selectedGenres.length} selected` : 'Genres'}
                        <span className={`arrow ${isGenreOpen ? 'arrow-up' : ''}`}>▼</span>
                    </button>

                    {isGenreOpen && (
                        <div className="dropdown-menu">
                            {Object.entries(genres).map(([genre, count]) => (
                                <button
                                    key={genre}
                                    className={`dropdown-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                                    onMouseDown={() => handleGenreToggle(genre)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedGenres.includes(genre)}
                                        readOnly
                                    />
                                    {genre} ({count})
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            
                <div className="select-dropdown">
                    <button
                        onClick={() => setIsYearOpen(!isYearOpen)}
                        onBlur={() => setTimeout(() => setIsYearOpen(false), 200)}
                        className="select-button"
                    >
                        {year || "Year"}
                        <span className={`arrow ${isYearOpen ? 'arrow-up' : ''}`}>▼</span>
                    </button>

                    {isYearOpen && (
                        <div className="dropdown-menu">
                            <button
                                className="dropdown-item"
                                onMouseDown={() => handleYearSelect('')}
                            >None</button>
                            {years.map((option) => (
                                <button
                                    key={option}
                                    className={`dropdown-item ${year === option ? 'selected' : ''}`}
                                    onMouseDown={() => handleYearSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavListFilter;
