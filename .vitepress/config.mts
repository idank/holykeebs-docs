import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "holykeebs Documentation",
  description: "holykeebs Documentation",
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'holykeebs',

    editLink: {
      pattern: 'https://github.com/idank/holykeebs-docs/edit/main/:path'
    },

    search: {
      provider: 'local'
    },

    outline: [2, 3],

    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Buyer\'s Guide', link: '/guides/buyers-guide/' },
          { text: 'Keyboard', link: '/guides/keyboard/' },
          { text: 'Trackball Module', link: '/guides/trackball-module/' },
          { text: 'Span', link: '/guides/span/' },
        ]
      },
      { text: 'Firmware', link: '/firmware/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/idank/holykeebs-docs' }
    ]
  }
})
