import React from 'react'
import './SearchResults.css'
import MovieCard from './MovieCard';
import { Box, Skeleton, Pagination } from "@mui/material";

interface ShowMoviesProps {
  movies: any[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const SearchResults: React.FC<ShowMoviesProps> = ({
  movies,
  loading,
  error,
  page,
  totalPages,
  onPageChange
}) => {
  return (
    <div className="search-container">
      {loading ? (
        <div className="skeleton-grid">
          {[...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={250}
              height={300}
              sx={{
                bgcolor: 'grey.700',
                borderRadius: '8px'
              }}
            />
          ))}
        </div>
      ) : (

        <div className="search-results-container">
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={totalPages}
            page={page}
            onChange={onPageChange}
          />
        </Box>
      )}

    </div>
  )
}

export default SearchResults;
