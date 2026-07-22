# Glazyr Viz: Zero-Latency Agentic Perception

**Glazyr Viz** is a high-performance infrastructure layer designed to give AI agents sub-10ms perception of web interfaces. By combining a custom Chromium fork (`neural-chromium`) with a Node.js-based Model Context Protocol (MCP) server, it bypasses the massive serialization overhead of traditional WebDriver/CDP automation.

This repository contains the Node.js MCP server, UI dashboard, and the `neural-chromium` daemon integration.

## 🚀 Verified Performance & Parity

Traditional browser automation tools (like Playwright and Puppeteer) extract data by serializing the entire DOM to JSON and sending it over WebSockets. This process is notoriously slow.

Glazyr Viz takes a **zero-copy** approach, reading semantic trees directly from the GPU compositor's Shared Memory (SHM).

| Metric | Traditional Automation (CDP) | Glazyr Viz (SHM) | Improvement |
| :--- | :--- | :--- | :--- |
| **State Extraction Latency** | 120ms - 400ms+ | **~3ms - 17ms** | **15 - 50x Faster** |
| **Payload Size (Avg Page)** | ~4.1 KB (Extracted Text) | **~4.6 KB (vision.json Map)** | **Token Parity** |
| **Action Targeting** | Guessed Pixels / Heuristics | **Exact (x,y) Coordinates** | **100% Deterministic** |

*Note: The Glazyr architecture optimizes for **speed** and **structure**, rather than extreme token compression. Token payloads are strictly comparable to plain-text extraction, but they include full spatial and interactive metadata.*

---

## 🏗️ Architecture Overview

The system consists of two primary components communicating via Shared Memory:

1. **`neural-chromium` Daemon (C++)**: A custom fork of Chromium (Version `131.0.6778.205`). It continuously writes the active Semantic Accessibility Tree directly into a Shared Memory buffer instead of waiting for WebSocket polling.
2. **Glazyr Node Server (`index_vm.js` & `mcp_server_sse.mjs`)**: The controller application. It provides an MCP interface for agents to instantly read the SHM buffer and issue commands back to the daemon.

### The Shared Memory (SHM) Layout
The Glazyr daemon writes frame state into memory using a specific binary format that the Node.js parser (`peek_vision_buffer` tool) decodes:
- **128-Byte Binary Header**: Contains state flags and metadata.
- **Payload Length Field**: Offset `16` (read as a little-endian `uint32`) contains the exact byte-length of the JSON payload.
- **Payload**: A perfectly formatted JSON semantic tree, immediately following the header.

### Deterministic Coordinate Injection
When an agent calls the `peek_vision_buffer` tool, the Node.js layer parses the raw semantic tree and prunes it to remove non-actionable noise. Crucially, it traverses the tree and appends explicit bounding box `(x: ..., y: ...)` coordinates to every interactive node (`link`, `button`, `textbox`, etc.). 

This allows agents to issue `browser_click` and `browser_type` commands with absolute geometric certainty, eliminating hallucinated clicks.

---

## ⚡ Connecting via MCP

The production server exposes its capabilities via the **Model Context Protocol (MCP)** over **Server-Sent Events (SSE)**.

To connect your agent (e.g., Claude Desktop, Manus), use the following configuration:

- **Transport:** HTTP / SSE
- **Server URL:** `https://mcp.glazyr.com/mcp/sse?api_key=glazyr-beta-dogfood-2026`

*(The API key is validated via a Caddy `forward_auth` reverse-proxy before routing to the internal SSE port 3001).*

### Available MCP Tools
- `provision_session`: Spin up a new isolated browser instance.
- `peek_vision_buffer`: Read the current zero-copy semantic state, complete with injected `(x, y)` coordinates.
- `browser_navigate`: Instruct the daemon to navigate to a target URL.
- `browser_click` / `browser_type`: Issue deterministic actions directly against the daemon's input loop.
