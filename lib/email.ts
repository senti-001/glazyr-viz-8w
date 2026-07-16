import { Resend } from "resend"

// Initialize with a fallback so it doesn't crash on import if env vars are loaded late
const resend = new Resend(process.env.RESEND_API_KEY || "re_fallback_key")


const FROM_EMAIL = "Glazyr Viz <onboarding@glazyr.com>"

/**
 * Sends the instant welcome email when a new user signs up.
 * Triggered by the NextAuth createUser event.
 */
export async function sendWelcomeEmail({
    name,
    email,
}: {
    name: string | null
    email: string
}) {
    const firstName = name?.split(" ")[0] || "there"

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Glazyr Viz</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',system-ui,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111118;border:1px solid #1e1e2e;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00d4ff11,#0a0a0f);padding:40px 48px 32px;border-bottom:1px solid #1e1e2e;">
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:0.15em;color:#00d4ff;text-transform:uppercase;">Glazyr Viz</p>
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#f1f5f9;line-height:1.3;">
                Your zero-copy vision pipeline is ready, ${firstName}.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 24px;font-size:16px;color:#94a3b8;line-height:1.7;">
                You now have <strong style="color:#00d4ff;">100,000 vision frames</strong> credited to your account. 
                Here's how to get your first agent running in under 2 minutes:
              </p>

              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#0d0d18;border:1px solid #1e1e2e;border-radius:8px;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#00d4ff;text-transform:uppercase;">Step 1 — Install the MCP Server</p>
                    <code style="font-family:'Courier New',monospace;font-size:13px;color:#e2e8f0;background:#050508;display:block;padding:12px 16px;border-radius:6px;border:1px solid #1e1e2e;word-break:break-all;">
                      npx @glazyr/mcp-server init
                    </code>
                    <p style="margin:8px 0 0;font-size:12px;color:#64748b;">Your API key will be waiting for you in the dashboard.</p>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#0d0d18;border:1px solid #1e1e2e;border-radius:8px;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#00d4ff;text-transform:uppercase;">Step 2 — Run your first agent</p>
                    <pre style="font-family:'Courier New',monospace;font-size:12px;color:#e2e8f0;background:#050508;padding:12px 16px;border-radius:6px;border:1px solid #1e1e2e;margin:0;overflow-x:auto;white-space:pre-wrap;">import { Glazyr } from '@glazyr/sdk';

const client = new Glazyr({ apiKey: 'your-key-from-dashboard' });
const result = await client.agent.run({
  url: 'https://news.ycombinator.com',
  task: 'Extract the top 3 story titles'
});

console.log(result);</pre>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="https://glazyr.com/dashboard" 
                       style="display:inline-block;background:#00d4ff;color:#050508;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.05em;padding:14px 36px;border-radius:8px;text-transform:uppercase;">
                      Open Your Dashboard →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;border-top:1px solid #1e1e2e;padding-top:24px;">
                Questions? Just reply to this email — I read every one.<br/>
                <strong style="color:#94a3b8;">William @ Glazyr Viz</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d18;padding:20px 48px;border-top:1px solid #1e1e2e;">
              <p style="margin:0;font-size:11px;color:#374151;text-align:center;">
                Glazyr Viz · Des Moines, Iowa · 
                <a href="https://glazyr.com/privacy" style="color:#374151;">Privacy Policy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "Welcome to Glazyr Viz — your agent is ready",
            html,
        })

        if (error) {
            console.error("[Email] Failed to send welcome email:", error)
            return { success: false, error }
        }

        console.log(`[Email] Welcome email sent to ${email}. ID: ${data?.id}`)
        return { success: true, id: data?.id }
    } catch (err) {
        console.error("[Email] Unexpected error sending welcome email:", err)
        return { success: false, error: err }
    }
}

/**
 * Sends the Day-1 follow-up onboarding email.
 * Can be triggered manually or via a cron webhook.
 */
export async function sendOnboardingFollowUp({
    name,
    email,
}: {
    name: string | null
    email: string
}) {
    const firstName = name?.split(" ")[0] || "there"

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',system-ui,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111118;border:1px solid #1e1e2e;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.15em;color:#00d4ff;text-transform:uppercase;">Glazyr Viz</p>
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#f1f5f9;">
                Hey ${firstName}, did you get your first agent running?
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.7;">
                Just checking in. If you hit any friction during setup I want to know about it — 
                that's the kind of thing I fix same day.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.7;">
                If you haven't started yet, the fastest way in is your dashboard:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <a href="https://glazyr.com/dashboard" 
                       style="display:inline-block;background:#00d4ff;color:#050508;text-decoration:none;font-weight:800;font-size:13px;letter-spacing:0.05em;padding:12px 28px;border-radius:8px;text-transform:uppercase;">
                      Go to Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
                Once you're in, the Live Sessions Inspector lets you watch your agent working in real-time — 
                zero-copy vision, raw DOM events, the whole thing.<br/><br/>
                Just reply here if you need anything.<br/>
                <strong style="color:#94a3b8;">William</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#0d0d18;padding:16px 48px;border-top:1px solid #1e1e2e;">
              <p style="margin:0;font-size:11px;color:#374151;text-align:center;">
                Glazyr Viz · <a href="https://glazyr.com/privacy" style="color:#374151;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "Did you get your first Glazyr agent running?",
            html,
        })

        if (error) {
            console.error("[Email] Failed to send follow-up email:", error)
            return { success: false, error }
        }

        console.log(`[Email] Follow-up email sent to ${email}. ID: ${data?.id}`)
        return { success: true, id: data?.id }
    } catch (err) {
        console.error("[Email] Unexpected error sending follow-up email:", err)
        return { success: false, error: err }
    }
}
