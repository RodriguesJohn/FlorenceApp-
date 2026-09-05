// Hand-written: Radio is only meaningful inside a RadioGroup.
import { RadioGroup, Radio } from './Radio.jsx'

export default {
  title: 'Forms/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  args: { label: 'Plan', defaultValue: 'pro' },
}

export const Playground = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="team" label="Team" />
    </RadioGroup>
  ),
}

export const WithDisabledOption = {
  name: 'With disabled option',
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free" label="Free" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" disabled />
    </RadioGroup>
  ),
}
