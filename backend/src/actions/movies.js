import { client } from '../db.js';

export const addMoviesToDatabase = async (movies) => {
    try {
        await client.connect();

        await client.query('DELETE FROM movies_schedules');
        await client.query('DELETE FROM movies');

        for (const { title, posterURL, duration, schedules, genre, actors, director, synopsis, cinemaId } of movies) {
            const sqlValues = [title, posterURL, duration, genre, actors, director, synopsis, cinemaId];

            const res = await client.query(
                'INSERT INTO movies (title, poster_url, duration, genre, actors, director, synopsis, cinema_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING uuid',
                sqlValues
            );
            const movieUUID = res.rows[0].uuid;

            for (const { date, hours } of schedules) {
                const sqlValues = [date, JSON.stringify(hours), movieUUID];

                await client.query(
                    'INSERT INTO movies_schedules (date, hours, movie_id) VALUES ($1, $2, $3)',
                    sqlValues
                );
            }
        }

        console.log('Finished to add movies to the database.');
    } catch (error) {
        console.error('Database Error :', error);
    } finally {
        await client.end();
    }
};

// export const addMoviesToDatabase = async (movies) => {
//     await client.connect();

//     try {
//         await client.query('DELETE FROM movies_schedules');
//         await client.query('DELETE FROM movies');

//         for (const { title, posterURL, duration, schedules, genre, actors, director, synopsis, cinemaId } of movies) {
//             const movieSQLValue = [title, posterURL, duration, genre, actors, director, synopsis, cinemaId];

//             await client.query(
//                 'INSERT INTO movies (title, poster_url, duration, genre, actors, director, synopsis, cinema_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
//                 movieSQLValue
//             );
//             const res = await client.query('SELECT id FROM movies WHERE title = $1', [title]);
//             const movieId = res.rows[0].id;

//             for (const { date, hours } of schedules) {
//                 const schedulesSQLValue = [date, JSON.stringify(hours), movieId];

//                 await client.query(
//                     'INSERT INTO movies_schedules (date, hours, movie_id) VALUES ($1, $2, $3)',
//                     schedulesSQLValue
//                 );
//             }
//         }

//         console.log('Movies are now in the database.');
//     } catch (error) {
//         console.error('Database Error :', error);
//     } finally {
//         await client.end();
//     }
// };
