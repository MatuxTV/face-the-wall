import { getSpotifyAccessToken } from "../getAccessToken";

export default async function getArtistsData() {
  const accessToken = await getSpotifyAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/artists/6zHb8dmI7oyFot5yNStuH1`,
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

  return res.json();
}