"use client";

import Image from "next/image";
import { Film } from "lucide-react";
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
    <article className="group w-full cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5">
        {imageError ? (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black px-5 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Film className="h-5 w-5 text-white/40" />
            </div>

            <p className="relative mt-4 line-clamp-3 text-sm font-medium text-white/70">
              {movie.title}
            </p>

            <span className="relative mt-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-sm font-medium">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="truncate font-medium text-white">
          {movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-sm text-white/50">
          <span>{releaseYear}</span>
          <span>•</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}