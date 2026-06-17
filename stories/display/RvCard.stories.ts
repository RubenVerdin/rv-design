import type { Meta, StoryObj } from '@storybook/vue3'
import { RvCard } from 'rv-design'

const meta = {
  title: 'Display/RvCard',
  component: RvCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Card header title (prop; overridden by #title slot).' },
    variant: {
      control: 'select',
      options: ['default', 'raised', 'outlined'],
      table: { defaultValue: { summary: 'default' } },
    },
    padding: {
      control: 'select',
      options: ['default', 'none', 'compact', 'loose'],
      table: { defaultValue: { summary: 'default' } },
    },
    hoverable: { control: 'boolean' },
  },
  args: {
    title: 'Card title',
    variant: 'default',
    padding: 'default',
    hoverable: false,
  },
  render: (args) => ({
    components: { RvCard },
    setup: () => ({ args }),
    template: `
      <RvCard v-bind="args" style="max-width:340px;">
        Card body content goes here. This is where the main information lives.
      </RvCard>`,
  }),
} satisfies Meta<typeof RvCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Raised: Story = { args: { variant: 'raised' } }

export const Outlined: Story = { args: { variant: 'outlined' } }

export const Hoverable: Story = { args: { variant: 'raised', hoverable: true } }

export const WithAllSlots: Story = {
  render: () => ({
    components: { RvCard },
    template: `
      <RvCard style="max-width:340px;">
        <template #title>Project Overview</template>
        <template #extra>
          <RvBadge type="success">Active</RvBadge>
        </template>
        <p style="margin:0;line-height:1.6;">
          A summary of the current project status and next milestones.
        </p>
        <template #footer>
          <div style="display:flex;justify-content:flex-end;gap:8px;">
            <RvButton variant="ghost" size="small">Cancel</RvButton>
            <RvButton type="primary" size="small">Save</RvButton>
          </div>
        </template>
      </RvCard>`,
  }),
}

export const NoHeader: Story = {
  render: () => ({
    components: { RvCard },
    template: `
      <RvCard style="max-width:340px;">
        A card with no header — only body content and a footer.
        <template #footer>
          <RvButton type="primary" size="small" block>Take action</RvButton>
        </template>
      </RvCard>`,
  }),
}

export const Grid: Story = {
  render: () => ({
    components: { RvCard },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
        <RvCard title="Design tokens" variant="outlined">
          CSS custom properties powering every component.
        </RvCard>
        <RvCard title="20 components" variant="outlined">
          Forms, display, feedback, and navigation patterns.
        </RvCard>
        <RvCard title="Dark mode" variant="outlined">
          Light / dark / system via data-theme attribute.
        </RvCard>
      </div>`,
  }),
}
