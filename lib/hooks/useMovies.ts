import { useInfiniteQuery } from "@tanstack/react-query";

import { movieService } from "@/services/movieService";

const PAGE_SIZE = 20;

export function useMovies() {
  return useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam }) =>
      movieService.getMovies(pageParam, PAGE_SIZE),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.pagination;

      if (page >= total_pages) {
        return undefined;
      }

      return page + 1;
    },

    staleTime: 60 * 1000,
  });
}