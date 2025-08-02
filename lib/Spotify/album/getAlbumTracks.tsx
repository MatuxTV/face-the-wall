import { getSpotifyAccessToken } from "../getAccessToken";
import { extractAlbumData } from "@/lib/Spotify/helpSpotifyFunctions";

export default async function getAlbumTracksData() {
  const accessToken = await getSpotifyAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/artists/6zHb8dmI7oyFot5yNStuH1/albums`,
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
  throw new Error('Failed to fetch Spotify data');
  }
  const data = extractAlbumData(await res.json());

  return data;
}