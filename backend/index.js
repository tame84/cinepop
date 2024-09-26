import { client } from './db.js';
import fetchWellington from './cinemas/wellington.js';

const fetchMovies = async () => {
    const movies = await fetchWellington();

    await client.connect();

    for (const { title, duration, schedules, genre, actors, director, synopsis, cinema_id } of movies) {
        try {
            const sqlValues = [title, duration, schedules, genre, actors, director, synopsis, cinema_id];

            const query =
                'INSERT INTO movies (title, duration, schedules, genre, actors, director, synopsis, cinema_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

            await client.query(query, sqlValues);

            console.log('End of the request for the movie');
        } catch (error) {
            console.error('Database Error :', error);
        }
    }

    await client.end();
};
fetchMovies();
