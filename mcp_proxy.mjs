import fs from 'fs';
const logStream = fs.createWriteStream('c:\\Users\\senti\\OneDrive\\Desktop\\websites\\glazyr-viz-8w\\mcp_proxy.log', { flags: 'a' });
process.on('uncaughtException', err => logStream.write(`uncaught: ${err}\n`));
process.on('unhandledRejection', err => logStream.write(`unhandled: ${err}\n`));
console.error = (...args) => logStream.write(`stderr: ${args.join(' ')}\n`);
console.log = (...args) => logStream.write(`stdout: ${args.join(' ')}\n`);

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const DAEMON_URL = "http://34.133.3.141:9999";

const server = new Server(
  { name: "glazyr-viz", version: "0.5.2-shm" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  logStream.write('Handling list tools\n');
  return {
    tools: [
      {
        name: "provision_session",
        description: "Provision a new browser session",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "peek_vision_buffer",
        description: "Peek at the vision buffer",
        inputSchema: {
          type: "object",
          properties: {
            session_id: { type: "string" },
            include_base64: { type: "boolean", default: true }
          },
          required: ["session_id"]
        }
      },
      {
        name: "browser_navigate",
        description: "Navigate to a URL",
        inputSchema: {
          type: "object",
          properties: {
            session_id: { type: "string" },
            url: { type: "string" }
          },
          required: ["session_id", "url"]
        }
      },
      {
        name: "browser_click",
        description: "Click at coordinates",
        inputSchema: {
          type: "object",
          properties: {
            session_id: { type: "string" },
            x: { type: "number" },
            y: { type: "number" }
          },
          required: ["session_id", "x", "y"]
        }
      },
      {
        name: "browser_type",
        description: "Type text",
        inputSchema: {
          type: "object",
          properties: {
            session_id: { type: "string" },
            text: { type: "string" }
          },
          required: ["session_id", "text"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  logStream.write(`Handling tool call: ${name}\n`);
  try {
    if (name === "provision_session") {
      const res = await fetch(`${DAEMON_URL}/provision`, { method: "POST", body: "{}" });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    }
    
    if (name === "peek_vision_buffer") {
      const { session_id } = args;
      const res = await fetch(`${DAEMON_URL}/peek?session_id=${session_id}`);
      const data = await res.json();
      if (data.base64) {
        return {
          content: [
            { type: "text", text: "Successfully captured vision frame." },
            { type: "image", data: data.base64, mimeType: "image/jpeg" }
          ]
        };
      }
      return { content: [{ type: "text", text: JSON.stringify(data) }], isError: true };
    }
    
    if (name === "browser_navigate") {
      const res = await fetch(`${DAEMON_URL}/navigate`, { 
        method: "POST", 
        body: JSON.stringify(args),
        headers: { "Content-Type": "application/json" }
      });
      return { content: [{ type: "text", text: "Navigation command queued." }] };
    }
    
    if (name === "browser_click") {
      const res = await fetch(`${DAEMON_URL}/click`, { 
        method: "POST", 
        body: JSON.stringify(args),
        headers: { "Content-Type": "application/json" }
      });
      return { content: [{ type: "text", text: "Click command queued." }] };
    }
    
    if (name === "browser_type") {
      const res = await fetch(`${DAEMON_URL}/type`, { 
        method: "POST", 
        body: JSON.stringify(args),
        headers: { "Content-Type": "application/json" }
      });
      return { content: [{ type: "text", text: "Type command queued." }] };
    }
    
    throw new Error("Tool not found");
  } catch (err) {
    logStream.write(`Tool error: ${err}\n`);
    return { content: [{ type: "text", text: err.toString() }], isError: true };
  }
});

async function main() {
  logStream.write('Starting MCP Proxy...\n');
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logStream.write('glazyr-viz MCP Proxy running over stdio\n');
}

main().catch(err => logStream.write(`main error: ${err}\n`));
