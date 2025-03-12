ALTER TABLE core_movie ADD COLUMN status VARCHAR(20) DEFAULT 'available';

pg_dump -U metalbrain -d movie_recommendation -F c -f backup_before_alter.pgsql

CREATE TABLE rented_movies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES core_movie(id) ON DELETE CASCADE,
    tmdb_id INTEGER NOT NULL,
    movie_title VARCHAR(255) NOT NULL,
    poster_url TEXT,
    due_date DATE NOT NULL,
    rented_at TIMESTAMP DEFAULT NOW() NOT NULL,
    returned_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'rented',
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_rental_per_user UNIQUE (user_id, movie_id, status)
);

SELECT id, movie_id, tmdb_id, movie_title, poster_url, status, rented_at, due_date, returned_at
FROM rented_movies
WHERE user_id = '449d3d12-e79b-4523-b0e2-6c704926a132'
ORDER BY rented_at DESC;

ALTER TABLE rented_movies ADD COLUMN genres TEXT;

SELECT DISTINCT cm.*
FROM core_movie cm
JOIN rented_movies rm ON rm.movie_id = cm.id
WHERE rm.user_id = '497afe9d-baea-457e-846c-03e16892146b'
  AND cm.genres IN (
    SELECT genres FROM core_movie
    WHERE id IN (
      SELECT movie_id FROM rented_movies WHERE user_id = '497afe9d-baea-457e-846c-03e16892146b'
    )
  )
  AND cm.id NOT IN (
    SELECT movie_id FROM rented_movies WHERE user_id = '497afe9d-baea-457e-846c-03e16892146b'
  )
  AND cm.status = 'available'
LIMIT 10;

UPDATE core_movie
SET embedding = '[0.01, 0.02, ..., 0.99]'::vector WHERE id = 1;

SELECT id, embedding
FROM rented_movies
WHERE user_id = '497afe9d-baea-457e-846c-03e16892146b'
ORDER BY rented_at DESC
LIMIT 1;


