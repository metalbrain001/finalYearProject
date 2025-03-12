
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPosterFromTMDB(tmdbId: number | null) {
  if (!tmdbId) return null;

  try {
    const res = await fetch(`${BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    return data?.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
  } catch {
    return null;
  }
}