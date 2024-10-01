import { client } from '../db.js';

export const addToDatabase = async (movies) => {
    try {
        await client.connect();

        await client.query('DELETE FROM movies_schedules');
        await client.query('DELETE FROM movies');

        for (const movie of movies) {
            const {
                title,
                duration,
                genre,
                director,
                releaseDate,
                originalLanguage,
                country,
                casting,
                synopsis,
                schedules,
                poster,
            } = movie;

            const movieSql = [
                title,
                duration,
                genre,
                director,
                releaseDate,
                originalLanguage,
                country,
                casting,
                synopsis,
                poster,
            ];
            let query =
                'INSERT INTO movies (title, duration, genre, director, release_date, original_language, country, casting, synopsis, poster) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING uuid';

            const response = await client.query(query, movieSql);
            const movieUuid = response.rows[0].uuid;

            query = 'INSERT INTO movies_schedules (date, schedules, movie_uuid) VALUES ($1, $2, $3)';

            for (const schedule of schedules) {
                const scheduleSql = [schedule.date, schedule.schedules, movieUuid];

                await client.query(query, scheduleSql);
            }
        }
    } catch (error) {
        console.error('Database Error :', error);
    } finally {
        await client.end();
    }
};
