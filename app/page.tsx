"use client";

import { motion } from "framer-motion";
import { Sparkles, Film } from "lucide-react";

import { MovieGrid } from "@/components/movies/MovieGrid";
import { useMovies } from "@/lib/hooks/useMovies";

export default function Home() {
  const { data, isLoading, isError, refetch, isFetching } = useMovies();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12">
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />

            <div className="mt-5 h-12 w-3/4 animate-pulse rounded bg-white/10 md:w-1/2" />

            <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[2/3] animate-pulse rounded-2xl bg-white/10" />

                <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-white/10" />

                <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Film className="h-7 w-7 text-white/60" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            Something went wrong
          </h1>

          <p className="mt-2 text-white/50">
            We couldn&apos;t load the movies right now.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:scale-105 hover:bg-white/90 active:scale-95"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const movies = data?.movies ?? [];
  const pagination = data?.pagination;

  if (movies.length === 0) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Film className="h-7 w-7 text-white/50" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            No movies found
          </h1>

          <p className="mt-2 text-white/50">
            There are currently no movies available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.035] blur-3xl" />

        <div className="absolute right-[-180px] top-[300px] h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_55%)]" />
      </div>

      <section className="relative px-6 pb-12 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[1600px]">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              Intelligent discovery
            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              Find something
              <span className="block text-white/40">
                worth watching.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
              Explore thousands of movies through semantic search and
              intelligent recommendations designed to understand what you
              actually want to watch.
            </p>
          </motion.div>

          {/* Catalog information */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-14 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Film className="h-4 w-4 text-white/70" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Explore the catalog
                </p>

                <p className="text-xs text-white/40">
                  Curated by intelligent recommendations
                </p>
              </div>
            </div>

            {pagination && (
              <div className="flex items-center gap-3 text-sm text-white/40">
                <span>
                  {pagination.total.toLocaleString()} movies
                </span>

                <span className="h-1 w-1 rounded-full bg-white/20" />

                <span>
                  Page {pagination.page}
                </span>

                {isFetching && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/20" />

                    <span className="animate-pulse text-white/60">
                      Updating
                    </span>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Movies */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="pt-10"
          >
            <MovieGrid movies={movies} />
          </motion.div>

          {/* Bottom catalog indicator */}
          {pagination && (
            <div className="mt-16 flex justify-center">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs text-white/40 backdrop-blur-xl">
                Showing {movies.length} of{" "}
                {pagination.total.toLocaleString()} movies
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}