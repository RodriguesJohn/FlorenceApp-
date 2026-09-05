import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
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
  inferBrandNameFromFiles,
} from '../data/platform.js'

const GENERATE_STEPS = [
  {
    title: 'Name the brand',
    body: 'One name for the workspace. Product is what agents must keep saying.',
  },
  {
    title: 'Write the voice',
    body: 'Agents retrieve this before they write labels, empty states, or errors.',
  },
  {
    title: 'Generate the kit',
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

export function BrandSetup() {
  const fileId = useId()
  const { completeBrandSetup } = usePlatform()
  const [tab, setTab] = useState('generate')
  const [step, setStep] = useState(0)
  const [name, setName] = useState(DEMO_BRAND_DEFAULTS.name)
  const [product, setProduct] = useState(DEMO_BRAND_DEFAULTS.product)
  const [voice, setVoice] = useState(DEMO_BRAND_DEFAULTS.voice)
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [busy, setBusy] = useState(false)
  const [phase, setPhase] = useState('')
  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false
    return () => {
      cancelledRef.current = true
    }
  }, [])

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
      completeBrandSetup(builder())
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

  return (
    <>
      <PageHeader
        eyebrow="Brand"
        title="Set up this brand"
        description="Generate guidelines from voice, or upload a kit you already have."
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
              Generate brand
            </TabsTrigger>
            <TabsTrigger value="upload" disabled={busy}>
              Upload your brand
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
            ) : (
              <div className="layout-split--primary">
                <section className="surface-card" aria-label="Generate brand">
                  {step === 0 ? (
                    <div className="stack-form">
                      <Input
                        label="Brand name"
                        placeholder="Northwind Health"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        hint="Shown in the workspace switcher and on the MCP card."
                      />
                      <Input
                        label="Product"
                        placeholder="Northwind Clinic"
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
                      placeholder="Calm, precise, sentence case. Name the action."
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
                            {voice.trim() ||
                              'Calm, precise, sentence case. Name the action.'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                  <div className="layout-header__actions generator-actions">
                    {step > 0 ? (
                      <Button variant="tertiary" onClick={() => setStep((current) => current - 1)}>
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
                      >
                        Generate this brand
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

          <TabsContent value="upload">
            {busy && tab === 'upload' ? (
              <section className="surface-card brand-generating" aria-live="polite">
                <ThinkingAnimation label={phase} size="lg" />
                <p className="surface-card__body">
                  Files stay on this brand. A starting voice and guidelines are
                  drafted from the kit.
                </p>
              </section>
            ) : (
              <section className="surface-card" aria-label="Upload your brand">
                <div className="stack-form">
                  <Input
                    label="Brand name"
                    placeholder="Northwind Health"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    hint="Used if the files do not already name the brand."
                  />
                  <Input
                    label="Product"
                    placeholder="Northwind Clinic"
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
                  >
                    Create brand from files
                  </Button>
                </div>
              </section>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
