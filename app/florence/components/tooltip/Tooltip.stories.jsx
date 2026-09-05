// Hand-written: needs a real trigger child, or nothing renders.
import { Tooltip } from './Tooltip.jsx'
import { Button } from '../button/Button.jsx'

export default {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { content: 'Export CSV', side: 'top' },
}

const center = { display: 'flex', justifyContent: 'center', padding: '4rem 0' }

export const Playground = {
  render: (args) => (
    <div style={center}>
      <Tooltip {...args}><Button variant="tertiary">Export</Button></Tooltip>
    </div>
  ),
}

export const AllSides = {
  name: 'All sides',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '4rem 0' }}>
      {['top', 'right', 'bottom', 'left'].map((side) => (
        <Tooltip key={side} content={`Opens ${side}`} side={side} open>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
}
