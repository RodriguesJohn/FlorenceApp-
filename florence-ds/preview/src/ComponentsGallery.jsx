import { useState } from 'react'
import { Button } from '../../03-components/button/Button.jsx'
import { Calendar } from '../../03-components/calendar/Calendar.jsx'
import { Checkbox } from '../../03-components/checkbox/Checkbox.jsx'
import { Input } from '../../03-components/input/Input.jsx'
import { ModalCard } from '../../03-components/modal-card/ModalCard.jsx'
import { Radio, RadioGroup } from '../../03-components/radio/Radio.jsx'
import { Select } from '../../03-components/select/Select.jsx'
import { Switch } from '../../03-components/switch/Switch.jsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../03-components/tabs/Tabs.jsx'
import { Textarea } from '../../03-components/textarea/Textarea.jsx'
import { KpiCard } from '../../03-components/kpi-card/KpiCard.jsx'
import { InsightCard } from '../../03-components/insight-card/InsightCard.jsx'
import { PieChart } from '../../03-components/charts/pie-chart/PieChart.jsx'
import { BarChart } from '../../03-components/charts/bar-chart/BarChart.jsx'
import { LineChart } from '../../03-components/charts/line-chart/LineChart.jsx'
import { Timeline } from '../../03-components/timeline/Timeline.jsx'
import { Tag } from '../../03-components/tag/Tag.jsx'
import { Tooltip } from '../../03-components/tooltip/Tooltip.jsx'
import { Toast } from '../../03-components/toast/Toast.jsx'
import { ChatPattern } from '../../03-components/agentic-ui-patterns/chat-pattern/ChatPattern.jsx'
import { ThinkingAnimation } from '../../03-components/motion-components/thinking-animation/ThinkingAnimation.jsx'
import { ShimmerText } from '../../03-components/motion-components/shimmer-text/ShimmerText.jsx'
import { LoadingAnimation } from '../../03-components/motion-components/loading-animation/LoadingAnimation.jsx'
import { NumberTransition } from '../../03-components/motion-components/number-transition/NumberTransition.jsx'
import { DataTable } from '../../03-components/data-table/DataTable.jsx'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
  SidebarSubmenu,
} from '../../03-components/sidebar/Sidebar.jsx'
import {
  CalendarDays,
  ChartBar,
  ChevronDown,
  File,
  Folder,
  House,
  Inbox,
  Settings,
} from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'agentic', label: 'Agentic UI' },
  { id: 'base', label: 'Base' },
  { id: 'motion', label: 'Motion' },
]

function GalleryPreview({ id }) {
  switch (id) {
    case 'chat-pattern':
      return (
        <div className="component-gallery__sample component-gallery__sample--chat">
          <ChatPattern
            className="chat-pattern--gallery"
            title="Assistant"
            status={null}
            messages={[
              {
                id: 'gallery-message',
                role: 'assistant',
                content: 'How can I help?',
              },
            ]}
          />
        </div>
      )
    case 'thinking-animation':
      return (
        <div className="component-gallery__sample component-gallery__sample--row">
          <ThinkingAnimation label="Thinking" size="lg" />
        </div>
      )
    case 'shimmer-text':
      return (
        <div className="component-gallery__sample component-gallery__sample--row">
          <ShimmerText size="lg">Generating response…</ShimmerText>
        </div>
      )
    case 'loading-animation':
      return (
        <div className="component-gallery__sample component-gallery__sample--row">
          <LoadingAnimation size="lg" />
        </div>
      )
    case 'number-transition':
      return (
        <div className="component-gallery__sample component-gallery__sample--row">
          <NumberTransition value={128} size="lg" />
        </div>
      )
    case 'buttons':
      return (
        <div className="component-gallery__sample component-gallery__sample--row">
          <Button size="md">Primary</Button>
          <Button size="md" variant="secondary">
            Secondary
          </Button>
        </div>
      )
    case 'inputs':
      return (
        <div className="component-gallery__sample">
          <Input label="Email" placeholder="name@studio.com" size="md" />
        </div>
      )
    case 'data-tables':
      return (
        <div className="component-gallery__sample component-gallery__sample--table">
          <DataTable
            size="sm"
            selectable
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'tasks', header: 'Tasks' },
            ]}
            rows={[
              { id: 1, name: 'Maya', tasks: 8 },
              { id: 2, name: 'Noah', tasks: 5 },
              { id: 3, name: 'Iris', tasks: 3 },
            ]}
          />
        </div>
      )
    case 'sidebars':
      return (
        <div className="component-gallery__sample component-gallery__sample--sidebar">
          <Sidebar aria-label="Workspace preview">
            <SidebarHeader>
              <span className="sidebar-preview__mark">F</span>
              <span className="sidebar-preview__brand">Flowrix</span>
            </SidebarHeader>
            <SidebarNav>
              <SidebarSection label="Folders">
                <SidebarItem active icon={<House />}>
                  Dashboard
                </SidebarItem>
                <SidebarItem icon={<CalendarDays />} badge="12">
                  Calendar
                </SidebarItem>
                <SidebarItem icon={<Inbox />} badge="127">
                  Inbox
                </SidebarItem>
              </SidebarSection>
              <SidebarSection label="Workspace">
                <SidebarItem
                  disclosure={<ChevronDown />}
                  icon={<Folder />}
                  badge="12"
                >
                  Folders
                </SidebarItem>
                <SidebarSubmenu>
                  <SidebarItem icon={<File />}>Documents</SidebarItem>
                  <SidebarItem icon={<ChartBar />}>Product spec</SidebarItem>
                </SidebarSubmenu>
              </SidebarSection>
            </SidebarNav>
            <SidebarFooter>
              <SidebarItem icon={<Settings />}>Settings</SidebarItem>
            </SidebarFooter>
          </Sidebar>
        </div>
      )
    case 'switches':
      return (
        <div className="component-gallery__sample component-gallery__sample--switch">
          <Switch defaultChecked size="lg" aria-label="Notifications" />
        </div>
      )
    case 'radios':
      return (
        <div className="component-gallery__sample">
          <RadioGroup label="Plan" defaultValue="pro" size="md">
            <Radio value="starter" label="Starter" />
            <Radio value="pro" label="Pro" />
          </RadioGroup>
        </div>
      )
    case 'checkboxes':
      return (
        <div className="component-gallery__sample component-gallery__sample--stack">
          <Checkbox label="Email me updates" defaultChecked size="md" />
          <Checkbox label="Weekly digest" size="md" />
        </div>
      )
    case 'selects':
      return (
        <div className="component-gallery__sample">
          <Select
            label="Region"
            size="md"
            defaultValue="us"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'eu', label: 'Europe' },
            ]}
          />
        </div>
      )
    case 'tabs':
      return (
        <div className="component-gallery__sample">
          <Tabs defaultValue="one" size="md" variant="segmented">
            <TabsList>
              <TabsTrigger value="one">Overview</TabsTrigger>
              <TabsTrigger value="two">Members</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    case 'textareas':
      return (
        <div className="component-gallery__sample">
          <Textarea
            label="Notes"
            size="md"
            placeholder="Add a note…"
            rows={3}
          />
        </div>
      )
    case 'modals':
      return (
        <div className="component-gallery__sample">
          <Button size="md">Open modal</Button>
        </div>
      )
    case 'modal-cards':
      return (
        <div className="component-gallery__sample component-gallery__sample--card">
          <ModalCard
            size="sm"
            title="Update published"
            onClose={() => {}}
            footer={<Button size="sm">Got it</Button>}
          >
            Your team will see this on their next visit.
          </ModalCard>
        </div>
      )
    case 'kpi-cards':
      return (
        <div className="component-gallery__sample">
          <KpiCard
            size="sm"
            label="Revenue"
            value="$48.2k"
            delta="+12.4%"
            trend="up"
            hint="vs last 30 days"
          />
        </div>
      )
    case 'insight-cards':
      return (
        <div className="component-gallery__sample component-gallery__sample--insight">
          <InsightCard
            size="sm"
            tone="opportunity"
            eyebrow="Recommendation"
            title="Raise listing prices"
            description="Three units look 6-9% under market."
            confidence="High confidence"
          />
        </div>
      )
    case 'pie-charts':
      return (
        <div className="component-gallery__sample component-gallery__sample--pie">
          <PieChart
            title="Traffic"
            size={112}
            showTable={false}
            data={[
              { label: 'Organic', value: 48 },
              { label: 'Direct', value: 24 },
              { label: 'Referral', value: 13 },
              { label: 'Social', value: 9 },
            ]}
          />
        </div>
      )
    case 'bar-charts':
      return (
        <div className="component-gallery__sample component-gallery__sample--bar">
          <BarChart
            title="Revenue"
            height={120}
            showTable={false}
            showGrid={false}
            data={[
              { label: 'North', value: 48 },
              { label: 'South', value: 42 },
              { label: 'East', value: 36 },
              { label: 'West', value: 31 },
            ]}
          />
        </div>
      )
    case 'line-charts':
      return (
        <div className="component-gallery__sample component-gallery__sample--line">
          <LineChart
            title="Active users"
            height={120}
            showTable={false}
            showGrid={false}
            data={[
              { label: 'Mon', value: 42 },
              { label: 'Tue', value: 48 },
              { label: 'Wed', value: 45 },
              { label: 'Thu', value: 52 },
              { label: 'Fri', value: 58 },
            ]}
          />
        </div>
      )
    case 'calendars':
      return (
        <div className="component-gallery__sample component-gallery__sample--row">
          <Calendar size="sm" />
        </div>
      )
    case 'timelines':
      return (
        <div className="component-gallery__sample component-gallery__sample--timeline">
          <Timeline
            label="Roadmap"
            items={[
              {
                status: 'now',
                phase: 'Now',
                title: 'V1 shipped',
                body: 'React components with contracts, retrievable by agents.',
              },
              {
                status: 'next',
                phase: 'Next',
                title: 'V2 for coding agents',
              },
              {
                status: 'next',
                phase: 'Next',
                title: 'Figma file launch',
              },
              {
                status: 'later',
                phase: 'Later',
                title: 'More agentic',
              },
            ]}
          />
        </div>
      )
    case 'tags':
      return (
        <div className="component-gallery__sample component-gallery__sample--tags">
          <Tag tone="brand">Design</Tag>
          <Tag tone="success">Ready</Tag>
          <Tag tone="warning">Review</Tag>
        </div>
      )
    case 'tooltips':
      return (
        <div className="component-gallery__sample component-gallery__sample--tooltip">
          <Tooltip content="Duplicate row" side="bottom" open>
            <Button size="sm" variant="secondary">
              Hover target
            </Button>
          </Tooltip>
        </div>
      )
    case 'toasts':
      return (
        <div className="component-gallery__sample">
          <Toast
            size="sm"
            status="success"
            title="Update published"
            onClose={() => {}}
          />
        </div>
      )
    default:
      return null
  }
}

export function ComponentsGallery({ pages, onNavigate }) {
  const [category, setCategory] = useState('all')

  return (
    <div className="content-block">
      <header className="hero">
        <h1>Components</h1>
        <p className="lede">
          Gallery of every building block - open any card for full docs and
          variants.
        </p>
      </header>

      <Tabs
        className="component-gallery-tabs"
        value={category}
        onValueChange={setCategory}
        size="lg"
        variant="line"
      >
        <TabsList aria-label="Component categories">
          {CATEGORIES.map((item) => (
            <TabsTrigger key={item.id} value={item.id}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((categoryItem) => {
          const visiblePages =
            categoryItem.id === 'all'
              ? pages
              : pages.filter(
                  (item) => (item.category ?? 'base') === categoryItem.id,
                )

          return (
            <TabsContent key={categoryItem.id} value={categoryItem.id}>
              {visiblePages.length > 0 ? (
                <div
                  className="component-gallery"
                  aria-label={`${categoryItem.label} component gallery`}
                >
                  {visiblePages.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="component-gallery__card"
                      onClick={() => onNavigate(item.id)}
                    >
                      <div
                        className="component-gallery__stage"
                        aria-hidden="true"
                      >
                        <GalleryPreview id={item.id} />
                      </div>
                      <div className="component-gallery__meta">
                        <span className="component-gallery__label">
                          {item.label}
                        </span>
                        <span className="component-gallery__description">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="component-gallery__empty">
                  <p>No {categoryItem.label.toLowerCase()} components yet.</p>
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
