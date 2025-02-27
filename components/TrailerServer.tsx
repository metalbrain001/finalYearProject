import { fetchTrailer } from "@/lib/actions/getTrailer";
import Trailer from "./Trailer"; // ✅ Ensure correct import (Client Component)

interface TrailerServerProps {
  movieId: string;
}

const TrailerServer = async ({ movieId }: TrailerServerProps) => {
  console.log(
    `🔍 Fetching trailer in Server Component for movieId: ${movieId}`
  );
  const trailer = await fetchTrailer({ movieId });

  return <Trailer trailer={trailer} />;
};

export default TrailerServer;
