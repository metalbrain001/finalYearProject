CREATE TEMP TABLE tmp_posters (
    movie_id INTEGER,
    poster_url VARCHAR(200)
);

COPY tmp_posters FROM '/tmp/posters.csv' DELIMITER ',' CSV HEADER;

UPDATE core_movie
SET poster_url = tmp_posters.poster_url
FROM tmp_posters
WHERE core_movie.movie_id = tmp_posters.movie_id;

CREATE TABLE rented_movies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES core_movie(id) ON DELETE CASCADE,
    due_date DATE NOT NULL,
    rented_at TIMESTAMP DEFAULT NOW() NOT NULL,
    returned_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'rented',
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_rental UNIQUE (user_id, movie_id, rented_at)
);

-- Indexes for better query performance
CREATE INDEX idx_rented_movies_user_id ON rented_movies(user_id);
CREATE INDEX idx_rented_movies_movie_id ON rented_movies(movie_id);
CREATE INDEX idx_rented_movies_status ON rented_movies(status);
CREATE INDEX idx_rented_movies_due_date ON rented_movies(due_date);

SELECT id, title, status
FROM core_movie
WHERE id = 78406;

