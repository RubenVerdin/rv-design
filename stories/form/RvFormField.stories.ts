import type { Meta, StoryObj } from '@storybook/vue3'
import { RvFormField } from 'rv-design'

const meta = {
  title: 'Form/RvFormField',
  component: RvFormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    help: { control: 'text', description: 'Helper text shown below the field when no error.' },
    error: { control: 'text', description: 'Error message — replaces help text when set.' },
    htmlFor: { control: 'text', description: 'Links the label to a control via id.' },
  },
  args: {
    label: 'Email address',
    required: false,
    help: 'We will never share your email.',
    error: '',
    htmlFor: 'email',
  },
  render: (args) => ({
    components: { RvFormField },
    setup: () => ({ args }),
    template: `
      <RvFormField v-bind="args" style="max-width:320px;">
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          class="rv-input__field"
          style="width:100%;"
        />
      </RvFormField>`,
  }),
} satisfies Meta<typeof RvFormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = { args: { required: true } }

export const WithError: Story = {
  args: {
    error: 'Please enter a valid email address.',
    help: '',
  },
}

export const WithRvInput: Story = {
  render: () => ({
    components: { RvFormField },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
        <RvFormField label="Full name" required htmlFor="name">
          <RvInput id="name" placeholder="Jane Smith" />
        </RvFormField>
        <RvFormField label="Email" htmlFor="mail" help="Used for login only.">
          <RvInput id="mail" type="email" placeholder="jane@example.com" />
        </RvFormField>
        <RvFormField label="Country" htmlFor="country" error="Selection required.">
          <RvSelect
            id="country"
            :options="[{value:'uk',label:'United Kingdom'},{value:'de',label:'Germany'}]"
            placeholder="Pick a country…"
          />
        </RvFormField>
      </div>`,
  }),
}
