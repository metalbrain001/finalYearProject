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

CREATE TABLE pref (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    genres TEXT NOT NULL,
    languages TEXT NOT NULL,
    mood_tags TEXT NOT NULL,
    age_rating TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_pref UNIQUE (user_id, movie_id)
);

CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE fcmTokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_fcm_token UNIQUE (user_id, token)
);

-- Indexes for better query performance
CREATE INDEX idx_rented_movies_user_id ON rented_movies(user_id);
CREATE INDEX idx_rented_movies_movie_id ON rented_movies(movie_id);
CREATE INDEX idx_rented_movies_status ON rented_movies(status);
CREATE INDEX idx_rented_movies_due_date ON rented_movies(due_date);

SELECT id, title, status
FROM core_movie
WHERE id = 78406;

SELECT DISTINCT rm.genres
FROM movie_feedback mf
JOIN rented_movies rm ON mf.movie_id = rm.movie_id
WHERE mf.user_id = $user_id AND mf.feedback_type = 'like';

SELECT *
FROM rented_movies
WHERE user_id != $user_id
  AND genres IS NOT NULL
  AND (
    -- Match if any liked genre is found
    genres ILIKE ANY (ARRAY[
      '%Drama%', '%Crime%', '%Thriller%',
      '%Comedy%', '%Family%', '%Romance%'
    ])
  )
  AND movie_id NOT IN (
    SELECT movie_id
    FROM movie_feedback
    WHERE user_id = $user_id
  )
LIMIT 10;


SELECT *
FROM rented_movies
WHERE embedding IS NOT NULL
  AND movie_id NOT IN (
    SELECT movie_id
    FROM movie_feedback
    WHERE user_id = $user_id
  )
ORDER BY embedding <-> (
  SELECT embedding
  FROM rented_movies rm
  JOIN movie_feedback mf ON mf.movie_id = rm.movie_id
  WHERE mf.user_id = $user_id AND mf.feedback_type = 'like'
  ORDER BY mf.created_at DESC
  LIMIT 1
)
LIMIT 10;

SELECT * FROM movie_feedback
WHERE user_id = '449d3d12-e79b-4523-b0e2-6c704926a132' AND feedback_type = 'like'
ORDER BY created_at DESC
LIMIT 1;
