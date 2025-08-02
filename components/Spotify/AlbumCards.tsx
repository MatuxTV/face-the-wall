'use client'

import getAlbumData from "@/lib/Spotify/album/getAlbumData";
import { useEffect, useState } from "react";

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
};

export function AlbumCards(props: { id: string }) {
    
  const [albumData, setAlbumData] = useState<SpotifyAlbumDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        console.log("Album ID:", props.id);
        setLoading(true);
        const data = await getAlbumData(props.id);
        console.log("Album Data:", data);
        setAlbumData(data);
      } catch (err) {
        console.error("Error fetching album data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch album data");
      } finally {
        setLoading(false);
      }
    };

    if (props.id) {
      fetchAlbumData();
    }
  }, [props.id]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!albumData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>No album data found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {albumData.images && albumData.images.length > 0 && (
          <img
            src={albumData.images[0].url}
            alt={albumData.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {albumData.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Release Date: {albumData.release_date}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Total Tracks: {albumData.total_tracks}
          </p>
          {albumData.genres && albumData.genres.length > 0 && (
            <p className="text-sm text-gray-600">
              Genres: {albumData.genres.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}