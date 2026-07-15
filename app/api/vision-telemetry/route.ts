import { NextResponse } from 'next/server';

// This is a simulated telemetry endpoint that replaces the legacy Upstash Redis dependency.
// It generates realistic fluctuating data to power the dashboard's ConnectionMatrix.

let frameIndex = 1480300;

export async function GET() {
  // Simulate active frame processing
  frameIndex += Math.floor(Math.random() * 8) + 1;
  
  const data = {
    frame_index: frameIndex,
    server_time: Date.now(),
    timestamp_us: Date.now() * 1000,
    status: "ACTIVE",
    fps: 58 + Math.random() * 4, // Fluctuates between 58-62 FPS
    shm_throughput: (1.5 + Math.random() * 0.5).toFixed(1) + " MB/s",
    pixel_sample: "#00F0FF" // Classic Glazyr cyan glow
  };
  
  // Set cache headers so the client doesn't get stale numbers
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}
