import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvTextarea } from 'rv-design'

const meta = {
  title: 'Form/RvTextarea',
  component: RvTextarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    status: {
      control: 'select',
      options: ['', 'success', 'warning', 'error'],
      table: { defaultValue: { summary: '""' } },
    },
    rows: { control: { type: 'number', min: 1, max: 20 }, table: { defaultValue: { summary: '4' } } },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: '',
    status: '',
    rows: 4,
    placeholder: 'Write something…',
    disabled: false,
  },
  render: (args) => ({
    components: { RvTextarea },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<RvTextarea v-bind="args" v-model="value" style="max-width:400px;" />`,
  }),
} satisfies Meta<typeof RvTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithStatus: Story = {
  render: () => ({
    components: { RvTextarea },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;">
        <RvTextarea placeholder="Success" status="success" :rows="2" />
        <RvTextarea placeholder="Error" status="error" :rows="2" />
      </div>`,
  }),
}

export const Disabled: Story = {
  args: { disabled: true, modelValue: 'This field is read-only.' },
}
