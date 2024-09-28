import MoviesFilters from '@/app/ui/MoviesFilters';
import Movie from '@/app/ui/Movie';
import { fetchTodayMovies } from '@/app/lib/data';

export default async function Movies() {
    const movies = await fetchTodayMovies();

    return (
        <main>
            <MoviesFilters />
            <div>
                {movies.map((movie) => (
                    <Movie key={movie.title} movie={movie} />
                ))}
            </div>
        </main>
    );
}
