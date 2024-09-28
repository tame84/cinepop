import { client } from '@/app/lib/db';

export const fetchTodayMovies = async () => {
    try {
        await client.connect();

        const res = await client.query(
            'SELECT m.title, m.poster_url, m.duration, m.genre, m.actors, m.director, m.synopsis, ms.hours FROM movies m JOIN movies_schedules ms ON m.uuid = ms.movie_id WHERE ms.date = CURRENT_DATE'
        );
        return res.rows;
    } catch (error) {
        console.error('Fetching Error :', error);
    } finally {
        await client.end();
    }
};
