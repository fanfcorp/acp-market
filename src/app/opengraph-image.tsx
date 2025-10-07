import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ACP Market - Agentic Commerce Protocol Directory'
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
          background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          ACP Market
        </div>
        
        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: '600',
            marginBottom: 40,
            textAlign: 'center',
            maxWidth: '90%',
          }}
        >
          Agentic Commerce Protocol Directory
        </div>
        
        {/* Description */}
        <div
          style={{
            fontSize: 24,
            fontWeight: '400',
            textAlign: 'center',
            maxWidth: '80%',
            opacity: 0.9,
            lineHeight: 1.4,
          }}
        >
          Discover AI agent commerce tools, infrastructure, and automation solutions
        </div>
        
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 50,
            right: 50,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
          }}
        >
          🤖
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 50,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
          }}
        >
          💰
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
