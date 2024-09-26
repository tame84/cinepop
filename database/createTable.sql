DROP TABLE IF EXISTS cinema;
DROP TABLE IF EXISTS movies;

CREATE TABLE IF NOT EXISTS cinema (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
    title VARCHAR(255) NOT NULL,
    duration SMALLINT NOT NULL,
    schedules JSONB NOT NULL,
    genre JSONB,
    actors JSONB,
    director JSONB,
    synopsis TEXT,
    cinema_id INTEGER NOT NULL,
    FOREIGN KEY (cinema_id) REFERENCES cinema(id)
);