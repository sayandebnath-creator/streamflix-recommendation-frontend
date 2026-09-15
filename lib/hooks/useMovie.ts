import { useQuery } from "@tanstack/react-query";

import { movieService } from "@/services/movieService";

export function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getMovie(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}