import { useQuery } from "@tanstack/react-query";

import { movieService } from "@/services/movieService";

export function useRecommendations(movieId: string) {
  return useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => movieService.getRecommendations(movieId),
    enabled: Boolean(movieId),
    staleTime: 5 * 60 * 1000,
  });
}