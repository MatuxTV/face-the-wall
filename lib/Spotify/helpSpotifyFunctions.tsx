type SpotifyAlbum = {
  id: string;
};

type SpotifyAlbumsResponse = {
  href: string;
  items: SpotifyAlbum[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export function extractAlbumData(response: SpotifyAlbumsResponse) {
  return response.items.map((album) => ({
    id: album.id,
  }));
}
