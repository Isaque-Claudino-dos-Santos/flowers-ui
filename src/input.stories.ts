import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputText from './components/form/InputText.vue'

const meta = {
  component: InputText,
} satisfies Meta<typeof InputText>

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    id: 'email',
  },
}

export default meta
