import type { Meta, StoryObj } from '@storybook/vue3'
import { RvAccordion } from 'rv-design'

const items = [
  { key: '1', title: 'What is RV Design?', content: 'A token-driven Vue 3 component library with a natural, architectural palette.' },
  { key: '2', title: 'How do I install it?', content: 'Run npm install rv-design, then import the CSS and register the Vue plugin.' },
  { key: '3', title: 'Does it support dark mode?', content: 'Yes — set data-theme="dark" on the <html> element or use the useTheme() composable.' },
  { key: '4', title: 'Is it accessible?', content: 'All components use semantic HTML and ARIA attributes.', disabled: true },
]

const meta = {
  title: 'Navigation/RvAccordion',
  component: RvAccordion,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array of { key, title, content, extra?, disabled? }.' },
    defaultValue: { control: 'text', description: 'Initially open item key (or array of keys).' },
    multiple: { control: 'boolean', description: 'Allow multiple items open at once.' },
    variant: {
      control: 'select',
      options: ['bordered', 'separated'],
      table: { defaultValue: { summary: 'bordered' } },
    },
  },
  args: {
    items,
    defaultValue: '1',
    multiple: false,
    variant: 'bordered',
  },
  render: (args) => ({
    components: { RvAccordion },
    setup: () => ({ args }),
    template: `<RvAccordion v-bind="args" style="max-width:560px;" />`,
  }),
} satisfies Meta<typeof RvAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: { multiple: true, defaultValue: ['1', '2'] },
}

export const Separated: Story = { args: { variant: 'separated' } }

export const Collapsed: Story = { args: { defaultValue: [] } }
