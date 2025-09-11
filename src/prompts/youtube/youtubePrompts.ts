import { z } from "zod";

export const searchVideosPrompt = [
  {
    name: "search_videos",
    config: {
      title: "Buscar vídeos en YouTube",
      description: "Busca vídeos en YouTube dado un texto de búsqueda.",
      argsSchema: { language: z.string(), topic: z.string() },
    },
    handler: ({ language, topic }: { language: string; topic: string }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Busca los vídeos más populares en YouTube sobre el tema "${topic}" en el idioma "${language}"`,
          },
        },
      ],
    }),
  },
  {
    name: "search_playlists",
    config: {
      title: "Buscar playlists en YouTube",
      description: "Busca playlists en YouTube dado un texto de búsqueda.",
      argsSchema: { language: z.string(), topic: z.string() },
    },
    handler: ({ language, topic }: { language: string; topic: string }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Busca las playlists más populares en YouTube sobre el tema "${topic}" en el idioma "${language}"`,
          },
        },
      ],
    }),
  },
];
