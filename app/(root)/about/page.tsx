// This file is part of the Movie Recommender project.
import Image from "next/image";
import { Metadata } from "next";
import { openSourceLogos } from "@/constants";

export const metadata: Metadata = {
  title: "Credits & Attribution | Movie Recommender",
  description:
    "Attribution and acknowledgements for data sources, APIs, and open-source libraries.",
  robots: "noindex",
};

const AboutPage = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Credits & Attribution</h1>

      <div className="space-y-5 text-base leading-7 text-gray-400">
        <p>
          This project is built as part of a final year Computer Science course
          to explore hybrid movie recommendation techniques using both
          collaborative and content-based filtering. It integrates real-world
          datasets and modern web technologies to demonstrate a production-grade
          recommendation workflow.
        </p>

        {/* ✅ TMDB Attribution */}
        <div className="flex items-center gap-4 mt-6">
          <Image
            src="/images/tmdb.svg"
            alt="TMDB Logo"
            width={120}
            height={100}
            className="opacity-90"
            style={{ objectFit: "contain" }}
          />
          <p className="text-sm">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
        <p>
          The TMDB API was used to enrich movie metadata including titles,
          genres, cast, crew, runtime, and visual posters. Learn more at{" "}
          <a
            href="https://www.themoviedb.org/about/logos"
            className="underline text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB Branding Guidelines
          </a>
          .
        </p>

        {/* ✅ Kaggle */}
        <p>
          The base dataset for this system was sourced from the{" "}
          <a
            href="https://www.kaggle.com/datasets/grouplens/movielens-20m-dataset"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            MovieLens 20M Dataset on Kaggle
          </a>
          . This dataset provided collaborative filtering inputs (user ratings,
          tags, and movie IDs).
        </p>

        {/* ✅ Open Source Libraries with Logos + Description */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Open Source Libraries Used
          </h2>
          <div className="space-y-4">
            {openSourceLogos.map((tool) => (
              <div key={tool.name} className="flex items-start gap-4">
                <Image
                  src={tool.logo}
                  alt={`${tool.name} Logo`}
                  width={46}
                  height={46}
                  className="object-contain mt-1"
                />
                <div>
                  <p className="text-sm text-white font-medium">{tool.name}</p>
                  <p className="text-sm text-gray-400">{tool.desc}</p>
                  {tool.href && (
                    <a
                      href={tool.href}
                      className="underline text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm">Learn more</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Acknowledgement Note */}
        <p className="pt-6 italic text-sm text-gray-500">
          This app was developed for academic demonstration only. All API usage,
          branding, and open-source software fall under their respective
          licenses and usage policies.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
