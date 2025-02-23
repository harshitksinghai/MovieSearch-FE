// SearchBar.tsx
import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (title: string, type: string, year: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);



    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1887 }, (_, i) => currentYear - i);

    const handleSearch = () => {
        if (title.trim().length < 3) {
            setError('Title must be at least 3 characters long.');
            return;
        }
        setError('');
        onSearch(title, type, year);
    };

    return (
        <div>

            <div className='search-container' >
                <div className={`search-box ${error ? 'search-box-error' : ''} `}>
                        <input
                            type="text"
                            placeholder="Search Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="search-title"
                        />

                    <div className='select-container'>
                        <div className="select-dropdown search-type">
                            <button
                                onClick={() => setIsTypeOpen(!isTypeOpen)}
                                onBlur={() => setIsTypeOpen(false)}
                                className="select-button"
                            >
                                {type ? type : "All"}
                                <span className={`arrow ${isTypeOpen ? 'arrow-up' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {isTypeOpen && (
                                <div className="dropdown-menu">
                                    {['All', 'Movies', 'Series'].map((option) => (
                                        <button
                                            key={option}
                                            className="dropdown-item"
                                            onMouseDown={() => {
                                                setType(option);
                                                setIsTypeOpen(false);
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="select-dropdown">
                            <button
                                onClick={() => setIsYearOpen(!isYearOpen)}
                                onBlur={() => setIsYearOpen(false)}
                                className="select-button"
                            >
                                {year ? year : "Year"}
                                <span className={`arrow ${isYearOpen ? 'arrow-up' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {isYearOpen && (
                                <div className="dropdown-menu">
                                    <button
                                        className="dropdown-item"
                                        onMouseDown={() => {
                                            setYear('');
                                            setIsYearOpen(false);
                                        }}
                                    >None</button>
                                    {years.map((option) => (
                                        <button
                                            key={option}
                                            className="dropdown-item"
                                            onMouseDown={() => {
                                                setYear(option.toString());
                                                setIsYearOpen(false);
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSearch}
                            className="search-button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                color='white'
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className='search-error'>{error}</p>
            </div>
        </div>
    );
};

export default SearchBar;