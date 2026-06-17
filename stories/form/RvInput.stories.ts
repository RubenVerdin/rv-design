import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { RvInput } from 'rv-design'

const meta = {
  title: 'Form/RvInput',
  component: RvInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'v-model binding (current value).' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    status: {
      control: 'select',
      options: ['', 'success', 'warning', 'error'],
      description: 'Validation state.',
      table: { defaultValue: { summary: '""' } },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      table: { defaultValue: { summary: 'text' } },
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: '',
    size: 'medium',
    status: '',
    type: 'text',
    placeholder: 'Enter a value…',
    disabled: false,
  },
  render: (args) => ({
    components: { RvInput },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<RvInput v-bind="args" v-model="value" />`,
  }),
} satisfies Meta<typeof RvInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithStatus: Story = {
  render: () => ({
    components: { RvInput },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
        <RvInput placeholder="Success" status="success" />
        <RvInput placeholder="Warning" status="warning" />
        <RvInput placeholder="Error"   status="error" />
      </div>`,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { RvInput },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
        <RvInput placeholder="Small" size="small" />
        <RvInput placeholder="Medium (default)" size="medium" />
        <RvInput placeholder="Large" size="large" />
      </div>`,
  }),
}

export const Disabled: Story = { args: { disabled: true, modelValue: 'Readonly value' } }

export const WithPrefixSuffix: Story = {
  render: () => ({
    components: { RvInput },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
        <RvInput placeholder="Search…">
          <template #prefix>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M20 20l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </template>
        </RvInput>
        <RvInput placeholder="0.00">
          <template #prefix>€</template>
          <template #suffix>.00</template>
        </RvInput>
      </div>`,
  }),
}
