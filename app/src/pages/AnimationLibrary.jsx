import { PageHeader } from '../layout/PageHeader.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../florence/components/tabs/Tabs.jsx'
import { ThinkingAnimation } from '../../florence/components/motion-components/thinking-animation/ThinkingAnimation.jsx'
import { LoadingAnimation } from '../../florence/components/motion-components/loading-animation/LoadingAnimation.jsx'
import { ShimmerText } from '../../florence/components/motion-components/shimmer-text/ShimmerText.jsx'
import { NumberTransition } from '../../florence/components/motion-components/number-transition/NumberTransition.jsx'
import { ANIMATION_PATTERNS, ANIMATION_ROLES } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

const PREVIEWS = {
  'thinking-animation': <ThinkingAnimation label="Thinking" size="sm" />,
  'loading-animation': <LoadingAnimation label="Loading" size="sm" variant="grid" />,
  'shimmer-text': <ShimmerText size="sm">Generating…</ShimmerText>,
  'number-transition': <NumberTransition value={73} size="sm" label="Retrieval" />,
}

export function AnimationLibrary() {
  const { mcpConnected } = usePlatform()

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Animation Library"
        description="Motion roles and patterns agents retrieve. No invented timing. No enter from scale(0)."
        actions={
          <Tag tone={mcpConnected ? 'success' : 'neutral'} size="sm">
            {mcpConnected ? 'Served over MCP' : 'Not connected'}
          </Tag>
        }
      />
      <div className="layout-content">
        <Tabs defaultValue="patterns" variant="line" size="sm">
          <TabsList>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <TabsContent value="patterns">
            <section className="layout-grid layout-grid--gutter-sm" aria-label="Motion patterns">
              {ANIMATION_PATTERNS.map((pattern) => (
                <article key={pattern.id} className="layout-col-6 surface-card">
                  <div className="animation-preview">{PREVIEWS[pattern.id]}</div>
                  <div className="skill-card__top">
                    <h2 className="surface-card__title">{pattern.name}</h2>
                    <Tag tone="neutral" size="sm">
                      Motion
                    </Tag>
                  </div>
                  <p className="surface-card__body">{pattern.when}</p>
                  <p className="surface-card__body">When not to use: {pattern.avoid}</p>
                  <code>{pattern.id}.json</code>
                </article>
              ))}
            </section>
          </TabsContent>
          <TabsContent value="roles">
            <ul className="token-list" aria-label="Motion roles">
              {ANIMATION_ROLES.map((item) => (
                <li key={item.name} className="token-row">
                  <span className="token-swatch token-swatch--type" aria-hidden="true" />
                  <div>
                    <code>{item.name}</code>
                    <span>{item.role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
