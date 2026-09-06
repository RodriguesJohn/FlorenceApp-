import { useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { usePlatform } from '../state/platform.jsx'

export function StartHere() {
  const { mcpEndpoint, notify } = usePlatform()
  const [copied, setCopied] = useState(false)

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(mcpEndpoint)
      setCopied(true)
      notify({
        title: 'Copied',
        description: 'Paste it into Cursor Settings → MCP.',
        status: 'success',
      })
    } catch {
      notify({
        title: 'Unable to copy',
        description: 'Select the command and copy it manually.',
        status: 'warning',
      })
    }
  }

  return (
    <>
      <PageHeader
        title="Agent Connect"
        description="Copy the package. Paste it into Cursor. Two steps."
      />
      <div className="layout-content">
        <ol className="constraint-list" aria-label="Connect your agent">
          <li className="surface-card constraint-card">
            <span className="constraint-card__index">1</span>
            <div className="stack-form">
              <div>
                <h2 className="surface-card__title">Copy this command</h2>
                <p className="surface-card__body">
                  This is the npm package.
                </p>
              </div>
              <pre className="code-block">
                <code>{mcpEndpoint}</code>
              </pre>
              <div className="layout-header__actions">
                <Button variant="primary" onClick={copyCommand}>
                  {copied ? 'Copied' : 'Copy command'}
                </Button>
              </div>
            </div>
          </li>
          <li className="surface-card constraint-card">
            <span className="constraint-card__index">2</span>
            <div>
              <h2 className="surface-card__title">Paste it in Cursor</h2>
              <p className="surface-card__body">
                Open Settings → MCP, paste, and save.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}
