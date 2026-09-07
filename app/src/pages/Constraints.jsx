import { PageHeader } from '../layout/PageHeader.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { CONSTRAINTS } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

export function Constraints() {
  const { mcpConnected } = usePlatform()

  return (
    <>
      <PageHeader
        eyebrow="Quality"
        title="Guardrails"
        description="Rules the MCP returns with every retrieval. This is how Free removes slop without a custom system."
        actions={
          <Tag tone={mcpConnected ? 'success' : 'warning'} size="sm">
            {mcpConnected ? 'Enforced' : 'Local only'}
          </Tag>
        }
      />
      <div className="layout-content">
        <ol className="constraint-list">
          {CONSTRAINTS.map((constraint, index) => (
            <li key={constraint.id} className="surface-card constraint-card">
              <span className="constraint-card__index">{index + 1}</span>
              <div>
                <h2 className="surface-card__title">{constraint.title}</h2>
                <p className="surface-card__body">{constraint.body}</p>
                <code>{constraint.mcp}</code>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
