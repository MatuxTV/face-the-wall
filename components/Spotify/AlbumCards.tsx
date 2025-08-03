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
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      {albumData.images && albumData.images.length > 0 && (
        <div className="relative">
          <img
            src={albumData.images[0].url}
            alt={albumData.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {albumData.name}
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-400">
            <span className="text-orange-400 font-medium">Release:</span> {albumData.release_date}
          </p>
          <p className="text-gray-400">
            <span className="text-orange-400 font-medium">Tracks:</span> {albumData.total_tracks}
          </p>
          {albumData.genres && albumData.genres.length > 0 && (
            <p className="text-gray-400">
              <span className="text-orange-400 font-medium">Genres:</span> {albumData.genres.slice(0, 2).join(", ")}
            </p>
          )}
        </div>
        <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
          Listen on Spotify
        </button>
      </div>
    </div>
  );
}