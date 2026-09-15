"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Film, Star } from "lucide-react";
import { motion } from "framer-motion";

import { useMovie } from "@/lib/hooks/useMovie";
import { useRecommendations } from "@/lib/hooks/useRecommendations";
import { getPosterUrl } from "@/utils/image";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { use, useState } from "react";

interface MovieDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = use(params);
const { data: movie, isLoading, isError } = useMovie(id);
  const [posterError, setPosterError] = useState(false);

  const {
    data: recommendations,
    isLoading: recommendationsLoading,
  } = useRecommendations(id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0705] px-6 pb-20 pt-28 text-[#F4ECE1] md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="h-4 w-28 animate-pulse rounded bg-[#C9A66B]/15" />

          <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr]">
            <div className="aspect-[2/3] animate-pulse rounded-sm bg-white/5" />

            <div className="space-y-5 py-6">
              <div className="h-14 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-white/5" />
              <div className="h-24 w-full max-w-2xl animate-pulse rounded bg-white/5" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0A0705] px-6 text-center text-[#F4ECE1]">
        <div>
          <Film className="mx-auto h-10 w-10 text-[#C9A66B]/40" />

          <h1 className="mt-6 font-serif text-3xl italic">
            Movie not found
          </h1>

          <p className="mt-2 text-[#F4ECE1]/40">
            We couldn&apos;t load this one.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#C9A66B]/40 px-6 py-3 text-sm font-medium tracking-wide text-[#C9A66B] transition hover:bg-[#C9A66B]/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to discover
          </Link>
        </div>
      </main>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const genres = movie.genres
    ? movie.genres.split(",").map((genre) => genre.trim())
    : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0705] text-[#F4ECE1]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-0 h-[700px] w-[700px] opacity-15 blur-3xl">
        {posterError ? (
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black px-6 text-center">
            <Film className="h-10 w-10 text-white/30" />

            <p className="mt-4 text-sm font-medium text-white/60">
            {movie.title}
            </p>

            <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
            StreamFlix
            </span>
        </div>
        ) : (
        <Image
            src={getPosterUrl(movie.poster_path, "w780")}
            alt={movie.title}
            fill
            priority
            sizes="(max-width: 768px) 280px, 320px"
            className="object-cover"
            onError={() => setPosterError(true)}
        />
        )}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,166,107,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0705]/40 via-[#0A0705]/70 to-[#0A0705]" />
      </div>

      <div className="relative z-10 px-6 pb-20 pt-28 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#F4ECE1]/40 transition hover:text-[#C9A66B]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to discover
          </Link>

          {/* Movie */}
          <section className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[2/3] overflow-hidden rounded-sm border border-[#C9A66B]/20 bg-[#1C0E10] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
            >
              {posterError ? (
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black px-6 text-center">
                    <Film className="h-10 w-10 text-white/30" />

                    <p className="mt-4 text-sm font-medium text-white/60">
                    {movie.title}
                    </p>

                    <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
                    StreamFlix
                    </span>
                </div>
                ) : (
                <Image
                    src={getPosterUrl(movie.poster_path, "w780")}
                    alt={movie.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover"
                    onError={() => setPosterError(true)}
                />
                )}
            </motion.div>

            {/* Information */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-flex w-fit items-center gap-2 text-[13px] tracking-wide text-[#C9A66B]/80">
                <span className="h-px w-6 bg-[#C9A66B]/40" />
                Now showing
              </div>

              <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#F4ECE1]/50">
                {releaseYear && <span>{releaseYear}</span>}

                <span className="h-1 w-1 rounded-full bg-[#C9A66B]/30" />

                <span className="flex items-center gap-1 text-[#C9A66B]">
                  <Star className="h-3.5 w-3.5 fill-[#C9A66B]" />
                  {movie.vote_average.toFixed(1)}
                </span>

                {movie.runtime > 0 && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[#C9A66B]/30" />

                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {movie.runtime} min
                    </span>
                  </>
                )}
              </div>

              {genres.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-[#C9A66B]/20 bg-[#1C0E10] px-3 py-1.5 text-xs text-[#F4ECE1]/55"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-8 max-w-2xl text-base leading-8 text-[#F4ECE1]/60 md:text-lg">
                {movie.overview}
              </p>
            </motion.div>
          </section>

          {/* Recommendations */}
          <section className="mt-24 border-t border-[#C9A66B]/15 pt-10">
            <div className="mb-8">
              <p className="text-sm tracking-[0.1em] text-[#C9A66B]/60">
                Because you liked this
              </p>

              <h2 className="mt-2 font-serif text-2xl italic md:text-3xl">
                You might also like
              </h2>
            </div>

            {recommendationsLoading ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <div className="aspect-[2/3] animate-pulse rounded-sm bg-white/5" />
                    <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-white/5" />
                  </div>
                ))}
              </div>
            ) : recommendations && recommendations.length > 0 ? (
              <MovieGrid movies={recommendations} />
            ) : (
              <div className="rounded-sm border border-[#C9A66B]/15 bg-[#1C0E10] p-8 text-center">
                <p className="text-sm text-[#F4ECE1]/40">
                  No recommendations available yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}