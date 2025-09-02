import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OilFlow BIDEC ERP - Ghana Petroleum Trading',
    short_name: 'OilFlow BIDEC',
    description: 'Advanced ERP solution for petroleum trading in Ghana. Manage batches, vessels, daily delivery, and banking integration.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    orientation: 'portrait-primary',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png', 
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512', 
        type: 'image/png',
        purpose: 'any',
      },
    ],
    lang: 'en-US',
    dir: 'ltr',
    scope: '/',
    id: 'oilflow-bidec-erp',
  };
}