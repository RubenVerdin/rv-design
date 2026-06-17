import type { Meta, StoryObj } from '@storybook/vue3'
import { RvAlert } from 'rv-design'

const meta = {
  title: 'Feedback/RvAlert',
  component: RvAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'default'],
      table: { defaultValue: { summary: 'info' } },
    },
    title: { control: 'text', description: 'Bold heading above the message body.' },
    showIcon: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    closable: { control: 'boolean' },
    default: { control: 'text', description: 'Body message text.', table: { category: 'Slots' } },
  },
  args: {
    type: 'info',
    title: '',
    showIcon: true,
    closable: false,
    default: 'This is an informational alert message.',
  },
  render: (args) => ({
    components: { RvAlert },
    setup: () => ({ args }),
    template: `<RvAlert v-bind="args">{{ args.default }}</RvAlert>`,
  }),
} satisfies Meta<typeof RvAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Success: Story = { args: { type: 'success', default: 'Changes saved successfully.' } }

export const Warning: Story = {
  args: { type: 'warning', default: 'Your session will expire in 5 minutes.' },
}

export const Error: Story = {
  args: { type: 'error', default: 'Unable to save changes. Please try again.' },
}

export const WithTitle: Story = {
  args: {
    type: 'warning',
    title: 'Heads up',
    default: 'This action cannot be undone once confirmed.',
  },
}

export const Closable: Story = {
  args: { type: 'info', closable: true, default: 'Dismiss this alert when you are ready.' },
}

export const AllTypes: Story = {
  render: () => ({
    components: { RvAlert },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px;">
        <RvAlert type="info">Informational message</RvAlert>
        <RvAlert type="success">Action completed successfully</RvAlert>
        <RvAlert type="warning">Please review before continuing</RvAlert>
        <RvAlert type="error">Something went wrong</RvAlert>
      </div>`,
  }),
}
