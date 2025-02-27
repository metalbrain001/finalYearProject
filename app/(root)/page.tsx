import ChatBot from "@/components/ChatBot";
import MovieList from "@/components/MovieList";
import UploadedMoviesList from "@/components/UploadedMvList";

const Home = async () => {
  return (
    <>
      <UploadedMoviesList />
      <MovieList />
      <ChatBot />
    </>
  );
};

export default Home;
