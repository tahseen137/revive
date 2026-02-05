import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Revive — Recover Failed Payments on Autopilot'
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
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '80px',
            maxWidth: '900px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '30px',
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M40 20C49.205 20 57 25.216 60.5 32.692M40 60C30.795 60 23 54.784 19.5 47.308M60.5 32.692V22.5M60.5 32.692H50.385M19.5 47.308V57.5M19.5 47.308H29.615"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40 31.25V48.75M43.125 34.375H36.875C35.839 34.375 35 35.214 35 36.25C35 37.286 35.839 38.125 36.875 38.125H43.125C44.161 38.125 45 38.964 45 40C45 41.036 44.161 41.875 43.125 41.875H36.875"
                stroke="white"
                strokeWidth="3.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: '1.1',
            }}
          >
            Recover your lost revenue{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #6366f1, #a855f7)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              on autopilot
            </span>
          </h1>
          
          {/* Description */}
          <p
            style={{
              fontSize: '28px',
              color: '#a1a1aa',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            Smart payment retries + dunning emails. Recover up to 94% of failed payments.
          </p>
          
          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '60px',
              marginTop: '50px',
            }}
          >
            {[
              { value: '$2.4M+', label: 'Recovered' },
              { value: '94%', label: 'Recovery Rate' },
              { value: '3 min', label: 'Setup' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#71717a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
