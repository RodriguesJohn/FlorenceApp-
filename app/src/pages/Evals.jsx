import { PageHeader } from '../layout/PageHeader.jsx'
import { KpiCard } from '../../florence/components/kpi-card/KpiCard.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { DataTable } from '../../florence/components/data-table/DataTable.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
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

export function Evals() {
  const { mcpConnected, designSystem } = usePlatform()

  return (
    <>
      <PageHeader
        eyebrow="Quality"
        title="Evals"
        description="Measure whether agents stayed on-system. Free scores against Florence. Studio scores against your published system."
      />
      <div className="layout-content">
        <section className="layout-metrics" aria-label="Quality">
          <KpiCard
            size="md"
            label="Slop score"
            value="12"
            delta="-6"
            trend="down"
            hint="Lower is better, last 7 days"
          />
          <KpiCard
            size="md"
            label="Contract pass"
            value="94%"
            delta="+3%"
            trend="up"
            hint="Retrieved before compose"
          />
          <KpiCard
            size="md"
            label="Token violations"
            value="3"
            delta="-4"
            trend="down"
            hint="Hex or primitive ramps"
          />
        </section>

        {!mcpConnected ? (
          <InsightCard
            tone="warning"
            eyebrow="Eval coverage"
            title="MCP is off, so these runs are local only"
            description="Connect the free MCP to score the UI agents actually ship in your product."
          />
        ) : (
          <InsightCard
            tone="info"
            eyebrow={designSystem ? designSystem.name : 'Florence'}
            title="Scoring the system currently on the wire"
            description={
              designSystem
                ? 'Studio published a system. Evals now fail if agents ignore it.'
                : 'Free is scoring against the shared Florence system.'
            }
          />
        )}

        <DataTable
          caption="Recent eval runs"
          columnSettings={false}
          columns={COLUMNS}
          rows={EVAL_RUNS}
        />
      </div>
    </>
  )
}
