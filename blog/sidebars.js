/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Manual sidebar configuration
  docs: [
    'intro', // This seems to be your existing introduction page
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'Getting Started/installation',
      ],
    },
    // You can add more top-level items or categories here as you create them
  ],
};

export default sidebars;
