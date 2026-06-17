import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvSelect } from 'rv-design'

const defaultOptions = [
  { value: 'forest', label: 'Forest green' },
  { value: 'walnut', label: 'Walnut brown' },
  { value: 'slate',  label: 'Slate grey', disabled: true },
  { value: 'ivory',  label: 'Warm ivory' },
]

const meta = {
  title: 'Form/RvSelect',
  component: RvSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Currently selected value (v-model).' },
    options: { control: 'object', description: 'Array of { value, label, disabled? }.' },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'Select…' } } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: null,
    options: defaultOptions,
    placeholder: 'Select a colour…',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    components: { RvSelect },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<RvSelect v-bind="args" v-model="value" style="max-width:280px;" />`,
  }),
} satisfies Meta<typeof RvSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPreselected: Story = { args: { modelValue: 'walnut' } }

export const Disabled: Story = { args: { disabled: true, modelValue: 'forest' } }

export const Sizes: Story = {
  render: () => ({
    components: { RvSelect },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:280px;">
        <RvSelect :options="[{value:'a',label:'Option A'},{value:'b',label:'Option B'}]" size="small" placeholder="Small" />
        <RvSelect :options="[{value:'a',label:'Option A'},{value:'b',label:'Option B'}]" size="medium" placeholder="Medium" />
        <RvSelect :options="[{value:'a',label:'Option A'},{value:'b',label:'Option B'}]" size="large" placeholder="Large" />
      </div>`,
  }),
}
