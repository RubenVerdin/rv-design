import type { Meta, StoryObj } from '@storybook/vue3'
import { RvBadge } from 'rv-design'

const meta = {
  title: 'Display/RvBadge',
  component: RvBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'info', 'success', 'warning', 'error'],
      table: { defaultValue: { summary: 'default' } },
    },
    variant: {
      control: 'select',
      options: ['soft', 'solid', 'outline'],
      table: { defaultValue: { summary: 'soft' } },
    },
    dot: { control: 'boolean', description: 'Renders as a bare status dot with no text.' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    type: 'default',
    variant: 'soft',
    dot: false,
    default: 'Badge',
  },
  render: (args) => ({
    components: { RvBadge },
    setup: () => ({ args }),
    template: `<RvBadge v-bind="args">{{ args.dot ? '' : args.default }}</RvBadge>`,
  }),
} satisfies Meta<typeof RvBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const StatusTypes: Story = {
  render: () => ({
    components: { RvBadge },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <RvBadge type="default">Default</RvBadge>
        <RvBadge type="primary">Primary</RvBadge>
        <RvBadge type="info">Info</RvBadge>
        <RvBadge type="success">Success</RvBadge>
        <RvBadge type="warning">Warning</RvBadge>
        <RvBadge type="error">Error</RvBadge>
      </div>`,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { RvBadge },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <RvBadge type="primary" variant="soft">Soft</RvBadge>
        <RvBadge type="primary" variant="solid">Solid</RvBadge>
        <RvBadge type="primary" variant="outline">Outline</RvBadge>
      </div>`,
  }),
}

export const Dots: Story = {
  render: () => ({
    components: { RvBadge },
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <RvBadge type="default" dot />
        <RvBadge type="primary" dot />
        <RvBadge type="success" dot />
        <RvBadge type="warning" dot />
        <RvBadge type="error" dot />
      </div>`,
  }),
}
