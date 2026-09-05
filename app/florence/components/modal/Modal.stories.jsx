// Hand-written: needs open state and `contained` so it renders inside the canvas.
import { useState } from 'react'
import { Modal } from './Modal.jsx'
import { Button } from '../button/Button.jsx'

export default {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  args: {
    title: 'Delete project?',
    description: 'This cannot be undone.',
    dismissible: true,
  },
}

// Always-open, contained in the canvas — what you want for visual review.
export const Playground = {
  args: { open: true, contained: true },
  render: (args) => (
    <div style={{ position: 'relative', minHeight: 360 }}>
      <Modal {...args} onOpenChange={() => {}}>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Modal>
    </div>
  ),
}

// Real trigger + overlay, to check focus trap and dismissal behaviour.
export const Interactive = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete project</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </div>
        </Modal>
      </>
    )
  },
}
