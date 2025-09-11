# Repository Notes - MCP Server with YouTube Tools

These are development notes for the MCP (Model Context Protocol) server repository that provides YouTube API integration tools.

## Repository Overview

This repository contains an MCP server implementation that provides tools for interacting with YouTube API, specifically for searching videos, getting channel information, and retrieving playlist items.

## Technology Stack

- **Language**: TypeScript/Node.js
- **Main Dependencies**:
  - `@modelcontextprotocol/typescript-sdk` - MCP SDK for server implementation
  - `googleapis` - YouTube Data API v3 client
  - `zod` - Schema validation
  - `dotenv` - Environment variable management

## Repository Structure

```
├── src/
│   ├── server.ts           # Main MCP server setup and tool definitions
│   ├── index.ts           # Server startup and tool handlers
│   └── tools/             # Individual tool implementations
│       ├── video-tool.ts      # YouTube video search functionality
│       ├── channel-tool.ts    # Channel information retrieval
│       └── playlist-tool.ts   # Playlist items fetching
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables (YouTube API key)
└── README.md            # Main documentation
```

## Development Setup

### Prerequisites
- Node.js 18+
- YouTube Data API v3 key from Google Cloud Platform
- TypeScript development environment

### Installation & Setup
```bash
npm install                    # Install dependencies
cp .env.example .env          # Copy environment template
# Add your YouTube API key to .env file
```

### Build & Run Commands
```bash
npm run build                 # Compile TypeScript to dist/
npm run start                 # Run compiled JavaScript
npm run dev                   # Development mode with ts-node
npm run watch                 # Watch mode with nodemon
```

### Testing
```bash
# No specific test scripts configured yet
# Tests would typically be run with: npm test
```

## Available Tools

The MCP server provides three main tools:

1. **search_videos** - Search YouTube videos with parameters like query, maxResults, and order
2. **get_channel_info** - Retrieve channel details and statistics
3. **get_playlist_items** - Fetch items from YouTube playlists

## Configuration

### Environment Variables
- `YOUTUBE_API_KEY` - Required YouTube Data API v3 key
- `MCP_SERVER_PORT` - Server port (default: 3000)

### API Setup Requirements
- Google Cloud Platform project with YouTube Data API v3 enabled
- API key with appropriate restrictions for YouTube API access

## Key Implementation Details

- Uses Zod schemas for input validation
- Implements proper error handling with structured responses
- Supports all standard YouTube API search and retrieval operations
- Built on the official MCP TypeScript SDK

## External Documentation References

- [MCP TypeScript SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [YouTube Data API v3 Reference](https://developers.google.com/youtube/v3/docs)
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client)
- [YouTube API Quickstart Guide](https://developers.google.com/youtube/v3/quickstart/nodejs)

## Development Notes

- Server runs as MCP transport and handles tool calls via request handlers
- All tools return standardized response format with content arrays
- Error responses include `isError: true` flag for proper handling
- Debug mode available via `DEBUG=mcp:*` environment variable

## Common Issues & Solutions

- **API Key Issues**: Verify YouTube Data API v3 is enabled and key is correctly set
- **Rate Limiting**: YouTube API has quotas - implement retry logic and caching
- **Dependencies**: Ensure all required packages are installed and TypeScript is properly configured