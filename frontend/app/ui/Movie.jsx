import Image from 'next/image';
import styles from '@/app/ui/styles/movie.module.scss';

export default function Movie({ movie }) {
    return (
        <div className={styles.movie}>
            <Image src={movie.poster_url} alt={`Poster du film ${movie.title}`} width={320} height={427} />
            <div className={styles.details}>
                <h3>{movie.title}</h3>
                {movie.genre.map((genre) => (
                    <span key={genre} className={styles.tags}>
                        {genre}
                    </span>
                ))}
                <br />
                <br />
                <p>
                    <span>Durée</span> : {minutesToHours(movie.duration)}
                </p>

                <p>
                    <span>Acteurs</span> : {movie.actors.join(', ')}
                </p>
                <p>
                    <span>{movie.director.length > 1 ? 'Réalisateurs' : 'Réalisateur'}</span> :{' '}
                    {movie.director.join(', ')}
                </p>
                <p className={styles.synopsis}>{movie.synopsis}</p>
            </div>
            <div className={styles.cinemas}>
                <div>
                    <a href={movie.cinema_url} target="_blank">
                        {movie.cinema}
                    </a>
                </div>
            </div>
            <div className={styles.hours}>
                <ul>
                    {movie.hours.map((hour) => (
                        <li key={hour}>{hour}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;

    return `${hours}h${rest.toString().padStart(2, '0')}`;
};
