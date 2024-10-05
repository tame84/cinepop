import { pool } from '@/app/lib/db';

export const fetchMovies = async (date) => {
    try {
        const query =
            'SELECT m.title, m.duration, m.genre, m.director, m.original_language, m.casting, m.synopsis, m.poster, ms.schedules FROM movies m JOIN movies_schedules ms ON m.uuid = ms.movie_uuid WHERE ms.date = $1';

        const response = await pool.query(query, [date]);

        return response.rows;
    } catch (error) {
        console.error('Database Error :', error);
        throw error;
    }
};
