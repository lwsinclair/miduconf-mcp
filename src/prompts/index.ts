import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchVideosPrompt } from "./youtube/youtubePrompts.js";

// Registramos un prompt para buscar los vídeos o playlists más populares de un canal
export function registerYouTubePrompts(server: McpServer) {
  searchVideosPrompt.forEach((prompt) => {
    server.registerPrompt(prompt.name, prompt.config, prompt.handler);
  });
}
