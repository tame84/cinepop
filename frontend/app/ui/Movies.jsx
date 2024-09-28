import MoviesFilters from '@/app/ui/MoviesFilters';
import Movie from '@/app/ui/Movie';
import { fetchTodayMovie } from '@/app/lib/data';

export default async function Movies() {
    const movies = await fetchTodayMovie();

    return (
        <main>
            <MoviesFilters />
            {movies.map((movie) => (
                <Movie key={movie.title} movie={movie} />
            ))}
        </main>
    );
}
