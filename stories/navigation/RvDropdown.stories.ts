import type { Meta, StoryObj } from '@storybook/vue3'
import { RvDropdown } from 'rv-design'

const menuItems = [
  { key: 'edit',   label: 'Edit item' },
  { key: 'copy',   label: 'Duplicate' },
  { type: 'divider' as const },
  { key: 'export', label: 'Export as CSV' },
  { type: 'divider' as const },
  { key: 'delete', label: 'Delete', danger: true },
]

const meta = {
  title: 'Navigation/RvDropdown',
  component: RvDropdown,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Menu items. Each is an action { key, label, danger?, disabled?, onClick? } or a divider { type: "divider" } or a label { type: "label", label }.',
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Panel alignment relative to trigger.',
      table: { defaultValue: { summary: 'left' } },
    },
  },
  args: {
    items: menuItems,
    align: 'left',
  },
  render: (args) => ({
    components: { RvDropdown },
    setup: () => ({ args }),
    template: `
      <div style="padding:80px;display:flex;justify-content:center;">
        <RvDropdown v-bind="args">
          <template #trigger>
            <RvButton>
              Actions
              <template #iconRight>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
            </RvButton>
          </template>
        </RvDropdown>
      </div>`,
  }),
} satisfies Meta<typeof RvDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const RightAligned: Story = {
  render: () => ({
    components: { RvDropdown },
    template: `
      <div style="padding:80px;display:flex;justify-content:flex-end;">
        <RvDropdown :items="[
          { key: 'profile', label: 'My Profile' },
          { key: 'settings', label: 'Settings' },
          { type: 'divider' },
          { key: 'logout', label: 'Log out', danger: true },
        ]" align="right">
          <template #trigger>
            <RvAvatar name="Jane Smith" style="cursor:pointer;" />
          </template>
        </RvDropdown>
      </div>`,
  }),
}

export const WithLabelsAndIcons: Story = {
  render: () => ({
    components: { RvDropdown },
    template: `
      <div style="padding:80px;display:flex;justify-content:center;">
        <RvDropdown :items="[
          { type: 'label', label: 'Account' },
          { key: 'profile', label: 'Profile', icon: '<svg width=16 height=16 viewBox=\\'0 0 24 24\\' fill=\\'none\\'><circle cx=12 cy=8 r=4 stroke=currentColor stroke-width=2/><path d=\\'M4 20c0-4 3.6-7 8-7s8 3 8 7\\' stroke=currentColor stroke-width=2 stroke-linecap=round/></svg>' },
          { key: 'settings', label: 'Settings', icon: '<svg width=16 height=16 viewBox=\\'0 0 24 24\\' fill=\\'none\\'><circle cx=12 cy=12 r=3 stroke=currentColor stroke-width=2/></svg>' },
          { type: 'divider' },
          { key: 'logout', label: 'Log out', danger: true },
        ]">
          <template #trigger>
            <RvButton type="primary">Open menu</RvButton>
          </template>
        </RvDropdown>
      </div>`,
  }),
}
