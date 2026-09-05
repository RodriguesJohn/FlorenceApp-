// Hand-written: shows the single control and the grouped form.
import { CheckboxGroup, Checkbox } from './Checkbox.jsx'

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Email updates' },
}

export const Playground = {}

export const Group = {
  render: () => (
    <CheckboxGroup label="Notification channels">
      <Checkbox label="Email" defaultChecked />
      <Checkbox label="Slack" />
      <Checkbox label="SMS" disabled hint="Not available on your plan" />
    </CheckboxGroup>
  ),
}

export const Indeterminate = { args: { label: 'Select all', indeterminate: true } }
