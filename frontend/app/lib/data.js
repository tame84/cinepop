import { pool } from '@/app/lib/db';

export const fetchTodayMovies = async () => {
    try {
        const res = await pool.query(
            'SELECT m.title, m.poster_url, m.duration, m.genre, m.actors, m.director, m.synopsis, ms.hours, c.name AS cinema, c.url AS cinema_url FROM movies m JOIN movies_schedules ms ON m.uuid = ms.movie_id JOIN cinema c ON m.cinema_id = c.id WHERE ms.date = CURRENT_DATE'
        );
        return res.rows;
    } catch (error) {
        console.error('Fetching Error :', error);
        throw error;
    }
};

export const fetchMoviesByDate = async (date) => {
    try {
        const res = await pool.query(
            'SELECT m.title, m.poster_url, m.duration, m.genre, m.actors, m.director, m.synopsis, ms.hours, c.name AS cinema, c.url AS cinema_url FROM movies m JOIN movies_schedules ms ON m.uuid = ms.movie_id JOIN cinema c ON m.cinema_id = c.id WHERE ms.date = $1',
            [date]
        );
        return res.rows;
    } catch (error) {
        console.error('Fetching Error :', error);
        throw error;
    }
};
