CREATE TABLE IF NOT EXISTS  movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    poster_path VARCHAR(10000),
    overview VARCHAR(10000)

);
