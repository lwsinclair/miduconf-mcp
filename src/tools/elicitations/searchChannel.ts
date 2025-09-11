import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchChannel } from "../../services/youtubeApi.js";

// Registro de la herramienta en el servidor MCP
export function registerSearchChannelTool(server: McpServer) {
  server.registerTool(
    "search_channel",
    {
      title: "Buscar canal en YouTube",
      description: "Busca canal en YouTube.",
      inputSchema: {
        query: z.string().min(1).describe("Texto a buscar en YouTube"),
      },
    },
    async ({ query }, extra) => {
      // Con Elicitations podemos pedir directamente inputs al usuario

      const response = await extra.sendRequest(
        {
          method: "elicitation/create",
          params: {
            message:
              "Por favor, configura tus preferencias para la búsqueda del canal:",
            requestedSchema: {
              type: "object",
              properties: {
                language: {
                  type: "string",
                  title: "Idioma del canal",
                  description: "¿En qué idioma prefieres que sea el canal?",
                  enum: ["es", "en", "zh", "fr", "de"],
                  enumNames: [
                    "💃🏼 Español",
                    "☕️ Inglés",
                    "🇨🇳 Chino",
                    "🥐 Francés",
                    "🍺 Alemán",
                  ],
                },
              },
              required: ["language"],
            },
          },
        },
        z.any()
      );

      console.debug("Elicitation response", response);

      const language = response.content.language;

      try {
        const results = await searchChannel({ query, language });
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
