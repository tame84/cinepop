import { pool } from '@/app/lib/db';

export const fetchTodayMovies = async () => {
    try {
        const response = await pool.query(
            'SELECT m.title, m.duration, m.genre, m.director, m.original_language, m.casting, m.synopsis, m.poster, ms.schedules FROM movies m JOIN movies_schedules ms ON m.uuid = ms.movie_uuid WHERE ms.date = CURRENT_DATE'
        );

        return response.rows;
    } catch (error) {
        console.error('Database Error :', error);
        throw error;
    }
};
