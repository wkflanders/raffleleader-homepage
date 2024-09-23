// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Raffle Leader Blog',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://raffleleader.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/blog/',
  trailingSlash: true,

  // // GitHub pages deployment config.
  // // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs'
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 'ALL',
          routeBasePath: '/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {  // Add sitemap configuration here
          changefreq: 'weekly',
          priority: 0.7,
          ignorePatterns: ['/tags/**', '/categories/**'],
          filename: 'blog-sitemap.xml',
        },
      }),
    ],
  ],
  
  plugins: [
    // [
    //   '@docusaurus/plugin-client-redirects',
    //   {
    //     redirects: [
    //       {
    //         to: '/blog', // Redirect from root to /blog
    //         from: '/',
    //       },
    //     ],
    //   },
    // ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-07KK6B93ZM',
        anonymizeIP: true, // Optional
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/raffleleader-social-card.jpg',
      colorMode: {
        disableSwitch: true,
        defaultMode: 'light',
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Raffle Leader',
          src: 'img/logo.svg',
          href: 'https://raffleleader.com',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Raffle Leader.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
