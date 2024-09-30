import cron from 'node-cron';
import scrapeMovies from './scrape.js';
import getWellingtonMovies from './cinemas/wellington.js';
import { addMoviesToDatabase } from './actions/movies.js';

const fetchMovies = async () => {
    const cinemasMovies = await Promise.all([getWellingtonMovies()]);

    for (const cinemaMovies of cinemasMovies) {
        addMoviesToDatabase(cinemaMovies);
    }
};

cron.schedule('0 0 * * *', () => {
    console.log('Daily scraping started...');
    fetchMovies();
});

scrapeMovies();
