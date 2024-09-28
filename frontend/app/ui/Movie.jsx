export default function Movie({ movie }) {
    console.log(movie.genre);

    return (
        <div>
            <h3>{movie.title}</h3>
        </div>
    );
}
