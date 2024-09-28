import fetchWellington from './cinemas/wellington.js';
import { addMoviesToDatabase } from './actions/movies.js';

const fetchMovies = async () => {
    // Modifier le système de scraping, trouver les films via "à l'affiche" et plus par "programmation", permet de récupérérer la poster
    const movies = await fetchWellington();

    addMoviesToDatabase(movies);
};
fetchMovies();
