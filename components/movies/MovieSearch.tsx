"use client";

import { useEffect, useState } from "react";
import { Search, X, Loader2, Film } from "lucide-react";

import { useMovieSearch } from "@/lib/hooks/useMovieSearch";
import { MovieCard } from "@/components/movies/MovieCard";
import { getPosterUrl } from "@/utils/image";

interface MovieSearchProps {
  open: boolean;
  onClose: () => void;
}

export function MovieSearch({
  open,
  onClose,
}: MovieSearchProps) {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    isLoading,
    isFetching,
    isError,
  } = useMovieSearch(query);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#0A0705]/90 backdrop-blur-2xl">
      <div className="mx-auto min-h-screen max-w-[1600px] px-4 py-5 sm:px-6 sm:py-8 md:px-12">
        {/* Search header */}
        <div className="flex items-center gap-3 border-b border-[#C9A66B]/15 pb-4 sm:gap-4 sm:pb-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A66B]/30 bg-[#1C0E10] sm:h-11 sm:w-11">
            <Film className="h-4 w-4 text-[#C9A66B] sm:h-5 sm:w-5" />
          </div>

          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A66B]/40 sm:h-5 sm:w-5" />

            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Describe what you want to watch..."
              className="w-full bg-transparent py-2.5 pl-7 pr-2 font-serif text-base italic text-[#F4ECE1] outline-none placeholder:text-[#F4ECE1]/25 placeholder:not-italic sm:py-3 sm:pl-9 sm:pr-12 sm:text-xl md:text-3xl"
            />

            {(isLoading || isFetching) && query.trim().length >= 2 && (
              <Loader2 className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#C9A66B]/60 sm:right-2 sm:h-5 sm:w-5" />
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A66B]/20 text-[#F4ECE1]/50 transition hover:border-[#C9A66B]/40 hover:bg-[#1C0E10] hover:text-[#C9A66B] sm:h-10 sm:w-10"
            aria-label="Close search"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Search hint */}
        {query.trim().length < 2 && (
          <div className="flex min-h-[45vh] items-center justify-center px-4 text-center sm:min-h-[50vh]">
            <div>
              <Film className="mx-auto h-7 w-7 text-[#C9A66B]/30 sm:h-8 sm:w-8" />

              <h2 className="mt-4 font-serif text-lg italic text-[#F4ECE1]/80 sm:mt-5 sm:text-xl">
                Search by feeling, story, or idea
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#F4ECE1]/35">
                Try something like &quot;mind-bending science fiction&quot; or
                &quot;funny movies about friendship&quot;.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim().length >= 2 && (
          <div className="pt-6 sm:pt-8">
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <div>
                <p className="text-xs tracking-[0.1em] text-[#C9A66B]/60 sm:text-sm">
                  Semantic results
                </p>

                <h2 className="mt-1 font-serif text-lg italic text-[#F4ECE1] sm:text-xl">
                  {movies?.length ?? 0} movies
                </h2>
              </div>

              {isFetching && !isLoading && (
                <span className="text-xs text-[#F4ECE1]/30">
                  Updating...
                </span>
              )}
            </div>

            {isError ? (
              <div className="rounded-sm border border-[#C9A66B]/15 bg-[#1C0E10] p-6 text-center sm:p-10">
                <p className="text-[#F4ECE1]/60">
                  Search is temporarily unavailable.
                </p>

                <p className="mt-2 text-sm text-[#F4ECE1]/30">
                  Please try again in a moment.
                </p>
              </div>
            ) : movies && movies.length > 0 ? (
                <div
                className={`grid grid-cols-2 gap-x-3 gap-y-8 transition-opacity duration-300 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${
                    isFetching && !isLoading ? "opacity-50" : "opacity-100"
                }`}
                >
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    posterUrl={getPosterUrl(movie.poster_path)}
                  />
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="flex min-h-[35vh] items-center justify-center px-4 text-center sm:min-h-[40vh]">
                  <div>
                    <Search className="mx-auto h-7 w-7 text-[#C9A66B]/30 sm:h-8 sm:w-8" />

                    <h2 className="mt-4 font-serif text-lg italic text-[#F4ECE1]/80 sm:mt-5 sm:text-xl">
                      Nothing quite matched
                    </h2>

                    <p className="mt-2 text-sm text-[#F4ECE1]/35">
                      Try describing the kind of movie you&apos;re looking
                      for differently.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}