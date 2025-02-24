import { useState } from 'react';
import FavListFilter from './FavListFilter'
import ShowFavList from './ShowFavList.tsx'
import './HomeList.css'
import { getMovieList, MovieItem } from '../utils/storage';

const HomeList = () => {
  const [filteredMovieList, setFilteredMovieList] = useState<MovieItem[]>([]);

  const movieList = getMovieList();

    const handleFilterChange = (filters: {
      Type: string;
      rating: string;
      Year: string;
      genres: string[];
    }) => {
      // Filter your movie list based on these criteria
      const filteredMovieList = movieList.filter(movie => {
        const typeMatch = filters.Type === 'all' || movie.Type === filters.Type;
        const ratingMatch = !filters.rating || movie.ratingState === filters.rating;
        const yearMatch = !filters.Year || movie.Year === filters.Year;
        const genreMatch = filters.genres.length === 0 || 
          filters.genres.some(genre => movie.genre.includes(genre));
        
        return typeMatch && ratingMatch && yearMatch && genreMatch;
      });
      
      setFilteredMovieList(filteredMovieList);
    };

  return (
    <div className='home-list-container'>
      <FavListFilter onFilterChange={handleFilterChange} />
      <ShowFavList filteredList={filteredMovieList}/>
    </div>
  )
}

export default HomeList
