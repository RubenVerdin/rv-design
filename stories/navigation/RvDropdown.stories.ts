import type { Meta, StoryObj } from '@storybook/vue3'
import { RvDropdown, RvDropdownMenu } from 'rv-design'

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
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Interaction mode.',
      table: { defaultValue: { summary: 'click' } },
    },
    placement: {
      control: 'select',
      options: [
        'bottom-start', 'bottom', 'bottom-end',
        'top-start', 'top', 'top-end',
        'right-start', 'right', 'right-end',
        'left-start', 'left', 'left-end',
      ],
      description: 'Panel placement relative to trigger. Auto-flips near viewport edges.',
      table: { defaultValue: { summary: 'bottom-start' } },
    },
    animation: {
      control: 'select',
      options: ['slide', 'scale', 'fade', 'none'],
      description: 'Entry / exit animation.',
      table: { defaultValue: { summary: 'slide' } },
    },
    offset: {
      control: { type: 'number', min: 0, max: 32 },
      description: 'Gap in px between trigger and panel.',
      table: { defaultValue: { summary: '8' } },
    },
    hoverDelay: {
      control: { type: 'number', min: 0, max: 500 },
      description: 'ms before closing on hover mode (aim-aware grace period).',
      table: { defaultValue: { summary: '100' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents the dropdown from opening.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    animation: 'slide',
    offset: 8,
    hoverDelay: 100,
    disabled: false,
  },
  render: (args) => ({
    components: { RvDropdown, RvDropdownMenu },
    setup: () => ({ args, menuItems }),
    template: `
      <div style="padding:120px;display:flex;justify-content:center;">
        <RvDropdown v-bind="args">
          <template #trigger="triggerProps">
            <RvButton v-bind="triggerProps">
              Actions
              <template #iconRight>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
            </RvButton>
          </template>
          <RvDropdownMenu :items="menuItems" />
        </RvDropdown>
      </div>`,
  }),
} satisfies Meta<typeof RvDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HoverMode: Story = {
  args: { trigger: 'hover' },
  render: () => ({
    components: { RvDropdown, RvDropdownMenu },
    setup: () => ({ menuItems }),
    template: `
      <div style="padding:120px;display:flex;gap:2rem;justify-content:center;">
        <RvDropdown trigger="hover">
          <template #trigger="triggerProps">
            <RvButton v-bind="triggerProps">File</RvButton>
          </template>
          <RvDropdownMenu :items="[
            { key: 'new',  label: 'New file' },
            { key: 'open', label: 'Open…' },
            { type: 'divider' },
            { key: 'save', label: 'Save' },
          ]" />
        </RvDropdown>
        <RvDropdown trigger="hover">
          <template #trigger="triggerProps">
            <RvButton v-bind="triggerProps">Edit</RvButton>
          </template>
          <RvDropdownMenu :items="[
            { key: 'cut',  label: 'Cut' },
            { key: 'copy', label: 'Copy' },
            { key: 'paste',label: 'Paste' },
          ]" />
        </RvDropdown>
        <RvDropdown trigger="hover">
          <template #trigger="triggerProps">
            <RvButton v-bind="triggerProps">View</RvButton>
          </template>
          <RvDropdownMenu :items="[
            { key: 'zoom-in',  label: 'Zoom in' },
            { key: 'zoom-out', label: 'Zoom out' },
          ]" />
        </RvDropdown>
      </div>`,
  }),
}

export const Placements: Story = {
  render: () => ({
    components: { RvDropdown, RvDropdownMenu },
    setup: () => ({
      items: [{ key: 'a', label: 'Option A' }, { key: 'b', label: 'Option B' }],
    }),
    template: `
      <div style="padding:160px;display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;">
        <RvDropdown v-for="p in ['bottom-start','bottom','bottom-end','top-start','top','top-end','right-start','right','left-start','left']"
          :key="p" :placement="p">
          <template #trigger="tp"><RvButton v-bind="tp" style="width:10rem">{{ p }}</RvButton></template>
          <RvDropdownMenu :items="items" />
        </RvDropdown>
      </div>`,
  }),
}

export const AnimationVariants: Story = {
  render: () => ({
    components: { RvDropdown, RvDropdownMenu },
    setup: () => ({
      items: [{ key: 'a', label: 'Item A' }, { key: 'b', label: 'Item B' }],
    }),
    template: `
      <div style="padding:120px;display:flex;gap:1.5rem;justify-content:center;">
        <RvDropdown v-for="anim in ['slide','scale','fade','none']" :key="anim" :animation="anim">
          <template #trigger="tp"><RvButton v-bind="tp">{{ anim }}</RvButton></template>
          <RvDropdownMenu :items="items" />
        </RvDropdown>
      </div>`,
  }),
}

export const RightAligned: Story = {
  render: () => ({
    components: { RvDropdown, RvDropdownMenu },
    template: `
      <div style="padding:120px;display:flex;justify-content:flex-end;">
        <RvDropdown placement="bottom-end">
          <template #trigger="triggerProps">
            <RvAvatar name="Jane Smith" style="cursor:pointer;" v-bind="triggerProps" />
          </template>
          <RvDropdownMenu :items="[
            { key: 'profile',  label: 'My Profile' },
            { key: 'settings', label: 'Settings' },
            { type: 'divider' },
            { key: 'logout',   label: 'Log out', danger: true },
          ]" />
        </RvDropdown>
      </div>`,
  }),
}

export const WithLabelsAndIcons: Story = {
  render: () => ({
    components: { RvDropdown, RvDropdownMenu },
    template: `
      <div style="padding:120px;display:flex;justify-content:center;">
        <RvDropdown>
          <template #trigger="triggerProps">
            <RvButton type="primary" v-bind="triggerProps">Open menu</RvButton>
          </template>
          <RvDropdownMenu :items="[
            { type: 'label', label: 'Account' },
            { key: 'profile',  label: 'Profile',  icon: '<svg width=16 height=16 viewBox=\\'0 0 24 24\\' fill=\\'none\\'><circle cx=12 cy=8 r=4 stroke=currentColor stroke-width=2/><path d=\\'M4 20c0-4 3.6-7 8-7s8 3 8 7\\' stroke=currentColor stroke-width=2 stroke-linecap=round/></svg>' },
            { key: 'settings', label: 'Settings', icon: '<svg width=16 height=16 viewBox=\\'0 0 24 24\\' fill=\\'none\\'><circle cx=12 cy=12 r=3 stroke=currentColor stroke-width=2/></svg>', shortcut: '⌘,' },
            { type: 'divider' },
            { key: 'logout', label: 'Log out', danger: true },
          ]" />
        </RvDropdown>
      </div>`,
  }),
}
