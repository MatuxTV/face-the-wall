'use client'

import getAlbumData from "@/lib/Spotify/album/getAlbumData";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ExternalLink, Music, Calendar, Hash } from "lucide-react";

type SpotifyAlbumDetails = {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  images: { url: string; width: number; height: number }[];
  genres: string[];
  external_urls?: { spotify: string };
  tracks: {
    items: {
      id: string;
      name: string;
      duration_ms: number;
      track_number: number;
    }[];
  };
};

export function AlbumCards({ id }: { id: string }) {
  const [albumData, setAlbumData] = useState<SpotifyAlbumDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchAlbumData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAlbumData(id);
      setAlbumData(data);
    } catch (err) {
      console.error("Error fetching album data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch album data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAlbumData();
    }
  }, [id, fetchAlbumData]);

  const formattedDate = useMemo(() => {
    if (!albumData?.release_date) return '';
    return new Date(albumData.release_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [albumData?.release_date]);

  const handleSpotifyClick = useCallback(() => {
    if (albumData?.external_urls?.spotify) {
      window.open(albumData.external_urls.spotify, '_blank', 'noopener,noreferrer');
    }
  }, [albumData?.external_urls?.spotify]);

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gray-700 h-64 w-full"></div>
          <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            <div className="h-10 bg-gray-700 rounded w-full mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-6">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <ExternalLink className="w-5 h-5" />
          <span className="font-medium">Error Loading Album</span>
        </div>
        <p className="text-gray-400 text-sm">{error}</p>
        <button 
          onClick={fetchAlbumData}
          className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!albumData) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
        <Music className="w-12 h-12 text-gray-500 mx-auto mb-2" />
        <p className="text-gray-400">No album data found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/60 border border-orange-600/20 rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-[1.02] hover:border-orange-600/40 transition-all duration-300 group">
      {albumData.images && albumData.images.length > 0 && (
        <div className="relative overflow-hidden">
          <Image
            src={albumData.images[0].url}
            alt={`${albumData.name} album cover`}
            width={400}
            height={400}
            className={`w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <Music className="w-12 h-12 text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-primary-orange transition-colors">
          {albumData.name}
        </h3>
        
        <div className="space-y-3 text-sm mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 text-primary-orange" />
            <span className="text-primary-orange font-medium">Release:</span>
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Hash className="w-4 h-4 text-primary-orange" />
            <span className="text-primary-orange font-medium">Tracks:</span>
            <span>{albumData.total_tracks}</span>
          </div>
          
          {albumData.genres && albumData.genres.length > 0 && (
            <div className="flex items-center gap-2 text-gray-400">
              <Music className="w-4 h-4 text-primary-orange" />
              <span className="text-primary-orange font-medium">Genres:</span>
              <span>{albumData.genres.slice(0, 2).join(", ")}</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSpotifyClick}
          disabled={!albumData.external_urls?.spotify}
          className="w-full bg-primary-orange hover:bg-secondary-orange disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 py-3 px-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:hover:scale-100"
        >
          <ExternalLink className="w-4 h-4" />
          Listen on Spotify
        </button>
      </div>
    </div>
  );
}