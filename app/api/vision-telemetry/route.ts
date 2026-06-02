import { NextResponse } from 'next/server';

// Fallback to hardcoded token if environment variable is not set
const UPSTASH_TOKEN = process.env.UPSTASH_TOKEN || "AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU";
const UPSTASH_REST = "https://big-oyster-39155.upstash.io";
const REDIS_KEY = "glazyr:viz:latest_telemetry";

export async function GET() {
  try {
    const res = await fetch(`${UPSTASH_REST}/get/${encodeURIComponent(REDIS_KEY)}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
      // Cache settings - we want live data
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstash error: ${res.statusText}` }, { status: 500 });
    }

    const json = await res.json();
    const raw = json.result;
    
    if (!raw) {
      return NextResponse.json({ error: "No telemetry data found" }, { status: 404 });
    }

    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
