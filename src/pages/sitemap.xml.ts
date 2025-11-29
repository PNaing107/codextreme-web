import type { APIRoute } from 'astro';

const pages = [
  { path: '', priority: '1.0' },
  { path: '/software', priority: '0.8' },
  { path: '/descargas', priority: '0.8' },
  { path: '/guias', priority: '0.8' },
  { path: '/herramientas', priority: '0.8' }
];

const baseUrl = 'https://www.codextreme.me';

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => {
  const url = `${baseUrl}${page.path}`;
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
