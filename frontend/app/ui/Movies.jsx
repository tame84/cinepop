// import MoviesFilters from '@/app/ui/MoviesFilters';
import Movie from '@/app/ui/Movie';
import { fetchMoviesByDate, fetchTodayMovies } from '@/app/lib/data';
import { redirect } from 'next/navigation';

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
        <main>
            <aside>
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
                <select id="cinemaId" defaultValue="">
                    <option value="">Tous les cinémas</option>
                    <option value="1">Cinés Wellington</option>
                </select>
            </aside>
            <div>
                {movies && movies.length > 1 ? (
                    movies.map((movie) => <Movie key={movie.title} movie={movie} />)
                ) : (
                    <p>Il n'y a aucun films à voir pour le moment.</p>
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
