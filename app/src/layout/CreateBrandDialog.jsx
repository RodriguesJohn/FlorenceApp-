import { useState } from 'react'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Textarea } from '../../florence/components/textarea/Textarea.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'

export function CreateBrandDialog({ open, onOpenChange, onCreate }) {
  const [name, setName] = useState('')
  const [product, setProduct] = useState('')
  const [voice, setVoice] = useState('')

  function reset() {
    setName('')
    setProduct('')
    setVoice('')
  }

  function handleCreate() {
    if (!name.trim()) return
    onCreate({ name, product, voice })
    reset()
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
      title="Create brand"
      description="A brand is its own workspace: voice, assets, tokens, and MCP endpoint."
      size="md"
      footer={
        <>
          <Button variant="tertiary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate} disabled={!name.trim()}>
            Create brand
          </Button>
        </>
      }
    >
      <div className="stack-form">
        <Input
          label="Brand name"
          placeholder="Northwind Health"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          label="Product"
          placeholder="Northwind Clinic"
          hint="Shown in settings and on the MCP card."
          value={product}
          onChange={(event) => setProduct(event.target.value)}
        />
        <Textarea
          label="Voice"
          rows={4}
          placeholder="Calm, precise, sentence case. Name the action."
          hint="Agents retrieve this before they write UI copy."
          value={voice}
          onChange={(event) => setVoice(event.target.value)}
        />
      </div>
    </Modal>
  )
}
