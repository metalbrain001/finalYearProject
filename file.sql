CREATE TEMP TABLE tmp_posters (
    movie_id INTEGER,
    poster_url VARCHAR(200)
);

COPY tmp_posters FROM '/tmp/posters.csv' DELIMITER ',' CSV HEADER;

UPDATE core_movie
SET poster_url = tmp_posters.poster_url
FROM tmp_posters
WHERE core_movie.movie_id = tmp_posters.movie_id;
