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
  const resolvedParams = await searchParams; // ✅ safest way for App Router
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

// import { getMoviesByGenre } from "@/lib/actions/getMovieByGenre";
// import Link from "next/link";
// import { defaultPoster } from "@/constants";

// const GenreMoviesPage = async ({
//   params,
// }: {
//   params: Promise<{ genre: string }>;
// }) => {
//   const genre = (await params)?.genre.replace("-", " ");

//   const movies = await getMoviesByGenre({ genres: genre });

//   if (!movies || movies.length === 0) {
//     console.error(`❌ No movies found for genre: ${genre}`);
//     return <p className="text-gray-400">No movies found for {genre}.</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-200 capitalize">
//         🎬 {genre} Movies
//       </h1>
//       <p className="text-gray-400">Browse movies in the {genre} category.</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//         {movies.map((movie) => (
//           <div key={movie.id} className="rounded-lg">
//             <Link href={`/movie/${movie.id}`}>
//               <img
//                 src={movie.poster_url || defaultPoster}
//                 alt={movie.title}
//                 className="rounded-lg w-full"
//               />
//             </Link>
//             <h3 className="text-lg font-semibold mt-2 text-light-400">
//               {movie.title}
//             </h3>
//             <p className="text-sm text-gray-400">{movie.status}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GenreMoviesPage;
