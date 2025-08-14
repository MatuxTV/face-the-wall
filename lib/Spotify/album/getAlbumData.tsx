import { getSpotifyAccessToken } from "../getAccessToken";

type SpotifyAlbumDetails = {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  images: { url: string; width: number; height: number }[];
  genres: string[];
  tracks: {
    items: {
      id: string;
      name: string;
      duration_ms: number;
      track_number: number;
    }[];
  };
  external_urls: {
    spotify: string;
  };
};

export default async function getAlbumData(albumId: string): Promise<SpotifyAlbumDetails> {
  const accessToken = await getSpotifyAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 60 }, // Revalidate every minute
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Spotify API Error:', errorText);
    throw new Error('Failed to fetch Spotify album tracks data');
  }
  const data: SpotifyAlbumDetails = await res.json();
  return data;
}