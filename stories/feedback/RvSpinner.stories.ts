import type { Meta, StoryObj } from '@storybook/vue3'
import { RvSpinner } from 'rv-design'

const meta = {
  title: 'Feedback/RvSpinner',
  component: RvSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    label: { control: 'text', description: 'Accessible label shown next to the spinner.' },
  },
  args: {
    size: 'medium',
    label: '',
  },
  render: (args) => ({
    components: { RvSpinner },
    setup: () => ({ args }),
    template: `<RvSpinner v-bind="args" />`,
  }),
} satisfies Meta<typeof RvSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = { args: { label: 'Loading…' } }

export const Sizes: Story = {
  render: () => ({
    components: { RvSpinner },
    template: `
      <div style="display:flex;align-items:center;gap:24px;">
        <RvSpinner size="small" />
        <RvSpinner size="medium" />
        <RvSpinner size="large" />
      </div>`,
  }),
}

export const InContext: Story = {
  render: () => ({
    components: { RvSpinner },
    template: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:32px;border:1px dashed #ccc;border-radius:8px;">
        <RvSpinner size="large" />
        <span style="color:#888;font-size:14px;">Fetching data…</span>
      </div>`,
  }),
}
