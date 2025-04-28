import MovieForm from "@/components/admin/forms/MovieForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/movies" className="text-light-1">
          {" "}
          Go Back
        </Link>
      </Button>
      <section className="w-full rounded-2xl bg-dashboard p-7">
        <MovieForm
          type="create"
          title=""
          genres=""
          director=""
          plot=""
          posterUrl=""
          runtime={1}
          actors=""
          cast={[]}
          description=""
        />
      </section>
    </>
  );
};

export default page;
