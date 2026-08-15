import { useState } from 'react'
import {
  Archive,
  ChartBar,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Clock,
  File,
  FolderOpen,
  House,
  Layers,
  Lock,
  Settings,
  Sparkles,
  Zap,
} from 'lucide-react'
import { ChatPattern } from '../../03-components/agentic-ui-patterns/chat-pattern/ChatPattern.jsx'
import { Button } from '../../03-components/button/Button.jsx'
import { PieChart } from '../../03-components/charts/pie-chart/PieChart.jsx'
import { BarChart } from '../../03-components/charts/bar-chart/BarChart.jsx'
import { LineChart } from '../../03-components/charts/line-chart/LineChart.jsx'
import { DataTable } from '../../03-components/data-table/DataTable.jsx'
import { Input } from '../../03-components/input/Input.jsx'
import { KpiCard } from '../../03-components/kpi-card/KpiCard.jsx'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
  SidebarSubmenu,
} from '../../03-components/sidebar/Sidebar.jsx'
import { Switch } from '../../03-components/switch/Switch.jsx'
import { Tag } from '../../03-components/tag/Tag.jsx'
import { Toast } from '../../03-components/toast/Toast.jsx'
import './playground.css'

const PLAYGROUND_COMPONENTS = [
  {
    id: 'button',
    label: 'Button',
    defaults: {
      label: 'Save changes',
      variant: 'primary',
      size: 'md',
      disabled: false,
    },
  },
  {
    id: 'input',
    label: 'Input',
    defaults: {
      label: 'Email',
      placeholder: 'name@company.com',
      size: 'md',
      disabled: false,
      error: false,
    },
  },
  {
    id: 'tag',
    label: 'Tag',
    defaults: {
      label: 'In progress',
      tone: 'brand',
      size: 'md',
      removable: false,
      disabled: false,
    },
  },
  {
    id: 'switch',
    label: 'Switch',
    defaults: {
      label: 'Notifications',
      size: 'md',
      checked: true,
      disabled: false,
    },
  },
  {
    id: 'toast',
    label: 'Toast',
    defaults: {
      title: 'Update published',
      description: 'Your changes are live for everyone with access.',
      status: 'success',
      size: 'md',
      showClose: true,
    },
  },
]

const DASHBOARD_ROWS = [
  {
    id: '1',
    name: 'Launch brief',
    owner: 'Maya Chen',
    status: 'In review',
    tone: 'warning',
  },
  {
    id: '2',
    name: 'QA checklist',
    owner: 'Unassigned',
    status: 'Blocked',
    tone: 'danger',
  },
  {
    id: '3',
    name: 'Release notes',
    owner: 'Jordan Lee',
    status: 'Ready',
    tone: 'success',
  },
  {
    id: '4',
    name: 'Support macros',
    owner: 'Alex Rivera',
    status: 'In progress',
    tone: 'brand',
  },
]

const DASHBOARD_COLUMNS = [
  { key: 'name', header: 'Task' },
  { key: 'owner', header: 'Owner' },
  {
    key: 'status',
    header: 'Status',
    render: (value, row) => (
      <Tag tone={row.tone} size="sm">
        {value}
      </Tag>
    ),
  },
]

function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="playground__group">
      <span className="playground__group-label">{label}</span>
      <div
        className="foundation-tabs foundation-tabs--compact"
        role="group"
        aria-label={label}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`foundation-tabs__tab ${value === option ? 'is-active' : ''}`}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function buildCode(componentId, props) {
  if (componentId === 'button') {
    return [
      `<Button`,
      `  variant="${props.variant}"`,
      `  size="${props.size}"`,
      props.disabled ? `  disabled` : null,
      `>`,
      `  ${props.label}`,
      `</Button>`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (componentId === 'input') {
    return [
      `<Input`,
      `  label="${props.label}"`,
      `  placeholder="${props.placeholder}"`,
      `  size="${props.size}"`,
      props.error ? `  error="Enter a valid email"` : null,
      props.disabled ? `  disabled` : null,
      `/>`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (componentId === 'tag') {
    return [
      `<Tag`,
      `  tone="${props.tone}"`,
      `  size="${props.size}"`,
      props.removable ? `  onRemove={() => {}}` : null,
      props.disabled ? `  disabled` : null,
      `>`,
      `  ${props.label}`,
      `</Tag>`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (componentId === 'switch') {
    return [
      `<Switch`,
      `  label="${props.label}"`,
      `  size="${props.size}"`,
      `  checked={${props.checked}}`,
      props.disabled ? `  disabled` : null,
      `/>`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  return [
    `<Toast`,
    `  title="${props.title}"`,
    `  description="${props.description}"`,
    `  status="${props.status}"`,
    `  size="${props.size}"`,
    props.showClose ? `  onClose={() => {}}` : null,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')
}

function PlaygroundPreview({ componentId, props, onPropsChange }) {
  if (componentId === 'button') {
    return (
      <Button
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
      >
        {props.label}
      </Button>
    )
  }

  if (componentId === 'input') {
    return (
      <div className="playground__preview-width">
        <Input
          label={props.label}
          placeholder={props.placeholder}
          size={props.size}
          disabled={props.disabled}
          error={props.error ? 'Enter a valid email' : undefined}
        />
      </div>
    )
  }

  if (componentId === 'tag') {
    return (
      <Tag
        tone={props.tone}
        size={props.size}
        disabled={props.disabled}
        onRemove={props.removable ? () => {} : undefined}
      >
        {props.label}
      </Tag>
    )
  }

  if (componentId === 'switch') {
    return (
      <Switch
        label={props.label}
        size={props.size}
        checked={props.checked}
        disabled={props.disabled}
        onCheckedChange={(checked) =>
          onPropsChange((current) => ({ ...current, checked }))
        }
      />
    )
  }

  return (
    <div className="playground__preview-width">
      <Toast
        title={props.title}
        description={props.description}
        status={props.status}
        size={props.size}
        onClose={props.showClose ? () => {} : undefined}
      />
    </div>
  )
}

function PlaygroundControls({ componentId, props, onChange }) {
  function setProp(key, value) {
    onChange((current) => ({ ...current, [key]: value }))
  }

  if (componentId === 'button') {
    return (
      <>
        <OptionGroup
          label="Variant"
          options={['primary', 'secondary', 'tertiary', 'danger']}
          value={props.variant}
          onChange={(value) => setProp('variant', value)}
        />
        <OptionGroup
          label="Size"
          options={['sm', 'md', 'lg']}
          value={props.size}
          onChange={(value) => setProp('size', value)}
        />
        <div className="playground__group">
          <span className="playground__group-label">Label</span>
          <input
            className="playground__text-input"
            value={props.label}
            onChange={(event) => setProp('label', event.target.value)}
          />
        </div>
        <div className="playground__group">
          <span className="playground__group-label">States</span>
          <div className="switch-list">
            <Switch
              label="Disabled"
              size="md"
              checked={props.disabled}
              onCheckedChange={(value) => setProp('disabled', value)}
            />
          </div>
        </div>
      </>
    )
  }

  if (componentId === 'input') {
    return (
      <>
        <OptionGroup
          label="Size"
          options={['sm', 'md', 'lg']}
          value={props.size}
          onChange={(value) => setProp('size', value)}
        />
        <div className="playground__group">
          <span className="playground__group-label">Label</span>
          <input
            className="playground__text-input"
            value={props.label}
            onChange={(event) => setProp('label', event.target.value)}
          />
        </div>
        <div className="playground__group">
          <span className="playground__group-label">Placeholder</span>
          <input
            className="playground__text-input"
            value={props.placeholder}
            onChange={(event) => setProp('placeholder', event.target.value)}
          />
        </div>
        <div className="playground__group">
          <span className="playground__group-label">States</span>
          <div className="switch-list">
            <Switch
              label="Error"
              size="md"
              checked={props.error}
              onCheckedChange={(value) => setProp('error', value)}
            />
            <Switch
              label="Disabled"
              size="md"
              checked={props.disabled}
              onCheckedChange={(value) => setProp('disabled', value)}
            />
          </div>
        </div>
      </>
    )
  }

  if (componentId === 'tag') {
    return (
      <>
        <OptionGroup
          label="Tone"
          options={['neutral', 'brand', 'success', 'warning', 'danger', 'info']}
          value={props.tone}
          onChange={(value) => setProp('tone', value)}
        />
        <OptionGroup
          label="Size"
          options={['sm', 'md', 'lg']}
          value={props.size}
          onChange={(value) => setProp('size', value)}
        />
        <div className="playground__group">
          <span className="playground__group-label">Label</span>
          <input
            className="playground__text-input"
            value={props.label}
            onChange={(event) => setProp('label', event.target.value)}
          />
        </div>
        <div className="playground__group">
          <span className="playground__group-label">States</span>
          <div className="switch-list">
            <Switch
              label="Removable"
              size="md"
              checked={props.removable}
              onCheckedChange={(value) => setProp('removable', value)}
            />
            <Switch
              label="Disabled"
              size="md"
              checked={props.disabled}
              onCheckedChange={(value) => setProp('disabled', value)}
            />
          </div>
        </div>
      </>
    )
  }

  if (componentId === 'switch') {
    return (
      <>
        <OptionGroup
          label="Size"
          options={['sm', 'md', 'lg']}
          value={props.size}
          onChange={(value) => setProp('size', value)}
        />
        <div className="playground__group">
          <span className="playground__group-label">Label</span>
          <input
            className="playground__text-input"
            value={props.label}
            onChange={(event) => setProp('label', event.target.value)}
          />
        </div>
        <div className="playground__group">
          <span className="playground__group-label">States</span>
          <div className="switch-list">
            <Switch
              label="Checked"
              size="md"
              checked={props.checked}
              onCheckedChange={(value) => setProp('checked', value)}
            />
            <Switch
              label="Disabled"
              size="md"
              checked={props.disabled}
              onCheckedChange={(value) => setProp('disabled', value)}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <OptionGroup
        label="Status"
        options={['default', 'success', 'warning', 'danger', 'info']}
        value={props.status}
        onChange={(value) => setProp('status', value)}
      />
      <OptionGroup
        label="Size"
        options={['sm', 'md', 'lg']}
        value={props.size}
        onChange={(value) => setProp('size', value)}
      />
      <div className="playground__group">
        <span className="playground__group-label">Title</span>
        <input
          className="playground__text-input"
          value={props.title}
          onChange={(event) => setProp('title', event.target.value)}
        />
      </div>
      <div className="playground__group">
        <span className="playground__group-label">Description</span>
        <input
          className="playground__text-input"
          value={props.description}
          onChange={(event) => setProp('description', event.target.value)}
        />
      </div>
      <div className="playground__group">
        <span className="playground__group-label">States</span>
        <div className="switch-list">
          <Switch
            label="Show close"
            size="md"
            checked={props.showClose}
            onCheckedChange={(value) => setProp('showClose', value)}
          />
        </div>
      </div>
    </>
  )
}

function SandboxPlayground() {
  const [componentId, setComponentId] = useState('button')
  const [propsByComponent, setPropsByComponent] = useState(() =>
    Object.fromEntries(
      PLAYGROUND_COMPONENTS.map((item) => [item.id, { ...item.defaults }]),
    ),
  )
  const [copied, setCopied] = useState(false)
  const [view, setView] = useState('preview')

  const active = PLAYGROUND_COMPONENTS.find((item) => item.id === componentId)
  const props = propsByComponent[componentId]
  const code = buildCode(componentId, props)

  function updateProps(updater) {
    setPropsByComponent((current) => ({
      ...current,
      [componentId]:
        typeof updater === 'function' ? updater(current[componentId]) : updater,
    }))
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="playground" aria-label="Component playground">
      <div className="playground__toolbar">
        <div
          className="foundation-tabs"
          role="tablist"
          aria-label="Playground component"
        >
          {PLAYGROUND_COMPONENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`foundation-tabs__tab ${componentId === item.id ? 'is-active' : ''}`}
              aria-selected={componentId === item.id}
              onClick={() => {
                setComponentId(item.id)
                setView('preview')
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="foundation-tabs foundation-tabs--compact"
          role="tablist"
          aria-label="Playground view"
        >
          <button
            type="button"
            role="tab"
            className={`foundation-tabs__tab ${view === 'preview' ? 'is-active' : ''}`}
            aria-selected={view === 'preview'}
            onClick={() => setView('preview')}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            className={`foundation-tabs__tab ${view === 'code' ? 'is-active' : ''}`}
            aria-selected={view === 'code'}
            onClick={() => setView('code')}
          >
            Code
          </button>
        </div>
      </div>

      <div className="playground__stage">
        <div className="playground__main">
          {view === 'preview' ? (
            <div className="playground__canvas">
              <PlaygroundPreview
                componentId={componentId}
                props={props}
                onPropsChange={updateProps}
              />
            </div>
          ) : (
            <div className="playground__code">
              <div className="playground__code-wrap">
                <pre className="playground__code-block">{code}</pre>
                <button
                  type="button"
                  className="playground__copy"
                  onClick={copyCode}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside
          className="playground__panel"
          aria-label={`${active.label} props`}
        >
          <div className="playground__panel-header">
            <h2>{active.label}</h2>
            <p>Adjust props and watch the preview update.</p>
          </div>
          <PlaygroundControls
            componentId={componentId}
            props={props}
            onChange={updateProps}
          />
        </aside>
      </div>
    </section>
  )
}

const DASHBOARD_CHAT_SEED = [
  {
    id: 'assist-1',
    role: 'assistant',
    content:
      'I can summarize open work, draft updates, or assign owners from this sprint.',
    timestamp: 'Just now',
  },
  {
    id: 'user-1',
    role: 'user',
    content: 'Who still needs an owner?',
    timestamp: 'Just now',
  },
  {
    id: 'assist-2',
    role: 'assistant',
    content: 'Final QA is still unassigned. Want me to draft an ask for Maya?',
    timestamp: 'Just now',
  },
]

const DASHBOARD_TRAFFIC = [
  { label: 'Listed', value: 256 },
  { label: 'Under offer', value: 385 },
  { label: 'Under contract', value: 770 },
  { label: 'Closed', value: 514 },
  { label: 'Off market', value: 385 },
  { label: 'Draft', value: 258 },
]

const DASHBOARD_TASK_SHARE = [
  { label: 'In progress', value: 8 },
  { label: 'Ready', value: 5 },
  { label: 'Review', value: 3 },
  { label: 'Blocked', value: 2 },
]

function DashboardPlayground() {
  const [navItem, setNavItem] = useState('overview')
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [messages, setMessages] = useState(DASHBOARD_CHAT_SEED)
  const [isThinking, setIsThinking] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [visibleTaskCount, setVisibleTaskCount] = useState(DASHBOARD_ROWS.length)

  function handleSend(content) {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: 'Just now',
    }
    setMessages((current) => [...current, userMessage])
    setIsThinking(true)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assist-${Date.now()}`,
          role: 'assistant',
          content:
            'Noted. I can create a task, draft a status update, or pull the latest conversion delta.',
          timestamp: 'Just now',
        },
      ])
      setIsThinking(false)
    }, 900)
  }

  return (
    <div className="web-preview" aria-label="Web app preview">
      <div className="web-preview__chrome">
        <div className="web-preview__traffic" aria-hidden="true">
          <span className="web-preview__dot web-preview__dot--close" />
          <span className="web-preview__dot web-preview__dot--minimize" />
          <span className="web-preview__dot web-preview__dot--zoom" />
        </div>
        <div className="web-preview__address" aria-label="Preview URL">
          <span className="web-preview__lock" aria-hidden="true">
            <Lock strokeWidth={2} />
          </span>
          <span className="web-preview__url">app.florence.dev/operations</span>
        </div>
        <div className="web-preview__chrome-spacer" aria-hidden="true" />
      </div>

      <div className="web-preview__app layout-app">
        <Sidebar className="web-preview__sidebar" aria-label="App navigation">
          <SidebarHeader>
            <div className="web-preview__brand">
              <span className="web-preview__mark" aria-hidden="true" />
              <div>
                <strong>Florence</strong>
                <span>Operations</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarNav aria-label="Operations">
            <SidebarSection label="Workspace">
              <SidebarItem
                active={navItem === 'overview'}
                icon={<House />}
                onClick={() => setNavItem('overview')}
              >
                Overview
              </SidebarItem>
              <SidebarItem
                active={navItem === 'activity'}
                icon={<Clock />}
                onClick={() => setNavItem('activity')}
              >
                Activity
              </SidebarItem>
              <SidebarItem
                active={navItem === 'inbox'}
                icon={<Archive />}
                badge="7"
                onClick={() => setNavItem('inbox')}
              >
                Inbox
              </SidebarItem>
            </SidebarSection>

            <SidebarSection label="Sprint 24">
              <SidebarItem
                disclosure={
                  projectsOpen ? <ChevronDown /> : <ChevronRight />
                }
                icon={<FolderOpen />}
                badge="4"
                aria-expanded={projectsOpen}
                onClick={() => setProjectsOpen((open) => !open)}
              >
                Projects
              </SidebarItem>
              {projectsOpen ? (
                <SidebarSubmenu>
                  <SidebarItem
                    active={navItem === 'launch-brief'}
                    icon={<File />}
                    onClick={() => setNavItem('launch-brief')}
                  >
                    Launch brief
                  </SidebarItem>
                  <SidebarItem
                    active={navItem === 'qa-checklist'}
                    icon={<Layers />}
                    onClick={() => setNavItem('qa-checklist')}
                  >
                    QA checklist
                  </SidebarItem>
                  <SidebarItem
                    active={navItem === 'release-notes'}
                    icon={<Sparkles />}
                    onClick={() => setNavItem('release-notes')}
                  >
                    Release notes
                  </SidebarItem>
                </SidebarSubmenu>
              ) : null}
              <SidebarItem
                active={navItem === 'tasks'}
                icon={<Zap />}
                badge="18"
                onClick={() => setNavItem('tasks')}
              >
                Open tasks
              </SidebarItem>
              <SidebarItem
                active={navItem === 'insights'}
                icon={<ChartBar />}
                onClick={() => setNavItem('insights')}
              >
                Insights
              </SidebarItem>
              <SidebarItem
                disclosure={
                  resourcesOpen ? <ChevronDown /> : <ChevronRight />
                }
                icon={<Layers />}
                aria-expanded={resourcesOpen}
                onClick={() => setResourcesOpen((open) => !open)}
              >
                Resources
              </SidebarItem>
              {resourcesOpen ? (
                <SidebarSubmenu>
                  <SidebarItem
                    active={navItem === 'support-macros'}
                    icon={<File />}
                    onClick={() => setNavItem('support-macros')}
                  >
                    Support macros
                  </SidebarItem>
                  <SidebarItem
                    active={navItem === 'research'}
                    icon={<File />}
                    onClick={() => setNavItem('research')}
                  >
                    User research
                  </SidebarItem>
                </SidebarSubmenu>
              ) : null}
            </SidebarSection>

            <SidebarSection label="Tags">
              <SidebarItem
                active={navItem === 'tag-important'}
                icon={
                  <span className="web-preview__status web-preview__status--danger" />
                }
                badge="3"
                onClick={() => setNavItem('tag-important')}
              >
                Important
              </SidebarItem>
              <SidebarItem
                active={navItem === 'tag-at-risk'}
                icon={
                  <span className="web-preview__status web-preview__status--warning" />
                }
                badge="5"
                onClick={() => setNavItem('tag-at-risk')}
              >
                At risk
              </SidebarItem>
              <SidebarItem
                active={navItem === 'tag-shipped'}
                icon={
                  <span className="web-preview__status web-preview__status--success" />
                }
                badge="12"
                onClick={() => setNavItem('tag-shipped')}
              >
                Shipped
              </SidebarItem>
            </SidebarSection>
          </SidebarNav>

          <SidebarFooter>
            <SidebarItem icon={<CirclePlus />}>Invite members</SidebarItem>
            <SidebarItem
              active={navItem === 'settings'}
              icon={<Settings />}
              onClick={() => setNavItem('settings')}
            >
              Settings
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>

        <div className="web-preview__shell layout-canvas">
          <header className="web-preview__topbar layout-header">
            <div className="web-preview__topbar-copy">
              <h2 className="web-preview__topbar-title">
                {{
                  overview: 'Overview',
                  activity: 'Activity',
                  inbox: 'Inbox',
                  'launch-brief': 'Launch brief',
                  'qa-checklist': 'QA checklist',
                  'release-notes': 'Release notes',
                  tasks: 'Open tasks',
                  insights: 'Insights',
                  'support-macros': 'Support macros',
                  research: 'User research',
                  'tag-important': 'Important work',
                  'tag-at-risk': 'At-risk work',
                  'tag-shipped': 'Shipped work',
                  settings: 'Settings',
                }[navItem] ?? 'Overview'}
              </h2>
              <p className="web-preview__topbar-meta">
                Product health for the current sprint
              </p>
            </div>
            <div className="layout-header__actions web-preview__actions">
              <Button
                variant="secondary"
                size="md"
                className="web-preview__action web-preview__action--quiet"
              >
                Export
              </Button>
              <Button
                variant="primary"
                size="md"
                className="web-preview__action web-preview__action--solid"
              >
                Create task
              </Button>
            </div>
          </header>

          <div
            className={`web-preview__workspace layout-workspace${
              chatOpen ? '' : ' web-preview__workspace--chat-collapsed'
            }`}
          >
            <main
              className="playground-dashboard layout-content"
              aria-label="Operations dashboard"
            >
              <section
                className="layout-metrics playground-dashboard__metrics"
                aria-label="Key metrics"
              >
                <KpiCard
                  size="md"
                  label="Active users"
                  value="12,480"
                  delta="+8.1%"
                  trend="up"
                  hint="vs last week"
                />
                <KpiCard
                  size="md"
                  label="Conversion"
                  value="3.6%"
                  delta="+0.4%"
                  trend="up"
                  hint="vs prior period"
                />
                <KpiCard
                  size="md"
                  label="Open tasks"
                  value="18"
                  delta="-2"
                  trend="down"
                  hint="cleared this week"
                />
                <KpiCard
                  size="md"
                  label="Revenue"
                  value="$48.2k"
                  delta="+12.4%"
                  trend="up"
                  hint="vs last 30 days"
                />
              </section>

              <section
                className="layout-grid layout-grid--gutter-sm playground-dashboard__charts"
                aria-label="Share breakdowns"
              >
                <div className="layout-col-6 playground-dashboard__chart">
                  <PieChart
                    title="Properties by status"
                    layout="split"
                    size={240}
                    showTable={false}
                    data={DASHBOARD_TRAFFIC}
                  />
                </div>
                <div className="layout-col-6 playground-dashboard__chart">
                  <BarChart
                    title="Revenue by region"
                    height={240}
                    showTable={false}
                    data={[
                      { label: 'North', value: 2610 },
                      { label: 'South', value: 2540 },
                      { label: 'East', value: 2480 },
                      { label: 'West', value: 2430 },
                    ]}
                  />
                </div>
              </section>

              <section
                className="layout-grid layout-grid--gutter-sm playground-dashboard__charts"
                aria-label="Progress over time"
              >
                <div className="layout-col-12 playground-dashboard__chart">
                  <LineChart
                    title="Weekly active users"
                    variant="area"
                    height={240}
                    showTable={false}
                    data={[
                      { label: 'Mon', value: 1240 },
                      { label: 'Tue', value: 1380 },
                      { label: 'Wed', value: 1290 },
                      { label: 'Thu', value: 1520 },
                      { label: 'Fri', value: 1680 },
                      { label: 'Sat', value: 1410 },
                      { label: 'Sun', value: 1320 },
                    ]}
                  />
                </div>
              </section>

              <section
                className="layout-grid layout-grid--gutter-sm playground-dashboard__body"
                aria-label="Open tasks"
              >
                <div className="layout-col-12 playground-dashboard__panel">
                  <div className="playground-dashboard__panel-header">
                    <div>
                      <h3 className="playground-dashboard__panel-title">
                        Open tasks
                      </h3>
                      <p className="playground-dashboard__panel-copy">
                        {visibleTaskCount} items need attention
                      </p>
                    </div>
                  </div>

                  <DataTable
                    caption="Sprint backlog"
                    size="sm"
                    selectable
                    toolbar
                    searchPlaceholder="Search tasks..."
                    searchKeys={['name', 'owner']}
                    filters={[
                      { key: 'status', label: 'Status' },
                      { key: 'owner', label: 'Owner' },
                    ]}
                    columnSettings
                    columns={DASHBOARD_COLUMNS}
                    rows={DASHBOARD_ROWS}
                    emptyMessage="No tasks match these filters."
                    onFilteredRowsChange={(rows) =>
                      setVisibleTaskCount(rows.length)
                    }
                  />
                </div>
              </section>
            </main>

            <aside
              id="playground-assistant-chat"
              className={`playground-dashboard__chat${
                chatOpen ? '' : ' playground-dashboard__chat--closed'
              }`}
              aria-label="Assistant chat"
              aria-hidden={!chatOpen}
              inert={!chatOpen || undefined}
            >
              <button
                type="button"
                className="playground-dashboard__chat-edge"
                aria-label="Close chat"
                tabIndex={chatOpen ? 0 : -1}
                onClick={() => setChatOpen(false)}
              >
                <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <ChatPattern
                className="playground-dashboard__chat-pattern"
                title="Workspace assistant"
                status={isThinking ? 'Thinking' : 'Ready'}
                messages={messages}
                suggestions={['Assign Final QA', 'Draft sprint update']}
                isThinking={isThinking}
                disabled={isThinking || !chatOpen}
                menuItems={[
                  {
                    id: 'reset',
                    label: 'Reset chat',
                    onSelect: () => {
                      setIsThinking(false)
                      setMessages(DASHBOARD_CHAT_SEED)
                    },
                  },
                ]}
                onSend={handleSend}
              />
            </aside>

            <button
              type="button"
              className={`playground-dashboard__chat-fab${
                chatOpen ? '' : ' playground-dashboard__chat-fab--visible'
              }`}
              aria-label="Open chat"
              aria-controls="playground-assistant-chat"
              aria-hidden={chatOpen}
              tabIndex={chatOpen ? -1 : 0}
              onClick={() => setChatOpen(true)}
            >
              <Sparkles size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PlaygroundPage() {
  return (
    <div className="content-block content-block--playground">
      <header className="playground-page-header">
        <h1>Playground</h1>
        <p>
          App shell on Florence patterns — dashboard content with a
          full-height assistant rail you can open and close.
        </p>
      </header>

      <DashboardPlayground />
    </div>
  )
}
