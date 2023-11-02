import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    async enhanceApp({ app }) {
        if (!import.meta.env.SSR) {
          const plugin = await import('../../plugins/posthog.js')
          app.use(plugin.default)
        }
      }
}
