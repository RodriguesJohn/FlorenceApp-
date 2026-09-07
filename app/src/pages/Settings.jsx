import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../layout/PageHeader.jsx'
import { CreateBrandDialog } from '../layout/CreateBrandDialog.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Switch } from '../../florence/components/switch/Switch.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../florence/components/tabs/Tabs.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { PLANS } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'
import { useTheme } from '../state/theme.jsx'

export function Settings() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const {
    plan,
    planId,
    workspace,
    createBrand,
    updateBrand,
    mcpConnected,
    mcpEndpoint,
    mcpSnippet,
    connectMcp,
    disconnectMcp,
    choosePlan,
    canGenerate,
    designSystem,
    notify,
  } = usePlatform()
  const { isDark, setTheme } = useTheme()
  const tab = params.get('tab') ?? 'workspace'
  const [copied, setCopied] = useState(false)
  const [writeTools, setWriteTools] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [product, setProduct] = useState(workspace.product)
  const [workspaceName, setWorkspaceName] = useState(workspace.name)

  useEffect(() => {
    setProduct(workspace.product)
    setWorkspaceName(workspace.name)
  }, [workspace.id, workspace.product, workspace.name])

  function setTab(next) {
    setParams({ tab: next })
  }

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

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title={tab === 'mcp' ? 'MCP' : tab === 'plan' ? 'Plan' : 'Workspace'}
        description="Starter generates your first system. Growth is per editor. Agency is a productized workspace."
        actions={
          <Tag tone="brand" size="sm">
            {plan.name}
          </Tag>
        }
      />
      <div className="layout-content">
        <Tabs value={tab} onValueChange={setTab} variant="line" size="sm">
          <TabsList>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="mcp">MCP</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="workspace">
            <section className="layout-split">
              <div className="surface-card">
                <h2 className="surface-card__title">This workspace</h2>
                <div className="stack-form">
                  <Input
                    label="Product"
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                  />
                  <Input
                    label="Brand name"
                    value={workspaceName}
                    onChange={(event) => setWorkspaceName(event.target.value)}
                  />
                  <Input
                    label="Seat"
                    value="John Rodrigues · Workspace admin"
                    hint={
                      planId === 'custom'
                        ? 'Agency can add more seats. Contact us for pricing.'
                        : 'Starter and Growth include one seat per editor.'
                    }
                    readOnly
                  />
                  <div className="layout-header__actions">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={
                        product === workspace.product &&
                        workspaceName === workspace.name
                      }
                      onClick={() => {
                        updateBrand({
                          product: product.trim() || workspace.product,
                          name: workspaceName.trim() || workspace.name,
                        })
                        notify({
                          title: 'Brand saved',
                          description: 'This workspace and its MCP endpoint keep this name.',
                          status: 'success',
                        })
                      }}
                    >
                      Save brand
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setCreateOpen(true)}>
                      Create brand
                    </Button>
                  </div>
                </div>
              </div>
              <div className="stack-form">
                <div className="surface-card">
                  <h2 className="surface-card__title">Appearance</h2>
                  <p className="surface-card__body">
                    Switch between Florence light and dark tokens. The choice stays
                    on this device.
                  </p>
                  <Switch
                    label="Dark mode"
                    checked={isDark}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? 'dark' : 'light')
                    }
                  />
                </div>
                <div className="surface-card">
                  <h2 className="surface-card__title">Design system</h2>
                  <p className="surface-card__body">
                    {designSystem
                      ? `${designSystem.name} is published and served over MCP.`
                      : canGenerate
                        ? 'No system published yet. Run the generator to replace the shared Florence defaults.'
                        : 'Starter generates your system. Upgrade to Growth for every editor.'}
                  </p>
                  <div className="layout-header__actions">
                    {canGenerate ? (
                      <Button variant="primary" onClick={() => navigate('/generator')}>
                        {designSystem ? 'Edit design system' : 'Create design system'}
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={() => setTab('plan')}>
                        View plans
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="mcp">
            <section className="layout-split">
              <div className="surface-card">
                <h2 className="surface-card__title">Florence MCP</h2>
                <p className="surface-card__body">
                  Starter is this MCP. Copy the config into Cursor. It names slop
                  in the product they already have, writes an HTML report of
                  the mistakes, and asks before it fixes.
                </p>
                <Input label="Command" value={mcpEndpoint} readOnly />
                <Switch
                  label="Allow write tools"
                  checked={writeTools}
                  onCheckedChange={setWriteTools}
                />
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
              <div className="surface-card">
                <h2 className="surface-card__title">Agent config</h2>
                <pre className="code-block">
                  <code>{mcpSnippet}</code>
                </pre>
                <Button variant="secondary" size="sm" onClick={copySnippet}>
                  {copied ? 'Copied' : 'Copy config'}
                </Button>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="plan">
            <section className="layout-grid layout-grid--gutter-sm" aria-label="Plans">
              {Object.values(PLANS).map((item) => (
                <article
                  key={item.id}
                  className={`layout-col-4 surface-card plan-card${
                    item.id === planId ? ' plan-card--current' : ''
                  }`}
                >
                  <div className="plan-card__top">
                    <h2 className="surface-card__title">{item.name}</h2>
                    {item.id === planId ? (
                      <Tag tone="brand" size="sm">
                        Current
                      </Tag>
                    ) : null}
                  </div>
                  <p className="plan-card__price">{item.price}</p>
                  <p className="surface-card__body">{item.cadence}</p>
                  <p className="surface-card__body">{item.summary}</p>
                  <ul className="plan-card__features">
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  {item.id === planId ? (
                    <Button variant="secondary" disabled>
                      Current plan
                    </Button>
                  ) : item.id === 'custom' ? (
                    <Button variant="secondary" onClick={() => choosePlan('custom')}>
                      Contact for pricing
                    </Button>
                  ) : (
                    <Button
                      variant={item.id === 'studio' ? 'primary' : 'secondary'}
                      onClick={() => choosePlan(item.id)}
                    >
                      {item.id === 'studio' ? 'Subscribe for $99' : 'Get started'}
                    </Button>
                  )}
                </article>
              ))}
            </section>
            <InsightCard
              tone="info"
              eyebrow="Agency"
              title="Agency is a productized workspace"
              description="Not a custom build. Agencies run Florence across clients. Starter and Growth stay in the product."
            />
          </TabsContent>
        </Tabs>
      </div>

      <CreateBrandDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={(values) => {
          createBrand(values)
          navigate('/brand')
        }}
      />
    </>
  )
}
