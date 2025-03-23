import { getUploadedMovies } from "@/lib/actions/getUploadedMv";
import { auth } from "@/auth";
import Icons from "@/components/UseIcons";
import { IKImage } from "imagekitio-next";
import { imageKitUrl } from "@/types";

const UploadedMoviesList = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const { Clapperboard } = Icons();

  if (!userId)
    return (
      <p className="text-gray-500">Sign in to see your uploaded movies.</p>
    );

  const uploadedMovies = await getUploadedMovies(userId);

  return (
    <section className="px-6 py-8 space-y-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="text-2xl font-poppins text-gray-300 font-semibold">
            Hey {session?.user?.name}!
          </p>
          <div className="flex items-center mt-4 gap-2">
            <p className="text-gray-500 text-2xl font-poppins font-semibold">
              Browse Over 80,000 Movies & TV Shows
            </p>
            <Clapperboard
              size={64}
              color="white"
              fill="black"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {uploadedMovies.length > 0 ? (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedMovies.map((movie) => (
            <li key={movie.id} className="p-4 rounded-lg shadow-lg">
              {/* <p className="text-lg font-bold">{movie.title}</p> */}
              <div className="flex justify-between items-center">
                {/* <img
                  src={`https://ik.imagekit.io/metalbrainimage/${movie.posterUrl} `}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                /> */}
              </div>
              {/* <p className="text-gray-500">{movie.genres}</p>
              <p className="text-gray-500 text-sm">{movie.movie_year}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No movies uploaded yet.</p>
      )}
    </section>
  );
};

export default UploadedMoviesList;
