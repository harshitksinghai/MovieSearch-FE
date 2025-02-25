import { useEffect, useState } from 'react';
import FavListFilter from './FavListFilter'
import './HomeList.css'
import { getMovieList, MovieItem } from '../utils/localStorage.ts';
import { useTranslation } from 'react-i18next';
import ShowFavList from './ShowFavList.tsx';

const HomeList = () => {
  const {t} = useTranslation();
  const [movieList, setMovieList] = useState<MovieItem[]>([]);
  const [filteredMovieList, setFilteredMovieList] = useState<MovieItem[]>([]);
  const [activeType, setActiveType] = useState<string>("All");
  const [activeRating, setActiveRating] = useState<string>("");

  useEffect(() => {
    const list = getMovieList();
    setMovieList(list);
    setFilteredMovieList(list); // Initially show all items
  }, []);

  const handleFilterChange = (ratingState: string, type: string) => {
    setActiveRating(ratingState);
    setActiveType(type);
    
    // Apply filters based on active type and rating
    let filtered = movieList;
    
    // Filter by type
    if (type !== "All") {
      filtered = filtered.filter(movie => movie.Type === type);
    }
    
    // Filter by rating if one is selected
    if (ratingState) {
      filtered = filtered.filter(movie => movie.ratingState === ratingState);
    }
    
    setFilteredMovieList(filtered);
  };

  return (
    <div className='home-list-container'>
      <p className='myList'>{t('fav.myList')}</p>
      <FavListFilter onFilterChange={handleFilterChange} />
      <ShowFavList filteredList={filteredMovieList} />
    </div>
  )
}

export default HomeList
