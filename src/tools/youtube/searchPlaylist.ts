import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchPlaylists } from "../../services/youtubeApi.js";

// Definición del esquema de entrada usando zod
const inputSchema = {
  query: z.string().min(1).describe("Texto a buscar en YouTube"),
  maxResults: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(5)
    .describe("Número máximo de resultados (1-20)"),
};

// Registro de la herramienta en el servidor MCP
export function registerSearchPlaylistsTool(server: McpServer) {
  server.registerTool(
    "search_playlists",
    {
      title: "Buscar listas de reproducción en YouTube",
      description:
        "Busca listas de reproducción en YouTube dado un texto de búsqueda.",
      inputSchema,
    },
    async ({ query, maxResults }) => {
      try {
        const results = await searchPlaylists({ query, maxResults });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      } catch (err) {
        const e = err as Error;
        return {
          content: [
            {
              type: "text",
              text: `Error consultando YouTube: ${e.message}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
