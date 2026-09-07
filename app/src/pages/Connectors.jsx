import { useState } from 'react'
import { BookOpen, Frame, GitBranch, Library, Package, SwatchBook } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Select } from '../../florence/components/select/Select.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import {
  CONNECTOR_CATALOG,
  LIBRARY_KINDS,
} from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

const ICONS = {
  github: GitBranch,
  figma: Frame,
  storybook: BookOpen,
  chromatic: SwatchBook,
  bit: Package,
}

const SECTIONS = [
  {
    id: 'source',
    kind: 'Source',
    title: 'Source',
    description: 'Repos that already ship tokens, contracts, or a component package.',
  },
  {
    id: 'design',
    kind: 'Design',
    title: 'Design',
    description: 'Figma files and published team libraries.',
  },
  {
    id: 'library',
    kind: 'Library',
    title: 'Libraries',
    description: 'Storybook, Chromatic, Bit, and libraries you add yourself.',
  },
]

function formatConnectedAt(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function ConnectorCard({
  name,
  kind,
  imports,
  source,
  connectedAt,
  connected,
  icon: Icon = Library,
  connectLabel,
  onConnect,
  onUpdate,
  onDisconnect,
}) {
  return (
    <article className="layout-col-6 surface-card">
      <div className="connector-card__top">
        <div className="connector-card__identity">
          <span className="connector-card__mark" aria-hidden="true">
            <Icon />
          </span>
          <div>
            <h3 className="surface-card__title">{name}</h3>
            <Tag tone="neutral" size="sm">
              {kind}
            </Tag>
          </div>
        </div>
        <Tag tone={connected ? 'success' : 'neutral'} size="sm">
          {connected ? 'Connected' : 'Not connected'}
        </Tag>
      </div>
      <p className="surface-card__body">{imports}</p>
      {connected && source ? (
        <p className="connector-card__source">
          {source}
          {connectedAt ? ` · Connected ${formatConnectedAt(connectedAt)}` : ''}
        </p>
      ) : null}
      <div className="layout-header__actions">
        {connected ? (
          <>
            {onUpdate ? (
              <Button variant="secondary" size="sm" onClick={onUpdate}>
                Update source
              </Button>
            ) : null}
            <Button variant="tertiary" size="sm" onClick={onDisconnect}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button variant="primary" size="sm" onClick={onConnect}>
            {connectLabel}
          </Button>
        )}
      </div>
    </article>
  )
}

export function Connectors() {
  const { workspace, connectSource, disconnectSource } = usePlatform()
  const connections = workspace.connectors ?? []
  const [dialog, setDialog] = useState(null)
  const [source, setSource] = useState('')
  const [customName, setCustomName] = useState('')
  const [customKind, setCustomKind] = useState('Library')

  const catalog = CONNECTOR_CATALOG.map((item) => ({
    ...item,
    connection: connections.find((connector) => connector.id === item.id),
  }))
  const customLibraries = connections.filter(
    (connector) =>
      connector.provider === 'custom' ||
      !CONNECTOR_CATALOG.some((item) => item.id === connector.id),
  )
  const connectedCount = connections.length

  function reset() {
    setSource('')
    setCustomName('')
    setCustomKind('Library')
  }

  function closeDialog() {
    reset()
    setDialog(null)
  }

  function openConnect(item) {
    reset()
    setSource(item.connection?.source ?? '')
    setDialog({ type: 'connect', item })
  }

  function openCustom() {
    reset()
    setDialog({ type: 'custom' })
  }

  function handleConnect() {
    if (!dialog || dialog.type !== 'connect' || !source.trim()) return
    const { item } = dialog
    connectSource({
      id: item.id,
      provider: item.id,
      name: item.name,
      kind: item.kind,
      imports: item.imports,
      source: source.trim(),
    })
    closeDialog()
  }

  function handleAddLibrary() {
    if (!customName.trim() || !source.trim()) return
    connectSource({
      id: `custom-${Date.now().toString(36)}`,
      provider: 'custom',
      name: customName.trim(),
      kind: customKind,
      imports: 'Custom component library or token source',
      source: source.trim(),
    })
    closeDialog()
  }

  const isCustom = dialog?.type === 'custom'
  const canSubmit = isCustom
    ? Boolean(customName.trim() && source.trim())
    : Boolean(source.trim())

  return (
    <>
      <PageHeader
        eyebrow="Connect"
        title="Connectors"
        description={`Pull components and tokens into ${workspace.name} from GitHub, Figma, Storybook, or any library you already ship.`}
        actions={
          <>
            <Tag tone={connectedCount ? 'success' : 'neutral'} size="sm">
              {connectedCount
                ? `${connectedCount} connected`
                : 'None connected'}
            </Tag>
            <Button variant="primary" size="sm" onClick={openCustom}>
              Add library
            </Button>
          </>
        }
      />
      <div className="layout-content">
        {connectedCount === 0 ? (
          <InsightCard
            tone="info"
            eyebrow={workspace.name}
            title="No sources connected yet"
            description="Connect GitHub, Figma, or Storybook so agents retrieve the components you already have instead of inventing new ones."
            primaryAction={{
              label: 'Connect GitHub',
              onClick: () => openConnect(CONNECTOR_CATALOG[0]),
            }}
            secondaryAction={{
              label: 'Add library',
              onClick: openCustom,
            }}
          />
        ) : null}

        {SECTIONS.map((section) => {
          const items = catalog.filter((item) => item.kind === section.kind)
          const extras = section.kind === 'Library' ? customLibraries : []
          if (!items.length && !extras.length) return null

          return (
            <section
              key={section.id}
              className="content-section"
              aria-labelledby={`connector-section-${section.id}`}
            >
              <header className="content-section__header">
                <h2
                  id={`connector-section-${section.id}`}
                  className="content-section__title"
                >
                  {section.title}
                </h2>
                <p className="content-section__meta">{section.description}</p>
              </header>
              <div
                className="layout-grid layout-grid--gutter-sm"
                aria-label={section.title}
              >
                {items.map((item) => {
                  const connected = Boolean(item.connection)
                  return (
                    <ConnectorCard
                      key={item.id}
                      name={item.name}
                      kind={item.kind}
                      imports={item.imports}
                      source={item.connection?.source}
                      connectedAt={item.connection?.connectedAt}
                      connected={connected}
                      icon={ICONS[item.id]}
                      connectLabel={`Connect ${item.name}`}
                      onConnect={() => openConnect(item)}
                      onUpdate={connected ? () => openConnect(item) : undefined}
                      onDisconnect={() => disconnectSource(item.id)}
                    />
                  )
                })}
                {extras.map((library) => (
                  <ConnectorCard
                    key={library.id}
                    name={library.name}
                    kind={library.kind}
                    imports={library.imports}
                    source={library.source}
                    connectedAt={library.connectedAt}
                    connected
                    onDisconnect={() => disconnectSource(library.id)}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Modal
        open={Boolean(dialog)}
        onOpenChange={(open) => {
          if (!open) closeDialog()
        }}
        title={
          isCustom
            ? 'Add library'
            : dialog?.item
              ? `Connect ${dialog.item.name}`
              : 'Connect source'
        }
        description={
          isCustom
            ? `This library stays on ${workspace.name} and is served over MCP.`
            : `Florence will retrieve ${dialog?.item?.name ?? 'this source'} for ${workspace.name}.`
        }
        size="sm"
        footer={
          <>
            <Button variant="tertiary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={isCustom ? handleAddLibrary : handleConnect}
              disabled={!canSubmit}
            >
              {isCustom ? 'Add library' : `Connect ${dialog?.item?.name ?? 'source'}`}
            </Button>
          </>
        }
      >
        <div className="stack-form">
          {isCustom ? (
            <>
              <Input
                label="Name"
                placeholder="Acme UI kit"
                value={customName}
                onChange={(event) => setCustomName(event.target.value)}
              />
              <Select
                label="Kind"
                options={LIBRARY_KINDS}
                value={customKind}
                onValueChange={setCustomKind}
              />
              <Input
                label="Library URL"
                placeholder="https://components.acme.com"
                hint="Storybook, Zeroheight, npm, or any hosted component docs."
                value={source}
                onChange={(event) => setSource(event.target.value)}
              />
            </>
          ) : (
            <Input
              label={dialog?.item?.sourceLabel ?? 'Source'}
              placeholder={dialog?.item?.sourcePlaceholder}
              hint={dialog?.item?.sourceHint}
              value={source}
              onChange={(event) => setSource(event.target.value)}
            />
          )}
        </div>
      </Modal>
    </>
  )
}
