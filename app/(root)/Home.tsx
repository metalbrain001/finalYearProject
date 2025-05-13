import React from "react";
import ChatBot from "@/components/ChatBot";
import GenreSectionWithPagination from "@/components/GenreSecPag";
import GenreSection from "@/components/GenreSection";
import MovieList from "@/components/MovieList";
import TopRatedMovies from "@/components/MovieSegment";
import UploadedMoviesList from "@/components/UploadedMvList";
import { hasPreferences } from "@/lib/helper/checkUserPreferences";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <UploadedMoviesList />
      <GenreSectionWithPagination genre="Action" />
      <GenreSectionWithPagination genre="Drama" />
      <GenreSectionWithPagination genre="Comedy" />
      {/* <TopRatedMovies /> */}
      {/* <MovieList /> */}
      <ChatBot />
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
};

export default Home;
