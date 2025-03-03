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
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state

  // Function to refresh movie lists
  const refreshLists = () => {
    const list = getMovieList();
    setMovieList(list);
    
    // Re-apply current filters
    let filtered = list;
    
    if (activeType !== "All") {
      filtered = filtered.filter(movie => movie.Type === activeType);
    }
    
    if (activeRating) {
      filtered = filtered.filter(movie => movie.ratingState === activeRating);
    }
    
    setFilteredMovieList(filtered);
  };

  // Initial load
  useEffect(() => {
    refreshLists();
  }, [refreshKey]); // Add refreshKey as dependency

  // Listen for list changes
  useEffect(() => {
    const handleListChange = () => {
      setRefreshKey(prevKey => prevKey + 1); // Increment refresh key to trigger reload
    };

    window.addEventListener('movieListChanged', handleListChange);
    return () => {
      window.removeEventListener('movieListChanged', handleListChange);
    };
  }, [activeType, activeRating]); // Include these dependencies

  // When filters change, reapply them
  useEffect(() => {
    refreshLists();
  }, [activeType, activeRating]);

  const handleFilterChange = (ratingState: string, type: string) => {
    setActiveRating(ratingState);
    setActiveType(type);
  };

  return (
    <div className='home-list-container'>
      <p className='myList'>{t('fav.myList')}</p>
      <FavListFilter onFilterChange={handleFilterChange} />
      <ShowFavList filteredList={filteredMovieList} refreshList={refreshLists} />
    </div>
  )
}

export default HomeList
