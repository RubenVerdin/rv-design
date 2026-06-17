import { resolve } from 'path'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../stories/Introduction.mdx',
    '../stories/**/*.stories.ts',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  async viteFinal(config) {
    config.resolve ??= {}
    const existing = config.resolve.alias
    // Storybook may give us an array or object — normalise to array before appending
    const existingArray = Array.isArray(existing)
      ? existing
      : Object.entries(existing ?? {}).map(([find, replacement]) => ({
          find,
          replacement: replacement as string,
        }))

    config.resolve.alias = [
      ...existingArray,
      { find: 'rv-design', replacement: resolve(__dirname, '../src/index.ts') },
    ]
    return config
  },
}

export default config
