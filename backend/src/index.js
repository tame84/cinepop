import fetchWellington from './cinemas/wellington.js';
import { addMoviesToDatabase } from './actions/movies.js';

const fetchMovies = async () => {
    const movies = await fetchWellington();

    addMoviesToDatabase(movies);
};
fetchMovies();
