import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../florence/components/tabs/Tabs.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { TOKEN_GROUPS } from '../data/platform.js'
import { ColorTokens } from './ColorTokens.jsx'
import { usePlatform } from '../state/platform.jsx'

export function FoundationTokens() {
  const navigate = useNavigate()
  const { mcpConnected, canGenerate, designSystem, plan } = usePlatform()

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Tokens"
        description={
          designSystem
            ? `${designSystem.name} is published to this workspace.`
            : 'Semantic roles agents must use. Starter generates your system. Growth publishes it for every editor.'
        }
        actions={
          <>
            <Tag tone={mcpConnected ? 'success' : 'neutral'} size="sm">
              {mcpConnected ? 'MCP live' : 'MCP off'}
            </Tag>
            {canGenerate ? (
              <Button variant="primary" size="sm" onClick={() => navigate('/generator')}>
                {designSystem ? 'Edit system' : 'Create design system'}
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => navigate('/settings?tab=plan')}>
                Upgrade to Growth
              </Button>
            )}
          </>
        }
      />
      <div className="layout-content">
        {!canGenerate ? (
          <InsightCard
            tone="opportunity"
            eyebrow={plan.name}
            title="Generate a system you can plug in"
            description="$19 generates your first design system. $99 per editor / month publishes your tokens here."
            primaryAction={{
              label: 'View plans',
              onClick: () => navigate('/settings?tab=plan'),
            }}
          />
        ) : null}

        <Tabs defaultValue="color" variant="line" size="sm">
          <TabsList>
            {TOKEN_GROUPS.map((group) => (
              <TabsTrigger key={group.id} value={group.id}>
                {group.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TOKEN_GROUPS.map((group) => (
            <TabsContent key={group.id} value={group.id}>
              {group.id === 'color' ? (
                <ColorTokens />
              ) : (
                <ul className="token-list">
                  {group.items.map((item) => (
                    <li key={item.name} className="token-row">
                      {item.swatch ? (
                        <span
                          className="token-swatch"
                          style={{ background: item.swatch }}
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="token-swatch token-swatch--type" aria-hidden="true" />
                      )}
                      <div>
                        <code>{item.name}</code>
                        <span>{item.role}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
