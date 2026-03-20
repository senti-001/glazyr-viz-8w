---
name: glazyr-vision-extractor
description: "Attaches to the Chromium Viz compositor via POSIX shared memory to extract sub-16ms visual frames for analysis. Use this skill whenever the agent needs to bypass traditional DOM scraping, evade anti-bot systems, or execute high-frequency spatial reasoning tasks."
version: 1.0.0
author: MAGNETAR SENTIENT L.L.C.
permissions:
  - network
---

# Glazyr Vision Extraction Protocol

When extracting visual context via Glazyr, the agent MUST follow these strict memory-access and settlement protocols.

## Operational Checklist

1. **Memory Map Verification**: Validate that the POSIX shared memory path `/dev/shm/glazyr_vision` is accessible. If running on Windows or Docker, skip to the Binary WebSocket fallback.

2. **Token Verification**: Ensure a valid Glazyr Bearer token exists. Check `GLAZYR_TOKEN` environment variable first. If absent, prompt:
   > "I need a Glazyr Viz compute key. Log in at https://glazyr.com/dashboard, copy your Bearer token from the Keyring section."

3. **Economic Quota Check**: Before initiating high-frequency rendering loops exceeding 5,000 frames, verify fund availability:
   - Free tier: 10,000 frames/day (~13 minutes continuous)
   - On exhaustion: HTTP 402 triggers
   - Settlement: $1.00 USDC buys 50,000 frames on Base network
   - Use gasless EIP-7702 delegation for sub-200ms settlement

4. **Navigation Protocol**:
   ```
   browser_navigate → wait 3s → peek_vision_buffer / browser_evaluate_js
   ```
   NEVER call evaluate_js without navigating first.

5. **Payload Construction**: Parse the memory pointer and sequence ID delivered via the SSE transport layer at `https://mcp.glazyr.com/mcp/sse`.

6. **Fallback Mechanism**: When POSIX shared memory is inaccessible:
   - Detect: check if `/dev/shm` is mounted and writable
   - Fallback: use the zstd-compressed Binary WebSocket channel
   - Performance impact: ~30% throughput reduction vs local SHM

## Available Tools

| Tool | Description |
|------|-------------|
| `browser_navigate(url)` | Navigate the remote browser to a URL |
| `browser_click(x, y)` | Click at pixel coordinates |
| `browser_type(text)` | Type text into focused element |
| `browser_key(key)` | Press a keyboard key (Enter, Tab, etc.) |
| `browser_evaluate_js(script)` | Execute JavaScript and return result |
| `peek_vision_buffer(include_base64?)` | Read current frame from SHM buffer |
| `shm_vision_validate(url)` | Validate the vision pipeline integrity |

## Extraction Patterns

| Goal | JavaScript Expression |
|------|----------------------|
| Page title | `document.title` |
| Visible text | `document.body.innerText.substring(0, 2000)` |
| First heading | `document.querySelector('h1')?.textContent` |
| All headings | `Array.from(document.querySelectorAll('h1,h2,h3')).map(e=>e.textContent).join('\\n')` |
| All links | `Array.from(document.querySelectorAll('a')).slice(0,20).map(a=>a.href+' '+a.textContent).join('\\n')` |
| Current URL | `window.location.href` |

## Error Handling

- **Timeout (15s no reply)**: Page still loading. Wait 5 more seconds, retry once.
- **HTTP 402**: Free quota exhausted. Sign USDC payment and retry.
- **Credit balance in navigate response**: Navigation succeeded. Do NOT re-navigate.
- **SHM unavailable**: Fall back to Binary WebSocket automatically.

## Security Rules

1. NEVER modify `openclaw.json` without explicit human approval
2. NEVER log or expose Bearer tokens
3. Each tool invocation consumes 1 Frame from the user's account
4. Treat `/dev/shm/glazyr_vision` as a trust boundary

---
_Zero-Copy Vision. Sub-16ms Latency. Cloud-Isolated Perception._
