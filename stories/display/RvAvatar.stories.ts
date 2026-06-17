import type { Meta, StoryObj } from '@storybook/vue3'
import { RvAvatar } from 'rv-design'

const meta = {
  title: 'Display/RvAvatar',
  component: RvAvatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Image URL. Takes priority over name initials.' },
    alt: { control: 'text', description: 'Alt text for the image.' },
    name: { control: 'text', description: 'Full name — first two initials are shown when no src.' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      table: { defaultValue: { summary: 'circle' } },
    },
    accent: { control: 'boolean', description: 'Uses the accent colour palette for initials.' },
  },
  args: {
    src: '',
    alt: '',
    name: 'Jane Smith',
    size: 'medium',
    shape: 'circle',
    accent: false,
  },
  render: (args) => ({
    components: { RvAvatar },
    setup: () => ({ args }),
    template: `<RvAvatar v-bind="args" />`,
  }),
} satisfies Meta<typeof RvAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=47',
    alt: 'Jane Smith',
    name: '',
  },
}

export const Accent: Story = { args: { name: 'Alex Chen', accent: true } }

export const Square: Story = { args: { shape: 'square', name: 'RV' } }

export const Sizes: Story = {
  render: () => ({
    components: { RvAvatar },
    template: `
      <div style="display:flex;align-items:center;gap:16px;">
        <RvAvatar name="Jane Smith" size="small" />
        <RvAvatar name="Jane Smith" size="medium" />
        <RvAvatar name="Jane Smith" size="large" />
      </div>`,
  }),
}

export const AvatarStack: Story = {
  render: () => ({
    components: { RvAvatar },
    template: `
      <div style="display:flex;">
        <RvAvatar src="https://i.pravatar.cc/80?img=1" alt="User 1" style="margin-right:-8px;outline:2px solid white;border-radius:50%;" />
        <RvAvatar src="https://i.pravatar.cc/80?img=2" alt="User 2" style="margin-right:-8px;outline:2px solid white;border-radius:50%;" />
        <RvAvatar src="https://i.pravatar.cc/80?img=3" alt="User 3" style="margin-right:-8px;outline:2px solid white;border-radius:50%;" />
        <RvAvatar name="+4" style="outline:2px solid white;border-radius:50%;" />
      </div>`,
  }),
}
