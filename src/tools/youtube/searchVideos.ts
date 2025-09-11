import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchVideos as ytSearch } from "../../services/youtubeApi.js";

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
export function registerSearchVideosTool(server: McpServer) {
  server.registerTool(
    "search_videos", // <-- Identificador único de la herramienta
    {
      title: "Buscar videos en YouTube", // <-- Título de la herramienta. Para mostrar al usuario.
      description: "Busca videos en YouTube dado un texto de búsqueda.", // <-- Descripción de la herramienta. Para saber qué hace.
      inputSchema, // <-- Esquema de entrada para validar los parámetros de entrada.
    },
    async ({ query, maxResults }) => {
      // <-- Función que se ejecuta cuando se llama a la herramienta
      try {
        const results = await ytSearch({ query, maxResults }); // Llamada al servicio de búsqueda de videos de YouTube

        return {
          content: [
            // <-- Respuesta de la herramienta al cliente MCP que la llamó
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
