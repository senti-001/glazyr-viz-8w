
import asyncio
from mcp.client.sse import sse_client
from mcp.client.session import ClientSession

# --- Configuration ---
TOKEN = "ec491d54-cb2e-4815-bd98-a893c960f1b4"
URL = "https://mcp.glazyr.com/mcp/sse"

async def run_test():
    print(f"[*] Connecting to Glazyr Vision Nexus...")
    headers = {"Authorization": f"Bearer {TOKEN}"}
    
    async with sse_client(URL, headers=headers) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            print("[*] Handshake successful. Initializing session...")
            await session.initialize()
            
            # List available tools as a health check
            tools = await session.list_tools()
            print(f"✅ Connection Verified! {len(tools.tools)} vision tools discovered.")
            
            for tool in tools.tools[:3]:
                print(f"   - {tool.name}: {tool.description[:50]}...")

if __name__ == "__main__":
    try:
        asyncio.run(run_test())
    except Exception as e:
        print(f"❌ Connection Failed: {e}")
