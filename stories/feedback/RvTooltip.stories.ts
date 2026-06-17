import type { Meta, StoryObj } from '@storybook/vue3'
import { RvTooltip } from 'rv-design'

const meta = {
  title: 'Feedback/RvTooltip',
  component: RvTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'Tooltip text shown on hover / focus.' },
  },
  args: {
    content: 'This is a helpful tooltip',
  },
  render: (args) => ({
    components: { RvTooltip },
    setup: () => ({ args }),
    // Padding ensures the tooltip bubble is visible without being clipped
    template: `
      <div style="padding:60px;display:flex;justify-content:center;">
        <RvTooltip v-bind="args">
          <RvButton>Hover me</RvButton>
        </RvTooltip>
      </div>`,
  }),
} satisfies Meta<typeof RvTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnText: Story = {
  render: () => ({
    components: { RvTooltip },
    template: `
      <div style="padding:60px;display:flex;justify-content:center;">
        <RvTooltip content="Keyboard shortcut: Ctrl+S">
          <span style="text-decoration:underline dotted;cursor:help;font-size:14px;">
            Save document
          </span>
        </RvTooltip>
      </div>`,
  }),
}

export const OnIcon: Story = {
  render: () => ({
    components: { RvTooltip },
    template: `
      <div style="padding:60px;display:flex;justify-content:center;">
        <RvTooltip content="Delete this item permanently">
          <RvButton type="error" variant="ghost">
            <template #iconLeft>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            Delete
          </RvButton>
        </RvTooltip>
      </div>`,
  }),
}
