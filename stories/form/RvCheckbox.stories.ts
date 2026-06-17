import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvCheckbox } from 'rv-design'

const meta = {
  title: 'Form/RvCheckbox',
  component: RvCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'Checked state (v-model).' },
    indeterminate: { control: 'boolean', description: 'Shows a dash instead of a tick.' },
    disabled: { control: 'boolean' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    modelValue: false,
    indeterminate: false,
    disabled: false,
    default: 'Accept terms and conditions',
  },
  render: (args) => ({
    components: { RvCheckbox },
    setup() {
      const checked = ref(args.modelValue)
      return { args, checked }
    },
    template: `<RvCheckbox v-bind="args" v-model="checked">{{ args.default }}</RvCheckbox>`,
  }),
} satisfies Meta<typeof RvCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = { args: { modelValue: true } }

export const Indeterminate: Story = { args: { indeterminate: true } }

export const Disabled: Story = { args: { disabled: true } }

export const DisabledChecked: Story = { args: { disabled: true, modelValue: true } }

export const Group: Story = {
  render: () => ({
    components: { RvCheckbox },
    setup() {
      const a = ref(true)
      const b = ref(false)
      const c = ref(true)
      return { a, b, c }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <RvCheckbox v-model="a">Notifications by email</RvCheckbox>
        <RvCheckbox v-model="b">Notifications by SMS</RvCheckbox>
        <RvCheckbox v-model="c" disabled>Push notifications (unavailable)</RvCheckbox>
      </div>`,
  }),
}
