import { getMoviesByGenre } from "@/lib/actions/getMovieByGenre";
import Link from "next/link";
import { defaultPoster } from "@/constants";

const GenreMoviesPage = async ({
  params,
}: {
  params: Promise<{ genre: string }>;
}) => {
  const genre = (await params)?.genre.replace("-", " ");

  // decodeURIComponent(params.genre).replace("-", " ");

  console.log("🔍 Genre received:", genre);

  const movies = await getMoviesByGenre({ genres: genre });

  if (!movies || movies.length === 0) {
    console.error(`❌ No movies found for genre: ${genre}`);
    return <p className="text-gray-400">No movies found for {genre}.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-200 capitalize">
        🎬 {genre} Movies
      </h1>
      <p className="text-gray-400">Browse movies in the {genre} category.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <div key={movie.id} className="rounded-lg">
            <Link href={`/movie/${movie.id}`}>
              <img
                src={movie.poster_url || defaultPoster}
                alt={movie.title}
                className="rounded-lg w-full"
              />
            </Link>
            <h3 className="text-lg font-semibold mt-2 text-light-400">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreMoviesPage;
