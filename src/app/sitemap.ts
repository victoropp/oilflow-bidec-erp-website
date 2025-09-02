import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const routes = [
    '',
    '/solutions',
    '/solutions/upstream',
    '/solutions/midstream', 
    '/solutions/downstream',
    '/solutions/compliance',
    '/industries',
    '/industries/exploration',
    '/industries/refining',
    '/industries/petrochemicals',
    '/industries/distribution',
    '/pricing',
    '/resources',
    '/resources/docs',
    '/resources/case-studies',
    '/resources/whitepapers',
    '/blog',
    '/about',
    '/careers',
    '/partners',
    '/news',
    '/contact',
    '/request-demo',
    '/privacy',
    '/terms',
    '/security',
    '/compliance',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 
                    route.startsWith('/blog') ? 'weekly' :
                    route.startsWith('/news') ? 'weekly' :
                    'monthly',
    priority: route === '' ? 1 :
             route === '/solutions' ? 0.9 :
             route === '/request-demo' ? 0.9 :
             route === '/pricing' ? 0.8 :
             route.startsWith('/solutions/') ? 0.8 :
             route.startsWith('/industries/') ? 0.7 :
             0.6,
  }));
}