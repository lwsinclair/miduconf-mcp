import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js";

// Registro de la herramienta en el servidor MCP
export function registerGenerateVideoTitleTool(server: McpServer) {
  server.registerTool(
    "generate_video_title",
    {
      title: "Generar título de video",
      description: "Genera un título para un video de YouTube.",
      inputSchema: {
        stack: z
          .string()
          .min(1)
          .describe(
            "Herramientas y frameworks utilizados como parte de este repositorio"
          ),
      },
    },
    async ({ stack }, extra) => {
      const response = await server.server.elicitInput({
        message: `¿En qué idioma prefieres que sea el título del video?`,
        requestedSchema: {
          type: "object",
          properties: {
            language: {
              type: "string",
              title: "Idioma del video",
              description: "¿En qué idioma prefieres que sea el video?",
              enum: ["spanish", "english", "chinese", "french", "german"],
              enumNames: [
                "💃🏼 Español",
                "☕️ Inglés",
                " Chino",
                "🥐 Francés",
                "🍺 Alemán",
              ],
            },
          },
          required: ["language"],
        },
      });

      console.debug("Elicitation response", response);

      // Recupero de la respuesta el contenido
      const { content: preferences } = response as {
        action: string;
        content: { language: string };
      };

      // Usando sampling, es decir usando alguno de los modelos a los que el que me hace la petición ya tiene acceso, generar la respuesta
      const result = await extra.sendRequest(
        {
          method: "sampling/createMessage",
          params: {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Please generate a title for a YouTube video that show how to use the following technologies :${stack}. The title should be in ${preferences.language} and add some emojis.`,
                },
              },
            ],
            maxTokens: 500,
            modelPreferences: {
              costPriority: 0.5, // Balance costo y rendimiento
              intelligencePriority: 0.5, // Balance inteligencia y rendimiento
              speedPriority: 0.5, // Priorizar velocidad
            },
          },
        },
        CreateMessageResultSchema
      );

      console.info("Sampling result", result);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}
