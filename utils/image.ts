const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getPosterUrl(
  posterPath: string,
  size: "w342" | "w500" | "w780" = "w500",
): string {
  if (!posterPath) {
    return "/placeholder-poster.png";
  }

  if (posterPath.startsWith("http")) {
    return posterPath;
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}