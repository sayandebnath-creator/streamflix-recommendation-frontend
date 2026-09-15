import { useQuery } from "@tanstack/react-query";
import { movieService } from "@/services/movieService";

export function useMovies(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ["movies", page, limit],
    queryFn: () => movieService.getMovies(page, limit),
    placeholderData: (previousData) => previousData,
  });
}