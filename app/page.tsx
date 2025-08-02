import getAlbumTracksData from "@/lib/Spotify/album/getAlbumTracks";
import getArtistsData from "@/lib/Spotify/artists/getArtistsData";
import { AlbumCards } from "@/components/Spotify/AlbumCards";

interface artistData {
  name: string;
  followers: number;
  genres: string[];
  images: { url: string; width: number; height: number }[];
}

interface albumsID {
  id: string;
}

export default async function Home() {
  const artistData : artistData = await getArtistsData(); // Name,followers, genres, images
  const albumsID: albumsID[] = await getAlbumTracksData();// IDs of albums

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     {albumsID.map((album) => (
       <AlbumCards key={album.id} id={album.id} />
     ))}
    </div>
  );
}
