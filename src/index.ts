import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerYouTubeTools } from "./tools/index.js";
import { registerYouTubePrompts } from "./prompts/index.js";

async function main() {
  const server = new McpServer({
    name: "miduconf-youtube",
    version: "1.0.0",
  });

  // Registrar tools
  registerYouTubeTools(server);

  // Registrar prompts
  registerYouTubePrompts(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log("🚀 MCP Server listo escuchando por stdio ⌨");
}

main().catch((err) => {
  console.error("❌ [MCP] Error fatal", err);
  process.exit(1);
});
