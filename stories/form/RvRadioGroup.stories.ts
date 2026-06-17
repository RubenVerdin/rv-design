import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvRadioGroup } from 'rv-design'

const options = [
  { value: 'starter', label: 'Starter — free' },
  { value: 'pro',     label: 'Pro — $12/mo' },
  { value: 'team',    label: 'Team — $49/mo', disabled: true },
]

const meta = {
  title: 'Form/RvRadioGroup',
  component: RvRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object', description: 'Array of { value, label, disabled? }.' },
    name: { control: 'text' },
    vertical: { control: 'boolean', description: 'Stack radios vertically.' },
    disabled: { control: 'boolean', description: 'Disable the entire group.' },
  },
  args: {
    modelValue: 'pro',
    options,
    name: 'plan',
    vertical: false,
    disabled: false,
  },
  render: (args) => ({
    components: { RvRadioGroup },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<RvRadioGroup v-bind="args" v-model="value" />`,
  }),
} satisfies Meta<typeof RvRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}

export const Vertical: Story = { args: { vertical: true } }

export const Disabled: Story = { args: { disabled: true } }
