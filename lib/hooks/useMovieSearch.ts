"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { movieService } from "@/services/movieService";

export function useMovieSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  return useQuery({
    queryKey: ["movie-search", debouncedQuery],
    queryFn: () => movieService.searchMovies(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}