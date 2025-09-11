import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchVideosTool } from "./youtube/searchVideos.js";
import { registerSearchPlaylistsTool } from "./youtube/searchPlaylist.js";
import { registerSearchChannelTool } from "./elicitations/searchChannel.js";
import { registerGenerateVideoTitleTool } from "./sampling/generateVideoTitle.js";

// Función para registrar todas las herramientas relacionadas con YouTube
export function registerYouTubeTools(server: McpServer) {
  // 🐣 Demo básica: registro dos tools
  registerSearchVideosTool(server);
  registerSearchPlaylistsTool(server);

  //  Demo con Elicitations 📝
  registerSearchChannelTool(server);

  // Demo con Elicitations 📝 y Sampling 🧠
  registerGenerateVideoTitleTool(server);
}
