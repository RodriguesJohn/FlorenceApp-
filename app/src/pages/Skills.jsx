import { useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Textarea } from '../../florence/components/textarea/Textarea.jsx'
import { Switch } from '../../florence/components/switch/Switch.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { usePlatform } from '../state/platform.jsx'

export function Skills() {
  const { workspace, addSkill, toggleSkill } = usePlatform()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const skills = workspace.skills ?? []

  function reset() {
    setName('')
    setBody('')
  }

  function handleAdd() {
    if (!name.trim() || !body.trim()) return
    addSkill({
      id: `skill-${Date.now().toString(36)}`,
      name: name.trim(),
      body: body.trim(),
      enabled: true,
    })
    reset()
    setOpen(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Skills"
        description={`Agent skills for ${workspace.name}. MCP serves the ones that are on.`}
        actions={
          <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
            Add skill
          </Button>
        }
      />
      <div className="layout-content">
        {skills.length === 0 ? (
          <InsightCard
            tone="info"
            eyebrow={workspace.name}
            title="No skills on this brand yet"
            description="Add a skill so agents know how to compose, write, and retrieve for this brand."
            primaryAction={{
              label: 'Add skill',
              onClick: () => setOpen(true),
            }}
          />
        ) : (
          <section className="layout-grid layout-grid--gutter-sm" aria-label="Brand skills">
            {skills.map((skill) => (
              <article key={skill.id} className="layout-col-6 surface-card">
                <div className="skill-card__top">
                  <h2 className="surface-card__title">{skill.name}</h2>
                  <Tag tone={skill.enabled ? 'success' : 'neutral'} size="sm">
                    {skill.enabled ? 'On' : 'Off'}
                  </Tag>
                </div>
                <p className="surface-card__body">{skill.body}</p>
                <Switch
                  label={skill.enabled ? 'Skill is on' : 'Skill is off'}
                  checked={skill.enabled}
                  onCheckedChange={(enabled) => toggleSkill(skill.id, enabled)}
                />
              </article>
            ))}
          </section>
        )}
      </div>

      <Modal
        open={open}
        onOpenChange={(next) => {
          if (!next) reset()
          setOpen(next)
        }}
        title="Add skill"
        description={`This skill stays on ${workspace.name} and is served over MCP when it is on.`}
        size="sm"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={!name.trim() || !body.trim()}
            >
              Add skill
            </Button>
          </>
        }
      >
        <div className="stack-form">
          <Input
            label="Name"
            placeholder="Review checkout copy"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Textarea
            label="When to use"
            rows={4}
            placeholder="Run this before writing any checkout label."
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
      </Modal>
    </>
  )
}
