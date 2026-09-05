import { PageHeader } from '../layout/PageHeader.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { DataTable } from '../../florence/components/data-table/DataTable.jsx'
import { COMPONENT_CATALOG } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'

const COLUMNS = [
  { key: 'name', header: 'Component' },
  {
    key: 'category',
    header: 'Category',
    render: (value) => (
      <Tag tone="neutral" size="sm">
        {value}
      </Tag>
    ),
  },
  { key: 'when', header: 'When to use' },
  { key: 'id', header: 'Contract', render: (value) => <code>{value}.json</code> },
]

export function ComponentsPage() {
  const { designSystem } = usePlatform()

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Components"
        description={
          designSystem
            ? `Contracts published with ${designSystem.name}.`
            : 'Retrieve the contract before composing. The MCP will not invent a sibling control.'
        }
      />
      <div className="layout-content">
        <DataTable
          caption="Component catalog"
          toolbar
          columnSettings={false}
          searchPlaceholder="Search components"
          searchKeys={['name', 'category', 'when', 'id']}
          columns={COLUMNS}
          rows={COMPONENT_CATALOG}
        />
      </div>
    </>
  )
}
