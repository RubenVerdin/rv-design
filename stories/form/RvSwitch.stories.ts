import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvSwitch } from 'rv-design'

const meta = {
  title: 'Form/RvSwitch',
  component: RvSwitch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'On/off state (v-model).' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: { control: 'boolean' },
    default: { control: 'text', table: { category: 'Slots' } },
  },
  args: {
    modelValue: false,
    size: 'medium',
    disabled: false,
    default: 'Enable notifications',
  },
  render: (args) => ({
    components: { RvSwitch },
    setup() {
      const on = ref(args.modelValue)
      return { args, on }
    },
    template: `<RvSwitch v-bind="args" v-model="on">{{ args.default }}</RvSwitch>`,
  }),
} satisfies Meta<typeof RvSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const On: Story = { args: { modelValue: true } }

export const Disabled: Story = { args: { disabled: true } }

export const DisabledOn: Story = { args: { disabled: true, modelValue: true } }

export const Sizes: Story = {
  render: () => ({
    components: { RvSwitch },
    setup() {
      const sm = ref(true)
      const md = ref(true)
      const lg = ref(true)
      return { sm, md, lg }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <RvSwitch v-model="sm" size="small">Small</RvSwitch>
        <RvSwitch v-model="md" size="medium">Medium</RvSwitch>
        <RvSwitch v-model="lg" size="large">Large</RvSwitch>
      </div>`,
  }),
}
