"use client";

import Image from "next/image";
import Link from "next/link";
import { Film, Star } from "lucide-react";
import { useState } from "react";

import type { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  posterUrl: string;
}

export function MovieCard({ movie, posterUrl }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    // <article className="group w-full cursor-pointer">
    <Link
    href={`/movies/${movie.id}`}
    className="group block w-full cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-[#1C0E10] ring-1 ring-[#C9A66B]/0 transition-all duration-300 group-hover:ring-[#C9A66B]/40">
        {imageError ? (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#6B2A3A]/30 via-[#1C0E10] to-[#0A0705] px-5 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,166,107,0.10),transparent_55%)]" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A66B]/25 bg-[#0A0705]">
              <Film className="h-5 w-5 text-[#C9A66B]/70" />
            </div>

            <p className="relative mt-4 line-clamp-3 font-serif text-sm italic text-[#F4ECE1]/70">
              {movie.title}
            </p>

            <span className="relative mt-2 text-[10px] tracking-[0.2em] text-[#C9A66B]/40">
              StreamFlix
            </span>
          </div>
        ) : (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-sm text-[#F4ECE1]/85">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="truncate font-medium text-[#F4ECE1]">
          {movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-1.5 text-sm text-[#F4ECE1]/45">
          <span>{releaseYear}</span>
          <span className="text-[#C9A66B]/40">•</span>
          <span className="flex items-center gap-1 text-[#C9A66B]">
            <Star className="h-3.5 w-3.5 fill-[#C9A66B]" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}