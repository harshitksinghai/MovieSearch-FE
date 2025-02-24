import { MovieItem } from '../utils/storage';
import MovieCard from './MovieCard';

const ShowFavList = (props: {filteredList: MovieItem[]}) => {
    return (
        <div className="search-container">

        <div className="search-results-container">
          <div className="movies-grid">
            {props.filteredList.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
        </div>
    );
}

export default ShowFavList;
