import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Textarea } from '../../florence/components/textarea/Textarea.jsx'
import { Select } from '../../florence/components/select/Select.jsx'
import { Timeline } from '../../florence/components/timeline/Timeline.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { usePlatform } from '../state/platform.jsx'

const ACCENTS = [
  { value: 'ledger', label: 'Ledger — calm blue, dense tools' },
  { value: 'atelier', label: 'Atelier — warm ink, editorial' },
  { value: 'signal', label: 'Signal — high contrast, ops' },
]

export function Generator() {
  const navigate = useNavigate()
  const { canGenerate, workspace, designSystem, publishSystem } = usePlatform()
  const [step, setStep] = useState(0)
  const [name, setName] = useState(designSystem?.name ?? `${workspace.product} system`)
  const [voice, setVoice] = useState(
    designSystem?.voice ?? 'Calm, precise, sentence case. Name the action.',
  )
  const [accent, setAccent] = useState(designSystem?.accent ?? 'ledger')

  useEffect(() => {
    setStep(0)
    setName(designSystem?.name ?? `${workspace.product} system`)
    setVoice(designSystem?.voice ?? workspace.voice)
    setAccent(designSystem?.accent ?? 'ledger')
  }, [workspace.id, workspace.product, workspace.voice, designSystem])

  const items = useMemo(
    () => [
      {
        status: step === 0 ? 'now' : 'later',
        phase: step === 0 ? 'Now' : 'Done',
        title: 'Name the system',
        body: 'One system on Starter. Growth covers every editor.',
      },
      {
        status: step === 1 ? 'now' : step < 1 ? 'next' : 'later',
        phase: step === 1 ? 'Now' : step < 1 ? 'Next' : 'Done',
        title: 'Write the voice',
        body: 'Agents retrieve this before they write UI copy.',
      },
      {
        status: step === 2 ? 'now' : step < 2 ? 'next' : 'later',
        phase: step === 2 ? 'Now' : 'Next',
        title: 'Pick a foundation',
        body: 'Semantic tokens stay. You choose the direction.',
      },
    ],
    [step],
  )

  if (!canGenerate) {
    return (
      <>
        <PageHeader
          eyebrow="Starter"
          title="Design system generator"
          description="Included on Starter ($19 / month) and Growth ($99 per editor / month)."
        />
        <div className="layout-content">
          <InsightCard
            tone="opportunity"
            eyebrow="Starter"
            title="Connect MCP first, then generate when you are ready"
            description="Starter generates your first system. Growth publishes it for every editor."
            primaryAction={{
              label: 'View plans',
              onClick: () => navigate('/settings?tab=plan'),
            }}
            secondaryAction={{
              label: 'Agent Connect',
              onClick: () => navigate('/start'),
            }}
          />
        </div>
      </>
    )
  }

  function next() {
    setStep((current) => Math.min(current + 1, 2))
  }

  function back() {
    setStep((current) => Math.max(current - 1, 0))
  }

  function publish() {
    publishSystem({
      name,
      voice,
      accent,
      publishedAt: new Date().toISOString(),
    })
    navigate('/tokens')
  }

  return (
    <>
      <PageHeader
        eyebrow="Starter"
        title="Design system generator"
        description="Create one system for this seat, then MCP serves it instead of the shared Florence default."
      />
      <div className="layout-content">
        <div className="layout-split--primary">
          <section className="surface-card" aria-label="Generator">
            {step === 0 ? (
              <Input
                label="System name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                hint="Shown in the workspace and in MCP responses."
              />
            ) : null}
            {step === 1 ? (
              <Textarea
                label="Voice"
                rows={6}
                value={voice}
                onChange={(event) => setVoice(event.target.value)}
                hint="Agents must follow this before writing labels or empty states."
              />
            ) : null}
            {step === 2 ? (
              <Select
                label="Foundation direction"
                options={ACCENTS}
                value={accent}
                onValueChange={setAccent}
                hint="Tokens stay semantic. This only sets the starting mood."
              />
            ) : null}
            <div className="layout-header__actions generator-actions">
              {step > 0 ? (
                <Button variant="tertiary" onClick={back}>
                  Back
                </Button>
              ) : null}
              {step < 2 ? (
                <Button variant="primary" onClick={next} disabled={!name.trim()}>
                  Continue
                </Button>
              ) : (
                <Button variant="primary" onClick={publish} disabled={!name.trim()}>
                  Publish to workspace
                </Button>
              )}
            </div>
          </section>
          <Timeline label="Generator steps" items={items} headingLevel={3} />
        </div>
      </div>
    </>
  )
}
