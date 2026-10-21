import { ImageResponse } from 'next/og'

export const alt = 'Glazyr Viz - The Zero-Copy Agentic Platform'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0e16',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cyan Cyber Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            right: '-100px',
            width: '650px',
            height: '650px',
            borderRadius: '100%',
            backgroundColor: 'rgba(0, 240, 255, 0.12)',
            filter: 'blur(100px)',
          }}
        />

        {/* Emerald Secondary Glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-140px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '100%',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            filter: 'blur(90px)',
          }}
        />

        {/* Top Header / Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 240, 255, 0.15)',
                border: '1.5px solid #00F0FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#00F0FF',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '40px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              GLAZYR <span style={{ color: '#00F0FF' }}>VIZ</span>
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 22px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              backgroundColor: 'rgba(0, 240, 255, 0.08)',
              color: '#00F0FF',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#00F0FF',
              }}
            />
            <span>Zero-Copy Optic Nerve for AI Agents</span>
          </div>
        </div>

        {/* Center Main Value Proposition */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '1020px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#ffffff',
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            Sub-8ms Visual Perception.
            <br />
            <span style={{ color: '#00F0FF' }}>Zero-Copy Agentic Architecture.</span>
          </h1>

          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.45,
              color: '#94a3b8',
              margin: 0,
            }}
          >
            High-throughput browser optic nerve delivering 15-50x faster state
            extraction and deterministic click coordinates for autonomous AI agents.
          </p>
        </div>

        {/* Bottom Metric Cards */}
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '18px 24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 800,
                color: '#00F0FF',
                lineHeight: 1,
              }}
            >
              7.35ms
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Direct GPU Latency
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '18px 24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 800,
                color: '#10b981',
                lineHeight: 1,
              }}
            >
              15-50x
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Faster Than CDP
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '18px 24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 800,
                color: '#38bdf8',
                lineHeight: 1,
              }}
            >
              Exact (x,y)
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#64748b',
                marginTop: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Deterministic Targeting
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '18px 24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 240, 255, 0.06)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              MCP Native
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#00F0FF',
                marginTop: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Claude & Cursor Protocol
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
