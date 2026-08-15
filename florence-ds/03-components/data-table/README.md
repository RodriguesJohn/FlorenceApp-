# Data Table

A responsive table for structured datasets. Data Table supports semantic size
variants, column alignment, custom cell rendering, captions, empty states, row
selection, search, faceted filters, column settings, and optional row actions.

```jsx
import { DataTable } from './DataTable.jsx'

<DataTable
  caption="Team members"
  selectable
  toolbar
  searchPlaceholder="Search members..."
  filters={[
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role' },
  ]}
  columnSettings
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'projects', header: 'Projects' },
  ]}
  rows={[
    { id: 1, name: 'Maya Chen', role: 'Design', projects: 8 },
    { id: 2, name: 'Noah Williams', role: 'Engineering', projects: 5 },
  ]}
/>
```

## Toolbar

Set `toolbar` to enable the control bar above the table:

- **Search** — filters rows across visible text columns (override with `searchKeys`)
- **Filters** — faceted dropdowns per column; options auto-derive from `rows` when omitted
- **Column settings** — show/hide columns with `columnSettings`
- **Active filter chips** — removable chips for the current query and filters
- **Result count** — `Showing X of Y` summary

Use `filteredEmptyMessage` when rows exist but none match the current filters.

## Selection

Use `selectedRowKeys` and `onSelectionChange` for controlled selection, or
`defaultSelectedRowKeys` for an uncontrolled initial value. The select-all
checkbox enters an indeterminate state when only some available rows are
selected.

## Alignment

Columns containing numeric values automatically align their header and cells to
the end for easier comparison. Set `type: 'number'` for formatted numeric
columns, or use `align` to override the inferred alignment.
