import getWellingtonMovies from './cinemas/wellington.js';
import { addMoviesToDatabase } from './actions/movies.js';

const fetchMovies = async () => {
    const cinemasMovies = await Promise.all([getWellingtonMovies()]);

    for (const cinemaMovies of cinemasMovies) {
        addMoviesToDatabase(cinemaMovies);
    }
};
fetchMovies();
