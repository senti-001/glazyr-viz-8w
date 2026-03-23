import { NextResponse } from "next/server";

export async function GET() {
    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const headers: HeadersInit = {
            "Accept": "application/vnd.github.v3+json",
        };

        if (githubToken) {
            headers["Authorization"] = `Bearer ${githubToken}`;
        }

        const response = await fetch(
            "https://api.github.com/repos/glazyr/neural-chromium/commits?path=README.md&per_page=5",
            {
                headers,
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `GitHub API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[GitHub Proxy] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch repository activity" },
            { status: 500 }
        );
    }
}
