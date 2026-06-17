import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvTabs } from 'rv-design'

const tabs = [
  { key: 'overview', label: 'Overview', content: 'Overview tab content.' },
  { key: 'settings', label: 'Settings', content: 'Settings tab content.' },
  { key: 'activity', label: 'Activity', content: 'Activity log goes here.' },
  { key: 'disabled', label: 'Archived', disabled: true },
]

const meta = {
  title: 'Navigation/RvTabs',
  component: RvTabs,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array of { key, label, content?, disabled? }.' },
    modelValue: { control: 'text', description: 'Active tab key (v-model).' },
    variant: {
      control: 'select',
      options: ['line', 'card', 'segment'],
      table: { defaultValue: { summary: 'line' } },
    },
  },
  args: {
    items: tabs,
    modelValue: 'overview',
    variant: 'line',
  },
  render: (args) => ({
    components: { RvTabs },
    setup() {
      const active = ref(args.modelValue)
      return { args, active }
    },
    template: `<RvTabs v-bind="args" v-model="active" />`,
  }),
} satisfies Meta<typeof RvTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {}

export const Card: Story = { args: { variant: 'card' } }

export const Segment: Story = { args: { variant: 'segment' } }

export const WithSlotContent: Story = {
  render: () => ({
    components: { RvTabs },
    setup() {
      const active = ref('profile')
      return { active }
    },
    template: `
      <RvTabs
        v-model="active"
        :items="[
          { key: 'profile', label: 'Profile' },
          { key: 'billing', label: 'Billing' },
          { key: 'security', label: 'Security' },
        ]"
      >
        <div v-if="active === 'profile'" style="padding:16px 0;">
          <p>Manage your profile information.</p>
        </div>
        <div v-else-if="active === 'billing'" style="padding:16px 0;">
          <p>Update your billing details and subscription.</p>
        </div>
        <div v-else style="padding:16px 0;">
          <p>Change your password and security settings.</p>
        </div>
      </RvTabs>`,
  }),
}
