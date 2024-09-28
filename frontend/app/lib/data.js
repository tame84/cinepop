import { client } from '@/app/lib/db';

export const fetchTodayMovie = async () => {
    await client.connect();

    const response = await client.query(
        'SELECT m.title, m.duration, m.genre, m.actors, m.director, m.synopsis, ms.hours FROM movies m JOIN movies_schedules ms ON m.id = ms.movie_id WHERE ms.date = CURRENT_DATE'
    );

    await client.end();

    return response.rows;
};
