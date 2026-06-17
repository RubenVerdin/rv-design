import { setup } from '@storybook/vue3'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/vue3'

// Load the full design-token + component CSS exactly as a consumer would
import '../styles.css'

// Register all RV Design components globally so story templates work without per-story imports
import RvDesign from 'rv-design'
setup((app) => { app.use(RvDesign) })

const preview: Preview = {
  decorators: [
    // Toggles data-theme="light"|"dark" on the preview iframe root — matches useTheme() contract
    withThemeByDataAttribute({
      themes: { Light: 'light', Dark: 'dark' },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
  ],

  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Form', 'Display', 'Feedback', 'Navigation'],
      },
    },
    controls: {
      matchers: {
        color: /(color|background|bg|fill|stroke)/i,
        date: /date/i,
      },
    },
    docs: { toc: true },
    backgrounds: { disable: true }, // colour handled by the Themes addon via data-theme
  },
}

export default preview
