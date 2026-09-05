import { useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Timeline } from '../../florence/components/timeline/Timeline.jsx'
import { usePlatform } from '../state/platform.jsx'

export function StartHere() {
  const {
    mcpConnected,
    mcpEndpoint,
    mcpSnippet,
    connectMcp,
    disconnectMcp,
    notify,
  } = usePlatform()
  const [copied, setCopied] = useState(false)

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(mcpSnippet)
      setCopied(true)
      notify({
        title: 'Copied MCP config',
        description: 'Paste it into Cursor or your agent host.',
        status: 'success',
      })
    } catch {
      notify({
        title: 'Unable to copy',
        description: 'Select the snippet and copy it manually.',
        status: 'warning',
      })
    }
  }

  const steps = mcpConnected
    ? [
        {
          status: 'later',
          phase: 'Done',
          title: 'Copy the MCP config',
          body: 'The snippet on this page points your agent at this workspace.',
        },
        {
          status: 'now',
          phase: 'Now',
          title: 'Paste it into your coding agent',
          body: 'Open Cursor Settings, MCP, then paste and save. Other hosts take the same JSON.',
        },
        {
          status: 'next',
          phase: 'Next',
          title: 'Ask the agent to retrieve Florence',
          body: 'Before it writes UI, it should read tokens, contracts, and constraints from this endpoint.',
        },
      ]
    : [
        {
          status: 'now',
          phase: 'Step 1',
          title: 'Copy the MCP config',
          body: 'Use the snippet on this page. It points your agent at this workspace.',
        },
        {
          status: 'next',
          phase: 'Step 2',
          title: 'Paste it into your coding agent',
          body: 'Open Cursor Settings, MCP, then paste and save. Other hosts take the same JSON.',
        },
        {
          status: 'later',
          phase: 'Step 3',
          title: 'Ask the agent to retrieve Florence',
          body: 'Before it writes UI, it should read tokens, contracts, and constraints from this endpoint.',
        },
      ]

  return (
    <>
      <PageHeader
        eyebrow="Start here"
        title="Agent Connect"
        description="Point Cursor or your coding agent at this workspace. Agents retrieve brand, tokens, and constraints instead of inventing UI."
        actions={
          <Tag tone={mcpConnected ? 'success' : 'neutral'} size="sm">
            {mcpConnected ? 'MCP live' : 'Not connected'}
          </Tag>
        }
      />
      <div className="layout-content">
        <section className="layout-split" aria-label="MCP setup">
          <div className="surface-card">
            <h2 className="surface-card__title">Agent config</h2>
            <p className="surface-card__body">
              Paste this into Cursor Settings, MCP. Any host that accepts an MCP
              server URL can use the same snippet.
            </p>
            <pre className="code-block">
              <code>{mcpSnippet}</code>
            </pre>
            <div className="layout-header__actions">
              <Button variant="primary" onClick={copySnippet}>
                {copied ? 'Copied' : 'Copy config'}
              </Button>
            </div>
          </div>

          <div className="surface-card">
            <h2 className="surface-card__title">Florence MCP</h2>
            <p className="surface-card__body">
              Free includes this endpoint. Connect it so agents retrieve this
              workspace instead of guessing.
            </p>
            <Input label="Endpoint" value={mcpEndpoint} readOnly />
            <div className="layout-header__actions">
              {mcpConnected ? (
                <Button variant="secondary" onClick={disconnectMcp}>
                  Disconnect MCP
                </Button>
              ) : (
                <Button variant="primary" onClick={connectMcp}>
                  Connect MCP
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="surface-card" aria-labelledby="onboard-steps-title">
          <h2 id="onboard-steps-title" className="surface-card__title">
            How to add it
          </h2>
          <Timeline label="MCP onboarding steps" items={steps} headingLevel={3} />
        </section>
      </div>
    </>
  )
}
