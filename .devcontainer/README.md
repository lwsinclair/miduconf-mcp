# DevContainer Setup Guide

This document provides detailed information about the DevContainer configuration for the Miduconf MCP project.

## 🏗️ Container Configuration

The DevContainer is based on the official Microsoft TypeScript-Node container (`mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm`) and includes:

### Base Environment
- **Node.js 20** with npm and yarn
- **TypeScript** compiler and tooling
- **Git** and common development tools
- **Debian Bookworm** as the base OS

### Additional Features
- **Terraform** (latest version with tflint and terragrunt)
- **GitHub CLI** for repository management
- **Docker-in-Docker** for containerized workflows

### VS Code Extensions
- TypeScript language support
- Prettier code formatter
- JSON language support
- Terraform language support
- GitHub Copilot (if available)
- Python support (for potential future extensions)

## 🚀 Getting Started

### Initial Setup
1. Open the project in VS Code
2. When prompted, click "Reopen in Container" or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
3. Wait for the container to build and setup to complete
4. You're ready to start developing!

## 🔧 Development Environment

The DevContainer provides a complete development environment with:
- Pre-configured TypeScript and Node.js setup
- Terraform tools for infrastructure as code
- Docker support for containerized development
- All necessary VS Code extensions pre-installed

## 🛠️ Available Tools

### Development Tools
- **Node.js 20**: Latest LTS version for JavaScript/TypeScript development
- **TypeScript**: Full TypeScript support with proper tooling
- **Prettier**: Code formatting on save
- **ESLint**: Code linting and quality checks

### Infrastructure Tools
- **Terraform**: Infrastructure as code
- **Docker**: Container management
- **GitHub CLI**: Git and GitHub integration

## 🔄 Container Lifecycle

### Post Create Command
Automatically runs when the container is first created:
- Displays welcome message
- Confirms successful setup

### Rebuilding the Container
If you need to rebuild the container:
1. `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"
2. Wait for the rebuild process to complete

## 🔍 Troubleshooting

### Common Issues

1. **Container Build Issues**
   - Ensure Docker is running on your host machine
   - Try rebuilding the container: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"
   - Check Docker logs for any error messages

2. **VS Code Extensions Not Loading**
   - Wait for the container to fully initialize
   - Try reloading the window: `Ctrl+Shift+P` → "Developer: Reload Window"

3. **Performance Issues**
   - Ensure your host machine has sufficient resources
   - Consider adjusting Docker memory and CPU limits

### Debug Commands

```bash
# Check container status
docker ps

# View container logs
docker logs <container-id>

# Access container shell directly
docker exec -it <container-id> /bin/bash

# Check available tools
node --version
npm --version
terraform --version
```

## 🔄 Container Updates

To update the DevContainer configuration:

1. Edit `.devcontainer/devcontainer.json`
2. Rebuild container: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"
3. Test the updated configuration

## 📚 Additional Resources

- [Dev Containers Documentation](https://containers.dev/)
- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Documentation](https://docs.docker.com/)
- [MCP Documentation](https://github.com/modelcontextprotocol/typescript-sdk)