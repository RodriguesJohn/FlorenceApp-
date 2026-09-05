import { useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Select } from '../../florence/components/select/Select.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { CREATIVE_KINDS } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

export function Assets() {
  const { workspace, addCreative } = usePlatform()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState('Social')
  const [usedIn, setUsedIn] = useState('')
  const assets = workspace.creatives ?? []

  function reset() {
    setTitle('')
    setKind('Social')
    setUsedIn('')
  }

  function handleAdd() {
    if (!title.trim()) return
    addCreative({
      id: `creative-${Date.now().toString(36)}`,
      title: title.trim(),
      kind,
      status: 'Draft',
      tone: 'neutral',
      usedIn: usedIn.trim() || 'Unassigned',
    })
    reset()
    setOpen(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="Brand"
        title="Assets"
        description={`Approved campaigns for ${workspace.name}. Agents may reference these, not invent new campaign language.`}
        actions={
          <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
            Add asset
          </Button>
        }
      />
      <div className="layout-content">
        {assets.length === 0 ? (
          <InsightCard
            tone="info"
            eyebrow={workspace.name}
            title="No assets on this brand yet"
            description="Add a film, still, or kit so agents know what is approved to reference."
            primaryAction={{
              label: 'Add asset',
              onClick: () => setOpen(true),
            }}
          />
        ) : (
          <section className="layout-grid layout-grid--gutter-sm" aria-label="Asset library">
            {assets.map((asset) => (
              <article key={asset.id} className="layout-col-6 surface-card asset-card">
                <div className="asset-card__frame" aria-hidden="true" />
                <div className="asset-card__meta">
                  <Tag tone="neutral" size="sm">
                    {asset.kind}
                  </Tag>
                  <Tag tone={asset.tone} size="sm">
                    {asset.status}
                  </Tag>
                </div>
                <h2 className="surface-card__title">{asset.title}</h2>
                <p className="surface-card__body">{asset.usedIn}</p>
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
        title="Add asset"
        description={`This stays on ${workspace.name}.`}
        size="sm"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAdd} disabled={!title.trim()}>
              Add asset
            </Button>
          </>
        }
      >
        <div className="stack-form">
          <Input
            label="Title"
            placeholder="Launch stills, week 12"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Select
            label="Kind"
            options={CREATIVE_KINDS}
            value={kind}
            onValueChange={setKind}
          />
          <Input
            label="Used in"
            placeholder="Website hero, sales deck"
            value={usedIn}
            onChange={(event) => setUsedIn(event.target.value)}
          />
        </div>
      </Modal>
    </>
  )
}
