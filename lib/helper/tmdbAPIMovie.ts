interface TMDBApiMovie {
  title: string;
  movie_id: number;
  tagline: string;
  poster_path: string;
  genres: { name: string }[];
  production_companies: { name: string }[];
  production_countries: { name: string }[];
  original_language: string;
  overview: string;
  imdb_id: string;
  tmdbId: number;
  vote_average: number;
  spoken_languages: { english_name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  vote_count: number;
}

export const flattenMovieMetadata = (movie: TMDBApiMovie) => {
  return {
    movie_id: movie.movie_id,
    movie_title: movie.title,
    tagline: movie.tagline,
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    // map genre to include id and name
    genres: movie.genres.map((g) => g.name).join(", "),
    production_companies: movie.production_companies.map((c) => c.name).join(", "),
    origin_countries: movie.production_countries.map((c) => c.name).join(", "),
    original_language: movie.original_language,

    spoken_languages: movie.spoken_languages.map((l) => l.english_name).join(", "),
    imdb_id: movie.imdb_id,
    tmdb_id: movie.tmdbId,
    vote_average: movie.vote_average,
    release_date: movie.release_date || null,
    revenue: movie.revenue,
    runtime: movie.runtime,
    status: movie.status,
    vote_count: movie.vote_count,
    description: movie.overview,
  };
};