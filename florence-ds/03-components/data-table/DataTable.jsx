import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Search, Settings, X } from 'lucide-react'
import { Button } from '../button/Button.jsx'
import { Checkbox } from '../checkbox/Checkbox.jsx'
import { Input } from '../input/Input.jsx'
import { Select } from '../select/Select.jsx'
import './data-table.css'

const SIZES = {
  sm: 'data-table--sm',
  md: 'data-table--md',
  lg: 'data-table--lg',
}

function deriveFilterOptions(rows, key) {
  const values = [
    ...new Set(
      rows
        .map((row) => row[key])
        .filter((value) => value !== null && value !== undefined && value !== ''),
    ),
  ]

  return values
    .sort((left, right) => String(left).localeCompare(String(right)))
    .map((value) => ({
      value: String(value),
      label: String(value),
    }))
}

function normalizeFilterOptions(filter, rows) {
  const derived = deriveFilterOptions(rows, filter.key)
  const options = filter.options ?? derived

  return [
    { value: '', label: filter.allLabel ?? `All ${filter.label.toLowerCase()}` },
    ...options,
  ]
}

function rowMatchesSearch(row, query, searchKeys, columns) {
  if (!query) return true

  const keys =
    searchKeys ??
    columns
      .map((column) => column.key)
      .filter((key) => key !== 'actions')

  const haystack = keys
    .map((key) => row[key])
    .filter((value) => value !== null && value !== undefined)
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

export function DataTable({
  columns = [],
  rows = [],
  caption,
  emptyMessage = 'No data available.',
  filteredEmptyMessage = 'No rows match the current filters.',
  size = 'md',
  getRowKey = (row, index) => row.id ?? index,
  onRowClick,
  selectable = false,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  onSelectionChange,
  isRowSelectable = () => true,
  selectAllLabel = 'Select all rows',
  getRowSelectionLabel = (row, index) =>
    `Select row ${row.name ?? index + 1}`,
  toolbar = false,
  searchPlaceholder = 'Search table',
  searchKeys,
  filters = [],
  columnSettings = true,
  defaultHiddenColumns = [],
  hiddenColumns: hiddenColumnsProp,
  onHiddenColumnsChange,
  onFilteredRowsChange,
  className = '',
  ...props
}) {
  const settingsId = useId()
  const settingsRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterValues, setFilterValues] = useState({})
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [uncontrolledHiddenColumns, setUncontrolledHiddenColumns] = useState(
    defaultHiddenColumns,
  )

  const isHiddenColumnsControlled = hiddenColumnsProp !== undefined
  const hiddenColumnKeys = isHiddenColumnsControlled
    ? hiddenColumnsProp
    : uncontrolledHiddenColumns
  const hiddenColumnSet = new Set(hiddenColumnKeys)

  const visibleColumns = useMemo(
    () => columns.filter((column) => !hiddenColumnSet.has(column.key)),
    [columns, hiddenColumnKeys],
  )

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (!rowMatchesSearch(row, searchQuery, searchKeys, columns)) {
        return false
      }

      return filters.every((filter) => {
        const value = filterValues[filter.key] ?? ''
        if (!value) return true
        return String(row[filter.key] ?? '') === value
      })
    })
  }, [rows, searchQuery, searchKeys, columns, filters, filterValues])

  useEffect(() => {
    onFilteredRowsChange?.(filteredRows)
  }, [filteredRows, onFilteredRowsChange])

  useEffect(() => {
    if (!settingsOpen) return undefined

    function handlePointerDown(event) {
      if (!settingsRef.current?.contains(event.target)) {
        setSettingsOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setSettingsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [settingsOpen])

  const isSelectionControlled = selectedRowKeys !== undefined
  const [uncontrolledSelectedRowKeys, setUncontrolledSelectedRowKeys] =
    useState(defaultSelectedRowKeys)
  const resolvedSelectedRowKeys = isSelectionControlled
    ? selectedRowKeys
    : uncontrolledSelectedRowKeys
  const selectedKeySet = new Set(resolvedSelectedRowKeys)
  const selectableRows = filteredRows
    .map((row, index) => ({
      row,
      index,
      key: getRowKey(row, rows.indexOf(row)),
    }))
    .filter(({ row, index }) => isRowSelectable(row, index))
  const selectedSelectableRows = selectableRows.filter(({ key }) =>
    selectedKeySet.has(key),
  )
  const allRowsSelected =
    selectableRows.length > 0 &&
    selectedSelectableRows.length === selectableRows.length
  const someRowsSelected =
    selectedSelectableRows.length > 0 && !allRowsSelected

  const activeFilters = filters.filter(
    (filter) => Boolean(filterValues[filter.key]),
  )
  const hasActiveControls =
    Boolean(searchQuery) || activeFilters.length > 0

  function getColumnAlignment(column) {
    if (column.align) return column.align
    if (column.type === 'number') return 'end'

    const values = filteredRows
      .map((row) => row[column.key])
      .filter((value) => value !== null && value !== undefined)

    return values.length > 0 &&
      values.every((value) => typeof value === 'number')
      ? 'end'
      : 'start'
  }

  const classes = [
    'data-table',
    SIZES[size] ?? SIZES.md,
    onRowClick ? 'data-table--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function updateSelection(nextKeys) {
    if (!isSelectionControlled) setUncontrolledSelectedRowKeys(nextKeys)
    const nextKeySet = new Set(nextKeys)
    onSelectionChange?.(
      nextKeys,
      rows.filter((row, index) => nextKeySet.has(getRowKey(row, index))),
    )
  }

  function toggleAllRows(nextChecked) {
    const selectableKeySet = new Set(selectableRows.map(({ key }) => key))
    const nextKeys = nextChecked
      ? [
          ...resolvedSelectedRowKeys,
          ...selectableRows
            .map(({ key }) => key)
            .filter((key) => !selectedKeySet.has(key)),
        ]
      : resolvedSelectedRowKeys.filter((key) => !selectableKeySet.has(key))
    updateSelection(nextKeys)
  }

  function toggleRow(row, index, nextChecked) {
    const key = getRowKey(row, index)
    const nextKeys = nextChecked
      ? selectedKeySet.has(key)
        ? resolvedSelectedRowKeys
        : [...resolvedSelectedRowKeys, key]
      : resolvedSelectedRowKeys.filter((selectedKey) => selectedKey !== key)
    updateSelection(nextKeys)
  }

  function activateRow(event, row, index) {
    if (!onRowClick) return
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
      return
    }
    if (event.type === 'keydown') event.preventDefault()
    onRowClick(row, index)
  }

  function updateHiddenColumns(nextKeys) {
    const safeKeys = nextKeys.filter((key) =>
      columns.some((column) => column.key === key),
    )
    const nextVisibleCount = columns.length - safeKeys.length
    if (nextVisibleCount < 1) return

    if (!isHiddenColumnsControlled) setUncontrolledHiddenColumns(safeKeys)
    onHiddenColumnsChange?.(safeKeys)
  }

  function toggleColumnVisibility(columnKey, visible) {
    const nextKeys = visible
      ? hiddenColumnKeys.filter((key) => key !== columnKey)
      : [...hiddenColumnKeys, columnKey]
    updateHiddenColumns(nextKeys)
  }

  function updateFilterValue(key, value) {
    setFilterValues((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function clearFilters() {
    setSearchQuery('')
    setFilterValues({})
  }

  function removeFilterChip(key) {
    setFilterValues((current) => ({
      ...current,
      [key]: '',
    }))
  }

  const resolvedEmptyMessage =
    rows.length > 0 && filteredRows.length === 0
      ? filteredEmptyMessage
      : emptyMessage

  return (
    <div className="data-table-shell">
      {toolbar ? (
        <div className="data-table__toolbar">
          <div className="data-table__search">
            <Search
              className="data-table__search-icon"
              size={16}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <Input
              size="sm"
              className="data-table__search-input"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label={searchPlaceholder}
            />
          </div>

          {filters.map((filter) => (
            <Select
              key={filter.key}
              size="sm"
              className="data-table__filter"
              label={filter.label}
              value={filterValues[filter.key] ?? ''}
              onValueChange={(value) => updateFilterValue(filter.key, value)}
              options={normalizeFilterOptions(filter, rows)}
            />
          ))}

          <div className="data-table__toolbar-actions">
            {hasActiveControls ? (
              <Button
                size="sm"
                variant="tertiary"
                className="data-table__clear"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            ) : null}

            {columnSettings ? (
              <div className="data-table__settings" ref={settingsRef}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="data-table__settings-trigger"
                  aria-expanded={settingsOpen}
                  aria-controls={`${settingsId}-panel`}
                  onClick={() => setSettingsOpen((open) => !open)}
                >
                  <Settings size={16} strokeWidth={1.6} aria-hidden="true" />
                  Columns
                </Button>

                {settingsOpen ? (
                  <div
                    id={`${settingsId}-panel`}
                    className="data-table__settings-panel"
                    role="dialog"
                    aria-label="Column settings"
                  >
                    <div className="data-table__settings-header">
                      <p className="data-table__settings-title">Visible columns</p>
                      <button
                        type="button"
                        className="data-table__settings-close"
                        aria-label="Close column settings"
                        onClick={() => setSettingsOpen(false)}
                      >
                        <X size={16} strokeWidth={1.6} aria-hidden="true" />
                      </button>
                    </div>
                    <ul className="data-table__settings-list">
                      {columns.map((column) => {
                        const isVisible = !hiddenColumnSet.has(column.key)
                        const visibleCount =
                          columns.length - hiddenColumnKeys.length
                        const isLastVisible = isVisible && visibleCount <= 1

                        return (
                          <li key={column.key} className="data-table__settings-item">
                            <Checkbox
                              size="sm"
                              checked={isVisible}
                              disabled={isLastVisible}
                              onCheckedChange={(nextChecked) =>
                                toggleColumnVisibility(column.key, nextChecked)
                              }
                              label={column.header}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {toolbar && hasActiveControls ? (
        <div className="data-table__chips" aria-label="Active filters">
          {searchQuery ? (
            <button
              type="button"
              className="data-table__chip"
              onClick={() => setSearchQuery('')}
            >
              <span>Search: {searchQuery}</span>
              <X size={14} strokeWidth={1.6} aria-hidden="true" />
            </button>
          ) : null}
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className="data-table__chip"
              onClick={() => removeFilterChip(filter.key)}
            >
              <span>
                {filter.label}: {filterValues[filter.key]}
              </span>
              <X size={14} strokeWidth={1.6} aria-hidden="true" />
            </button>
          ))}
        </div>
      ) : null}

      {toolbar ? (
        <div className="data-table__meta" aria-live="polite">
          Showing {filteredRows.length} of {rows.length}
          {selectable && selectedSelectableRows.length > 0
            ? ` · ${selectedSelectableRows.length} selected`
            : ''}
        </div>
      ) : null}

      <div className="data-table__scroll">
        <table className={classes} {...props}>
          {caption ? <caption>{caption}</caption> : null}
          <thead>
            <tr>
              {selectable ? (
                <th className="data-table__selection" scope="col">
                  <Checkbox
                    size="sm"
                    checked={allRowsSelected}
                    indeterminate={someRowsSelected}
                    disabled={selectableRows.length === 0}
                    onCheckedChange={toggleAllRows}
                    aria-label={selectAllLabel}
                  />
                </th>
              ) : null}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  data-align={getColumnAlignment(column)}
                  className={column.headerClassName}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => {
                const rowIndex = rows.indexOf(row)

                return (
                  <tr
                    key={getRowKey(row, rowIndex)}
                    tabIndex={onRowClick ? 0 : undefined}
                    onClick={
                      onRowClick
                        ? (event) => activateRow(event, row, rowIndex)
                        : undefined
                    }
                    onKeyDown={
                      onRowClick
                        ? (event) => activateRow(event, row, rowIndex)
                        : undefined
                    }
                  >
                    {selectable ? (
                      <td
                        className="data-table__selection"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <Checkbox
                          size="sm"
                          checked={selectedKeySet.has(getRowKey(row, rowIndex))}
                          disabled={!isRowSelectable(row, rowIndex)}
                          onCheckedChange={(nextChecked) =>
                            toggleRow(row, rowIndex, nextChecked)
                          }
                          aria-label={getRowSelectionLabel(row, rowIndex)}
                        />
                      </td>
                    ) : null}
                    {visibleColumns.map((column) => (
                      <td
                        key={column.key}
                        data-align={getColumnAlignment(column)}
                        className={column.cellClassName}
                      >
                        <span className="data-table__cell-content">
                          {column.render
                            ? column.render(row[column.key], row, rowIndex)
                            : row[column.key]}
                        </span>
                      </td>
                    ))}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  className="data-table__empty"
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) || 1}
                >
                  <span className="data-table__cell-content">
                    {resolvedEmptyMessage}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
