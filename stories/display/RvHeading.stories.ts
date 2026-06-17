import type { Meta, StoryObj } from '@storybook/vue3'
import { RvHeading } from 'rv-design'

const meta = {
  title: 'Display/RvHeading',
  component: RvHeading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Heading level (h1–h6).',
      table: { defaultValue: { summary: '2' } },
    },
    display: { control: 'boolean', description: 'Larger display treatment.' },
    tone: {
      control: 'select',
      options: ['', 'muted', 'accent'],
      description: 'Optional colour tone.',
    },
    as: { control: 'text', description: 'Override the rendered HTML tag.' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    level: 2,
    display: false,
    tone: '',
    as: '',
    default: 'The quick brown fox',
  },
  render: (args) => ({
    components: { RvHeading },
    setup: () => ({ args }),
    template: `<RvHeading v-bind="args">{{ args.default }}</RvHeading>`,
  }),
} satisfies Meta<typeof RvHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Display: Story = { args: { level: 1, display: true, default: 'Display heading' } }

export const Scale: Story = {
  render: () => ({
    components: { RvHeading },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <RvHeading :level="1">H1 — Primary heading</RvHeading>
        <RvHeading :level="2">H2 — Section heading</RvHeading>
        <RvHeading :level="3">H3 — Sub-section</RvHeading>
        <RvHeading :level="4">H4 — Group heading</RvHeading>
        <RvHeading :level="5">H5 — Label heading</RvHeading>
        <RvHeading :level="6">H6 — Caption heading</RvHeading>
      </div>`,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { RvHeading },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <RvHeading :level="3">Default tone</RvHeading>
        <RvHeading :level="3" tone="muted">Muted tone</RvHeading>
        <RvHeading :level="3" tone="accent">Accent tone</RvHeading>
      </div>`,
  }),
}
