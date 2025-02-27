import React from "react";
import { useGetMovieById } from "@/hooks/use-getmovieid";
import { useParams } from "next/navigation";
import Icons from "@/components/UseIcons";
import Trailer from "./Trailer";
import StarRating from "./StarRating";
import useMovieTrailer from "@/hooks/use-gettrailer";
import BudgetDisplay from "./BudgetDisplay";
import CastList from "./CastList";
import useMovieCast from "@/hooks/use-getcast";

const MovieOverView = () => {
  const { id } = useParams();
  const { movieDetails, loading, error } = useGetMovieById(String(id));
  const { CalendarDays, Ban, Baby, Ghost } = Icons();
  const { trailer, loading: trailerLoading } = useMovieTrailer(String(id));

  const { cast, loading: castLoading } = useMovieCast(String(id));

  console.log("Movie Details:", movieDetails);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ✅ Left Side: Trailer */}
        <div className="max-w-xl">
          {trailer ? (
            <Trailer />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
              className="w-[100%] h-[80%] rounded-lg object-cover shadow-lg"
            />
          )}
        </div>

        {/* ✅ Right Side: Movie Metadata */}
        <div className="flex flex-col gap-4 text-white">
          {/* ✅ Movie Title */}
          <h1 className="text-3xl font-bold">{movieDetails?.title}</h1>

          {/* ✅ Movie Rating & Votes */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-yellow-400">
              {/* <Star size={24} strokeWidth={2} color="gold" fill="gold" /> */}
              <StarRating />
              <span className="text-lg">
                {movieDetails?.vote_average.toFixed(1)} / 10
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <p className="text-lg">Votes:</p>
              <Ghost size={24} strokeWidth={2} color="blue" fill="blue" />
              <span>{movieDetails?.vote_count} votes</span>
            </div>
          </div>

          {/* ✅ Genre List */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-poppins text-lg">Genres:</span>
            {movieDetails?.genres?.map((genre: { name: string }) => (
              <span
                key={genre.name}
                className="bg-gray-800 px-3 py-1 text-sm rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* ✅ Adult Content Warning */}
          <div className="flex items-center gap-2">
            {movieDetails?.adult ? (
              <Ban size={28} color="red" strokeWidth={3} />
            ) : (
              <Baby size={28} color="yellow" strokeWidth={3} />
            )}
            <span>
              {movieDetails?.adult ? "18+ Adult Content" : "Family Friendly"}
            </span>
          </div>
          {/* ✅ Budget & Revenue */}
          {/* ✅ Budget Display */}
          <BudgetDisplay
            budget={movieDetails?.budget}
            productionCountries={movieDetails?.production_countries}
          />
          {/* ✅ Release Date & Runtime */}
          <div className="flex items-center gap-2">
            <CalendarDays size={32} color="blue" strokeWidth={3} />
            <span className="text-gray-300 text-lg font-poppins">
              {movieDetails?.release_date} ({movieDetails?.runtime} mins)
            </span>
          </div>
          {/* ✅ Production Companies & Countries */}
          <div className="flex flex-col gap-4">
            {/* ✅ Production Companies with Logos */}
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-300">
                Production Companies:
              </h3>
              {movieDetails?.production_companies?.map((company) =>
                company.logo_path ? ( // ✅ Ensure logo exists
                  <div key={company.id} className="flex items-center gap-2">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="w-16 h-16 rounded-md object-contain bg-gray-900 p-1"
                    />
                    <span className="text-gray-300 text-sm">
                      {company.name}
                    </span>
                  </div>
                ) : (
                  <span key={company.id} className="text-gray-400 text-sm">
                    {company.name}
                  </span>
                )
              )}
            </div>
            {/* ✅ Production Countries with Flags */}
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-300">
                Countries:
              </h3>
              {movieDetails?.production_countries?.map((country) => (
                <div
                  key={country.iso_3166_1}
                  className="flex items-center gap-2"
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.iso_3166_1.toLowerCase()}.png`} // ✅ Better Flag API
                    alt={country.name}
                    className="w-10 h-6 rounded-md object-cover"
                  />
                  <span className="text-gray-300 text-sm">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Movie Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-b-gray-600 shadow-lg">
        <div className="items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-4xl">🎬</span>
            <h2 className="text-3xl font-semibold text-slate-400">Overview</h2>
          </div>
          <p className="text-gray-300 font-poppins mt-2">
            {movieDetails?.overview}
          </p>
        </div>
        <div className="items-center gap-2">
          <h2 className="text-3xl font-semibold text-slate-400">Cast</h2>
          <div className="flex items-center gap-2">
            <CastList cast={cast} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieOverView;
