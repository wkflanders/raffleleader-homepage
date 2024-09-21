// scripts/generateSitemapIndex.js
const fs = require('fs');
const path = require('path');
const builder = require('xmlbuilder');

// Define your sitemaps
const sitemaps = [
  { loc: 'https://raffleleader.com/sitemap_main.xml', lastmod: '2024-04-27' },
  { loc: 'https://raffleleader.com/blog/blog-sitemap.xml', lastmod: '2024-04-27' },
  // Add more sitemaps if needed
];

// Create XML structure
const sitemapIndex = builder.create('sitemapindex', { encoding: 'UTF-8' });
sitemapIndex.attribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

sitemaps.forEach(sitemap => {
  const sitemapElem = sitemapIndex.ele('sitemap');
  sitemapElem.ele('loc', sitemap.loc);
  sitemapElem.ele('lastmod', sitemap.lastmod);
});

// Convert to pretty-printed XML string
const xml = sitemapIndex.end({ pretty: true });

// Define output path (Wasp build directory)
const outputPath = path.join(__dirname, '..', 'app', '.wasp', 'build', 'web-app', 'build', 'sitemap_index.xml');

// Write to sitemap_index.xml
fs.writeFileSync(outputPath, xml, 'utf8');

console.log('sitemap_index.xml generated successfully at', outputPath);
