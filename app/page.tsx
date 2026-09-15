"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import { Fraunces, Inter } from "next/font/google";

import { MovieGrid } from "@/components/movies/MovieGrid";
import { useMovies } from "@/lib/hooks/useMovies";

import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch, isFetching } = useMovies(page);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0705] px-6 pb-20 pt-32 text-[#F4ECE1] md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12">
            <div className="h-3 w-24 animate-pulse rounded bg-[#C9A66B]/15" />
            <div className="mt-5 h-14 w-3/4 animate-pulse rounded bg-white/5 md:w-1/2" />
            <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-white/5" />
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[2/3] animate-pulse rounded-sm bg-white/5" />
                <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0705] px-6 text-center text-[#F4ECE1]">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6B2A3A]/25 blur-[100px]" />
        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A66B]/25 bg-[#1C0E10]">
            <Film className="h-6 w-6 text-[#C9A66B]" />
          </div>
          <h1 className={`${display.className} mt-7 text-3xl font-medium italic`}>
            The screen went dark
          </h1>
          <p className="mt-3 text-[#F4ECE1]/50">
            We couldn&apos;t load the catalog. Give it another try.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-8 rounded-full border border-[#C9A66B]/40 bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-[#C9A66B] transition-all hover:border-[#C9A66B] hover:bg-[#C9A66B]/10 active:scale-95"
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
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0705] px-6 text-center text-[#F4ECE1]">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6B2A3A]/20 blur-[100px]" />
        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A66B]/25 bg-[#1C0E10]">
            <Film className="h-6 w-6 text-[#C9A66B]" />
          </div>
          <h1 className={`${display.className} mt-7 text-3xl font-medium italic`}>
            Nothing playing tonight
          </h1>
          <p className="mt-3 text-[#F4ECE1]/50">
            The catalog is empty for now. Check back soon.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${display.variable} ${body.variable} relative min-h-screen overflow-hidden bg-[#0A0705] font-sans text-[#F4ECE1]`}
    >
      <Navbar />
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="mt-[-200px] h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,166,107,0.14),transparent_65%)] blur-2xl" />
      </div>
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#6B2A3A]/15 blur-[120px]" />

      <section className="relative px-6 pb-12 pt-28 md:px-12 md:pt-36">
        <div className="mx-auto max-w-[1600px]">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-center mx-auto"
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-[13px] tracking-wide text-[#C9A66B]/80">
              <span className="h-px w-8 bg-[#C9A66B]/40" />
              Now showing
              <span className="h-px w-8 bg-[#C9A66B]/40" />
            </div>

            <h1
              className={`${display.className} text-5xl font-medium leading-[1.05] sm:text-6xl md:text-7xl`}
            >
              Find something
              <br />
              <span className="italic text-[#C9A66B]">worth watching</span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#F4ECE1]/55 md:text-lg">
              Semantic search and thoughtful recommendations, built for
              people who know exactly what a good film feels like.
            </p>
          </motion.div>

          {/* Catalog information */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 flex flex-col gap-4 border-t border-[#C9A66B]/15 py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A66B]/25 bg-[#1C0E10]">
                <Film className="h-4 w-4 text-[#C9A66B]" />
              </div>
              <div>
                <p className={`${display.className} text-sm italic text-[#F4ECE1]`}>
                  The full catalog
                </p>
                <p className="text-xs text-[#F4ECE1]/40">
                  Curated by intelligent recommendations
                </p>
              </div>
            </div>

            {pagination && (
              <div className="flex items-center gap-3 text-sm text-[#F4ECE1]/45">
                <span>{pagination.total.toLocaleString()} films</span>
                <span className="h-1 w-1 rounded-full bg-[#C9A66B]/30" />
                <span>Page {page}</span>
                {isFetching && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[#C9A66B]/30" />
                    <span className="animate-pulse text-[#C9A66B]">
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
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-12"
          >
            <MovieGrid movies={movies} />
            {pagination && pagination.total_pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1.5 sm:mt-14 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => current - 1)}
                  disabled={page === 1 || isFetching}
                  aria-label="Previous page"
                  className="flex h-10 items-center justify-center rounded-full border border-[#C9A66B]/20 bg-[#1C0E10]/60 px-3.5 text-sm text-[#F4ECE1]/60 transition hover:border-[#C9A66B]/40 hover:bg-[#1C0E10] hover:text-[#C9A66B] disabled:cursor-not-allowed disabled:opacity-25 sm:px-5"
                >
                  <ChevronLeft className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <span className="whitespace-nowrap px-2 text-xs text-[#F4ECE1]/45 sm:px-4 sm:text-sm">
                  Page {page} of {pagination.total_pages}
                </span>

                <button
                  type="button"
                  onClick={() => setPage((current) => current + 1)}
                  disabled={page >= pagination.total_pages || isFetching}
                  aria-label="Next page"
                  className="flex h-10 items-center justify-center rounded-full border border-[#C9A66B]/20 bg-[#1C0E10]/60 px-3.5 text-sm text-[#F4ECE1]/60 transition hover:border-[#C9A66B]/40 hover:bg-[#1C0E10] hover:text-[#C9A66B] disabled:cursor-not-allowed disabled:opacity-25 sm:px-5"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 sm:hidden" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Bottom catalog indicator */}
          {pagination && (
            <div className="mt-16 flex justify-center">
              <div className="rounded-full border border-[#C9A66B]/20 bg-[#1C0E10] px-5 py-2.5 text-xs text-[#F4ECE1]/45">
                Showing {movies.length} of{" "}
                {pagination.total.toLocaleString()} films
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}