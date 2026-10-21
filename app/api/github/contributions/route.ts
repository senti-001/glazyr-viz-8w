import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const targetUser = searchParams.get("username") || "mcpmessenger"

    // Use token from environment
    const token =
      process.env.GITHUB_TOKEN ||
      process.env.GITHUB_API_KEY ||
      ""

    const query = `
      query($login: String!) {
        user(login: $login) {
          login
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "ContributionSkyline-Client",
      },
      body: JSON.stringify({
        query,
        variables: { login: targetUser },
      }),
      // Cache for 10 minutes to avoid hitting rate limits
      next: { revalidate: 600 },
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("GitHub GraphQL API responded with error:", res.status, errText)
      return NextResponse.json({ error: "Failed to fetch from GitHub", status: res.status }, { status: 502 })
    }

    const json = await res.json()
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar

    if (!calendar) {
      console.warn("No calendar data returned for", targetUser, json)
      return NextResponse.json({ error: "No contribution data found", raw: json }, { status: 404 })
    }

    // Flatten weeks into list of { date: "YYYY-MM-DD", count: number }
    const days: { date: string; count: number }[] = []
    for (const week of calendar.weeks || []) {
      for (const day of week.contributionDays || []) {
        days.push({
          date: day.date,
          count: day.contributionCount,
        })
      }
    }

    return NextResponse.json({
      username: json.data.user.login,
      totalContributions: calendar.totalContributions,
      days,
    })
  } catch (err: any) {
    console.error("Error in contributions route:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}
