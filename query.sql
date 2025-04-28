SELECT COUNT(*) AS total_rented
FROM rented_movies;

/** Select All movies in core_movie table. use count(*) to get the total number of movies */
SELECT COUNT(*) AS total_movies
FROM core_movie;

SELECT
  DATE_TRUNC('day', rented_at) AS rented_day,
  COUNT(*) AS total_rented
FROM rented_movies
GROUP BY rented_day
ORDER BY rented_day ASC;

SELECT
  DATE_TRUNC('day', rented_at) AS rented_day,
  COUNT(*) AS total_rented
FROM rented_movies
WHERE DATE_TRUNC('day', rented_at) >= DATE_TRUNC('day', NOW() - INTERVAL '30 days')
GROUP BY rented_day
ORDER BY rented_day ASC;

SELECT
  movie_title,
  COUNT(*) AS total_rentals
FROM rented_movies
GROUP BY movie_title
ORDER BY total_rentals DESC;
--
SELECT
  movie_title,
  DATE_TRUNC('month', rented_at) AS rented_month,
  COUNT(*) AS total_rentals
FROM rented_movies
GROUP BY movie_title, rented_month
ORDER BY rented_month ASC, total_rentals DESC;

/** Select a user and role by id
SELECT id,role FROM registrations WHERE id = 2e13eb9e-c59c-4ca9-a36d-fb753c4bcfe4;

