import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Textarea } from '../../florence/components/textarea/Textarea.jsx'
import { Timeline } from '../../florence/components/timeline/Timeline.jsx'
import { ThinkingAnimation } from '../../florence/components/motion-components/thinking-animation/ThinkingAnimation.jsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../florence/components/tabs/Tabs.jsx'
import { usePlatform } from '../state/platform.jsx'
import {
  DEMO_BRAND_DEFAULTS,
  buildGeneratedBrand,
  buildUploadedBrand,
  colorValue,
  inferBrandNameFromFiles,
} from '../data/platform.js'

const TYPE_CLASS = {
  display: 'brand-type brand-type--display',
  heading: 'brand-type brand-type--heading',
  body: 'brand-type brand-type--body',
  label: 'brand-type brand-type--label',
  caption: 'brand-type brand-type--caption',
}

const GENERATE_STEPS = [
  {
    title: 'Name the brand',
    body: 'One name for the workspace. Product is the name agents must keep.',
  },
  {
    title: 'Write the voice',
    body: 'Agents retrieve this before they write labels, empty states, or errors.',
  },
  {
    title: 'Generate guidelines',
    body: 'Florence drafts who they are, color, type, lockups, and a document MCP can serve.',
  },
]

const GENERATE_PHASES = [
  'Reading who they are',
  'Drafting what they do',
  'Building a color system',
  'Choosing type for this product',
  'Writing guidelines MCP can serve',
]

const UPLOAD_PHASES = [
  'Reading the files you added',
  'Extracting names and lockups',
  'Drafting a starting voice',
  'Writing guidelines from the kit',
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

async function runPhases(phases, setPhase, isCancelled) {
  if (prefersReducedMotion()) {
    setPhase(phases[phases.length - 1])
    return
  }

  for (const nextPhase of phases) {
    if (isCancelled()) return
    setPhase(nextPhase)
    await wait(700)
  }
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

function BrandKit() {
  const { workspace, updateBrand, generateGuidelines } = usePlatform()
  const [voice, setVoice] = useState(workspace.voice)
  const guidelines = workspace.guidelines
  const identity = workspace.identity
  const colors = workspace.colors ?? []
  const typography = workspace.typography
  const pine = colorValue(colors, '--color-brand-pine')
  const linen = colorValue(colors, '--color-brand-linen')
  const displayRole = typography?.roles?.find((role) => role.id === 'display')
  const voiceDirty = voice !== workspace.voice

  useEffect(() => {
    setVoice(workspace.voice)
  }, [workspace.id, workspace.voice])

  return (
    <div className="content-section">
      {typography ? <BrandFonts /> : null}
      {guidelines ? (
        <section className="surface-card" aria-labelledby="generate-title">
          <h2 id="generate-title" className="surface-card__title">
            {guidelines.title}
          </h2>
          <p className="surface-card__body">
            Last generated {formatDate(guidelines.generatedAt)}.
          </p>
          <div className="layout-header__actions">
            <Button variant="secondary" size="sm" onClick={generateGuidelines}>
              Regenerate guidelines
            </Button>
          </div>
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
              onCommit={(who) => updateBrand({ identity: { ...identity, who } })}
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
              <li key={role.id} className="brand-type-specimen">
                <p className="brand-type-specimen__meta">
                  {role.role} · {role.name}
                </p>
                <EditableText
                  className={TYPE_CLASS[role.id] ?? 'brand-type'}
                  multiline={role.id === 'body' || role.id === 'display'}
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
                <p className="brand-type-specimen__use">{role.use}</p>
              </li>
            ))}
          </ul>
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

      {workspace.principles.length > 0 ? (
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
      ) : null}

      {workspace.lockups.length > 0 ? (
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
      ) : null}
    </div>
  )
}

export function BrandSetup() {
  const fileId = useId()
  const { completeBrandSetup, uploadBrandFiles, workspace } = usePlatform()
  const [tab, setTab] = useState('generate')
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [product, setProduct] = useState('')
  const [voice, setVoice] = useState('')
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [busy, setBusy] = useState(false)
  const [phase, setPhase] = useState('')
  const [finished, setFinished] = useState(false)
  const cancelledRef = useRef(false)
  const uploads = workspace.uploads ?? []

  useEffect(() => {
    cancelledRef.current = false
    return () => {
      cancelledRef.current = true
    }
  }, [])

  useEffect(() => {
    setName('')
    setProduct('')
    setVoice('')
    setStep(0)
    setFiles([])
    setTab('generate')
    setFinished(false)
  }, [workspace.id])

  const timelineItems = useMemo(
    () =>
      GENERATE_STEPS.map((item, index) => ({
        ...item,
        status: step === index ? 'now' : step > index ? 'later' : 'next',
        phase: step === index ? 'Now' : step > index ? 'Done' : 'Next',
      })),
    [step],
  )

  function addFiles(fileList) {
    const next = Array.from(fileList ?? [])
    if (next.length === 0) return
    setFiles((current) => {
      const names = new Set(current.map((file) => file.name))
      return [...current, ...next.filter((file) => !names.has(file.name))]
    })
    if (!name.trim()) {
      const inferred = inferBrandNameFromFiles(next)
      if (inferred) setName(inferred)
    }
  }

  async function finish(builder, phases) {
    setBusy(true)
    try {
      await runPhases(phases, setPhase, () => cancelledRef.current)
      if (cancelledRef.current) return
      completeBrandSetup(builder())
      setFinished(true)
      setTab('generate')
    } finally {
      if (!cancelledRef.current) {
        setBusy(false)
        setPhase('')
      }
    }
  }

  function generateBrand() {
    return finish(
      () => buildGeneratedBrand({ name, product, voice }),
      GENERATE_PHASES,
    )
  }

  function createFromFiles() {
    return finish(
      () => buildUploadedBrand({ name, product, voice, files }),
      UPLOAD_PHASES,
    )
  }

  function handleStoredFiles(fileList) {
    const next = Array.from(fileList ?? [])
    if (next.length === 0) return
    uploadBrandFiles(next)
  }

  return (
    <>
      <PageHeader
        eyebrow="Brand"
        title={finished ? workspace.name : 'Brand System'}
        description={
          finished
            ? `${workspace.product}. Who they are, color, type, and voice agents must keep.`
            : 'Generate guidelines from a voice, or upload a kit you already have.'
        }
      />
      <div className="layout-content">
        <Tabs
          value={tab}
          onValueChange={(next) => {
            if (busy) return
            setTab(next)
          }}
          variant="line"
          size="md"
        >
          <TabsList>
            <TabsTrigger value="generate" disabled={busy}>
              Generate brand guidelines
            </TabsTrigger>
            <TabsTrigger value="upload" disabled={busy}>
              Upload brand guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            {busy && tab === 'generate' ? (
              <section className="surface-card brand-generating" aria-live="polite">
                <ThinkingAnimation label={phase} size="lg" />
                <p className="surface-card__body">
                  Stay on this page. Guidelines will land on the brand when this
                  finishes.
                </p>
              </section>
            ) : finished ? (
              <BrandKit />
            ) : (
              <div className="layout-split--primary">
                <section className="surface-card" aria-label="Generate brand guidelines">
                  {step === 0 ? (
                    <div className="stack-form">
                      <Input
                        label="Brand name"
                        placeholder={DEMO_BRAND_DEFAULTS.name}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        hint="Shown in the workspace switcher and on the MCP card."
                      />
                      <Input
                        label="Product"
                        placeholder={DEMO_BRAND_DEFAULTS.product}
                        value={product}
                        onChange={(event) => setProduct(event.target.value)}
                        hint="Agents must keep this name and not invent a sibling product."
                      />
                    </div>
                  ) : null}
                  {step === 1 ? (
                    <Textarea
                      label="Brand voice"
                      rows={6}
                      placeholder={DEMO_BRAND_DEFAULTS.voice}
                      value={voice}
                      onChange={(event) => setVoice(event.target.value)}
                      hint="Saved to this brand only. Agents retrieve it before they write UI copy."
                    />
                  ) : null}
                  {step === 2 ? (
                    <div className="stack-form">
                      <h2 className="surface-card__title">Ready to generate</h2>
                      <p className="surface-card__body">
                        Florence will draft who they are, what they do, a color
                        system, type, lockups, and a guidelines document.
                      </p>
                      <ul className="definition-list">
                        <li>
                          <strong>{name.trim()}</strong>
                          <span>{product.trim() || name.trim()}</span>
                        </li>
                        <li>
                          <strong>Voice</strong>
                          <span>
                            {voice.trim() || DEMO_BRAND_DEFAULTS.voice}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                  <div className="layout-header__actions generator-actions">
                    {step > 0 ? (
                      <Button
                        variant="tertiary"
                        onClick={() => setStep((current) => current - 1)}
                      >
                        Back
                      </Button>
                    ) : null}
                    {step < 2 ? (
                      <Button
                        variant="primary"
                        onClick={() => setStep((current) => current + 1)}
                        disabled={!name.trim()}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={generateBrand}
                        disabled={!name.trim()}
                        loading={busy}
                      >
                        Generate brand guidelines
                      </Button>
                    )}
                  </div>
                </section>
                <Timeline
                  label="Brand setup steps"
                  items={timelineItems}
                  headingLevel={3}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="content-section">
            {busy && tab === 'upload' ? (
              <section className="surface-card brand-generating" aria-live="polite">
                <ThinkingAnimation label={phase} size="lg" />
                <p className="surface-card__body">
                  Files stay on this brand. A starting voice and guidelines are
                  drafted from the kit.
                </p>
              </section>
            ) : (
              <>
                <section className="surface-card" aria-label="Upload brand guidelines">
                  <div className="stack-form">
                    <Input
                      label="Brand name"
                      placeholder={DEMO_BRAND_DEFAULTS.name}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      hint="Used if the files do not already name the brand."
                    />
                    <Input
                      label="Product"
                      placeholder={DEMO_BRAND_DEFAULTS.product}
                      value={product}
                      onChange={(event) => setProduct(event.target.value)}
                      hint="Optional. Defaults to the brand name."
                    />
                    <label
                      className={`upload-drop${dragOver ? ' upload-drop--active' : ''}`}
                      htmlFor={fileId}
                      onDragOver={(event) => {
                        event.preventDefault()
                        setDragOver(true)
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(event) => {
                        event.preventDefault()
                        setDragOver(false)
                        addFiles(event.dataTransfer.files)
                      }}
                    >
                      <input
                        id={fileId}
                        className="upload-drop__input"
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg,.svg,.zip,.json,.ai,.fig"
                        onChange={(event) => {
                          addFiles(event.target.files)
                          event.target.value = ''
                        }}
                      />
                      <span>Drop a kit, PDF, or logo set, or choose files</span>
                    </label>
                    {files.length > 0 ? (
                      <ul className="upload-list">
                        {files.map((file) => (
                          <li key={file.name} className="upload-list__item">
                            <div>
                              <strong>{file.name}</strong>
                              <span>{file.type || 'file'}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="layout-header__actions generator-actions">
                    <Button
                      variant="primary"
                      onClick={createFromFiles}
                      disabled={files.length === 0}
                      loading={busy}
                    >
                      Create from files
                    </Button>
                  </div>
                </section>
                {finished && uploads.length > 0 ? (
                  <section className="surface-card" aria-labelledby="uploads-title">
                    <h2 id="uploads-title" className="surface-card__title">
                      Uploaded files
                    </h2>
                    <ul className="upload-list">
                      {uploads.map((file) => (
                        <li key={file.id} className="upload-list__item">
                          <div>
                            <strong>{file.name}</strong>
                            <span>{file.type.split('/')[1] || 'file'}</span>
                          </div>
                          <Tag tone="neutral" size="sm">
                            {file.type.split('/')[1] || 'file'}
                          </Tag>
                        </li>
                      ))}
                    </ul>
                    <label className="upload-drop" htmlFor={`${fileId}-more`}>
                      <input
                        id={`${fileId}-more`}
                        className="upload-drop__input"
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg,.svg,.zip,.json,.ai,.fig"
                        onChange={(event) => {
                          handleStoredFiles(event.target.files)
                          event.target.value = ''
                        }}
                      />
                      <span>Add more files</span>
                    </label>
                  </section>
                ) : null}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
