import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../layout/PageHeader.jsx'
import { KpiCard } from '../../florence/components/kpi-card/KpiCard.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { DataTable } from '../../florence/components/data-table/DataTable.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { Timeline } from '../../florence/components/timeline/Timeline.jsx'
import { EVAL_RUNS } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

const COLUMNS = [
  { key: 'suite', header: 'Suite' },
  { key: 'score', header: 'Score' },
  {
    key: 'status',
    header: 'Status',
    render: (_value, row) => (
      <Tag tone={row.tone} size="sm">
        {row.status}
      </Tag>
    ),
  },
  { key: 'ran', header: 'Ran' },
]

function nextSteps({ mcpConnected, connectedCount }) {
  if (!mcpConnected) {
    return [
      {
        status: 'now',
        phase: 'Now',
        title: 'Connect MCP',
        body: 'Point your coding agent at this workspace so retrieval is live.',
      },
      {
        status: 'next',
        phase: 'Next',
        title: connectedCount ? 'Review evals' : 'Connect a source',
        body: connectedCount
          ? 'Score whether agents stayed on-system after they retrieve.'
          : 'GitHub, Figma, or Storybook so agents use what you already ship.',
      },
      {
        status: 'later',
        phase: 'Later',
        title: 'Keep skills on',
        body: 'MCP serves the skills that are enabled on this brand.',
      },
    ]
  }

  if (!connectedCount) {
    return [
      {
        status: 'later',
        phase: 'Done',
        title: 'MCP is live',
        body: 'Agents can retrieve this workspace.',
      },
      {
        status: 'now',
        phase: 'Now',
        title: 'Connect a source',
        body: 'Pull components and tokens from GitHub, Figma, or Storybook.',
      },
      {
        status: 'next',
        phase: 'Next',
        title: 'Watch evals',
        body: 'Fail runs that invent UI instead of retrieving contracts.',
      },
    ]
  }

  return [
    {
      status: 'later',
      phase: 'Done',
      title: 'Workspace is serving',
      body: 'MCP, sources, and skills are on the wire.',
    },
    {
      status: 'now',
      phase: 'Now',
      title: 'Watch evals',
      body: 'Slop score and contract pass tell you if agents stayed on-system.',
    },
    {
      status: 'next',
      phase: 'Next',
      title: 'Keep sources current',
      body: 'Update a connected library when the system you ship changes.',
    },
  ]
}

export function Dashboard() {
  const navigate = useNavigate()
  const { workspace, mcpConnected, designSystem } = usePlatform()
  const connectedCount = (workspace.connectors ?? []).length
  const skillsOn = (workspace.skills ?? []).filter((skill) => skill.enabled).length

  return (
    <>
      <PageHeader
        eyebrow="Quality"
        title="Dashboard"
        description={`Health of ${workspace.name}. MCP, sources, skills, and whether agents stayed on-system.`}
        actions={
          <Tag tone={mcpConnected ? 'success' : 'neutral'} size="sm">
            {mcpConnected ? 'MCP live' : 'MCP off'}
          </Tag>
        }
      />
      <div className="layout-content">
        <section
          className="layout-metrics layout-metrics--fixed-4"
          aria-label="Workspace health"
        >
          <KpiCard
            size="md"
            label="MCP"
            value={mcpConnected ? 'Live' : 'Off'}
            hint={
              mcpConnected
                ? 'Agents can retrieve this workspace'
                : 'Local only until you connect'
            }
            onClick={() => navigate('/start')}
          />
          <KpiCard
            size="md"
            label="Sources"
            value={String(connectedCount)}
            hint={
              connectedCount
                ? 'Connected for retrieval'
                : 'None connected'
            }
            onClick={() => navigate('/connectors')}
          />
          <KpiCard
            size="md"
            label="Skills on"
            value={String(skillsOn)}
            hint="Served with the brand"
            onClick={() => navigate('/skills')}
          />
          <KpiCard
            size="md"
            label="Slop score"
            value="12"
            delta="-6"
            trend="down"
            hint="Lower is better, last 7 days"
            onClick={() => navigate('/evals')}
          />
        </section>

        {!mcpConnected ? (
          <InsightCard
            tone="warning"
            eyebrow="Coverage"
            title="MCP is off, so this dashboard is local only"
            description="Connect the free MCP to score the UI agents actually ship, and to serve this brand over the wire."
            primaryAction={{
              label: 'Agent Connect',
              onClick: () => navigate('/start'),
            }}
            secondaryAction={{
              label: 'View evals',
              onClick: () => navigate('/evals'),
            }}
          />
        ) : (
          <InsightCard
            tone="info"
            eyebrow={designSystem ? designSystem.name : workspace.name}
            title="This workspace is on the wire"
            description={
              designSystem
                ? 'Studio published a system. Evals fail if agents ignore it.'
                : 'Free is serving Florence. Evals score whether agents retrieved it.'
            }
            primaryAction={{
              label: 'View evals',
              onClick: () => navigate('/evals'),
            }}
          />
        )}

        <section className="layout-split--primary" aria-label="Activity">
          <DataTable
            caption="Recent eval runs"
            columnSettings={false}
            columns={COLUMNS}
            rows={EVAL_RUNS}
            onRowClick={() => navigate('/evals')}
          />
          <section className="surface-card" aria-labelledby="dashboard-next-title">
            <h2 id="dashboard-next-title" className="surface-card__title">
              Next
            </h2>
            <Timeline
              label="What to do next"
              headingLevel={3}
              items={nextSteps({ mcpConnected, connectedCount })}
            />
          </section>
        </section>
      </div>
    </>
  )
}
