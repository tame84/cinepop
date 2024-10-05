DROP TABLE IF EXISTS movies_schedules;
DROP TABLE IF EXISTS movies;

CREATE TABLE IF NOT EXISTS movies (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration SMALLINT,
    genre JSON,
    director JSON,
    release_date DATE,
    original_language VARCHAR(255),
    country VARCHAR(255),
    casting JSON,
    synopsis TEXT,
    poster JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS movies_schedules (
    date DATE NOT NULL,
    schedules JSON NOT NULL,
    movie_uuid UUID NOT NULL,
    FOREIGN KEY (movie_uuid) REFERENCES movies(uuid)
);