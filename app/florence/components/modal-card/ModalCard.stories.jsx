// Hand-written: the card surface on its own, no overlay.
import { ModalCard } from './ModalCard.jsx'
import { Button } from '../button/Button.jsx'

export default {
  title: 'Overlays/ModalCard',
  component: ModalCard,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  args: { title: 'Invite member', description: 'Send an email invite.' },
}

export const Playground = {
  render: (args) => (
    <ModalCard {...args} onClose={() => {}}>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <Button variant="secondary">Cancel</Button>
        <Button>Send invite</Button>
      </div>
    </ModalCard>
  ),
}
