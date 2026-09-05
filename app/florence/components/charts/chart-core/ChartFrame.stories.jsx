// Hand-written: ChartFrame is the shell the charts sit inside — title,
// legend, table twin, loading and empty states.
import { ChartFrame, ChartLegend, ChartTable } from './ChartFrame.jsx'
import { BarChart } from '../bar-chart/BarChart.jsx'

const data = [
  { label: 'North', value: 2610 },
  { label: 'South', value: 1840 },
  { label: 'East', value: 2210 },
  { label: 'West', value: 1490 },
]

export default {
  title: 'Data Display/ChartFrame',
  component: ChartFrame,
  tags: ['autodocs'],
  args: { title: 'Revenue by region', description: 'Trailing twelve months.' },
}

export const Playground = {
  render: (args) => <ChartFrame {...args}><BarChart data={data} /></ChartFrame>,
}

export const Loading = { args: { isLoading: true }, render: (a) => <ChartFrame {...a} /> }
export const Empty = {
  args: { isEmpty: true, emptyMessage: 'No revenue recorded yet.' },
  render: (a) => <ChartFrame {...a} />,
}

export const Legend = { render: () => <ChartLegend items={data.map((d) => ({ label: d.label }))} /> }
export const Table = {
  name: 'Table twin',
  render: () => <ChartTable columns={['Region', 'Revenue']} rows={data.map((d) => [d.label, d.value])} />,
}
