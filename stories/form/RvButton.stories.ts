import type { Meta, StoryObj } from '@storybook/vue3'
import { RvButton } from 'rv-design'

const meta = {
  title: 'Form/RvButton',
  component: RvButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'info', 'success', 'warning', 'error'],
      description: 'Semantic colour role.',
      table: { defaultValue: { summary: 'default' } },
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'tertiary', 'ghost', 'dashed', 'outline'],
      description: 'Visual fill style.',
      table: { defaultValue: { summary: 'solid' } },
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    htmlType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native <button> type attribute.',
      table: { defaultValue: { summary: 'button' } },
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    circle: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    type: 'default',
    variant: 'solid',
    size: 'medium',
    disabled: false,
    loading: false,
    block: false,
    circle: false,
    iconOnly: false,
    htmlType: 'button',
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

export const Default: Story = {}

export const Primary: Story = { args: { type: 'primary', default: 'Primary' } }

export const Soft: Story = { args: { type: 'primary', variant: 'soft', default: 'Soft' } }

export const Ghost: Story = { args: { variant: 'ghost', default: 'Ghost' } }

export const Outline: Story = { args: { variant: 'outline', default: 'Outline' } }

export const Loading: Story = { args: { type: 'primary', loading: true, default: 'Saving…' } }

export const Disabled: Story = { args: { disabled: true, default: 'Disabled' } }

export const Block: Story = { args: { type: 'primary', block: true, default: 'Full-width button' } }

export const Sizes: Story = {
  render: () => ({
    components: { RvButton },
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <RvButton size="tiny">Tiny</RvButton>
        <RvButton size="small">Small</RvButton>
        <RvButton size="medium">Medium</RvButton>
        <RvButton size="large">Large</RvButton>
      </div>`,
  }),
}

export const StatusTypes: Story = {
  render: () => ({
    components: { RvButton },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <RvButton type="default">Default</RvButton>
        <RvButton type="primary">Primary</RvButton>
        <RvButton type="info">Info</RvButton>
        <RvButton type="success">Success</RvButton>
        <RvButton type="warning">Warning</RvButton>
        <RvButton type="error">Error</RvButton>
      </div>`,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { RvButton },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <RvButton type="primary" variant="solid">Solid</RvButton>
        <RvButton type="primary" variant="soft">Soft</RvButton>
        <RvButton type="primary" variant="tertiary">Tertiary</RvButton>
        <RvButton type="primary" variant="ghost">Ghost</RvButton>
        <RvButton type="primary" variant="dashed">Dashed</RvButton>
        <RvButton type="primary" variant="outline">Outline</RvButton>
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
        <RvButton variant="ghost">
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
