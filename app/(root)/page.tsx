import ChatBot from "@/components/ChatBot";
import GenreSectionWithPagination from "@/components/GenreSecPag";
import GenreSection from "@/components/GenreSection";
import MovieList from "@/components/MovieList";
import TopRatedMovies from "@/components/MovieSegment";
import UploadedMoviesList from "@/components/UploadedMvList";

const Home = async () => {
  return (
    <>
      <UploadedMoviesList />
      <GenreSectionWithPagination genre="Action" />
      <GenreSectionWithPagination genre="Drama" />
      <GenreSectionWithPagination genre="Comedy" />
      {/* <TopRatedMovies /> */}
      {/* <MovieList /> */}
      <ChatBot />
    </>
  );
};

export default Home;
