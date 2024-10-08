import { fetchMovies } from '@/app/lib/data';
import DateSelector from '@/app/ui/DateSelector';
import Image from 'next/image';
import Modal from '@/app/ui/Modal';
import styles from '@/app/ui/styles/modules/movies.module.scss';

export default async function Movies({ searchParams }) {
    const selectedDate = searchParams?.date || new Date().toISOString().split('T')[0];
    const movies = await fetchMovies(selectedDate);

    return (
        <main id="movies">
            <DateSelector selectedDate={selectedDate} />
            <div className={styles.movies}>
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
        <article className={styles.movie}>
            <div className={styles.content}>
                <div className={styles.poster} style={{ width: 200 }}>
                    <Image
                        src={movie.poster.url}
                        alt={movie.poster.alt}
                        width={360}
                        height={514}
                        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                    />
                    <Modal schedules={movie.schedules} />
                </div>
                <div className={styles.infos}>
                    <h2>{movie.title}</h2>
                    <ul>{movie.genre && movie.genre.map((genre) => <li key={genre}>{genre}</li>)}</ul>
                    <div>
                        <div className={styles.details}>
                            {movie.duration && (
                                <span className={styles.duration}>{minutesToHours(movie.duration)}</span>
                            )}
                            {movie.director && <span className={styles.director}>{movie.director.join(', ')}</span>}
                            {movie.original_language && (
                                <span className={styles.originalLanguage}>{movie.original_language}</span>
                            )}
                        </div>
                        {movie.casting && <p className={styles.casting}>{movie.casting.join(', ')}</p>}
                        {movie.synopsis && <p className={styles.synopsis}>{movie.synopsis}</p>}
                    </div>
                </div>
                <Modal id="pc-modal" schedules={movie.schedules} />
            </div>
        </article>
    );
};

const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;

    return `${hours}h${rest.toString().padStart(2, '0')}`;
};
