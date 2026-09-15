"use client";

import { Film, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { MovieSearch } from "@/components/movies/MovieSearch";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="absolute inset-0 border-b border-[#C9A66B]/10 bg-[#0A0705]/80 backdrop-blur-xl" />

        <nav className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-20 sm:gap-6 sm:px-6 md:px-12">
          {/* Brand */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A66B]/30 bg-[#1C0E10] sm:h-8 sm:w-8">
              <Film className="h-3.5 w-3.5 text-[#C9A66B] sm:h-4 sm:w-4" />
            </div>

            <span className="font-serif text-base italic tracking-tight text-[#F4ECE1] sm:text-lg">
              StreamFlix
            </span>
          </button>

          {/* Search — full bar from sm up, icon-only on mobile */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="group hidden h-11 w-full max-w-md items-center gap-3 rounded-full border border-[#C9A66B]/15 bg-[#1C0E10]/60 px-4 text-left backdrop-blur-xl transition-all hover:border-[#C9A66B]/35 hover:bg-[#1C0E10] sm:flex"
          >
            <Search className="h-4 w-4 shrink-0 text-[#C9A66B]/50 transition-colors group-hover:text-[#C9A66B]" />

            <span className="truncate text-sm text-[#F4ECE1]/35">
              Search movies, stories, moods...
            </span>

            <span className="ml-auto hidden shrink-0 rounded-md border border-[#C9A66B]/20 px-2 py-1 text-[10px] text-[#C9A66B]/40 md:block">
              ⌘ K
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9A66B]/20 bg-[#1C0E10]/60 text-[#C9A66B]/70 transition hover:border-[#C9A66B]/40 hover:text-[#C9A66B] sm:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Navigation */}
          <div className="hidden shrink-0 items-center gap-6 text-sm md:flex">
            <button className="text-[#F4ECE1]/80 transition hover:text-[#C9A66B]">
              Discover
            </button>

            <button className="text-[#F4ECE1]/40 transition hover:text-[#C9A66B]">
              For You
            </button>
          </div>
        </nav>
      </header>

      <MovieSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}