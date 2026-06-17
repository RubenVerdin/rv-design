import type { Meta, StoryObj } from '@storybook/vue3'
import { RvButton } from 'rv-design'

const meta = {
  title: 'Form/RvButton',
  component: RvButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
      description: 'Visual hierarchy role.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    type: 'primary',
    size: 'medium',
    disabled: false,
    iconOnly: false,
    default: 'Button',
  },
  render: (args) => ({
    components: { RvButton },
    setup: () => ({ args }),
    template: `<RvButton v-bind="args">{{ args.default }}</RvButton>`,
  }),
} satisfies Meta<typeof RvButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = { args: { type: 'secondary', default: 'Secondary' } }

export const Text: Story = { args: { type: 'text', default: 'Text button' } }

export const Disabled: Story = { args: { disabled: true } }

export const Sizes: Story = {
  render: () => ({
    components: { RvButton },
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <RvButton size="small">Small</RvButton>
        <RvButton size="medium">Medium</RvButton>
        <RvButton size="large">Large</RvButton>
      </div>`,
  }),
}

export const Types: Story = {
  render: () => ({
    components: { RvButton },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <RvButton type="primary">Primary</RvButton>
        <RvButton type="secondary">Secondary</RvButton>
        <RvButton type="text">Text</RvButton>
      </div>`,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { RvButton },
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <RvButton type="primary">
          <template #iconLeft>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </template>
          Add item
        </RvButton>
        <RvButton type="secondary">
          Continue
          <template #iconRight>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </template>
        </RvButton>
      </div>`,
  }),
}
