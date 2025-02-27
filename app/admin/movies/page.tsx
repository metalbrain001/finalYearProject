import MovieList from "@/components/MovieList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-xl text-dark-4 font-poppins font-semibold">
          All movies
        </h1>
        <Button className="bg-blue-950" asChild>
          <Link href="/admin/movies/new" className="text-light-1">
            {" "}
            + Create a new Movie
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <p className="text-dark-3 text-sm">Table</p>
      </div>
    </section>
  );
};

export default page;
