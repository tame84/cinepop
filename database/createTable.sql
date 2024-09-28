DROP TABLE IF EXISTS movies_schedules;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS cinema;

CREATE TABLE IF NOT EXISTS cinema (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster_url VARCHAR(255) NOT NULL,
    duration SMALLINT NOT NULL,
    genre JSONB,
    actors JSONB,
    director JSONB,
    synopsis TEXT,
    cinema_id INTEGER NOT NULL,
    FOREIGN KEY (cinema_id) REFERENCES cinema(id)
);

CREATE TABLE IF NOT EXISTS movies_schedules (
    date DATE NOT NULL,
    hours JSONB NOT NULL,
    movie_id UUID NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(uuid)
);