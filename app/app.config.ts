export default defineAppConfig({
  global: {
    picture: {
      dark: '/hero/avatar.webp',
      light: '/hero/avatar.webp',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/SpiZeak',
      'target': '_blank',
      'aria-label': 'Max Trewhitt on GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/max-trewhitt',
      'target': '_blank',
      'aria-label': 'Max Trewhitt on LinkedIn'
    }, {
      'icon': 'i-simple-icons-instagram',
      'to': 'https://www.instagram.com/spizzeak',
      'target': '_blank',
      'aria-label': 'Max Trewhitt on Instagram'
    }]
  }
})
