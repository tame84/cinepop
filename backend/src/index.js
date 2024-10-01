import cron from 'node-cron';
import scrapeMovies from './scrape.js';
import { addToDatabase } from './actions/movies.js';

cron.schedule('0 0 * * *', async () => {});

console.log('Daily scraping started...');
const movies = await scrapeMovies();
await addToDatabase(movies);
console.log('Daily scraping finished.');
