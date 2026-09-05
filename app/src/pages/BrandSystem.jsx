import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../layout/PageHeader.jsx'
import { CreateBrandDialog } from '../layout/CreateBrandDialog.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Textarea } from '../../florence/components/textarea/Textarea.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { usePlatform } from '../state/platform.jsx'
import { colorValue } from '../data/platform.js'
import { BrandSetup } from './BrandSetup.jsx'

const TYPE_CLASS = {
  display: 'brand-type brand-type--display',
  heading: 'brand-type brand-type--heading',
  body: 'brand-type brand-type--body',
  label: 'brand-type brand-type--label',
  caption: 'brand-type brand-type--caption',
}

function BrandFonts() {
  useEffect(() => {
    const id = 'northwind-brand-fonts'
    if (document.getElementById(id)) return undefined
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
    document.head.appendChild(link)
    return undefined
  }, [])
  return null
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function EditableText({
  as: Tag = 'p',
  value,
  onCommit,
  className = '',
  multiline = false,
  allowEmpty = false,
  ...props
}) {
  const ref = useRef(null)
  const valueRef = useRef(value)
  const commitRef = useRef(onCommit)
  valueRef.current = value
  commitRef.current = onCommit

  useEffect(() => {
    const node = ref.current
    if (!node || document.activeElement === node) return
    if (node.textContent !== value) {
      node.textContent = value
    }
  }, [value])

  function readNext() {
    return (ref.current?.textContent ?? '').replace(/\u00a0/g, ' ').trim()
  }

  function commit(fromBlur = false) {
    const current = valueRef.current
    const next = readNext()
    if (!next && !allowEmpty) {
      if (fromBlur && ref.current) ref.current.textContent = current
      return
    }
    if (next !== current) commitRef.current(next)
  }

  return (
    <Tag
      ref={ref}
      className={`brand-editable ${className}`.trim()}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      aria-multiline={multiline || undefined}
      onInput={() => commit(false)}
      onKeyDown={(event) => {
        if (!multiline && event.key === 'Enter') {
          event.preventDefault()
          event.currentTarget.blur()
        }
      }}
      onBlur={() => commit(true)}
      {...props}
    />
  )
}

export function BrandSystem() {
  const navigate = useNavigate()
  const fileId = useId()
  const {
    brandReady,
    mcpConnected,
    workspace,
    createBrand,
    updateBrand,
    generateGuidelines,
    uploadBrandFiles,
  } = usePlatform()
  const [createOpen, setCreateOpen] = useState(false)
  const [voice, setVoice] = useState(workspace.voice)

  useEffect(() => {
    setVoice(workspace.voice)
  }, [workspace.id, workspace.voice])

  if (!brandReady) {
    return <BrandSetup />
  }

  const voiceDirty = voice !== workspace.voice
  const guidelines = workspace.guidelines
  const uploads = workspace.uploads ?? []
  const identity = workspace.identity
  const colors = workspace.colors ?? []
  const typography = workspace.typography
  const pine = colorValue(colors, '--color-brand-pine')
  const linen = colorValue(colors, '--color-brand-linen')
  const displayRole = typography?.roles?.find((role) => role.id === 'display')

  function handleFiles(fileList) {
    const files = Array.from(fileList ?? [])
    if (files.length === 0) return
    uploadBrandFiles(files)
  }

  return (
    <>
      {typography ? <BrandFonts /> : null}
      <PageHeader
        eyebrow="Brand"
        title={workspace.name}
        description={`${workspace.product}. Who they are, color, type, and voice agents must keep.`}
        actions={
          <>
            <Tag tone={mcpConnected ? 'success' : 'neutral'} size="sm">
              {mcpConnected ? 'Served over MCP' : 'Not connected'}
            </Tag>
            <Button variant="secondary" size="sm" onClick={() => setCreateOpen(true)}>
              Create brand
            </Button>
          </>
        }
      />
      <div className="layout-content">
        {!mcpConnected ? (
          <InsightCard
            tone="info"
            eyebrow="Free"
            title={`Connect MCP to serve ${workspace.name}`}
            description="Agents currently guess. The free plan exposes this voice and lockup set through the Florence MCP."
            primaryAction={{
              label: 'Agent Connect',
              onClick: () => navigate('/start'),
            }}
          />
        ) : null}

        {colors.length > 0 ? (
          <section className="surface-card" aria-labelledby="color-title">
            <h2 id="color-title" className="surface-card__title">
              Color system
            </h2>
            {pine && linen ? (
              <div
                className="brand-poster"
                style={{
                  '--brand-poster-bg': pine,
                  '--brand-poster-fg': linen,
                  '--brand-font-display': displayRole?.family,
                }}
              >
                <ul className="brand-poster__swatches">
                  {colors.map((color) => (
                    <li
                      key={color.token}
                      className="brand-poster__swatch"
                      style={{ '--brand-swatch': color.hex }}
                      aria-label={`${color.name}, ${color.hex}`}
                      title={`${color.name}. ${color.role}`}
                    />
                  ))}
                </ul>
                <div className="brand-poster__copy">
                  <EditableText
                    className="brand-poster__name"
                    value={workspace.name}
                    aria-label="Brand name"
                    onCommit={(name) => updateBrand({ name })}
                  />
                  <EditableText
                    className="brand-poster__product"
                    value={workspace.product}
                    aria-label="Product name"
                    onCommit={(product) => updateBrand({ product })}
                  />
                </div>
              </div>
            ) : null}
            <ul className="layout-auto layout-auto--dense brand-palette">
              {colors.map((color) => (
                <li key={color.token} className="brand-chip">
                  <strong>{color.name}</strong>
                  <code>{color.token}</code>
                  <span>
                    {color.role}. {color.usage}.
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {identity ? (
          <section className="layout-split--thirds" aria-label="Brand identity">
            <article className="surface-card">
              <h2 className="surface-card__title">Who they are</h2>
              <EditableText
                className="surface-card__body"
                multiline
                value={identity.who}
                aria-label="Who they are"
                onCommit={(who) =>
                  updateBrand({ identity: { ...identity, who } })
                }
              />
            </article>
            <article className="surface-card">
              <h2 className="surface-card__title">What they do</h2>
              <EditableText
                className="surface-card__body"
                multiline
                value={identity.what}
                aria-label="What they do"
                onCommit={(what) =>
                  updateBrand({ identity: { ...identity, what } })
                }
              />
            </article>
            <article className="surface-card">
              <h2 className="surface-card__title">Who it is for</h2>
              <EditableText
                className="surface-card__body"
                multiline
                value={identity.audience}
                aria-label="Who it is for"
                onCommit={(audience) =>
                  updateBrand({ identity: { ...identity, audience } })
                }
              />
            </article>
          </section>
        ) : null}

        {typography ? (
          <section
            className="surface-card"
            aria-labelledby="type-title"
            style={{
              '--brand-font-display':
                typography.roles?.find((role) => role.id === 'display')?.family,
              '--brand-font-body':
                typography.roles?.find((role) => role.id === 'body')?.family,
            }}
          >
            <h2 id="type-title" className="surface-card__title">
              Typography
            </h2>
            <p className="surface-card__body">{typography.note}</p>
            <ul className="brand-type-list">
              {(typography.roles ?? []).map((role) => (
                <li key={role.id}>
                  <span>
                    {role.role} · {role.name}
                  </span>
                  <EditableText
                    className={TYPE_CLASS[role.id] ?? 'brand-type'}
                    multiline={role.id === 'body'}
                    value={role.sample}
                    aria-label={`${role.role} sample`}
                    onCommit={(sample) =>
                      updateBrand({
                        typography: {
                          ...typography,
                          roles: typography.roles.map((item) =>
                            item.id === role.id ? { ...item, sample } : item,
                          ),
                        },
                      })
                    }
                  />
                  <span>{role.use}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="layout-split" aria-label="Brand kit">
          <div className="surface-card">
            <h2 className="surface-card__title">Generate brand guidelines</h2>
            <p className="surface-card__body">
              Pulls voice, principles, lockups, and enabled skills into a
              document agents can retrieve.
            </p>
            {guidelines ? (
              <p className="surface-card__body">
                Last generated {formatDate(guidelines.generatedAt)}.
              </p>
            ) : (
              <p className="surface-card__body">No guidelines on this brand yet.</p>
            )}
            <div className="layout-header__actions">
              <Button variant="primary" size="sm" onClick={generateGuidelines}>
                {guidelines ? 'Regenerate guidelines' : 'Generate brand guidelines'}
              </Button>
            </div>
          </div>

          <div className="surface-card">
            <h2 className="surface-card__title">Upload brand</h2>
            <p className="surface-card__body">
              Add a kit, PDF, or logo set. Files stay on this brand.
            </p>
            <label className="upload-drop" htmlFor={fileId}>
              <input
                id={fileId}
                className="upload-drop__input"
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.svg,.zip,.json,.ai,.fig"
                onChange={(event) => {
                  handleFiles(event.target.files)
                  event.target.value = ''
                }}
              />
              <span>Drop or choose files</span>
            </label>
          </div>
        </section>

        {uploads.length > 0 ? (
          <section className="surface-card" aria-labelledby="uploads-title">
            <h2 id="uploads-title" className="surface-card__title">
              Uploaded brands
            </h2>
            <ul className="upload-list">
              {uploads.map((file) => (
                <li key={file.id} className="upload-list__item">
                  <div>
                    <strong>{file.name}</strong>
                    <span>
                      {formatBytes(file.size)} · {formatDate(file.addedAt)}
                    </span>
                  </div>
                  <Tag tone="neutral" size="sm">
                    {file.type.split('/')[1] || 'file'}
                  </Tag>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {guidelines ? (
          <section className="surface-card" aria-labelledby="guidelines-title">
            <h2 id="guidelines-title" className="surface-card__title">
              {guidelines.title}
            </h2>
            <ol className="guideline-list">
              {guidelines.sections.map((section) => (
                <li key={section.heading}>
                  <strong>{section.heading}</strong>
                  <p className="surface-card__body">{section.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="surface-card" aria-labelledby="voice-title">
          <h2 id="voice-title" className="surface-card__title">
            Voice
          </h2>
          <Textarea
            label="Brand voice"
            rows={4}
            value={voice}
            onChange={(event) => setVoice(event.target.value)}
            hint="Saved to this brand only. Switching brands keeps the other voice."
          />
          <div className="layout-header__actions">
            <Button
              variant="primary"
              size="sm"
              disabled={!voiceDirty}
              onClick={() => updateBrand({ voice })}
            >
              Save voice
            </Button>
          </div>
        </section>

        <section className="layout-grid layout-grid--gutter-sm" aria-label="Brand principles">
          {workspace.principles.map((principle) => (
            <article key={principle.title} className="layout-col-4 surface-card">
              <h3 className="surface-card__title">{principle.title}</h3>
              <EditableText
                className="surface-card__body"
                multiline
                value={principle.body}
                aria-label={principle.title}
                onCommit={(body) =>
                  updateBrand({
                    principles: workspace.principles.map((item) =>
                      item.title === principle.title ? { ...item, body } : item,
                    ),
                  })
                }
              />
            </article>
          ))}
        </section>

        <section className="surface-card" aria-labelledby="lockups-title">
          <h2 id="lockups-title" className="surface-card__title">
            Lockups
          </h2>
          <ul className="definition-list">
            {workspace.lockups.map((lockup) => (
              <li key={lockup.name}>
                <strong>{lockup.name}</strong>
                <span>{lockup.use}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CreateBrandDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={(values) => createBrand(values)}
      />
    </>
  )
}
