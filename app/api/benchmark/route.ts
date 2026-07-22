import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { url, debug } = await request.json();
        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // We call the glazyr-node daemon directly, which runs the zero_copy_vision python script
        const daemonUrl = `http://34.133.3.141:9999/benchmark?url=${encodeURIComponent(url)}`;
        
        console.log(`[Benchmark] Hitting ${daemonUrl}...`);
        const startTime = Date.now();
        const response = await fetch(daemonUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Daemon responded with status ${response.status}`);
        }

        const data = await response.json();
        
        // Recompute some standard fields to ensure consistency
        const total_ms = Date.now() - startTime;
        data.total_ms = total_ms;
        
        if (!data.status) {
            data.status = "glazyr-zero-copy-active";
        }
        
        let htmlBytes = data.html_bytes || 1024;
        let contextBytes = data.context_bytes || 100;
        
        if (data.semantic_preview && typeof data.semantic_preview.markdown === 'string') {
            contextBytes = data.semantic_preview.markdown.length;
            data.context_bytes = contextBytes;
        } else if (data.semantic_tree) {
            contextBytes = JSON.stringify(data.semantic_tree).length;
            data.context_bytes = contextBytes;
        } else if (data.semantic) {
            contextBytes = JSON.stringify(data.semantic).length;
            data.context_bytes = contextBytes;
        } else if (data.semantic_preview) {
            contextBytes = JSON.stringify(data.semantic_preview).length;
            data.context_bytes = contextBytes;
        }

        // Calculate token efficiency exactly like dogfood_side_by_side.py
        // We use roughly 1 token per 4 bytes as standard approximation
        const playwrightTokens = Math.max(htmlBytes / 4, 100); // 1 token per 4 bytes of HTML approx
        const glazyrTokens = Math.max(contextBytes / 4, 10);
        
        const tokenSavings = glazyrTokens > 0 ? (playwrightTokens / glazyrTokens).toFixed(1) : "1.0";
        const compression = playwrightTokens > 0 ? (glazyrTokens / playwrightTokens).toFixed(1) : "1.0";
        
        data.token_efficiency = `${compression}x`;
        data.source_path = "direct";
        
        data.playwright = {
            tokens: playwrightTokens,
            savings_multiplier: tokenSavings
        };

        if (debug) {
            // Include diagnostics if requested
            data.diagnostics = {
                fetch_time: total_ms,
                raw_response: data
            };
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[Benchmark Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
