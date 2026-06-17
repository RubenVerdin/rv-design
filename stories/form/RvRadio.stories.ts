import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvRadio } from 'rv-design'

const meta = {
  title: 'Form/RvRadio',
  component: RvRadio,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Currently selected value (v-model).' },
    value: { control: 'text', description: 'The value this radio represents.' },
    name: { control: 'text', description: 'HTML name attribute for grouping.' },
    disabled: { control: 'boolean' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    modelValue: 'option-a',
    value: 'option-a',
    name: 'demo',
    disabled: false,
    default: 'Option A',
  },
  render: (args) => ({
    components: { RvRadio },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: `<RvRadio v-bind="args" v-model="selected">{{ args.default }}</RvRadio>`,
  }),
} satisfies Meta<typeof RvRadio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Unchecked: Story = { args: { modelValue: 'other' } }

export const Disabled: Story = { args: { disabled: true } }

export const Group: Story = {
  render: () => ({
    components: { RvRadio },
    setup() {
      const selected = ref('b')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <RvRadio v-model="selected" name="plan" value="a">Starter — free forever</RvRadio>
        <RvRadio v-model="selected" name="plan" value="b">Pro — $12 / month</RvRadio>
        <RvRadio v-model="selected" name="plan" value="c" disabled>Enterprise — contact us</RvRadio>
      </div>`,
  }),
}
