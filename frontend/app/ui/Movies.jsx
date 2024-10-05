import { fetchMovies } from '@/app/lib/data';
import DateSelector from '@/app/ui/DateSelector';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/app/ui/Modal';

export default async function Movies({ searchParams }) {
    const selectedDate = searchParams?.date || new Date().toISOString().split('T')[0];
    const movies = await fetchMovies(selectedDate);

    return (
        <main>
            <DateSelector />
            <div className="movies">
                {movies.length > 0 ? (
                    movies.map((movie) => <Movie key={movie} movie={movie} />)
                ) : (
                    <p>Il n'y a aucun films à voir pour le moment.</p>
                )}
            </div>
        </main>
    );
}

const Movie = ({ movie }) => {
    return (
        <article>
            <div className="content">
                <div className="poster" style={{ width: 200 }}>
                    <Image
                        src={movie.poster.url}
                        alt={movie.poster.alt}
                        width={360}
                        height={514}
                        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="infos">
                    <h2>{movie.title}</h2>
                    <ul className="genres">
                        {movie.genre && movie.genre.map((genre) => <li key={genre}>{genre}</li>)}
                    </ul>
                    <div className="details">
                        {movie.duration && <span>{minutesToHours(movie.duration)}</span>}
                        {movie.director && <span>{movie.director.join(', ')}</span>}
                        {movie.original_language && <span>{movie.original_language}</span>}
                        {movie.casting && <p>{movie.casting.join(', ')}</p>}
                        {movie.synopsis && <p>{movie.synopsis}</p>}
                    </div>
                </div>
            </div>
            <Modal schedules={movie.schedules} />
        </article>
    );
};

const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;

    return `${hours}h${rest.toString().padStart(2, '0')}`;
};
