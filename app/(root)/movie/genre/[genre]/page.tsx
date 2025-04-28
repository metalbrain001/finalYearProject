// // app/genre/[genre]/page.tsx
import { getMoviesByGenre } from "@/lib/actions/getMovieByGenre";
import GenreCard from "@/components/GenreCard";

interface GenreMoviesPageProps {
  params: Promise<{ genre: string }>;
  searchParams?: Promise<{ page?: string }>;
}

const GenreMoviesPage = async ({
  params,
  searchParams,
}: GenreMoviesPageProps) => {
  const resolvedParams = await searchParams; // Resolve searchParams
  const genre = (await params).genre.replace("-", " ");
  const currentPage = parseInt(resolvedParams?.page || "1");
  const movies = await getMoviesByGenre({
    genres: genre,
    page: currentPage,
    limit: 12,
  });

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold capitalize">🎬 {genre} Movies</h1>
      <p className="text-gray-400 mb-4">
        Browse movies in the {genre} category.
      </p>

      {movies.length === 0 ? (
        <p className="text-gray-500">No movies found for {genre}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <GenreCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_url={movie.poster_url}
              status={movie.status}
              imdb_id={String(movie?.imdb_id)}
            />
          ))}
        </div>
      )}

      {/* Simple Pagination */}
      <div className="flex justify-center items-center mt-8 gap-4">
        {currentPage > 1 && (
          <a
            href={`?page=${currentPage - 1}`}
            className="px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-700"
          >
            Previous
          </a>
        )}
        {movies.length === 12 && (
          <a
            href={`?page=${currentPage + 1}`}
            className="px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-700"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
};

export default GenreMoviesPage;
