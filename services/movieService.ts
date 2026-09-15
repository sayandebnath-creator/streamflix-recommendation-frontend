import { api } from "@/lib/api/axios";
import type { Movie, PaginatedMovies } from "@/types/movie";

export const movieService = {
    async getMovies(page = 1, limit = 20) {
    const response = await api.get<PaginatedMovies>("/movies", {
        params: {
        page,
        limit,
        },
    });

    return response.data;
    },

  async getMovie(id: string): Promise<Movie> {
    const response = await api.get<Movie>(`/movies/${id}`);

    return response.data;
  },

  async getRecommendations(id: string): Promise<Movie[]> {
    const response = await api.get<Movie[]>(
      `/movies/${id}/recommendations`,
    );

    return response.data;
  },

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await api.get<Movie[]>("/search", {
      params: {
        q: query,
      },
    });

    return response.data;
  },
};