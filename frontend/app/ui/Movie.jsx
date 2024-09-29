import Image from 'next/image';

export default function Movie({ movie }) {
    return (
        <div>
            <Image src={movie.poster_url} alt={`Poster du film ${movie.title}`} width={320} height={427} />
            <div>
                <h3>{movie.title}</h3>
                <p>Durée : {minutesToHours(movie.duration)}</p>
                <p>
                    {movie.genre.length > 1 ? 'Genres' : 'Genre'} : {movie.genre.join(', ')}
                </p>
                <p>Acteurs : {movie.actors.join(', ')}</p>
                <p>
                    {movie.director.length > 1 ? 'Réalisateurs' : 'Réalisateur'} : {movie.director.join(', ')}
                </p>
                <p>{movie.synopsis}</p>
            </div>
            <div>
                <a href={movie.cinema_url}>{movie.cinema}</a>
            </div>
            <div>
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
