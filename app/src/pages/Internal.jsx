import { useState } from 'react'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { DataTable } from '../../florence/components/data-table/DataTable.jsx'
import { InsightCard } from '../../florence/components/insight-card/InsightCard.jsx'
import { KpiCard } from '../../florence/components/kpi-card/KpiCard.jsx'
import { LineChart } from '../../florence/components/charts/line-chart/LineChart.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../florence/components/tabs/Tabs.jsx'
import {
  BOOKING_STATUS_LABEL,
  CAL,
  INTERNAL,
  PLAN_LABEL,
} from '../data/internal.js'

const PLAN_TONE = {
  free: 'neutral',
  studio: 'brand',
  custom: 'success',
}

const STATUS_TONE = {
  scheduled: 'info',
  completed: 'success',
  canceled: 'neutral',
  'no-show': 'warning',
}

function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function people(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

function parseDate(iso) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const [year, month, day] = iso.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  return new Date(iso)
}

function formatDay(iso) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseDate(iso))
}

function formatWhen(iso) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

function openUrl(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function bookingInsight({ freeUsers, paidUsers, bookings }) {
  const total = freeUsers + paidUsers
  const upcoming = bookings.filter((row) => row.status === 'scheduled').length

  if (total === 0 && bookings.length === 0) {
    return {
      tone: 'info',
      title: 'No seats on the board yet',
      description:
        'Free and paid counts will come from Clerk. Booked calls will come from Cal.com. The 15-minute intro is already live.',
    }
  }

  if (paidUsers === 0 && upcoming > 0) {
    return {
      tone: 'opportunity',
      title: `${upcoming} ${upcoming === 1 ? 'call is' : 'calls are'} on the calendar`,
      description: `${people(freeUsers)} on free. Nobody has paid yet. The next Studio seat is in those calls.`,
    }
  }

  if (paidUsers === 0) {
    return {
      tone: 'opportunity',
      title: `${people(freeUsers)} on free, none paid`,
      description: 'Studio is $49 per editor / month. A booked intro is the path from a free MCP seat to a paid one.',
    }
  }

  const rate = Math.round((100 * paidUsers) / total)
  return {
    tone: 'opportunity',
    title: `${people(paidUsers)} paid of ${people(total)} accounts`,
    description: `That is ${rate}% conversion. MRR is ${money(INTERNAL.metrics.mrr)} while Studio stays a subscription.`,
  }
}

const USER_COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'plan',
    header: 'Plan',
    render: (_value, row) => (
      <Tag tone={PLAN_TONE[row.plan] ?? 'neutral'} size="sm">
        {PLAN_LABEL[row.plan] ?? row.plan}
      </Tag>
    ),
  },
  { key: 'createdAt', header: 'Signed up' },
  { key: 'lastSeenAt', header: 'Last seen' },
]

const BOOKING_COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'type', header: 'Call' },
  { key: 'startsAt', header: 'When' },
  {
    key: 'status',
    header: 'Status',
    render: (_value, row) => (
      <Tag tone={STATUS_TONE[row.status] ?? 'neutral'} size="sm">
        {BOOKING_STATUS_LABEL[row.status] ?? row.status}
      </Tag>
    ),
  },
  {
    key: 'url',
    header: 'Cal.com',
    render: (_value, row) =>
      row.url ? (
        <a
          className="table-link"
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          Open booking
        </a>
      ) : (
        '—'
      ),
  },
]

function monthOverMonth(values, format = people) {
  const current = values.at(-1) ?? 0
  const previous = values.at(-2) ?? 0

  if (previous === 0 && current === 0) {
    return { delta: '0%', trend: 'neutral', hint: 'vs last month' }
  }

  if (previous === 0) {
    return {
      delta: `+${format(current)}`,
      trend: current > 0 ? 'up' : 'neutral',
      hint: 'vs last month',
    }
  }

  const pct = Math.round(((current - previous) / Math.abs(previous)) * 100)
  if (pct > 0) return { delta: `+${pct}%`, trend: 'up', hint: 'vs last month' }
  if (pct < 0) return { delta: `${pct}%`, trend: 'down', hint: 'vs last month' }
  return { delta: '0%', trend: 'neutral', hint: 'vs last month' }
}

function toLine(history, key = 'value') {
  return history.map((point) => ({
    label: point.label,
    value: point[key] ?? 0,
  }))
}

export function Internal() {
  const [tab, setTab] = useState('bookings')
  const {
    metrics,
    users,
    bookings,
    mrrHistory,
    revenueHistory,
    seatHistory,
    asOf,
    source,
  } = INTERNAL
  const { freeUsers, paidUsers, revenue, mrr } = metrics
  const insight = bookingInsight({ freeUsers, paidUsers, bookings })
  const upcoming = bookings.filter((row) => row.status === 'scheduled')
  const seats = seatHistory ?? []
  const cash = revenueHistory ?? mrrHistory
  const months = cash.map((point) => point.label)
  const freeGrowth = monthOverMonth(seats.map((point) => point.free))
  const paidGrowth = monthOverMonth(seats.map((point) => point.paid))
  const revenueGrowth = monthOverMonth(
    cash.map((point) => point.value),
    money,
  )
  const mrrGrowth = monthOverMonth(
    mrrHistory.map((point) => point.value),
    money,
  )

  const userRows = users.map((row) => ({
    ...row,
    createdAt: formatDay(row.createdAt),
    lastSeenAt: row.lastSeenAt ? formatDay(row.lastSeenAt) : '—',
  }))

  const bookingRows = bookings.map((row) => ({
    ...row,
    startsAt: formatWhen(row.startsAt),
  }))

  return (
    <>
      <PageHeader
        title="Internal"
        description="Free seats, paid seats, cash collected, MRR, and who booked a call."
        actions={
          <>
            <Tag tone="neutral" size="sm">
              {source === 'snapshot' ? `As of ${formatDay(asOf)}` : 'Live'}
            </Tag>
            <Button variant="secondary" size="sm" onClick={() => openUrl(CAL.inbox)}>
              Open Cal.com inbox
            </Button>
          </>
        }
      />
      <div className="layout-content">
        <section className="layout-split--secondary" aria-label="Free users">
          <KpiCard
            size="lg"
            label="Free users"
            value={people(freeUsers)}
            delta={freeGrowth.delta}
            trend={freeGrowth.trend}
            hint={freeGrowth.hint}
            onClick={() => setTab('users')}
          />
          <LineChart
            title="Free seats"
            description="Accounts on free over time"
            variant="area"
            includeZero
            data={toLine(seats, 'free')}
            height={180}
            showTable={false}
          />
        </section>

        <section className="layout-split--secondary" aria-label="Paid users">
          <KpiCard
            size="lg"
            label="Paid users"
            value={people(paidUsers)}
            delta={paidGrowth.delta}
            trend={paidGrowth.trend}
            hint={paidGrowth.hint}
            onClick={() => setTab('users')}
          />
          <LineChart
            title="Paid seats"
            description="Studio and Custom over time"
            variant="area"
            includeZero
            data={toLine(seats, 'paid')}
            height={180}
            showTable={false}
          />
        </section>

        <section className="layout-split--secondary" aria-label="Revenue">
          <div className="layout-metrics">
            <KpiCard
              size="lg"
              label="Revenue"
              value={money(revenue)}
              delta={revenueGrowth.delta}
              trend={revenueGrowth.trend}
              hint={revenueGrowth.hint}
            />
            <KpiCard
              size="lg"
              label="MRR"
              value={money(mrr)}
              delta={mrrGrowth.delta}
              trend={mrrGrowth.trend}
              hint={mrrGrowth.hint}
            />
          </div>
          <LineChart
            title="Revenue"
            description="Cash collected and recurring revenue"
            variant="area"
            includeZero
            labels={months}
            series={[
              {
                label: 'Revenue',
                data: cash.map((point) => point.value),
              },
              {
                label: 'MRR',
                data: mrrHistory.map((point) => point.value),
              },
            ]}
            height={320}
            showTable={false}
          />
        </section>

        <section className="layout-split--primary" aria-label="Snapshot">
          <InsightCard
            tone={insight.tone}
            eyebrow="Internal"
            title={insight.title}
            description={insight.description}
            primaryAction={{
              label: 'Open Cal.com inbox',
              onClick: () => openUrl(CAL.inbox),
            }}
            secondaryAction={{
              label: 'Open booking page',
              onClick: () => openUrl(CAL.bookingPage),
            }}
          />

          <section className="surface-card" aria-labelledby="internal-calls-title">
            <h2 id="internal-calls-title" className="surface-card__title">
              Cal.com
            </h2>
            <p className="surface-card__body">
              Intro calls use the 15-minute event already on the site.
            </p>
            <ul className="definition-list">
              <li>
                <strong>Upcoming</strong>
                <span>
                  {upcoming.length
                    ? `${upcoming.length} scheduled`
                    : 'None scheduled in this board'}
                </span>
              </li>
              <li>
                <strong>Users</strong>
                <span>Clerk, when billing is live</span>
              </li>
              <li>
                <strong>Revenue</strong>
                <span>Clerk Billing, then this board</span>
              </li>
            </ul>
            <div className="layout-header__actions">
              <Button variant="primary" size="sm" onClick={() => openUrl(CAL.bookingPage)}>
                Open booking page
              </Button>
              <Button variant="secondary" size="sm" onClick={() => openUrl(CAL.inbox)}>
                Open inbox
              </Button>
            </div>
          </section>
        </section>

        <section aria-label="People">
          <Tabs value={tab} onValueChange={setTab} variant="line" size="sm">
            <TabsList>
              <TabsTrigger value="bookings">Booked calls</TabsTrigger>
              <TabsTrigger value="users">Sign-ups</TabsTrigger>
            </TabsList>
            <TabsContent value="bookings">
              <DataTable
                caption="Booked calls"
                columnSettings={false}
                toolbar
                searchPlaceholder="Search booked calls"
                searchKeys={['name', 'email', 'type']}
                filters={[
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { value: 'scheduled', label: 'Scheduled' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'canceled', label: 'Canceled' },
                      { value: 'no-show', label: 'No show' },
                    ],
                  },
                ]}
                emptyMessage="No calls booked yet. Open the Cal.com inbox to see live bookings."
                columns={BOOKING_COLUMNS}
                rows={bookingRows}
                onRowClick={(row) => {
                  if (row.url) openUrl(row.url)
                }}
              />
            </TabsContent>
            <TabsContent value="users">
              <DataTable
                caption="Sign-ups"
                columnSettings={false}
                toolbar
                searchPlaceholder="Search sign-ups"
                searchKeys={['name', 'email']}
                filters={[
                  {
                    key: 'plan',
                    label: 'Plan',
                    options: [
                      { value: 'free', label: 'Free' },
                      { value: 'studio', label: 'Studio' },
                      { value: 'custom', label: 'Custom' },
                    ],
                  },
                ]}
                emptyMessage="No accounts in this board yet. Clerk users will land here."
                columns={USER_COLUMNS}
                rows={userRows}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  )
}
