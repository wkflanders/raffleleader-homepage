// scripts/generateSitemapMain.js
const fs = require('fs');
const path = require('path');
const builder = require('xmlbuilder');

// Define your public routes
const routes = [
  { loc: 'https://raffleleader.com/', lastmod: '2024-04-27', changefreq: 'daily', priority: 1.0 },
  { loc: 'https://raffleleader.com/about', lastmod: '2024-04-27', changefreq: 'monthly', priority: 0.8 },
  { loc: 'https://raffleleader.com/blog', lastmod: '2024-04-27', changefreq: 'weekly', priority: 0.7 },
  // Add additional public routes here
];

// Create XML structure
const urlset = builder.create('urlset', { encoding: 'UTF-8' });
urlset.attribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

routes.forEach(route => {
  const url = urlset.ele('url');
  url.ele('loc', route.loc);
  url.ele('lastmod', route.lastmod);
  url.ele('changefreq', route.changefreq);
  url.ele('priority', route.priority);
});

// Convert to pretty-printed XML string
const xml = urlset.end({ pretty: true });

// Define output path (Wasp build directory)
const outputPath = path.join(__dirname, '..', 'app', '.wasp', 'build', 'web-app', 'build', 'sitemap_main.xml');

// Write to sitemap_main.xml
fs.writeFileSync(outputPath, xml, 'utf8');

console.log('sitemap_main.xml generated successfully at', outputPath);
