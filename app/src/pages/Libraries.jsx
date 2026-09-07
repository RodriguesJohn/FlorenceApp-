import { useMemo, useState } from 'react'
import { Component, Layers, Library, Shapes } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Select } from '../../florence/components/select/Select.jsx'
import { Switch } from '../../florence/components/switch/Switch.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Tabs, TabsList, TabsTrigger } from '../../florence/components/tabs/Tabs.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import {
  REFERENCE_KINDS,
  REFERENCE_LIBRARIES,
} from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

const KIND_ICONS = {
  'Design system': Layers,
  'Component library': Component,
  Icons: Shapes,
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Design system', label: 'Design systems' },
  { id: 'Component library', label: 'Libraries' },
  { id: 'Icons', label: 'Icons' },
]

function catalogFor(workspace) {
  const pinnedIds = new Set((workspace.references ?? []).map((ref) => ref.id))
  const custom = (workspace.references ?? [])
    .filter((ref) => ref.provider === 'custom')
    .map((ref) => ({
      ...ref,
      maker: ref.maker || 'Custom',
      pinned: true,
    }))
  const catalog = REFERENCE_LIBRARIES.map((item) => ({
    ...item,
    pinned: pinnedIds.has(item.id),
  }))
  return [...custom, ...catalog]
}

export function Libraries() {
  const { workspace, pinReference, unpinReference } = usePlatform()
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('all')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [libraryKind, setLibraryKind] = useState('Design system')
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')

  const libraries = useMemo(() => catalogFor(workspace), [workspace])
  const pinnedCount = libraries.filter((item) => item.pinned).length
  const needle = query.trim().toLowerCase()
  const visible = libraries.filter((item) => {
    const matchesKind = kind === 'all' || item.kind === kind
    const haystack = `${item.name} ${item.maker} ${item.kind} ${item.summary}`.toLowerCase()
    const matchesQuery = !needle || haystack.includes(needle)
    return matchesKind && matchesQuery
  })

  function reset() {
    setName('')
    setLibraryKind('Design system')
    setUrl('')
    setSummary('')
  }

  function handleAdd() {
    if (!name.trim() || !url.trim()) return
    pinReference({
      id: `custom-${Date.now().toString(36)}`,
      provider: 'custom',
      name: name.trim(),
      maker: 'Custom',
      kind: libraryKind,
      url: url.trim(),
      summary: summary.trim() || 'Custom reference library',
    })
    reset()
    setOpen(false)
  }

  function handleToggle(item, enabled) {
    if (enabled) {
      pinReference(item)
      return
    }
    unpinReference(item.id)
  }

  return (
    <>
      <PageHeader
        eyebrow="Connect"
        title="Libraries"
        description={`Explore design systems and component libraries. Pin the ones agents should retrieve for ${workspace.name}.`}
        actions={
          <>
            <Tag tone={pinnedCount ? 'success' : 'neutral'} size="sm">
              {pinnedCount
                ? `${pinnedCount} on this brand`
                : 'None on this brand'}
            </Tag>
            <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
              Add library
            </Button>
          </>
        }
      />
      <div className="layout-content">
        {pinnedCount === 0 ? (
          <InsightCard
            tone="info"
            eyebrow={workspace.name}
            title="No reference libraries on this brand yet"
            description="Pin a design system or component library so agents retrieve known patterns instead of inventing new ones."
            primaryAction={{
              label: 'Add library',
              onClick: () => setOpen(true),
            }}
          />
        ) : null}

        <div className="library-toolbar">
          <Input
            aria-label="Search libraries"
            placeholder="Polaris, Radix, Lucide"
            size="sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Tabs value={kind} onValueChange={setKind} variant="line" size="sm">
            <TabsList aria-label="Library kind">
              {FILTERS.map((filter) => (
                <TabsTrigger key={filter.id} value={filter.id}>
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {visible.length === 0 ? (
          <InsightCard
            tone="info"
            title="No libraries match"
            description="Try another kind, or add a library URL this brand should retrieve."
            primaryAction={{
              label: 'Add library',
              onClick: () => setOpen(true),
            }}
          />
        ) : (
          <section className="layout-auto layout-auto--dense" aria-label="Reference libraries">
            {visible.map((item) => {
              const Icon = KIND_ICONS[item.kind] ?? Library
              return (
                <article key={item.id} className="surface-card">
                  <div className="connector-card__top">
                    <div className="connector-card__identity">
                      <span className="connector-card__mark" aria-hidden="true">
                        <Icon />
                      </span>
                      <div>
                        <h2 className="surface-card__title">{item.name}</h2>
                        <p className="library-card__maker">{item.maker}</p>
                      </div>
                    </div>
                    <Tag tone={item.pinned ? 'success' : 'neutral'} size="sm">
                      {item.pinned ? 'On this brand' : 'Reference'}
                    </Tag>
                  </div>
                  <Tag tone="neutral" size="sm">
                    {item.kind}
                  </Tag>
                  <p className="surface-card__body">{item.summary}</p>
                  <Switch
                    label="Use as reference"
                    size="sm"
                    checked={item.pinned}
                    onCheckedChange={(enabled) => handleToggle(item, enabled)}
                  />
                  {item.url ? (
                    <div className="layout-header__actions">
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() =>
                          window.open(item.url, '_blank', 'noopener,noreferrer')
                        }
                      >
                        Open docs
                      </Button>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </section>
        )}
      </div>

      <Modal
        open={open}
        onOpenChange={(next) => {
          if (!next) reset()
          setOpen(next)
        }}
        title="Add library"
        description={`This stays on ${workspace.name} and is served as a reference.`}
        size="sm"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={!name.trim() || !url.trim()}
            >
              Add library
            </Button>
          </>
        }
      >
        <div className="stack-form">
          <Input
            label="Name"
            placeholder="Acme UI kit"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Select
            label="Kind"
            options={REFERENCE_KINDS}
            value={libraryKind}
            onValueChange={setLibraryKind}
          />
          <Input
            label="Docs URL"
            placeholder="https://design.acme.com"
            hint="A hosted design system, Storybook, or component docs."
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <Input
            label="What agents should use it for"
            placeholder="Checkout patterns and data tables"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
      </Modal>
    </>
  )
}
