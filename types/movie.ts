export interface Movie {
  id: string;
  tmdb_id: number;
  title: string;
  overview: string;
  genres: string;
  language: string;
  release_date: string;
  runtime: number;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  created_at: string;
  updated_at: string;
}


export interface MoviePagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedMovies {
  movies: Movie[];
  pagination: MoviePagination;
}