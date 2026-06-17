import type { Meta, StoryObj } from '@storybook/vue3'
import { RvTag } from 'rv-design'

const meta = {
  title: 'Display/RvTag',
  component: RvTag,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'info', 'success', 'warning', 'error'],
      table: { defaultValue: { summary: 'default' } },
    },
    round: { control: 'boolean', description: 'Fully-rounded pill shape.' },
    closable: { control: 'boolean', description: 'Shows a remove button.' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    type: 'default',
    round: false,
    closable: false,
    default: 'Tag label',
  },
  render: (args) => ({
    components: { RvTag },
    setup: () => ({ args }),
    template: `<RvTag v-bind="args">{{ args.default }}</RvTag>`,
  }),
} satisfies Meta<typeof RvTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Round: Story = { args: { round: true } }

export const Closable: Story = { args: { closable: true } }

export const StatusTypes: Story = {
  render: () => ({
    components: { RvTag },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <RvTag type="default">Default</RvTag>
        <RvTag type="primary">Primary</RvTag>
        <RvTag type="info">Info</RvTag>
        <RvTag type="success">Success</RvTag>
        <RvTag type="warning">Warning</RvTag>
        <RvTag type="error">Error</RvTag>
      </div>`,
  }),
}

export const ClosableGroup: Story = {
  render: () => ({
    components: { RvTag },
    setup() {
      const tags = ['Design', 'Vue 3', 'TypeScript', 'Storybook']
      return { tags }
    },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <RvTag v-for="t in tags" :key="t" closable>{{ t }}</RvTag>
      </div>`,
  }),
}
