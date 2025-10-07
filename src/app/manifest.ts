import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ACP Market - Agentic Commerce Protocol Directory',
    short_name: 'ACP Market',
    description: 'Discover and integrate Agentic Commerce Protocol (ACP) servers and clients. The premier directory for AI agent commerce tools, infrastructure, and automation solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['developer', 'business', 'productivity'],
    lang: 'en',
    orientation: 'portrait-primary',
    scope: '/',
    related_applications: [],
    prefer_related_applications: false,
  }
}
