import { ENV } from "../config/env.js";
import { google, youtube_v3 } from "googleapis";

export interface SearchVideosParams {
  query: string;
  maxResults: number;
}

export interface YouTubeVideoSummary {
  id: string;
  title: string;
  channelTitle?: string;
  publishedAt?: string;
  description?: string;
  thumbnails?: Record<string, { url: string; width?: number; height?: number }>;
}

let ytClient: youtube_v3.Youtube | null = null;
function getClient() {
  if (!ytClient) {
    ytClient = google.youtube({ version: "v3", auth: ENV.YOUTUBE_API_KEY });
  }
  return ytClient;
}

export async function searchVideos({
  query,
  maxResults,
}: SearchVideosParams): Promise<YouTubeVideoSummary[]> {
  const youtube = getClient();
  const res = await youtube.search.list({
    q: query,
    part: ["snippet"],
    type: ["video"],
    maxResults,
  });
  const items = res.data.items || [];
  return items.map((it) => {
    const s = it.snippet || {};
    return {
      id: it.id?.videoId || "unknown",
      title: s.title ?? "Untitled",
      channelTitle: s.channelTitle ?? undefined,
      publishedAt: s.publishedAt ?? undefined,
      description: s.description ?? undefined,
      thumbnails: s.thumbnails as
        | Record<string, { url: string; width?: number; height?: number }>
        | undefined,
    };
  });
}

export async function searchPlaylists({
  query,
  maxResults,
}: SearchVideosParams): Promise<YouTubeVideoSummary[]> {
  const youtube = getClient();
  const res = await youtube.search.list({
    q: query,
    part: ["snippet"],
    type: ["playlist"],
    maxResults,
  });
  const items = res.data.items || [];
  return items.map((it) => {
    const s = it.snippet || {};
    return {
      id: it.id?.playlistId || "unknown",
      title: s.title ?? "Untitled",
      channelTitle: s.channelTitle ?? undefined,
      publishedAt: s.publishedAt ?? undefined,
      description: s.description ?? undefined,
      thumbnails: s.thumbnails as
        | Record<string, { url: string; width?: number; height?: number }>
        | undefined,
    };
  });
}

export async function searchChannel({
  query,
  language,
}: {
  query: string;
  language: string;
}) {
  const youtube = getClient();

  const res = await youtube.search.list({
    q: query,
    part: ["snippet"],
    type: ["channel"],
    relevanceLanguage: language,
    maxResults: 1,
  });

  const items = res.data.items || [];
  if (items.length === 0) {
    throw new Error("No se encontró ningún canal con ese nombre.");
  }
  const channel = items[0];
  if (!channel) {
    throw new Error("No se encontró ningún canal con ese nombre.");
  }
  const s = channel.snippet || {};
  return {
    id: channel.id?.channelId || "unknown",
    title: s.title ?? "Untitled",
    description: s.description ?? undefined,
    thumbnails: s.thumbnails as
      | Record<string, { url: string; width?: number; height?: number }>
      | undefined,
  };
}
