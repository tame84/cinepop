import Movie from '@/app/ui/Movie';
import { fetchMoviesByDate, fetchTodayMovies } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import styles from '@/app/ui/styles/movies.module.scss';

export default async function Movies({ searchParams }) {
    const dates = getWeek();
    const selectedDate = searchParams?.date || null;
    const movies = selectedDate ? await fetchMoviesByDate(selectedDate) : await fetchTodayMovies();

    const handleChangeDate = async (formData) => {
        'use server';
        const date = formData.get('dateValue');
        redirect(`/?date=${date}`);
    };

    return (
        <main className={styles.main}>
            <aside className={styles.aside}>
                <h2>
                    Projections du{' '}
                    <span>
                        {selectedDate
                            ? new Date(selectedDate).toLocaleDateString('fr-FR', { month: 'long', day: '2-digit' })
                            : new Date().toLocaleDateString('fr-FR', { month: 'long', day: '2-digit' })}
                    </span>
                </h2>
                <ul>
                    {dates.map((date) => (
                        <li key={date.value}>
                            <form action={handleChangeDate}>
                                <input hidden name="dateValue" value={date.value} readOnly />
                                <button type="submit">{date.displayName}</button>
                            </form>
                        </li>
                    ))}
                </ul>
            </aside>
            <div className={styles.movies}>
                {movies && movies.length > 1 ? (
                    movies.map((movie) => <Movie key={movie.title} movie={movie} />)
                ) : (
                    <div className={styles.noMovies}>
                        <p>Il n'y a aucun films à voir pour le moment.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

const getWeek = () => {
    const dates = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dateISO = date.toISOString().split('T')[0];
        const dateLocale = date.toLocaleDateString('fr-FR', {
            month: 'short',
            day: '2-digit',
        });
        dates.push({ value: dateISO, displayName: dateLocale });
        console.log();
    }

    return dates;
};
