// scripts/generateRobots.js
const fs = require('fs');
const path = require('path');

const robotsContent = `
# robots.txt for https://raffleleader.com/

User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /password-reset
Disallow: /email-verification/
Disallow: /account/
Disallow: /admin/messages
Disallow: /stripe-webhook/
Disallow: /api/check-license/

Allow: /admin/*.css
Allow: /admin/*.js
Allow: /api/*.css
Allow: /api/*.js

Allow: /blog/
Allow: /blog/*.css
Allow: /blog/*.js

Sitemap: https://raffleleader.com/sitemap_index.xml
`.trim();

// Define output path (Wasp build directory)
const outputPath = path.join(__dirname, '..', 'app', '.wasp', 'build', 'web-app', 'build', 'robots.txt');

// Write to robots.txt
fs.writeFileSync(outputPath, robotsContent, 'utf8');

console.log('robots.txt generated successfully at', outputPath);
