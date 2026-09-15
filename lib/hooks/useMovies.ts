import { useQuery } from "@tanstack/react-query";

import { movieService } from "@/services/movieService";

const PAGE_SIZE = 20;

export function useMovies(page: number = 1) {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: () => movieService.getMovies(page, PAGE_SIZE),
    placeholderData: (previousData) => previousData,
    staleTime: 60 * 1000,
  });
}