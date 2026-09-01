import { Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Archive,
  ArrowRight,
  Bell,
  CalendarDays,
  Camera,
  ChartBar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CircleHelp,
  CirclePlus,
  CircleX,
  Clock,
  Cloud,
  Copy,
  CreditCard,
  Database,
  Download,
  Ellipsis,
  Eye,
  EyeOff,
  ExternalLink,
  File,
  Filter,
  Folder,
  FolderOpen,
  Globe,
  Heart,
  House,
  Image as ImageIcon,
  Info,
  Layers,
  Link,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  Package,
  Paperclip,
  Pause,
  Pencil,
  Phone,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Settings,
  Share2,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Trash2,
  TriangleAlert,
  Unlock,
  Upload,
  User,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import '../../02-foundations/colors/primitives.css'
import '../../02-foundations/colors/semantics.css'
import { Button } from '../../03-components/button/Button.jsx'
import { Checkbox, CheckboxGroup } from '../../03-components/checkbox/Checkbox.jsx'
import { Input } from '../../03-components/input/Input.jsx'
import { Modal } from '../../03-components/modal/Modal.jsx'
import { ModalCard } from '../../03-components/modal-card/ModalCard.jsx'
import { Calendar } from '../../03-components/calendar/Calendar.jsx'
import { KpiCard } from '../../03-components/kpi-card/KpiCard.jsx'
import { InsightCard } from '../../03-components/insight-card/InsightCard.jsx'
import { Toast } from '../../03-components/toast/Toast.jsx'
import { Radio, RadioGroup } from '../../03-components/radio/Radio.jsx'
import { Select } from '../../03-components/select/Select.jsx'
import { Switch } from '../../03-components/switch/Switch.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../03-components/tabs/Tabs.jsx'
import { Tag } from '../../03-components/tag/Tag.jsx'
import { Timeline } from '../../03-components/timeline/Timeline.jsx'
import { Textarea } from '../../03-components/textarea/Textarea.jsx'
import { Tooltip } from '../../03-components/tooltip/Tooltip.jsx'
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
import { PieChart } from '../../03-components/charts/pie-chart/PieChart.jsx'
import { BarChart } from '../../03-components/charts/bar-chart/BarChart.jsx'
import { LineChart } from '../../03-components/charts/line-chart/LineChart.jsx'
import './App.css'
import { ComponentsGallery } from './ComponentsGallery.jsx'
import { isProComponent } from './proAccess.js'
import { FLORENCE_VISIT_HOME_EVENT, useFlorenceAuth } from './FlorenceAuth.jsx'
import { AccountPage } from './AccountPage.jsx'
import { TopbarAccount } from './TopbarAccount.jsx'
import { LIBRARY } from './libraryInventory.js'
import { getComponentAccess } from './componentAccessCatalog.js'
import { PlaygroundPage } from './PlaygroundPage.jsx'
import { LiquidMetal, liquidMetalPresets } from './components/ui/liquid-metal.jsx'

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const SCALES = [
  { name: 'gray', label: 'Gray' },
  { name: 'slate', label: 'Slate' },
  { name: 'red', label: 'Red' },
  { name: 'orange', label: 'Orange' },
  { name: 'amber', label: 'Amber' },
  { name: 'yellow', label: 'Yellow' },
  { name: 'lime', label: 'Lime' },
  { name: 'green', label: 'Green' },
  { name: 'emerald', label: 'Emerald' },
  { name: 'teal', label: 'Teal' },
  { name: 'cyan', label: 'Cyan' },
  { name: 'sky', label: 'Sky' },
  { name: 'blue', label: 'Blue' },
  { name: 'indigo', label: 'Indigo' },
  { name: 'violet', label: 'Violet' },
  { name: 'purple', label: 'Purple' },
  { name: 'fuchsia', label: 'Fuchsia' },
  { name: 'pink', label: 'Pink' },
  { name: 'rose', label: 'Rose' },
]

const SINGLES = [
  { name: 'white', label: 'White' },
  { name: 'black', label: 'Black' },
]

const SEMANTIC_GROUPS = [
  {
    id: 'text',
    label: 'Text',
    tokens: [
      'text-primary',
      'text-secondary',
      'text-muted',
      'text-inverse',
      'text-brand',
      'text-success',
      'text-warning',
      'text-danger',
      'text-info',
    ],
  },
  {
    id: 'bg',
    label: 'Background',
    subgroups: [
      {
        label: 'Surface',
        tokens: [
          'bg-page',
          'bg-surface',
          'bg-subtle',
          'bg-muted',
          'bg-inverse',
        ],
      },
      {
        label: 'Brand',
        tokens: ['bg-brand', 'bg-brand-subtle'],
        layout: 'pairs',
      },
      {
        label: 'Status',
        tokens: [
          'bg-success',
          'bg-success-subtle',
          'bg-warning',
          'bg-warning-subtle',
          'bg-danger',
          'bg-danger-subtle',
          'bg-info',
          'bg-info-subtle',
        ],
        layout: 'pairs',
      },
    ],
  },
  {
    id: 'border',
    label: 'Border',
    tokens: [
      'border-default',
      'border-strong',
      'border-subtle',
      'border-highlight',
      'border-brand',
      'border-focus',
      'border-success',
      'border-warning',
      'border-danger',
      'border-info',
    ],
  },
  {
    id: 'icon',
    label: 'Icon',
    tokens: [
      'icon-primary',
      'icon-secondary',
      'icon-muted',
      'icon-inverse',
      'icon-brand',
      'icon-success',
      'icon-warning',
      'icon-danger',
      'icon-info',
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    tokens: [
      'brand-primary',
      'brand-primary-hover',
      'brand-primary-active',
      'brand-subtle',
      'brand-on-brand',
    ],
  },
  {
    id: 'interactive',
    label: 'Interactive',
    tokens: [
      'interactive-primary',
      'interactive-primary-hover',
      'interactive-primary-active',
      'interactive-secondary',
      'interactive-secondary-hover',
      'interactive-secondary-active',
      'interactive-danger',
      'interactive-danger-hover',
      'interactive-danger-active',
      'interactive-selected',
      'interactive-selected-border',
    ],
  },
  {
    id: 'focus',
    label: 'Focus',
    tokens: ['focus-ring', 'focus-ring-offset', 'focus-ring-inverse'],
  },
  {
    id: 'disabled',
    label: 'Disabled',
    tokens: [
      'disabled-text',
      'disabled-bg',
      'disabled-border',
      'disabled-icon',
    ],
  },
  {
    id: 'link',
    label: 'Link',
    tokens: ['link-default', 'link-hover', 'link-visited', 'link-active'],
  },
  {
    id: 'fill',
    label: 'Fill',
    tokens: [
      'fill-strong',
      'fill-subtle',
      'fill-brand',
      'fill-brand-subtle',
      'fill-success',
      'fill-success-subtle',
      'fill-warning',
      'fill-warning-subtle',
      'fill-danger',
      'fill-danger-subtle',
      'fill-info',
      'fill-info-subtle',
    ],
  },
  {
    id: 'status',
    label: 'Status',
    tokens: [
      'status-success',
      'status-success-subtle',
      'status-success-text',
      'status-warning',
      'status-warning-subtle',
      'status-warning-text',
      'status-danger',
      'status-danger-subtle',
      'status-danger-text',
      'status-info',
      'status-info-subtle',
      'status-info-text',
    ],
  },
  {
    id: 'overlay',
    label: 'Overlay',
    tokens: ['overlay-scrim', 'overlay-scrim-soft', 'overlay-surface'],
  },
  {
    id: 'shadow',
    label: 'Shadow',
    tokens: ['shadow-default', 'shadow-brand', 'shadow-danger'],
  },
  {
    id: 'data',
    label: 'Data',
    tokens: [
      'data-1',
      'data-2',
      'data-3',
      'data-4',
      'data-5',
      'data-6',
      'data-7',
      'data-8',
    ],
  },
]

const NAV = [
  {
    id: 'getting-started',
    label: 'Getting started',
    children: [
      { id: 'about', label: 'Home' },
      { id: 'overview', label: 'Installation' },
    ],
  },
  {
    id: 'agents',
    label: 'Assistant',
    hidden: true,
    children: [
      { id: 'agents-overview', label: 'Product' },
      { id: 'agents-guidelines', label: 'Operating rules' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    children: [
      { id: 'gallery', label: 'Gallery' },
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Inputs' },
      { id: 'data-tables', label: 'Data Tables' },
      { id: 'sidebars', label: 'Sidebars' },
      { id: 'switches', label: 'Switches' },
      { id: 'radios', label: 'Radios' },
      { id: 'checkboxes', label: 'Checkboxes' },
      { id: 'selects', label: 'Selects' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'textareas', label: 'Textareas' },
      { id: 'modals', label: 'Modals' },
      { id: 'modal-cards', label: 'Modal cards' },
      { id: 'kpi-cards', label: 'KPI cards' },
      { id: 'insight-cards', label: 'Insight cards' },
      { id: 'pie-charts', label: 'Pie charts' },
      { id: 'bar-charts', label: 'Bar charts' },
      { id: 'line-charts', label: 'Line charts' },
      { id: 'calendars', label: 'Calendars' },
      { id: 'timelines', label: 'Timelines' },
      { id: 'tags', label: 'Tags' },
      { id: 'tooltips', label: 'Tooltips' },
      { id: 'toasts', label: 'Toasts' },
      { id: 'chat-pattern', label: 'Chat Pattern' },
      { id: 'thinking-animation', label: 'Thinking Animation' },
      { id: 'shimmer-text', label: 'Shimmer Text' },
      { id: 'loading-animation', label: 'Loading Animation' },
      { id: 'number-transition', label: 'Number Transition' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    children: [
      { id: 'color', label: 'Color' },
      { id: 'typography', label: 'Typography' },
      { id: 'icons', label: 'Icons' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'grid', label: 'Grid systems' },
      { id: 'radius', label: 'Radius' },
      { id: 'border', label: 'Border' },
      { id: 'shadow', label: 'Shadow' },
      { id: 'motion', label: 'Motion' },
      { id: 'opacity', label: 'Opacity' },
    ],
  },
  {
    id: 'playground',
    label: 'Playground',
    children: [{ id: 'playground-dashboard', label: 'Dashboard' }],
  },
]

const COMPONENT_PAGES = [
  {
    id: 'chat-pattern',
    label: 'Chat Pattern',
    category: 'agentic',
    description: 'Conversation surfaces for assistants and task-oriented agents.',
  },
  {
    id: 'thinking-animation',
    label: 'Thinking Animation',
    category: 'motion',
    description: 'A calm processing indicator for agents and system responses.',
  },
  {
    id: 'shimmer-text',
    label: 'Shimmer Text',
    category: 'motion',
    description: 'Animated text for indeterminate processing states.',
  },
  {
    id: 'loading-animation',
    label: 'Loading Animation',
    category: 'motion',
    description: 'A square dot-grid indicator for active loading states.',
  },
  {
    id: 'number-transition',
    label: 'Number Transition',
    category: 'motion',
    description: 'Spring-like rolling transitions for changing numeric values.',
  },
  {
    id: 'buttons',
    label: 'Buttons',
    description: 'Primary actions and secondary controls.',
  },
  {
    id: 'inputs',
    label: 'Inputs',
    description: 'Text fields for forms and filters.',
  },
  {
    id: 'data-tables',
    label: 'Data Tables',
    description: 'Structured datasets with aligned columns and readable rows.',
  },
  {
    id: 'sidebars',
    label: 'Sidebars',
    description: 'Grouped app navigation with active states, badges, and a footer.',
  },
  {
    id: 'switches',
    label: 'Switches',
    description: 'Binary settings and feature toggles.',
  },
  {
    id: 'radios',
    label: 'Radios',
    description: 'Single-choice options in a group.',
  },
  {
    id: 'checkboxes',
    label: 'Checkboxes',
    description: 'Multi-select options and confirmations.',
  },
  {
    id: 'selects',
    label: 'Selects',
    description: 'Single choice from a list of options.',
  },
  {
    id: 'tabs',
    label: 'Tabs',
    description: 'Switch between related views in place.',
  },
  {
    id: 'textareas',
    label: 'Textareas',
    description: 'Multi-line text fields for notes and messages.',
  },
  {
    id: 'modals',
    label: 'Modals',
    description: 'Focused dialogs for confirmations and decisions.',
  },
  {
    id: 'modal-cards',
    label: 'Modal cards',
    description: 'Dialog surfaces used inside Modals with header, body, and actions.',
  },
  {
    id: 'kpi-cards',
    label: 'KPI cards',
    description: 'Metric surfaces for dashboards with value, delta, and trend.',
  },
  {
    id: 'insight-cards',
    label: 'Insight cards',
    description: 'AI recommendations and analytical findings for dashboards.',
  },
  {
    id: 'pie-charts',
    label: 'Pie charts',
    description: 'Part-to-whole share for a handful of segments.',
  },
  {
    id: 'bar-charts',
    label: 'Bar charts',
    description: 'Compare magnitudes across categories.',
  },
  {
    id: 'line-charts',
    label: 'Line charts',
    description: 'Change and progress over time.',
  },
  {
    id: 'calendars',
    label: 'Calendars',
    description: 'Month view for picking a single date.',
  },
  {
    id: 'timelines',
    label: 'Timelines',
    description: 'Vertical sequence of now, next, and later.',
  },
  {
    id: 'tags',
    label: 'Tags',
    description: 'Compact labels for categories, filters, and status.',
  },
  {
    id: 'tooltips',
    label: 'Tooltips',
    description: 'Short labels that appear on hover and focus.',
  },
  {
    id: 'toasts',
    label: 'Toasts',
    description: 'Short feedback messages that appear without blocking the page.',
  },
]

function tokenVar(name) {
  return `--color-${name}`
}

function readToken(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(tokenVar(name))
    .trim()
}

function resolveToken(name) {
  const raw = readToken(name)
  if (!raw) return ''
  if (raw.startsWith('#')) return raw
  const match = raw.match(/var\((--color-[^)]+)\)/)
  if (!match) return raw
  return getComputedStyle(document.documentElement)
    .getPropertyValue(match[1])
    .trim()
}

function isLightHex(hex) {
  if (!hex?.startsWith('#') || hex.length < 7) return true
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

function Swatch({ tokenName, step, delay }) {
  const cssVar = tokenVar(tokenName)
  const [hex, setHex] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHex(resolveToken(tokenName) || readToken(tokenName))
  }, [tokenName])

  async function copy() {
    await navigator.clipboard.writeText(cssVar)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 900)
  }

  const isLight =
    step !== undefined ? step <= 400 : tokenName === 'white' || isLightHex(hex)

  return (
    <button
      type="button"
      className={`swatch ${isLight ? 'swatch--light' : 'swatch--dark'}`}
      style={{
        backgroundColor: `var(${cssVar})`,
        animationDelay: `${delay}ms`,
      }}
      onClick={copy}
      title={`Copy ${cssVar}`}
    >
      <span className="swatch__step">{step ?? tokenName}</span>
      <span className="swatch__meta">
        <span className="swatch__token">{cssVar}</span>
        <span className="swatch__hex">{copied ? 'Copied' : hex}</span>
      </span>
    </button>
  )
}

function ScaleRow({ name, label, index }) {
  return (
    <section className="scale" style={{ animationDelay: `${index * 60}ms` }}>
      <header className="scale__header">
        <h2>{label}</h2>
        <code>color-{name}-*</code>
      </header>
      <div className="scale__row">
        {STEPS.map((step, i) => (
          <Swatch
            key={step}
            tokenName={`${name}-${step}`}
            step={step}
            delay={index * 40 + i * 18}
          />
        ))}
      </div>
    </section>
  )
}

function ChevronIcon({ open }) {
  return (
    <ChevronRight
      className={`nav-chevron ${open ? 'is-open' : ''}`}
      size={12}
      aria-hidden="true"
    />
  )
}

function itemContainsActive(item, activeId) {
  if (item.id === activeId) return true
  return item.children?.some((child) => itemContainsActive(child, activeId))
}

function NavItems({ items, activeId, onSelect, depth = 0 }) {
  const reduceMotion = useReducedMotion()
  const [openFolders, setOpenFolders] = useState(() => {
    const initial = {}
    for (const item of items) {
      if (!item.children?.length) continue
      if (depth === 0) {
        initial[item.id] = itemContainsActive(item, activeId)
      } else {
        initial[item.id] = true
      }
    }
    return initial
  })

  useEffect(() => {
    setOpenFolders((prev) => {
      if (depth === 0) {
        const activeSection = items.find(
          (item) =>
            item.children?.length && itemContainsActive(item, activeId),
        )
        if (!activeSection) return prev

        const next = {}
        let changed = false
        for (const item of items) {
          if (!item.children?.length) continue
          next[item.id] = item.id === activeSection.id
          if (prev[item.id] !== next[item.id]) changed = true
        }
        return changed ? next : prev
      }

      const next = { ...prev }
      let changed = false
      for (const item of items) {
        if (
          item.children?.length &&
          itemContainsActive(item, activeId) &&
          next[item.id] === false
        ) {
          next[item.id] = true
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [activeId, depth, items])

  function toggleFolder(id) {
    if (depth === 0) {
      setOpenFolders((prev) => {
        const next = {}
        for (const item of items) {
          if (!item.children?.length) continue
          next[item.id] = item.id === id ? !prev[id] : false
        }
        return next
      })
      return
    }

    setOpenFolders((prev) => ({
      ...prev,
      [id]: prev[id] === false,
    }))
  }

  const accordionTransition = reduceMotion
    ? { duration: 0 }
    : {
        height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <ul className={`nav-list nav-list--depth-${depth}`}>
      {items.filter((item) => !item.hidden).map((item) => {
        const isActive = item.id === activeId
        const hasChildren = item.children?.length > 0
        const isSection = hasChildren && depth === 0
        const isFolder = hasChildren && depth > 0
        const isOpen = openFolders[item.id] !== false
        const sectionHasActive = isSection && itemContainsActive(item, activeId)

        return (
          <li
            key={item.id}
            className={[
              isSection ? 'nav-section' : '',
              isFolder ? 'nav-branch' : '',
              isSection || isFolder ? (isOpen ? 'is-open' : 'is-closed') : '',
            ]
              .filter(Boolean)
              .join(' ') || undefined}
          >
            {isSection ? (
              <button
                type="button"
                className={`nav-item nav-item--section ${
                  isOpen ? 'is-open' : ''
                } ${sectionHasActive ? 'has-active' : ''}`}
                aria-expanded={isOpen}
                onClick={() => toggleFolder(item.id)}
              >
                <span>{item.label}</span>
                <ChevronIcon open={isOpen} />
              </button>
            ) : isFolder ? (
              <button
                type="button"
                className={`nav-item nav-item--folder ${isOpen ? 'is-open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => toggleFolder(item.id)}
              >
                <span>{item.label}</span>
              </button>
            ) : (
              <button
                type="button"
                className={`nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelect(item.id)}
              >
                {item.label}
              </button>
            )}
            {hasChildren ? (
              <motion.div
                className={`nav-accordion ${isOpen ? 'is-open' : ''}`}
                initial={false}
                animate={{
                  height: isOpen ? 'auto' : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={accordionTransition}
                aria-hidden={!isOpen}
                inert={!isOpen ? true : undefined}
              >
                <div className="nav-accordion__inner">
                  <div
                    className={
                      isSection || isFolder ? 'nav-tree' : undefined
                    }
                  >
                    <NavItems
                      items={item.children}
                      activeId={activeId}
                      onSelect={onSelect}
                      depth={depth + 1}
                    />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

function FoundationPage({
  title,
  lede,
  credit,
  Semantics,
  Primitives,
  defaultTab = 'semantics',
}) {
  const [tab, setTab] = useState(defaultTab)

  return (
    <div className="content-block">
      <header className="hero">
        <h1>{title}</h1>
        {credit ? <p className="hero__credit">{credit}</p> : null}
        <p className="lede">{lede}</p>
        <div
          className="foundation-tabs"
          role="tablist"
          aria-label={`${title} views`}
        >
          {defaultTab === 'primitives' ? (
            <>
              <button
                type="button"
                role="tab"
                className={`foundation-tabs__tab ${tab === 'primitives' ? 'is-active' : ''}`}
                aria-selected={tab === 'primitives'}
                onClick={() => setTab('primitives')}
              >
                Primitives
              </button>
              <button
                type="button"
                role="tab"
                className={`foundation-tabs__tab ${tab === 'semantics' ? 'is-active' : ''}`}
                aria-selected={tab === 'semantics'}
                onClick={() => setTab('semantics')}
              >
                Semantics
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                role="tab"
                className={`foundation-tabs__tab ${tab === 'semantics' ? 'is-active' : ''}`}
                aria-selected={tab === 'semantics'}
                onClick={() => setTab('semantics')}
              >
                Semantics
              </button>
              <button
                type="button"
                role="tab"
                className={`foundation-tabs__tab ${tab === 'primitives' ? 'is-active' : ''}`}
                aria-selected={tab === 'primitives'}
                onClick={() => setTab('primitives')}
              >
                Primitives
              </button>
            </>
          )}
        </div>
      </header>

      <div
        className="foundation-tabs__panel"
        role="tabpanel"
        aria-label={tab === 'semantics' ? 'Semantics' : 'Primitives'}
      >
        {tab === 'semantics' ? <Semantics /> : <Primitives />}
      </div>
    </div>
  )
}

function ColorPage() {
  return (
    <FoundationPage
      title="Color"
      lede="Start with the palette ramps, then map meaning through semantic roles."
      Semantics={ColorSemantics}
      Primitives={ColorPrimitives}
      defaultTab="primitives"
    />
  )
}

function TypographyFoundationPage() {
  return (
    <FoundationPage
      title="Typography"
      lede="Use semantic text styles in components. Primitives are the source type scale."
      Semantics={TypographySemanticsPage}
      Primitives={TypographyPage}
    />
  )
}

const ICON_SAMPLES = [
  { name: 'House', Icon: House },
  { name: 'Search', Icon: Search },
  { name: 'Menu', Icon: Menu },
  { name: 'Settings', Icon: Settings },
  { name: 'User', Icon: User },
  { name: 'Bell', Icon: Bell },
  { name: 'CalendarDays', Icon: CalendarDays },
  { name: 'Check', Icon: Check },
  { name: 'X', Icon: X },
  { name: 'Plus', Icon: Plus },
  { name: 'Minus', Icon: Minus },
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'Download', Icon: Download },
  { name: 'Upload', Icon: Upload },
  { name: 'Pencil', Icon: Pencil },
  { name: 'Copy', Icon: Copy },
  { name: 'Trash2', Icon: Trash2 },
  { name: 'Ellipsis', Icon: Ellipsis },
  { name: 'Sparkles', Icon: Sparkles },
  { name: 'CircleCheck', Icon: CircleCheck },
  { name: 'Info', Icon: Info },
  { name: 'TriangleAlert', Icon: TriangleAlert },
  { name: 'CircleHelp', Icon: CircleHelp },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'ChevronUp', Icon: ChevronUp },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'Eye', Icon: Eye },
  { name: 'EyeOff', Icon: EyeOff },
  { name: 'Lock', Icon: Lock },
  { name: 'Unlock', Icon: Unlock },
  { name: 'Mail', Icon: Mail },
  { name: 'Phone', Icon: Phone },
  { name: 'MessageCircle', Icon: MessageCircle },
  { name: 'Paperclip', Icon: Paperclip },
  { name: 'Camera', Icon: Camera },
  { name: 'Image', Icon: ImageIcon },
  { name: 'File', Icon: File },
  { name: 'Folder', Icon: Folder },
  { name: 'FolderOpen', Icon: FolderOpen },
  { name: 'Save', Icon: Save },
  { name: 'Archive', Icon: Archive },
  { name: 'RefreshCw', Icon: RefreshCw },
  { name: 'RotateCcw', Icon: RotateCcw },
  { name: 'Filter', Icon: Filter },
  { name: 'SlidersHorizontal', Icon: SlidersHorizontal },
  { name: 'CirclePlus', Icon: CirclePlus },
  { name: 'CircleX', Icon: CircleX },
  { name: 'ExternalLink', Icon: ExternalLink },
  { name: 'Link', Icon: Link },
  { name: 'Share2', Icon: Share2 },
  { name: 'Play', Icon: Play },
  { name: 'Pause', Icon: Pause },
  { name: 'Clock', Icon: Clock },
  { name: 'MapPin', Icon: MapPin },
  { name: 'Globe', Icon: Globe },
  { name: 'Heart', Icon: Heart },
  { name: 'Star', Icon: Star },
  { name: 'ShoppingCart', Icon: ShoppingCart },
  { name: 'CreditCard', Icon: CreditCard },
  { name: 'Package', Icon: Package },
  { name: 'ChartBar', Icon: ChartBar },
  { name: 'Database', Icon: Database },
  { name: 'Cloud', Icon: Cloud },
  { name: 'Wifi', Icon: Wifi },
  { name: 'Zap', Icon: Zap },
  { name: 'Layers', Icon: Layers },
  { name: 'LogIn', Icon: LogIn },
  { name: 'LogOut', Icon: LogOut },
]

function IconsPage() {
  return (
    <div className="content-block">
      <header className="hero">
        <h1>Icons</h1>
        <p className="hero__credit">
          Interface icons provided by{' '}
          <a href="https://lucide.dev/" target="_blank" rel="noreferrer">
            Lucide
          </a>
          .
        </p>
        <p className="lede">
          Use Lucide’s consistent outline set with semantic icon colors and
          accessible labels.
        </p>
      </header>

      <div className="docs icons-foundation">
        <section className="docs__section">
          <h2>Common icons</h2>
          <p>
            Start with familiar, literal symbols. Keep the same icon for the
            same concept across the product.
          </p>
          <div className="icon-foundation-grid">
            {ICON_SAMPLES.map(({ name, Icon }) => (
              <div className="icon-foundation-card" key={name}>
                <Icon aria-hidden="true" />
                <code>{name}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="docs__section">
          <h2>Usage</h2>
          <p>
            Import icons individually so unused assets are removed from the
            production bundle.
          </p>
          <CopyableCode lang="jsx">{`import { Search, Settings } from 'lucide-react'

<Search aria-hidden="true" />
<button aria-label="Settings">
  <Settings aria-hidden="true" />
</button>`}</CopyableCode>
        </section>

        <section className="docs__section">
          <h2>Rules</h2>
          <ul className="docs__list">
            <li>
              Use semantic colors such as <code>--color-icon-primary</code>,{' '}
              <code>--color-icon-secondary</code>, and status icon roles.
            </li>
            <li>
              Let controls determine icon size; avoid arbitrary per-instance
              dimensions.
            </li>
            <li>
              Mark decorative icons <code>aria-hidden=&quot;true&quot;</code>.
              Give every icon-only control an accessible label.
            </li>
            <li>
              Do not use brand marks as generic interface icons. Trademarks
              remain subject to their owners’ rules.
            </li>
            <li>
              Retain the Lucide and Feather notices in{' '}
              <code>THIRD_PARTY_NOTICES.md</code> when distributing Florence.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

function SpacingPage() {
  return (
    <FoundationPage
      title="Spacing"
      lede="Use semantic spacing roles in components. Primitives are the source scale."
      Semantics={SpacingSemanticsPage}
      Primitives={SpacingPrimitivesPage}
    />
  )
}

function GridPage() {
  return (
    <FoundationPage
      title="Grid systems"
      lede="SaaS layout patterns first - app shell, canvas, workspace, metrics, and content splits. Primitives stay available as the source scale."
      Semantics={GridSemanticsPage}
      Primitives={GridPrimitivesPage}
    />
  )
}

function RadiusPage() {
  return (
    <FoundationPage
      title="Radius"
      lede="Use semantic radius roles in components. Primitives are the source corner scale."
      Semantics={RadiusSemanticsPage}
      Primitives={RadiusPrimitivesPage}
    />
  )
}

function BorderPage() {
  return (
    <FoundationPage
      title="Border"
      lede="Use semantic border widths in components. Pair with color border tokens for stroke color."
      Semantics={BorderSemanticsPage}
      Primitives={BorderPrimitivesPage}
    />
  )
}

function ShadowPage() {
  return (
    <FoundationPage
      title="Shadow"
      lede="Use semantic elevation roles in components. Primitives are the source shadow scale."
      Semantics={ShadowSemanticsPage}
      Primitives={ShadowPrimitivesPage}
    />
  )
}

function MotionPage() {
  return (
    <FoundationPage
      title="Motion"
      credit={
        <>
          Motion principles adapted from{' '}
          <a
            href="https://emilkowal.ski/skill"
            target="_blank"
            rel="noreferrer"
          >
            Emil Kowalski
          </a>
          .
        </>
      }
      lede="Use semantic motion roles in components. Primitives are the source timing and easing scale."
      Semantics={MotionSemanticsPage}
      Primitives={MotionPrimitivesPage}
    />
  )
}

function OpacityPage() {
  return (
    <FoundationPage
      title="Opacity"
      lede="Use semantic opacity roles in components. Primitives are the source transparency scale."
      Semantics={OpacitySemanticsPage}
      Primitives={OpacityPrimitivesPage}
    />
  )
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/**
 * Tokenise first, escape second. Escaping before the punctuation pass turns
 * `&lt;` into a matchable `;` and paints `<;` into the code block.
 */
function highlightMatches(code, pattern, classify) {
  const source = String(code)
  let result = ''
  let cursor = 0

  for (const match of source.matchAll(pattern)) {
    const start = match.index ?? 0
    result += escapeHtml(source.slice(cursor, start))
    const tokenClass = classify(match)
    const escaped = escapeHtml(match[0])
    result += tokenClass
      ? `<span class="token ${tokenClass}">${escaped}</span>`
      : escaped
    cursor = start + match[0].length
  }

  return result + escapeHtml(source.slice(cursor))
}

function highlightCss(code) {
  const pattern =
    /(\/\*[\s\S]*?\*\/)|([.#]?[\w-]+(?:\s*,\s*[.#]?[\w-]+)*)(?=\s*\{)|(--[\w-]+)|(:root\b)|([\w-]+)(?=\s*:)|(\b(?:var|rgba?|hsla?|calc|url|minmax|repeat|linear-gradient|cubic-bezier)\b)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|([{}:;,()])/g

  return highlightMatches(
    code,
    pattern,
    ([, comment, selector, variable, atRoot, property, fn, string, punct]) => {
      if (comment) return 'token--comment'
      if (selector || atRoot) return 'token--selector'
      if (variable) return 'token--variable'
      if (property) return 'token--property'
      if (fn) return 'token--function'
      if (string) return 'token--string'
      if (punct) return 'token--punctuation'
      return null
    },
  )
}

function highlightShell(code) {
  return escapeHtml(code)
    .split('\n')
    .map((line) => {
      if (!line.trim()) return line
      if (line.trimStart().startsWith('#')) {
        return `<span class="token token--comment">${line}</span>`
      }

      return line.replace(
        /^(\s*)([\w./+-]+)(.*)$/,
        (_, indent, command, rest) => {
          const coloredRest = rest.replace(
            /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|--[\w-]+/g,
            (token) => {
              if (token.startsWith('--')) {
                return `<span class="token token--flag">${token}</span>`
              }
              return `<span class="token token--string">${token}</span>`
            },
          )
          return `${indent}<span class="token token--command">${command}</span>${coloredRest}`
        },
      )
    })
    .join('\n')
}

function highlightJsx(code) {
  const pattern =
    /(\/\/.*$|\/\*[\s\S]*?\*\/)|(\b(?:import|export|from|function|const|let|var|return|default|true|false|null)\b)|(\b[A-Z][A-Za-z0-9]*)|([.#]?[\w-]+(?==))|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(`(?:\\.|[^`\\])*`)|([{}()[\];,.<>/=])/gm

  return highlightMatches(
    code,
    pattern,
    ([, comment, keyword, component, attr, string, template, punct]) => {
      if (comment) return 'token--comment'
      if (keyword) return 'token--command'
      if (component) return 'token--selector'
      if (attr) return 'token--property'
      if (string || template) return 'token--string'
      if (punct) return 'token--punctuation'
      return null
    },
  )
}

function detectCodeLang(code) {
  const trimmed = code.trim()
  if (
    /^(?:import|export)\s/.test(trimmed) ||
    /\b(?:function|const|className)\b/.test(trimmed) ||
    trimmed.includes('</') ||
    trimmed.includes('/>')
  ) {
    return 'jsx'
  }
  if (
    /--[\w-]+:/.test(trimmed) ||
    /^\.[a-zA-Z]/.test(trimmed) ||
    /^:[a-zA-Z]/.test(trimmed)
  ) {
    return 'css'
  }
  if (trimmed.includes('{') && trimmed.includes(':') && !trimmed.includes('=>')) {
    return 'css'
  }
  return 'shell'
}

function highlightCode(code, lang = 'auto') {
  const resolved = lang === 'auto' ? detectCodeLang(code) : lang
  if (resolved === 'css') return highlightCss(code)
  if (resolved === 'jsx' || resolved === 'js') return highlightJsx(code)
  if (resolved === 'shell') return highlightShell(code)
  return escapeHtml(code)
}

function CopyableCode({ children, lang = 'auto', showCopy = true }) {
  const [copied, setCopied] = useState(false)
  const source = String(children)

  async function copy() {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="docs__code-wrap">
      <pre
        className="docs__code"
        dangerouslySetInnerHTML={{ __html: highlightCode(source, lang) }}
      />
      {showCopy ? (
        <Button
          variant="secondary"
          size="sm"
          className="docs__copy"
          onClick={copy}
          aria-live="polite"
        >
          {copied ? (
            <Check aria-hidden="true" strokeWidth={1.75} />
          ) : (
            <Copy aria-hidden="true" strokeWidth={1.75} />
          )}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      ) : null}
    </div>
  )
}

function AccessSnippet({ id, title, description, lang = 'auto', children }) {
  return (
    <section className="component-access__panel" aria-labelledby={id}>
      <div className="component-example__header">
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <CopyableCode lang={lang}>{children}</CopyableCode>
    </section>
  )
}

function ComponentAccessLayout({ componentId, title, lede, children }) {
  const access = getComponentAccess(componentId)
  const { isPro, setCheckoutOpen } = useFlorenceAuth()
  const locked = isProComponent(componentId) && !isPro
  const [tab, setTab] = useState('view')

  function onValueChange(next) {
    if (locked && next !== 'view') {
      setCheckoutOpen(true)
      return
    }
    setTab(next)
  }

  return (
    <div className="content-block">
      <header className="hero">
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </header>

      <Tabs
        className="component-access"
        value={tab}
        onValueChange={onValueChange}
        size="lg"
        variant="line"
      >
        <TabsList aria-label={`${title} access`}>
          <TabsTrigger value="view">
            <AccessTabLabel>View</AccessTabLabel>
          </TabsTrigger>
          <TabsTrigger value="prompt">
            <AccessTabLabel locked={locked}>Prompt</AccessTabLabel>
          </TabsTrigger>
          <TabsTrigger value="code">
            <AccessTabLabel locked={locked}>Code</AccessTabLabel>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view">{children}</TabsContent>

        <TabsContent value="prompt">
          <AccessSnippet
            id={`${componentId}-prompt`}
            title="Prompt"
            description="Paste this with Code. It is the contract: files, tokens, fonts, and View behavior."
          >
            {access.prompt}
          </AccessSnippet>
        </TabsContent>

        <TabsContent value="code">
          <AccessSnippet
            id={`${componentId}-code`}
            title="Code"
            description="Exact source: Florence foundations, the component and its deps, and a demo. Do not rewrite."
            lang="jsx"
          >
            {access.code}
          </AccessSnippet>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CodeFile({ filename, lang = 'auto', children }) {
  return (
    <div className="component-access__file">
      <p className="component-access__filename">{filename}</p>
      <CopyableCode lang={lang}>{children}</CopyableCode>
    </div>
  )
}

// Parked CLI / install docs. Swap InstallationPage → GettingStartedDocs when public install ships.
function GettingStartedDocs() {
  return (
    <div className="content-block">
      <header className="hero">
        <h1>Getting started</h1>
        <p className="lede">
          Florence is a token-first design system: primitives → semantics →
          components.
        </p>
      </header>

      <div className="docs">
        <section className="docs__section">
          <h2>Option A - one-liner</h2>
          <p>In your app folder:</p>
          <CopyableCode>{`npx github:RodriguesJohn/ADS-Flowrix setup --install`}</CopyableCode>
          <p>
            That drops a <code>florence/</code> folder (tokens, AGENTS.md,
            starter components) and installs <code>lucide-react</code> +{' '}
            <code>motion</code>.
          </p>
          <p>Import:</p>
          <CopyableCode lang="js">{`import './florence/florence.css'
import { Button } from './florence/components/button/Button.jsx'`}</CopyableCode>
          <p>
            Private repo: you must be logged into GitHub (
            <code>gh auth login</code> / npm with access).
          </p>
        </section>

        <section className="docs__section">
          <h2>Option B - Preview docs locally</h2>
          <CopyableCode>{`cd preview
npm install
npm run dev`}</CopyableCode>
          <p>
            Open{' '}
            <a href="http://localhost:4721" className="docs__link">
              http://localhost:4721
            </a>
          </p>
        </section>

        <section className="docs__section">
          <h2>Option C - CLI without linking</h2>
          <p>From the Florence repo root:</p>
          <CopyableCode>{`npm run flowrix -- init ./path/to/app
npm run flowrix -- add button
npm run flowrix -- list colors
npm run flowrix -- validate`}</CopyableCode>
        </section>

        <section className="docs__section">
          <h2>Rules</h2>
          <ol className="docs__list">
            <li>
              Import foundation CSS via <code>florence/florence.css</code>.
            </li>
            <li>
              Style UI with semantic tokens only, e.g.{' '}
              <code>var(--color-text-primary)</code>
            </li>
            <li>
              Do not use hex or primitive ramps in components - see{' '}
              <code>AGENTS.md</code>.
            </li>
          </ol>
          <p>
            Point AI coding tools at <code>florence/AGENTS.md</code> so
            generated UI stays on-system.
          </p>
        </section>
      </div>
    </div>
  )
}

function InstallationPage({ onNavigate, onUpgradeToPro }) {
  return (
    <div className="content-block">
      <header className="hero">
        <h1>Installation</h1>
        <p className="lede">Florence is retrieved.</p>
      </header>

      <div className="docs">
        <section className="docs__section">
          <h2>How to use it</h2>
          <ol className="docs__list">
            <li>
              <strong>Step 1.</strong> View a component in the gallery.
            </li>
            <li>
              <strong>Step 2.</strong> Copy the prompt or copy the code.
            </li>
            <li>
              <strong>Step 3.</strong> Drop it in your coding agent. That is
              enough to start building.
            </li>
          </ol>
          <div className="statement__actions">
            <button
              type="button"
              className="statement__btn statement__btn--primary"
              onClick={() => onNavigate('gallery')}
            >
              Browse all components
            </button>
            <button
              type="button"
              className="statement__btn statement__btn--secondary"
              onClick={onUpgradeToPro}
            >
              {FLORENCE_PRO_COPY.cta}
            </button>
          </div>
        </section>

        <section className="docs__section">
          <h2>Complete system</h2>
          <p>
            If you want a complete repo, the full design system, and
            customization, that is a deeper install than copy-paste. We set
            that up with you.
          </p>
          <p className="statement__meta">
            All the components are available, with code snippets and copy
            prompts. If you want the complete design system and more embedded
            support,{' '}
            <a
              className="statement__meta-link"
              href="https://www.humanaistudio.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              book a discovery call
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

function AgentsOverviewPage({ onNavigate }) {
  return (
    <div className="content-block">
      <header className="hero">
        <h1>Design Systems Assistant</h1>
        <p className="lede">
          A design-system specialist agencies can install, adapt, and use across
          client work to build consistent interfaces faster.
        </p>
      </header>

      <div className="docs">
        <section className="docs__section">
          <h2>Built for agencies</h2>
          <p>
            Florence gives designers, developers, and AI coding tools one
            shared source of truth. Connect it to a client system, document the
            rules once, and reuse that context throughout delivery.
          </p>
        </section>

        <section className="docs__section">
          <h2>What it helps with</h2>
          <ul className="docs__list">
            <li>
              Audit existing tokens, components, motion, and accessibility
              patterns.
            </li>
            <li>
              Retrieve the right foundation rules and components while building
              product UI.
            </li>
            <li>
              Create new components that follow the client’s documented system
              instead of inventing styling.
            </li>
            <li>
              Review implementation work and flag design-system violations
              before handoff.
            </li>
          </ul>
        </section>

        <section className="docs__section">
          <h2>Recommended commercial model</h2>
          <p>
            Sell the core assistant as a one-time agency license. This gives the
            buyer a clear, ownable product they can deploy across projects.
            Offer an optional annual care plan for new capabilities, maintained
            integrations, updates, and priority support.
          </p>
          <ul className="docs__list">
            <li>
              <strong>Agency license:</strong> assistant, component library,
              documentation, CLI validation, and commercial client-work usage.
            </li>
            <li>
              <strong>Care plan:</strong> ongoing updates, new adapters,
              migration help, and priority support.
            </li>
            <li>
              <strong>Enterprise services:</strong> private onboarding, custom
              rules, integrations, and team training.
            </li>
          </ul>
        </section>

        <section className="docs__section">
          <h2>Explore the system</h2>
          <p>
            Review how the assistant operates, then browse the foundations and
            production-ready components it can retrieve.
          </p>
          <div className="statement__actions">
            <button
              type="button"
              className="statement__btn statement__btn--primary"
              onClick={() => onNavigate('agents-guidelines')}
            >
              Review operating rules
            </button>
            <button
              type="button"
              className="statement__btn statement__btn--secondary"
              onClick={() => onNavigate('gallery')}
            >
              Browse the component library
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function AgentsGuidelinesPage() {
  const rules = [
    {
      title: 'Colors',
      source: '02-foundations/colors/semantics.css',
      roles: 'text, bg, border, interactive, focus, disabled, status',
      notes: [
        'Themes: light (:root) and dark ([data-theme="dark"])',
        'Never use hex or primitive ramps in components',
      ],
    },
    {
      title: 'Typography',
      source: '02-foundations/typography/semantics.css',
      roles: 'display, metric, heading, body, label, caption, overline, code',
      notes: [
        'Soft medium weights; sentence-case meta over shouty uppercase',
        'Use metric (+ tabular nums) for balances and KPI heroes',
        'Never set font-size, weight, or leading from primitive ramps',
      ],
    },
    {
      title: 'Spacing',
      source: '02-foundations/spacing/semantics.css',
      roles: 'inset, stack, inline, gap, section',
      notes: [
        'Never use raw space-* primitives or hard-coded rem/px',
      ],
    },
    {
      title: 'Grid',
      source: '02-foundations/grid/semantics.css',
      roles: 'app, canvas, workspace, content, metrics, header, split, container, columns',
      notes: [
        'Compose .layout-app → .layout-canvas → .layout-workspace → .layout-content before inventing product grids',
      ],
    },
    {
      title: 'Radius',
      source: '02-foundations/radius/semantics.css',
      roles: 'control, surface, media, pill',
      notes: [
        'Never use raw radius-* primitives or hard-coded rem/px corners',
      ],
    },
    {
      title: 'Border',
      source: '02-foundations/border/semantics.css',
      roles: 'control, surface, highlight, divider, focus',
      notes: [
        'Pair with color border tokens for stroke color',
        'Never use raw border-* width primitives or hard-coded px strokes',
      ],
    },
    {
      title: 'Shadow',
      source: '02-foundations/shadow/semantics.css',
      roles: 'raised, raised-depth, overlay, modal',
      notes: [
        'Never use raw shadow-* primitives or hard-coded box-shadow values',
      ],
    },
    {
      title: 'Motion',
      source: '02-foundations/motion/semantics.css',
      roles: 'interaction, expand, overlay, modal, page',
      notes: [
        'Prefer custom curves over built-in CSS easings; default UI motion uses ease-out',
        'Keep everyday UI motion under ~300ms; make exits faster than enters',
        'Animate transform and opacity only; honor prefers-reduced-motion',
        'Never enter from scale(0) - start around scale(0.95)+ with opacity',
        'Preview demos may use Motion (motion/react); product components should prefer semantic CSS tokens',
      ],
    },
    {
      title: 'Opacity',
      source: '02-foundations/opacity/semantics.css',
      roles: 'disabled, muted, hover, scrim, full',
      notes: [
        'Pair scrim opacity with --color-overlay-scrim* for modal/drawer backdrops',
        'Never use raw opacity-* primitives or hard-coded opacity values',
      ],
    },
  ]

  return (
    <div className="content-block">
      <header className="hero">
        <h1>Guidelines</h1>
        <p className="lede">
          The same rules agents follow in <code>AGENTS.md</code>. Use semantic
          roles only - never invent values.
        </p>
      </header>

      <div className="docs">
        {rules.map((rule) => (
          <section key={rule.title} className="docs__section">
            <h2>{rule.title}</h2>
            <p>
              Use semantic tokens only from <code>{rule.source}</code>
            </p>
            <p>
              Roles: <code>{rule.roles}</code>
            </p>
            <ul className="docs__list">
              {rule.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

function StatementVisual({ theme }) {
  const reduceMotion = useReducedMotion()
  const isDark = theme === 'dark'
  const preset =
    liquidMetalPresets.find((item) => item.name === (isDark ? 'Noir' : 'Default'))
      ?.params ?? liquidMetalPresets[0].params
  const { colorBack: _colorBack, scale: _scale, ...shaderParams } = preset

  return (
    <div className="statement-visual" aria-hidden="true">
      <Suspense fallback={null}>
        <LiquidMetal
          key={isDark ? 'noir' : 'default'}
          {...shaderParams}
          scale={1}
          colorBack="#00000000"
          webGlContextAttributes={{ alpha: true, premultipliedAlpha: true }}
          speed={reduceMotion ? 0 : shaderParams.speed}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      </Suspense>
    </div>
  )
}

const FLORENCE_ROADMAP = [
  {
    status: 'now',
    phase: 'Now',
    title: 'V1 shipped',
    body: 'MVP design system, React components with component contracts, and architecture that’s retrievable by agents.',
  },
  {
    status: 'next',
    phase: 'Next',
    title: 'V2 for coding agents',
    body: 'Components you drop into Cursor, Claude Code, or Codex — copy-paste prompts, snippets, and chat-ready code.',
  },
  {
    status: 'next',
    phase: 'Next',
    title: 'Figma file launch',
    body: 'Ship the Figma library so design and code share one system.',
  },
  {
    status: 'later',
    phase: 'Later',
    title: 'More agentic',
    body: 'Agents that compose, review, and ship against Florence.',
  },
]

function AboutPage({ onNavigate, onUpgradeToPro }) {
  return (
    <div className="content-block content-block--statement">
      <div className="layout-page home-stage">
        <div className="layout-split home-pair">
        <article className="statement">
          <h1 className="statement__brand text-display">
            <span>Florence</span>
            <span>AI-ready design system</span>
          </h1>

          <p className="statement__body text-body">
            Florence is an AI-ready design system that is designed for agents
            to understand better so humans can ship faster. This is developed
            by Human AI Studio.
          </p>

          <div className="statement__actions">
            <button
              type="button"
              className="statement__btn statement__btn--primary"
              onClick={() => onNavigate('gallery')}
            >
              Browse all components
            </button>
            <button
              type="button"
              className="statement__btn statement__btn--secondary"
              onClick={onUpgradeToPro}
            >
              {FLORENCE_PRO_COPY.cta}
            </button>
          </div>

          <p className="statement__meta">
            All the components are available, with code snippets and copy
            prompts. If you want the complete design system and more embedded
            support,{' '}
            <a
              className="statement__meta-link"
              href="https://www.humanaistudio.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              book a discovery call
            </a>
            .
          </p>
        </article>

        <Timeline
          className="home-pair__timeline"
          label="Florence roadmap"
          headingLevel={2}
          items={FLORENCE_ROADMAP}
        />
        </div>
      </div>
    </div>
  )
}

function ColorPrimitives() {
  return (
    <div className="scales">
      {SCALES.map((scale, index) => (
        <ScaleRow key={scale.name} {...scale} index={index} />
      ))}

      <section className="scale" style={{ animationDelay: '300ms' }}>
        <header className="scale__header">
          <h2>Singles</h2>
          <code>color-white · color-black</code>
        </header>
        <div className="scale__row scale__row--singles">
          {SINGLES.map((item, i) => (
            <Swatch
              key={item.name}
              tokenName={item.name}
              delay={320 + i * 24}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function ColorSemantics() {
  return (
    <div className="scales">
      {SEMANTIC_GROUPS.map((group) => (
        <section key={group.id} className="scale">
          <header className="scale__header">
            <h2>{group.label}</h2>
            <code>color-{group.id}-*</code>
          </header>

          {group.subgroups ? (
            <div className="semantic-subgroups">
              {group.subgroups.map((subgroup) => (
                <div key={subgroup.label} className="semantic-subgroup">
                  <h3 className="semantic-subgroup__label">
                    {subgroup.label}
                  </h3>
                  <div className="token-chip-grid">
                    {subgroup.tokens.map((token) => (
                      <SemanticSwatch
                        key={token}
                        group={group.id}
                        tokenName={token}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="token-chip-grid">
              {group.tokens.map((token) => (
                <SemanticSwatch
                  key={token}
                  group={group.id}
                  tokenName={token}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

function SemanticSwatch({ group, tokenName }) {
  const cssVar = tokenVar(tokenName)
  const [hex, setHex] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHex(resolveToken(tokenName))
  }, [tokenName])

  async function copy() {
    await navigator.clipboard.writeText(cssVar)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 900)
  }

  const label = tokenName.replace(`${group}-`, '').replace(/-/g, ' ')

  return (
    <button
      type="button"
      className="token-chip"
      onClick={copy}
      title={`Copy ${cssVar}`}
    >
      <span
        className="token-chip__dot"
        style={{ backgroundColor: `var(${cssVar})` }}
        aria-hidden="true"
      />
      <span className="token-chip__body">
        <span className="token-chip__name">{label}</span>
        <span className="token-chip__meta">
          {copied ? 'Copied' : hex || cssVar}
        </span>
      </span>
    </button>
  )
}

const TYPE_SIZES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const TYPE_WEIGHTS = [
  { name: 'regular', value: 400 },
  { name: 'medium', value: 500 },
  { name: 'semibold', value: 600 },
  { name: 'bold', value: 700 },
]
const TYPE_LEADING = ['tight', 'snug', 'normal', 'relaxed']
const TYPE_TRACKING = ['tighter', 'tight', 'normal', 'wide', 'wider']

const TYPE_SEMANTICS = [
  {
    name: 'display',
    className: 'text-display',
    sample: 'Florence',
  },
  {
    name: 'metric',
    className: 'text-metric',
    sample: '$5,144,707.08',
  },
  {
    name: 'heading-xl',
    className: 'text-heading-xl',
    sample: 'Design system foundations',
  },
  {
    name: 'heading-lg',
    className: 'text-heading-lg',
    sample: 'Typography semantics',
  },
  {
    name: 'heading-md',
    className: 'text-heading-md',
    sample: 'Build with intent',
  },
  {
    name: 'heading-sm',
    className: 'text-heading-sm',
    sample: 'Section title',
  },
  {
    name: 'heading-xs',
    className: 'text-heading-xs',
    sample: 'Subsection title',
  },
  {
    name: 'body-lg',
    className: 'text-body-lg',
    sample:
      'Use semantic text styles in components so hierarchy stays consistent across the product.',
  },
  {
    name: 'body',
    className: 'text-body',
    sample:
      'Body text carries the bulk of product copy. Keep size and leading on the semantic tokens.',
  },
  {
    name: 'body-sm',
    className: 'text-body-sm',
    sample: 'Supporting copy for denser UI, tables, and helper text.',
  },
  {
    name: 'label',
    className: 'text-label',
    sample: 'Form label',
  },
  {
    name: 'caption',
    className: 'text-caption',
    sample: 'Caption or metadata under a control',
  },
  {
    name: 'overline',
    className: 'text-overline',
    sample: 'Section meta',
  },
  {
    name: 'code',
    className: 'text-code',
    sample: 'flowrix list typography',
  },
]

function TypographyPage() {
  return (
    <div className="type-sections">
      <section className="scale">
        <header className="scale__header">
          <h2>Family</h2>
          <code>font-sans · font-mono</code>
        </header>
        <div className="type-family">
          <p className="type-family__sans">
            Geist Sans. The quick brown fox jumps over the lazy dog
          </p>
          <p className="type-family__mono">
            Geist Mono. The quick brown fox jumps over the lazy dog 0123456789
          </p>
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Size</h2>
          <code>font-size-50 → 900</code>
        </header>
        <div className="type-list">
          {TYPE_SIZES.map((step) => (
            <div key={step} className="type-row">
              <code>font-size-{step}</code>
              <p style={{ fontSize: `var(--font-size-${step})` }}>
                Florence design system
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Weight</h2>
          <code>font-weight-*</code>
        </header>
        <div className="type-list">
          {TYPE_WEIGHTS.map((weight) => (
            <div key={weight.name} className="type-row">
              <code>
                font-weight-{weight.name} · {weight.value}
              </code>
              <p style={{ fontWeight: `var(--font-weight-${weight.name})` }}>
                Florence design system
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Line height</h2>
          <code>line-height-*</code>
        </header>
        <div className="type-list">
          {TYPE_LEADING.map((name) => (
            <div key={name} className="type-row type-row--block">
              <code>line-height-{name}</code>
              <p style={{ lineHeight: `var(--line-height-${name})` }}>
                Typography sets voice and hierarchy. Line height controls how
                dense or open body text feels across layouts and components.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Letter spacing</h2>
          <code>letter-spacing-*</code>
        </header>
        <div className="type-list">
          {TYPE_TRACKING.map((name) => (
            <div key={name} className="type-row">
              <code>letter-spacing-{name}</code>
              <p
                style={{
                  letterSpacing: `var(--letter-spacing-${name})`,
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                FLOWRIX
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function TypographySemanticsPage() {
  return (
    <section className="scale">
      <header className="scale__header">
        <h2>Roles</h2>
        <code>text-display → text-code</code>
      </header>
      <div className="type-list">
        {TYPE_SEMANTICS.map((style) => (
          <div
            key={style.name}
            className={`type-row ${
              style.name.startsWith('body') ? 'type-row--block' : ''
            }`}
          >
            <code>.{style.className}</code>
            <p className={style.className}>{style.sample}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const SPACE_STEPS = [
  { name: '0', px: '0' },
  { name: '50', px: '2px' },
  { name: '100', px: '4px' },
  { name: '200', px: '8px' },
  { name: '300', px: '12px' },
  { name: '400', px: '16px' },
  { name: '500', px: '20px' },
  { name: '600', px: '24px' },
  { name: '700', px: '32px' },
  { name: '800', px: '40px' },
  { name: '900', px: '48px' },
  { name: '1000', px: '64px' },
]

const SPACE_SEMANTICS = [
  {
    title: 'Inset',
    code: 'space-inset-*',
    tokens: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    prefix: 'inset',
  },
  {
    title: 'Stack',
    code: 'space-stack-*',
    tokens: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    prefix: 'stack',
  },
  {
    title: 'Inline',
    code: 'space-inline-*',
    tokens: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    prefix: 'inline',
  },
  {
    title: 'Gap',
    code: 'space-gap-*',
    tokens: ['xs', 'sm', 'md', 'lg', 'xl'],
    prefix: 'gap',
  },
  {
    title: 'Section',
    code: 'space-section-*',
    tokens: ['sm', 'md', 'lg'],
    prefix: 'section',
  },
]

function SpacingPrimitivesPage() {
  return (
    <section className="scale">
      <header className="scale__header">
        <h2>Scale</h2>
        <code>space-0 → space-1000</code>
      </header>
      <div className="space-list">
        {SPACE_STEPS.map((step) => (
          <div key={step.name} className="space-row">
            <code>space-{step.name}</code>
            <span className="space-row__px">{step.px}</span>
            <div className="space-row__track">
              <div
                className="space-row__bar"
                style={{ width: `var(--space-${step.name})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SpacingSemanticsPage() {
  return (
    <div className="space-sections">
      {SPACE_SEMANTICS.map((group) => (
        <section key={group.prefix} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
            <code>{group.code}</code>
          </header>
          <div className="space-list">
            {group.tokens.map((token) => (
              <div key={token} className="space-row">
                <code>
                  space-{group.prefix}-{token}
                </code>
                <div className="space-row__track">
                  <div
                    className="space-row__bar"
                    style={{
                      width: `var(--space-${group.prefix}-${token})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const GRID_PRIMITIVE_GROUPS = [
  {
    title: 'Columns',
    code: 'grid-columns',
    tokens: [{ name: 'grid-columns', note: '12' }],
  },
  {
    title: 'Gutters',
    code: 'grid-gutter-*',
    tokens: [
      { name: 'grid-gutter-sm', note: '12px' },
      { name: 'grid-gutter-md', note: '16px' },
      { name: 'grid-gutter-lg', note: '24px' },
      { name: 'grid-gutter-xl', note: '40px' },
    ],
  },
  {
    title: 'Margins',
    code: 'grid-margin-*',
    tokens: [
      { name: 'grid-margin-sm', note: '16px' },
      { name: 'grid-margin-md', note: '24px' },
      { name: 'grid-margin-lg', note: '40px' },
    ],
  },
  {
    title: 'Widths',
    code: 'grid-width-*',
    tokens: [
      { name: 'grid-width-sm', note: '640px' },
      { name: 'grid-width-md', note: '1024px' },
      { name: 'grid-width-lg', note: '1280px' },
      { name: 'grid-width-xl', note: '1440px' },
    ],
  },
  {
    title: 'Breakpoints',
    code: 'grid-breakpoint-*',
    tokens: [
      { name: 'grid-breakpoint-sm', note: '640px' },
      { name: 'grid-breakpoint-md', note: '1024px' },
      { name: 'grid-breakpoint-lg', note: '1280px' },
    ],
  },
]

const GRID_SEMANTICS = [
  {
    title: 'App shell',
    code: 'layout-sidebar · layout-rail',
    tokens: [
      { name: 'sidebar', note: '14rem nav' },
      { name: 'rail', note: '22rem rail' },
      { name: 'metrics-min', note: 'KPI min track' },
    ],
    prefix: '',
  },
  {
    title: 'Gutter',
    code: 'layout-gutter-*',
    tokens: ['sm', 'md', 'lg', 'xl'],
    prefix: 'gutter',
  },
  {
    title: 'Margin',
    code: 'layout-margin-*',
    tokens: ['sm', 'md', 'lg'],
    prefix: 'margin',
  },
  {
    title: 'Container',
    code: 'layout-container-*',
    tokens: ['sm', 'md', 'lg', 'xl'],
    prefix: 'container',
  },
]

const GRID_LAYOUTS = [
  { className: 'layout-container-sm', label: 'sm · 640' },
  { className: 'layout-container-md', label: 'md · 1024' },
  { className: 'layout-container-lg', label: 'lg · 1280' },
  { className: 'layout-container-xl', label: 'xl · 1440' },
]

const SAAS_PATTERNS = [
  {
    name: 'App shell',
    className: '.layout-app',
    copy: 'Fixed product nav + fluid canvas. First layout every SaaS screen should use.',
  },
  {
    name: 'Canvas',
    className: '.layout-canvas',
    copy: 'Header bar over a fill-height body. Lives inside the app shell canvas column.',
  },
  {
    name: 'Workspace',
    className: '.layout-workspace',
    copy: 'Primary content + optional context rail (assistant, inspector, detail).',
  },
  {
    name: 'Content',
    className: '.layout-content',
    copy: 'Scrollable dashboard body with section stack and page inset.',
  },
  {
    name: 'Metrics',
    className: '.layout-metrics',
    copy: 'KPI / summary card strip. Use --fixed-3 or --fixed-4 when the count is known.',
  },
  {
    name: 'Header',
    className: '.layout-header',
    copy: 'Title cluster + actions row for the canvas top bar.',
  },
]

function GridPrimitivesPage() {
  return (
    <div className="space-sections">
      {GRID_PRIMITIVE_GROUPS.map((group) => (
        <section key={group.title} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
            <code>{group.code}</code>
          </header>
          <div className="space-list">
            {group.tokens.map((token) => (
              <div key={token.name} className="space-row">
                <code>--{token.name}</code>
                <span className="space-row__px">{token.note}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function GridSemanticsPage() {
  return (
    <>
      <section className="scale">
        <header className="scale__header">
          <h2>SaaS composition</h2>
          <code>app → canvas → workspace → content</code>
        </header>
        <p className="grid-demo-lede">
          Build product screens from these patterns instead of inventing per-page
          grids. The Playground dashboard uses this exact stack.
        </p>
        <div className="grid-pattern-map" aria-hidden="true">
          <div className="grid-pattern-map__app">
            <div className="grid-pattern-map__nav">Nav</div>
            <div className="grid-pattern-map__canvas">
              <div className="grid-pattern-map__header">Header</div>
              <div className="grid-pattern-map__workspace">
                <div className="grid-pattern-map__main">
                  <div className="grid-pattern-map__metrics">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="grid-pattern-map__split">
                    <span>Main</span>
                    <span>Aside</span>
                  </div>
                </div>
                <div className="grid-pattern-map__rail">Rail</div>
              </div>
            </div>
          </div>
        </div>
        <CopyableCode lang="jsx">{`<div className="layout-app">
  <aside>{/* nav */}</aside>
  <div className="layout-canvas">
    <header className="layout-header">…</header>
    <div className="layout-workspace">
      <main className="layout-content">
        <section className="layout-metrics layout-metrics--fixed-3">…</section>
        <section className="layout-split--primary">…</section>
      </main>
      <aside>{/* assistant rail */}</aside>
    </div>
  </div>
</div>`}</CopyableCode>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Patterns</h2>
          <code>.layout-*</code>
        </header>
        <div className="grid-pattern-list">
          {SAAS_PATTERNS.map((pattern) => (
            <article key={pattern.name} className="grid-pattern-card">
              <header>
                <h3>{pattern.name}</h3>
                <code>{pattern.className}</code>
              </header>
              <p>{pattern.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Metrics</h2>
          <code>.layout-metrics</code>
        </header>
        <p className="grid-demo-lede">
          Dashboard KPI rows. Fixed variants keep equal columns; the default
          auto-fits from <code>--layout-metrics-min</code>.
        </p>
        <div className="layout-metrics layout-metrics--fixed-3 grid-demo-split">
          {['Users', 'Conversion', 'Open tasks'].map((label) => (
            <div key={label} className="grid-demo-cell">
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Content splits</h2>
          <code>.layout-split*</code>
        </header>
        <p className="grid-demo-lede">
          Panels inside <code>.layout-content</code>. Primary is the default
          table + activity layout used by the dashboard.
        </p>
        <div className="grid-demo-stack">
          <div className="grid-demo-row">
            <code>.layout-split--primary</code>
            <div className="layout-split--primary grid-demo-split">
              <div className="grid-demo-cell">Main · table</div>
              <div className="grid-demo-cell">Aside · feed</div>
            </div>
          </div>
          <div className="grid-demo-row">
            <code>.layout-split</code>
            <div className="layout-split grid-demo-split">
              <div className="grid-demo-cell">Half</div>
              <div className="grid-demo-cell">Half</div>
            </div>
          </div>
          <div className="grid-demo-row">
            <code>.layout-split--thirds</code>
            <div className="layout-split--thirds grid-demo-split">
              <div className="grid-demo-cell">1</div>
              <div className="grid-demo-cell">2</div>
              <div className="grid-demo-cell">3</div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-sections">
        {GRID_SEMANTICS.map((group) => (
          <section key={group.title} className="scale">
            <header className="scale__header">
              <h2>{group.title}</h2>
              <code>{group.code}</code>
            </header>
            <div className="space-list">
              {group.tokens.map((token) => {
                const name = typeof token === 'string' ? token : token.name
                const note = typeof token === 'string' ? null : token.note
                const tokenName = group.prefix
                  ? `layout-${group.prefix}-${name}`
                  : `layout-${name}`
                return (
                  <div key={name} className="space-row">
                    <code>{tokenName}</code>
                    {note ? (
                      <span className="space-row__px">{note}</span>
                    ) : (
                      <div className="space-row__track">
                        <div
                          className="space-row__bar"
                          style={{
                            width: `min(100%, var(--${tokenName}))`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="scale">
        <header className="scale__header">
          <h2>Containers</h2>
          <code>.layout-container-*</code>
        </header>
        <p className="grid-demo-lede">
          Centered max-width shells for docs and marketing. Prefer the SaaS
          patterns above for product UI.
        </p>
        <div className="grid-demo-stack">
          {GRID_LAYOUTS.map((layout) => (
            <div key={layout.className} className="grid-demo-row">
              <code>.{layout.className}</code>
              <div className="grid-demo-track">
                <div className={`grid-demo-box ${layout.className}`}>
                  {layout.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const RADIUS_STEPS = [
  { name: '0', px: '0' },
  { name: '50', px: '2px' },
  { name: '100', px: '4px' },
  { name: '200', px: '8px' },
  { name: '300', px: '12px' },
  { name: '400', px: '16px' },
  { name: '500', px: '20px' },
  { name: '600', px: '24px' },
  { name: 'full', px: '9999px' },
]

const RADIUS_SEMANTICS = [
  {
    title: 'Control',
    code: 'radius-control-*',
    prefix: 'control',
    tokens: ['sm', 'md', 'lg'],
  },
  {
    title: 'Surface',
    code: 'radius-surface-*',
    prefix: 'surface',
    tokens: ['sm', 'md', 'lg'],
  },
  {
    title: 'Media',
    code: 'radius-media-*',
    prefix: 'media',
    tokens: ['sm', 'md', 'lg'],
  },
  {
    title: 'Pill',
    code: 'radius-pill',
    prefix: 'pill',
    tokens: [null],
  },
]

function RadiusPrimitivesPage() {
  return (
    <section className="scale">
      <header className="scale__header">
        <h2>Scale</h2>
        <code>radius-0 → radius-full</code>
      </header>
      <div className="radius-list">
        {RADIUS_STEPS.map((step) => (
          <div key={step.name} className="radius-row">
            <code>--radius-{step.name}</code>
            <span className="radius-row__px">{step.px}</span>
            <div
              className="radius-row__swatch"
              style={{ borderRadius: `var(--radius-${step.name})` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function RadiusSemanticsPage() {
  return (
    <div className="space-sections">
      {RADIUS_SEMANTICS.map((group) => (
        <section key={group.prefix} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
            <code>{group.code}</code>
          </header>
          <div className="radius-list">
            {group.tokens.map((token) => {
              const name =
                token === null
                  ? `radius-${group.prefix}`
                  : `radius-${group.prefix}-${token}`
              return (
                <div key={name} className="radius-row">
                  <code>--{name}</code>
                  <div
                    className="radius-row__swatch"
                    style={{ borderRadius: `var(--${name})` }}
                  />
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

const BORDER_STEPS = [
  { name: '0', px: '0' },
  { name: '100', px: '1px' },
  { name: '200', px: '2px' },
  { name: '300', px: '4px' },
]

const BORDER_SEMANTICS = [
  {
    title: 'Control',
    code: 'border-control*',
    tokens: [
      { name: 'border-control', note: '1px' },
      { name: 'border-control-strong', note: '2px' },
    ],
  },
  {
    title: 'Surface',
    code: 'border-surface',
    tokens: [{ name: 'border-surface', note: '1px' }],
  },
  {
    title: 'Highlight',
    code: 'border-highlight',
    tokens: [{ name: 'border-highlight', note: 'glass 1px' }],
  },
  {
    title: 'Divider',
    code: 'border-divider*',
    tokens: [
      { name: 'border-divider', note: '1px' },
      { name: 'border-divider-strong', note: '2px' },
    ],
  },
  {
    title: 'Focus',
    code: 'border-focus',
    tokens: [{ name: 'border-focus', note: '2px' }],
  },
]

function BorderPrimitivesPage() {
  return (
    <section className="scale">
      <header className="scale__header">
        <h2>Scale</h2>
        <code>border-0 → border-300</code>
      </header>
      <div className="border-list">
        {BORDER_STEPS.map((step) => (
          <div key={step.name} className="border-row">
            <code>--border-{step.name}</code>
            <span className="border-row__px">{step.px}</span>
            <div
              className="border-row__swatch"
              style={{ borderWidth: `var(--border-${step.name})` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function BorderSemanticsPage() {
  return (
    <div className="space-sections">
      {BORDER_SEMANTICS.map((group) => (
        <section key={group.title} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
            <code>{group.code}</code>
          </header>
          <div className="border-list">
            {group.tokens.map((token) => (
              <div key={token.name} className="border-row">
                <code>--{token.name}</code>
                <span className="border-row__px">{token.note}</span>
                <div
                  className="border-row__swatch"
                  style={{ borderWidth: `var(--${token.name})` }}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const SHADOW_STEPS = [
  { name: '0', note: 'none' },
  { name: '100', note: 'xs' },
  { name: '150', note: 'soft-xs' },
  { name: '200', note: 'sm' },
  { name: '250', note: 'soft' },
  { name: '300', note: 'md' },
  { name: '400', note: 'lg' },
  { name: '500', note: 'xl' },
  { name: '600', note: '2xl' },
]

const SHADOW_SEMANTICS = [
  {
    title: 'Raised',
    code: 'shadow-raised-*',
    tokens: [
      { name: 'shadow-raised-sm', note: 'sm' },
      { name: 'shadow-raised-md', note: 'md' },
      { name: 'shadow-raised-lg', note: 'lg' },
      { name: 'shadow-raised-soft', note: 'soft' },
      { name: 'shadow-raised-depth', note: 'glass rim' },
    ],
  },
  {
    title: 'Overlay',
    code: 'shadow-overlay-*',
    tokens: [
      { name: 'shadow-overlay-sm', note: 'sm' },
      { name: 'shadow-overlay-md', note: 'md' },
      { name: 'shadow-overlay-lg', note: 'lg' },
    ],
  },
  {
    title: 'Modal',
    code: 'shadow-modal',
    tokens: [{ name: 'shadow-modal', note: 'modal' }],
  },
]

function ShadowPrimitivesPage() {
  return (
    <section className="scale">
      <header className="scale__header">
        <h2>Scale</h2>
        <code>shadow-0 → shadow-600</code>
      </header>
      <div className="shadow-list">
        {SHADOW_STEPS.map((step) => (
          <div key={step.name} className="shadow-row">
            <code>--shadow-{step.name}</code>
            <span className="shadow-row__note">{step.note}</span>
            <div
              className="shadow-row__swatch"
              style={{ boxShadow: `var(--shadow-${step.name})` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function ShadowSemanticsPage() {
  return (
    <div className="space-sections">
      {SHADOW_SEMANTICS.map((group) => (
        <section key={group.title} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
            <code>{group.code}</code>
          </header>
          <div className="shadow-list">
            {group.tokens.map((token) => (
              <div key={token.name} className="shadow-row">
                <code>--{token.name}</code>
                <span className="shadow-row__note">{token.note}</span>
                <div
                  className="shadow-row__swatch"
                  style={{ boxShadow: `var(--${token.name})` }}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const MOTION_DURATION_STEPS = [
  { name: '0', note: '0ms' },
  { name: '100', note: '120ms' },
  { name: '150', note: '160ms' },
  { name: '200', note: '180ms' },
  { name: '300', note: '240ms' },
  { name: '400', note: '320ms' },
  { name: '500', note: '400ms' },
  { name: '600', note: '500ms' },
]

const MOTION_EASING_STEPS = [
  { name: 'linear', note: 'constant speed' },
  { name: 'in', note: 'accelerate · avoid for enter' },
  { name: 'out', note: 'responsive enter' },
  { name: 'in-out', note: 'on-screen morph' },
  { name: 'standard', note: 'default UI · ease-out' },
  { name: 'emphasized', note: 'drawer / modal' },
  { name: 'spring', note: 'subtle overshoot' },
]

const MOTION_PATTERNS = {
  lift: {
    anchor: { top: '50%', left: '50%' },
    rest: { transform: 'translate(-50%, -50%)' },
    play: { transform: 'translate(-50%, -120%)' },
  },
  scale: {
    anchor: { top: '50%', left: '50%' },
    rest: { transform: 'translate(-50%, -50%) scale(0.95)' },
    play: { transform: 'translate(-50%, -50%) scale(1.12)' },
  },
  rise: {
    anchor: { top: '50%', left: '50%' },
    rest: { transform: 'translate(-50%, -50%)' },
    play: { transform: 'translate(-50%, -120%)' },
  },
  drop: {
    anchor: { top: '50%', left: '50%' },
    rest: { transform: 'translate(-50%, -50%)' },
    play: { transform: 'translate(-50%, 20%)' },
  },
  drift: {
    anchor: { top: '50%', left: '50%' },
    rest: { transform: 'translate(-50%, -50%)' },
    play: { transform: 'translate(-50%, -130%)' },
  },
}

const MOTION_SEMANTICS = [
  {
    title: 'Interaction',
    pattern: 'lift',
    demos: [
      {
        label: 'Standard',
        note: '120ms · out',
        duration: 'var(--motion-interaction-duration)',
        easing: 'var(--motion-interaction-easing)',
      },
      {
        label: 'Snappy',
        note: '120ms · out',
        duration: 'var(--motion-duration-100)',
        easing: 'var(--motion-ease-out)',
      },
      {
        label: 'Soft',
        note: '180ms · in-out',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-in-out)',
      },
      {
        label: 'Emphasized',
        note: '120ms · emphasized',
        duration: 'var(--motion-duration-100)',
        easing: 'var(--motion-ease-emphasized)',
      },
      {
        label: 'Spring',
        note: '180ms · spring',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-spring)',
      },
      {
        label: 'Linear',
        note: '120ms · linear',
        duration: 'var(--motion-duration-100)',
        easing: 'var(--motion-ease-linear)',
      },
      {
        label: 'Crisp',
        note: '160ms · out',
        duration: 'var(--motion-duration-150)',
        easing: 'var(--motion-ease-out)',
      },
    ],
  },
  {
    title: 'Expand',
    pattern: 'scale',
    demos: [
      {
        label: 'Emphasized',
        note: '240ms · in-out',
        duration: 'var(--motion-expand-duration)',
        easing: 'var(--motion-expand-easing)',
      },
      {
        label: 'Standard',
        note: '240ms · standard',
        duration: 'var(--motion-duration-300)',
        easing: 'var(--motion-ease-standard)',
      },
      {
        label: 'Ease out',
        note: '240ms · out',
        duration: 'var(--motion-duration-300)',
        easing: 'var(--motion-ease-out)',
      },
      {
        label: 'Spring',
        note: '240ms · spring',
        duration: 'var(--motion-duration-300)',
        easing: 'var(--motion-ease-spring)',
      },
      {
        label: 'In-out',
        note: '320ms · in-out',
        duration: 'var(--motion-duration-400)',
        easing: 'var(--motion-ease-in-out)',
      },
      {
        label: 'Linear',
        note: '240ms · linear',
        duration: 'var(--motion-duration-300)',
        easing: 'var(--motion-ease-linear)',
      },
      {
        label: 'Ease in',
        note: '240ms · in',
        duration: 'var(--motion-duration-300)',
        easing: 'var(--motion-ease-in)',
      },
    ],
  },
  {
    title: 'Overlay',
    demos: [
      {
        label: 'Enter · out',
        note: '180ms · out',
        pattern: 'rise',
        duration: 'var(--motion-overlay-duration)',
        easing: 'var(--motion-overlay-easing)',
      },
      {
        label: 'Enter · spring',
        note: '180ms · spring',
        pattern: 'rise',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-spring)',
      },
      {
        label: 'Enter · emphasized',
        note: '180ms · emphasized',
        pattern: 'rise',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-emphasized)',
      },
      {
        label: 'Enter · in-out',
        note: '180ms · in-out',
        pattern: 'rise',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-in-out)',
      },
      {
        label: 'Exit · out',
        note: '120ms · out',
        pattern: 'drop',
        duration: 'var(--motion-overlay-exit-duration)',
        easing: 'var(--motion-overlay-exit-easing)',
      },
      {
        label: 'Exit · linear',
        note: '120ms · linear',
        pattern: 'drop',
        duration: 'var(--motion-duration-100)',
        easing: 'var(--motion-ease-linear)',
      },
      {
        label: 'Exit · quick',
        note: '120ms · standard',
        pattern: 'drop',
        duration: 'var(--motion-duration-100)',
        easing: 'var(--motion-ease-standard)',
      },
    ],
  },
  {
    title: 'Modal',
    demos: [
      {
        label: 'Enter · emphasized',
        note: '320ms · emphasized',
        pattern: 'rise',
        duration: 'var(--motion-modal-duration)',
        easing: 'var(--motion-modal-easing)',
      },
      {
        label: 'Enter · spring',
        note: '320ms · spring',
        pattern: 'rise',
        duration: 'var(--motion-duration-400)',
        easing: 'var(--motion-ease-spring)',
      },
      {
        label: 'Enter · out',
        note: '320ms · out',
        pattern: 'rise',
        duration: 'var(--motion-duration-400)',
        easing: 'var(--motion-ease-out)',
      },
      {
        label: 'Enter · in-out',
        note: '320ms · in-out',
        pattern: 'rise',
        duration: 'var(--motion-duration-400)',
        easing: 'var(--motion-ease-in-out)',
      },
      {
        label: 'Exit · out',
        note: '180ms · out',
        pattern: 'drop',
        duration: 'var(--motion-modal-exit-duration)',
        easing: 'var(--motion-modal-exit-easing)',
      },
      {
        label: 'Exit · standard',
        note: '180ms · standard',
        pattern: 'drop',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-standard)',
      },
      {
        label: 'Exit · spring',
        note: '180ms · spring',
        pattern: 'drop',
        duration: 'var(--motion-duration-200)',
        easing: 'var(--motion-ease-spring)',
      },
    ],
  },
  {
    title: 'Page',
    pattern: 'drift',
    demos: [
      {
        label: 'Emphasized',
        note: '400ms · emphasized',
        duration: 'var(--motion-page-duration)',
        easing: 'var(--motion-page-easing)',
      },
      {
        label: 'Standard',
        note: '400ms · standard',
        duration: 'var(--motion-duration-500)',
        easing: 'var(--motion-ease-standard)',
      },
      {
        label: 'In-out',
        note: '400ms · in-out',
        duration: 'var(--motion-duration-500)',
        easing: 'var(--motion-ease-in-out)',
      },
      {
        label: 'Spring',
        note: '400ms · spring',
        duration: 'var(--motion-duration-500)',
        easing: 'var(--motion-ease-spring)',
      },
      {
        label: 'Soft out',
        note: '500ms · out',
        duration: 'var(--motion-duration-600)',
        easing: 'var(--motion-ease-out)',
      },
      {
        label: 'Linear',
        note: '400ms · linear',
        duration: 'var(--motion-duration-500)',
        easing: 'var(--motion-ease-linear)',
      },
      {
        label: 'Crisp',
        note: '320ms · out',
        duration: 'var(--motion-duration-400)',
        easing: 'var(--motion-ease-out)',
      },
    ],
  },
]

function resolveCssValue(expr) {
  if (!expr) return ''
  const trimmed = expr.trim()
  if (!trimmed.includes('var(')) return trimmed

  const match = trimmed.match(/var\(\s*(--[\w-]+)\s*\)/)
  if (!match) return ''
  return getComputedStyle(document.documentElement)
    .getPropertyValue(match[1])
    .trim()
}

function parseDurationSeconds(expr) {
  const raw = resolveCssValue(expr)
  if (!raw) return 0.3
  if (raw.endsWith('ms')) return parseFloat(raw) / 1000
  if (raw.endsWith('s')) return parseFloat(raw)
  const value = Number(raw)
  return Number.isFinite(value) ? value / 1000 : 0.3
}

function parseEase(expr) {
  const raw = resolveCssValue(expr)
  if (!raw || raw === 'linear') return 'linear'

  const bezier = raw.match(/cubic-bezier\(\s*([^)]+)\)/)
  if (bezier) {
    return bezier[1].split(',').map((part) => Number(part.trim()))
  }

  return 'easeOut'
}

function MotionPlayDemo({
  duration,
  easing,
  title,
  note,
  labelAsText = false,
  pattern = 'lift',
}) {
  const [playing, setPlaying] = useState(false)
  const [playId, setPlayId] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const motionPattern = MOTION_PATTERNS[pattern] ?? MOTION_PATTERNS.lift

  function play() {
    setPlaying(false)
    window.requestAnimationFrame(() => {
      setPlayId((id) => id + 1)
      setPlaying(true)
    })
  }

  const seconds = shouldReduceMotion ? 0.01 : parseDurationSeconds(duration)
  const ease = shouldReduceMotion ? 'linear' : parseEase(easing)

  return (
    <button
      type="button"
      className="motion-card"
      onClick={play}
      aria-label={`Play ${title} motion demo`}
    >
      <div className="motion-card__stage" aria-hidden="true">
        <motion.div
          key={playId}
          className="motion-card__square"
          style={motionPattern.anchor}
          initial={motionPattern.rest}
          animate={playing ? motionPattern.play : motionPattern.rest}
          transition={{
            duration: seconds,
            ease,
            repeat: playing && !shouldReduceMotion ? 1 : 0,
            repeatType: 'reverse',
          }}
          onAnimationComplete={() => setPlaying(false)}
        />
      </div>
      <div className="motion-card__footer">
        {labelAsText ? (
          <span className="motion-card__label">{title}</span>
        ) : (
          <code>{title}</code>
        )}
        {note ? <span className="motion-row__note">{note}</span> : null}
      </div>
    </button>
  )
}

function MotionPrimitivesPage() {
  return (
    <div className="space-sections">
      <section className="scale">
        <header className="scale__header">
          <h2>Duration</h2>
        </header>
        <div className="motion-gallery">
          {MOTION_DURATION_STEPS.map((step) => (
            <MotionPlayDemo
              key={step.name}
              title={`duration-${step.name}`}
              note={step.note}
              pattern="lift"
              duration={`var(--motion-duration-${step.name})`}
              easing="var(--motion-ease-linear)"
            />
          ))}
        </div>
      </section>

      <section className="scale">
        <header className="scale__header">
          <h2>Easing</h2>
        </header>
        <div className="motion-gallery">
          {MOTION_EASING_STEPS.map((step) => (
            <MotionPlayDemo
              key={step.name}
              title={`ease-${step.name}`}
              note={step.note}
              pattern="lift"
              duration="var(--motion-duration-600)"
              easing={`var(--motion-ease-${step.name})`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function MotionSemanticsPage() {
  return (
    <div className="space-sections">
      {MOTION_SEMANTICS.map((group) => (
        <section key={group.title} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
          </header>

          <div className="motion-gallery">
            {group.demos.map((demo) => (
              <MotionPlayDemo
                key={demo.label}
                title={demo.label}
                note={demo.note}
                labelAsText
                pattern={demo.pattern ?? group.pattern ?? 'lift'}
                duration={demo.duration}
                easing={demo.easing}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const OPACITY_STEPS = [
  { name: '0', note: '0' },
  { name: '100', note: '0.08' },
  { name: '200', note: '0.16' },
  { name: '300', note: '0.32' },
  { name: '400', note: '0.48' },
  { name: '500', note: '0.64' },
  { name: '600', note: '0.8' },
  { name: '700', note: '1' },
]

const OPACITY_SEMANTICS = [
  {
    title: 'Disabled',
    tokens: [{ name: 'opacity-disabled', note: '0.48' }],
  },
  {
    title: 'Muted',
    tokens: [{ name: 'opacity-muted', note: '0.64' }],
  },
  {
    title: 'Hover',
    tokens: [{ name: 'opacity-hover', note: '0.08' }],
  },
  {
    title: 'Scrim',
    tokens: [
      { name: 'opacity-scrim-soft', note: '0.32' },
      { name: 'opacity-scrim', note: '0.64' },
    ],
  },
  {
    title: 'Full',
    tokens: [{ name: 'opacity-full', note: '1' }],
  },
]

function OpacityPrimitivesPage() {
  return (
    <section className="scale">
      <header className="scale__header">
        <h2>Scale</h2>
      </header>
      <div className="opacity-list">
        {OPACITY_STEPS.map((step) => (
          <div key={step.name} className="opacity-row">
            <code>--opacity-{step.name}</code>
            <span className="opacity-row__note">{step.note}</span>
            <div className="opacity-row__swatch" aria-hidden="true">
              <div
                className="opacity-row__fill"
                style={{ opacity: `var(--opacity-${step.name})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function OpacitySemanticsPage() {
  return (
    <div className="space-sections">
      {OPACITY_SEMANTICS.map((group) => (
        <section key={group.title} className="scale">
          <header className="scale__header">
            <h2>{group.title}</h2>
          </header>
          <div className="opacity-list">
            {group.tokens.map((token) => (
              <div key={token.name} className="opacity-row">
                <code>--{token.name}</code>
                <span className="opacity-row__note">{token.note}</span>
                <div className="opacity-row__swatch" aria-hidden="true">
                  <div
                    className="opacity-row__fill"
                    style={{ opacity: `var(--${token.name})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function ComponentsIndex({ onNavigate }) {
  return (
    <ComponentsGallery pages={COMPONENT_PAGES} onNavigate={onNavigate} />
  )
}

const FLORENCE_PRO_COPY = {
  title: 'Unlock Pro components',
  body: 'Pro components, React snippets, and prompts you can drop into your coding agent and save tokens.',
  cta: 'Upgrade to Pro',
}


function AccessTabLabel({ children, locked = false }) {
  return (
    <span className="component-access__label">
      {children}
      {locked ? (
        <Lock
          className="component-access__lock"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      ) : null}
    </span>
  )
}

function ComponentDoc({
  id,
  title,
  summary,
  aboutTitle,
  about,
  preview,
  code,
  lang = 'auto',
}) {
  return (
    <section className="component-example" aria-labelledby={id}>
      <div className="component-example__header">
        <h2 id={id}>{title}</h2>
        {summary ? <p>{summary}</p> : null}
      </div>

      <div className="component-example__body">
        <div className="component-example__canvas">{preview}</div>
        {aboutTitle || about ? (
          <div className="component-detail">
            {aboutTitle ? (
              <h3 className="component-detail__title">{aboutTitle}</h3>
            ) : null}
            {about ? <p className="component-detail__body">{about}</p> : null}
          </div>
        ) : null}
        {code ? (
          <div className="component-example__code">
            <CopyableCode lang={lang}>{code}</CopyableCode>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ComponentMaster({
  id,
  title = 'Master',
  summary,
  aboutTitle = 'Usage',
  about,
  preview,
  code,
  lang = 'jsx',
  panel,
  variants,
}) {
  const [tab, setTab] = useState('preview')
  const hasVariants = variants != null

  return (
    <section className="component-master" aria-labelledby={id}>
      <div className="component-master__header">
        <h2 id={id}>{title}</h2>
        {summary ? <p>{summary}</p> : null}
        {hasVariants ? (
          <div
            className="foundation-tabs"
            role="tablist"
            aria-label={`${title} views`}
          >
            <button
              type="button"
              role="tab"
              className={`foundation-tabs__tab ${tab === 'preview' ? 'is-active' : ''}`}
              aria-selected={tab === 'preview'}
              onClick={() => setTab('preview')}
            >
              Preview
            </button>
            <button
              type="button"
              role="tab"
              className={`foundation-tabs__tab ${tab === 'variants' ? 'is-active' : ''}`}
              aria-selected={tab === 'variants'}
              onClick={() => setTab('variants')}
            >
              Variants
            </button>
          </div>
        ) : null}
      </div>

      {tab === 'preview' || !hasVariants ? (
        <div
          className="component-master__preview"
          role={hasVariants ? 'tabpanel' : undefined}
          aria-label={hasVariants ? 'Preview' : undefined}
        >
          <div className="component-master__layout">
            <div className="component-master__main">
              <div className="component-master__canvas">{preview}</div>
            </div>
            {panel}
          </div>

          <div className="component-master__docs">
            {aboutTitle || about ? (
              <div className="component-detail">
                {aboutTitle ? (
                  <h3 className="component-detail__title">{aboutTitle}</h3>
                ) : null}
                {about ? (
                  <p className="component-detail__body">{about}</p>
                ) : null}
              </div>
            ) : null}
            {code ? (
              <div className="component-master__code">
                <CopyableCode lang={lang}>{code}</CopyableCode>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className="component-master__variants"
          role="tabpanel"
          aria-label="Variants"
        >
          {variants}
        </div>
      )}
    </section>
  )
}

function ButtonsPage() {
  const sizes = ['lg', 'md', 'sm']
  const variants = ['primary', 'secondary', 'tertiary', 'danger']
  const [size, setSize] = useState('md')
  const [variant, setVariant] = useState('primary')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const masterLabels = {
    primary: 'Continue',
    secondary: 'Cancel',
    tertiary: 'Learn more',
    danger: 'Delete',
  }

  const masterCode = [
    `<Button`,
    `  variant="${variant}"`,
    `  size="${size}"`,
    disabled ? `  disabled` : null,
    loading ? `  loading` : null,
    `>`,
    `  ${masterLabels[variant]}`,
    `</Button>`,
  ]
    .filter(Boolean)
    .join('\n')

  const sections = [
    {
      id: 'button-primary',
      title: 'Primary',
      aboutTitle: 'Usage',
      about:
        'Use one Primary button per view. Show lg, md, and sm when hierarchy or density changes.',
      variant: 'primary',
      labels: { sm: 'Save', md: 'Continue', lg: 'Get started' },
    },
    {
      id: 'button-secondary',
      title: 'Secondary',
      aboutTitle: 'Usage',
      about:
        'Use Secondary for cancel, back, or alternate paths that should stay quieter than Primary.',
      variant: 'secondary',
      labels: { sm: 'Back', md: 'Cancel', lg: 'View details' },
    },
    {
      id: 'button-tertiary',
      title: 'Tertiary',
      aboutTitle: 'Usage',
      about:
        'Use Tertiary for quiet actions in toolbars, empty states, or denser UI where a filled button would feel heavy.',
      variant: 'tertiary',
      labels: { sm: 'Edit', md: 'Learn more', lg: 'See all options' },
    },
    {
      id: 'button-danger',
      title: 'Danger',
      aboutTitle: 'Usage',
      about:
        'Use Danger only for irreversible or harmful actions like delete. Confirm before committing when the cost of a mistake is high.',
      variant: 'danger',
      labels: { sm: 'Remove', md: 'Delete', lg: 'Delete account' },
    },
  ]

  return (
    <ComponentAccessLayout
      componentId="button"
      title="Buttons"
      lede="Action hierarchy across primary, secondary, tertiary, and danger - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="button-master"
          summary="Toggle size, variant, disabled, and loading to preview every Button combination."
          about="Use one Primary per view. Secondary for quieter paths, Tertiary for low-emphasis actions, and Danger only for irreversible work. Accessibility is built in — native button, focus-visible ring, loading/disabled states, and icon-only naming via aria-label. See button.json → a11y for the contract."
          code={masterCode}
          preview={
            <div className="button-preview">
              <Button
                variant={variant}
                size={size}
                disabled={disabled}
                loading={loading}
              >
                {masterLabels[variant]}
              </Button>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Variant</span>
                <RadioGroup
                  size="lg"
                  value={variant}
                  onValueChange={setVariant}
                  aria-label="Variant"
                >
                  {variants.map((option) => (
                    <Radio key={option} value={option} label={option} />
                  ))}
                </RadioGroup>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                  <Switch
                    label="Loading"
                    size="lg"
                    checked={loading}
                    onCheckedChange={setLoading}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="button-a11y"
                title="Accessibility"
                aboutTitle="Built in"
                about="Rules live in button.json → a11y. The component uses a native button, a keyboard-only focus ring, loading/disabled states, and requires aria-label for icon-only controls. Tab to the first button to see the focus ring."
                lang="jsx"
                code={`// Icon-only — name the action
<Button variant="secondary" size="sm" aria-label="Search">
  <Search aria-hidden="true" />
</Button>

// Loading — busy + inactive
<Button loading>Saving…</Button>

// Contract (button.json → a11y)
// - Native <button>
// - :focus-visible via --color-focus-ring
// - aria-busy when loading
// - prefers-reduced-motion honored`}
                preview={
                  <div className="button-preview button-preview--a11y">
                    <div className="button-a11y-demo">
                      <span className="button-a11y-demo__hint text-caption">
                        Tab here — focus ring
                      </span>
                      <Button variant="primary">Continue</Button>
                    </div>
                    <div className="button-a11y-demo">
                      <span className="button-a11y-demo__hint text-caption">
                        aria-label names icon-only
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        aria-label="Search"
                      >
                        <Search aria-hidden="true" />
                      </Button>
                    </div>
                    <div className="button-a11y-demo">
                      <span className="button-a11y-demo__hint text-caption">
                        aria-busy + spinner
                      </span>
                      <Button loading>Saving…</Button>
                    </div>
                    <div className="button-a11y-demo">
                      <span className="button-a11y-demo__hint text-caption">
                        disabled + aria-disabled
                      </span>
                      <Button disabled>Unavailable</Button>
                    </div>
                  </div>
                }
              />

              {sections.map((section) => (
                <ComponentDoc
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  aboutTitle={section.aboutTitle}
                  about={section.about}
                  lang="jsx"
                  code={sizes
                    .map(
                      (option) =>
                        `<Button variant="${section.variant}" size="${option}">${section.labels[option]}</Button>`,
                    )
                    .join('\n')}
                  preview={
                    <div className="button-preview">
                      {sizes.map((option) => (
                        <Button
                          key={option}
                          variant={section.variant}
                          size={option}
                        >
                          {section.labels[option]}
                        </Button>
                      ))}
                    </div>
                  }
                />
              ))}
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}
function InputsPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('md')
  const [showHint, setShowHint] = useState(true)
  const [showError, setShowError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')

  function handleErrorChange(next) {
    setShowError(next)
    if (next) setValue('not-an-email')
  }

  const masterCode = [
    `<Input`,
    `  label="Email"`,
    `  size="${size}"`,
    `  placeholder="you@studio.com"`,
    showError ? `  error="Enter a valid email address."` : null,
    !showError && showHint
      ? `  hint="We'll never share your email."`
      : null,
    disabled ? `  disabled` : null,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="input"
      title="Inputs"
      lede="Text fields with label, hint, and error support across lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="input-master"
          summary="Toggle size and states to preview every Input combination."
          about="Use Input for single-line text. Pair hint for formatting guidance, swap to error after validation fails, and disable when the value is locked."
          code={masterCode}
          preview={
            <div className="input-preview">
              <Input
                label="Email"
                size={size}
                placeholder="you@studio.com"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                hint={
                  !showError && showHint
                    ? "We'll never share your email."
                    : undefined
                }
                error={
                  showError ? 'Enter a valid email address.' : undefined
                }
                disabled={disabled}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Hint"
                    size="lg"
                    checked={showHint}
                    onCheckedChange={setShowHint}
                  />
                  <Switch
                    label="Error"
                    size="lg"
                    checked={showError}
                    onCheckedChange={handleErrorChange}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="input-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use lg when the field is the main focus of the screen, md for most forms, and sm in dense tables or filters."
                lang="jsx"
                code={sizes
                  .map(
                    (option) =>
                      `<Input label="Email" size="${option}" placeholder="you@studio.com" />`,
                  )
                  .join('\n')}
                preview={
                  <div className="input-preview">
                    {sizes.map((option) => (
                      <Input
                        key={option}
                        label={`Email (${option})`}
                        size={option}
                        placeholder="you@studio.com"
                      />
                    ))}
                  </div>
                }
              />

              <ComponentDoc
                id="input-hint"
                title="Hint"
                aboutTitle="Usage"
                about="Use hint for formatting guidance or constraints. Keep it short so scanning the form stays easy."
                lang="jsx"
                code={`<Input
  label="Workspace URL"
  hint="Use lowercase letters and hyphens only."
  placeholder="human-ai-studio"
/>`}
                preview={
                  <div className="input-preview">
                    <Input
                      label="Workspace URL"
                      hint="Use lowercase letters and hyphens only."
                      placeholder="human-ai-studio"
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="input-error"
                title="Error"
                aboutTitle="Usage"
                about="Swap hint for error once validation fails. Keep the message specific so people know how to fix it."
                lang="jsx"
                code={`<Input
  label="Email"
  error="Enter a valid email address."
  defaultValue="not-an-email"
/>`}
                preview={
                  <div className="input-preview">
                    <Input
                      label="Email"
                      error="Enter a valid email address."
                      defaultValue="not-an-email"
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="input-disabled"
                title="Disabled"
                aboutTitle="Usage"
                about="Disable inputs when the value is locked by permissions or a prior step. Prefer read-only copy if people still need to select the text."
                lang="jsx"
                code={`<Input
  label="Plan"
  defaultValue="Studio Pro"
  disabled
/>`}
                preview={
                  <div className="input-preview">
                    <Input label="Plan" defaultValue="Studio Pro" disabled />
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}
function SwitchesPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('lg')
  const [checked, setChecked] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const masterCode = [
    `<Switch`,
    `  size="${size}"`,
    `  checked={${checked}}`,
    disabled ? `  disabled` : null,
    `  onCheckedChange={setChecked}`,
    `  aria-label="Notifications"`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="switch"
      title="Switches"
      lede="Binary toggles for settings and feature flags - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="switch-master"
          summary="Toggle size, on/off, and disabled to preview every Switch combination."
          about="Use Switch for binary settings and feature flags. Prefer clear on/off labels over vague yes/no wording."
          code={masterCode}
          preview={
            <div className="switch-preview">
              <Switch
                size={size}
                checked={checked}
                disabled={disabled}
                onCheckedChange={setChecked}
                aria-label="Notifications"
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Checked"
                    size="lg"
                    checked={checked}
                    onCheckedChange={setChecked}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="switch-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use lg when the setting is a primary decision, md for most preference panels, and sm in dense toolbars or nested lists."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<Switch label="Notifications (${option})" size="${option}" defaultChecked />`,
              )
              .join('\n')}
            preview={
              <div className="switch-preview">
                {sizes.map((option) => (
                      <Switch
                        key={option}
                        label={`Notifications (${option})`}
                        size={option}
                        defaultChecked
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="switch-off"
              title="Off"
              aboutTitle="Usage"
              about="Default to off when enabling the setting is opt-in. Keep the label clear about what turns on."
              lang="jsx"
              code={`<Switch label="Marketing emails" />`}
              preview={
              <div className="switch-preview">
              <Switch label="Marketing emails" />
            </div>
            }
            />

            <ComponentDoc
              id="switch-on"
              title="On"
              aboutTitle="Usage"
              about="Default to on for recommended settings people expect to keep. Still make the outcome obvious in the label."
              lang="jsx"
              code={`<Switch label="Save drafts automatically" defaultChecked />`}
              preview={
              <div className="switch-preview">
              <Switch label="Save drafts automatically" defaultChecked />
            </div>
            }
            />

            <ComponentDoc
              id="switch-disabled"
              title="Disabled"
              aboutTitle="Usage"
              about="Disable switches when the setting is locked by plan, permissions, or a parent control. Explain why nearby when you can."
              lang="jsx"
              code={`<Switch label="Advanced routing" defaultChecked disabled />`}
              preview={
              <div className="switch-preview">
              <Switch label="Advanced routing" defaultChecked disabled />
            </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function RadiosPage() {
  const sizes = ['lg', 'md', 'sm']
  const options = [
    { value: 'starter', label: 'Starter' },
    { value: 'pro', label: 'Studio Pro' },
    { value: 'team', label: 'Team' },
  ]
  const [size, setSize] = useState('lg')
  const [value, setValue] = useState('pro')
  const [showError, setShowError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const masterCode = [
    `<RadioGroup`,
    `  label="Plan"`,
    `  size="${size}"`,
    `  value="${value}"`,
    showError ? `  error="Select a plan to continue."` : null,
    disabled ? `  disabled` : null,
    `  onValueChange={setValue}`,
    `>`,
    ...options.map(
      (option) =>
        `  <Radio value="${option.value}" label="${option.label}" />`,
    ),
    `</RadioGroup>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="radio"
      title="Radios"
      lede="Single-select choices for settings and forms - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="radio-master"
          summary="Toggle size and states to preview every Radio combination."
          about="Use radios for a single choice in a short list. Group related options and keep one selected value per group."
          code={masterCode}
          preview={
            <div className="radio-preview">
              <RadioGroup
                label="Plan"
                size={size}
                value={value}
                disabled={disabled}
                error={
                showError ? 'Select a plan to continue.' : undefined
                }
                onValueChange={setValue}
              >
                {options.map((option) => (
                      <Radio
                        key={option.value}
                        value={option.value}
                        label={option.label}
                      />
                    ))}
              </RadioGroup>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Error"
                    size="lg"
                    checked={showError}
                    onCheckedChange={setShowError}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="radio-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use lg when the choice is a primary decision, md for most forms, and sm in dense filters or side panels."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<RadioGroup label="Plan (${option})" size="${option}" defaultValue="pro">\n  <Radio value="starter" label="Starter" />\n  <Radio value="pro" label="Studio Pro" />\n</RadioGroup>`,
              )
              .join('\n\n')}
            preview={
              <div className="radio-preview">
                {sizes.map((option) => (
                      <RadioGroup
                        key={option}
                        label={`Plan (${option})`}
                        size={option}
                        defaultValue="pro"
                        name={`plan-${option}`}
                      >
                        <Radio value="starter" label="Starter" />
                        <Radio value="pro" label="Studio Pro" />
                      </RadioGroup>
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="radio-group"
              title="Group"
              aboutTitle="Usage"
              about="Always group radios that share one decision. One selected value per group - never use radios for multi-select."
              lang="jsx"
              code={`<RadioGroup label="Billing" defaultValue="monthly">
              <Radio value="monthly" label="Monthly" />
            <Radio value="yearly" label="Yearly" />
            </RadioGroup>`}
            preview={
              <div className="radio-preview">
                <RadioGroup label="Billing" defaultValue="monthly" size="lg">
                  <Radio value="monthly" label="Monthly" />
                  <Radio value="yearly" label="Yearly" />
                </RadioGroup>
              </div>
            }
            />

            <ComponentDoc
              id="radio-error"
              title="Error"
              aboutTitle="Usage"
              about="Show error on the group when a choice is required and still empty, or when the selection isn’t allowed. Keep the message specific."
              lang="jsx"
              code={`<RadioGroup
              label="Plan"
              error="Select a plan to continue."
              size="lg"
            >
              <Radio value="starter" label="Starter" />
              <Radio value="pro" label="Studio Pro" />
            </RadioGroup>`}
            preview={
              <div className="radio-preview">
                <RadioGroup
                  label="Plan"
                  error="Select a plan to continue."
                  size="lg"
                >
                  <Radio value="starter" label="Starter" />
                  <Radio value="pro" label="Studio Pro" />
                </RadioGroup>
              </div>
            }
            />

            <ComponentDoc
              id="radio-disabled-item"
              title="Disabled option"
              aboutTitle="Usage"
              about="Disable a single option when it’s unavailable for the current account or context. Keep the label readable so people know what they're missing."
              lang="jsx"
              code={`<RadioGroup label="Region" defaultValue="us" size="lg">
              <Radio value="us" label="United States" />
            <Radio value="eu" label="Europe" disabled />
            </RadioGroup>`}
            preview={
              <div className="radio-preview">
                <RadioGroup label="Region" defaultValue="us" size="lg">
                  <Radio value="us" label="United States" />
                  <Radio value="eu" label="Europe" disabled />
                </RadioGroup>
              </div>
            }
            />

            <ComponentDoc
              id="radio-disabled-group"
              title="Disabled group"
              aboutTitle="Usage"
              about="Disable the whole group when the parent step or permission locks the choice. Prefer explaining why nearby."
              lang="jsx"
              code={`<RadioGroup label="Seat type" defaultValue="editor" disabled size="lg">
              <Radio value="viewer" label="Viewer" />
            <Radio value="editor" label="Editor" />
            </RadioGroup>`}
            preview={
              <div className="radio-preview">
                <RadioGroup
                  label="Seat type"
                  defaultValue="editor"
                  disabled
                  size="lg"
                >
                  <Radio value="viewer" label="Viewer" />
                  <Radio value="editor" label="Editor" />
                </RadioGroup>
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function CheckboxesPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('lg')
  const [checked, setChecked] = useState(true)
  const [indeterminate, setIndeterminate] = useState(false)
  const [showError, setShowError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  function handleCheckedChange(next) {
    setChecked(next)
    if (next) setIndeterminate(false)
  }

  function handleIndeterminateChange(next) {
    setIndeterminate(next)
    if (next) setChecked(false)
  }

  const masterCode = [
    `<Checkbox`,
    `  label="Send me product updates"`,
    `  size="${size}"`,
    `  checked={${checked}}`,
    indeterminate ? `  indeterminate` : null,
    showError ? `  error="Accept updates to continue."` : null,
    disabled ? `  disabled` : null,
    `  onCheckedChange={setChecked}`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="checkbox"
      title="Checkboxes"
      lede="Multi-select choices and confirmations - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="checkbox-master"
          summary="Toggle size and states to preview every Checkbox combination."
          about="Use checkboxes for multi-select or confirmations. Prefer indeterminate only when a parent reflects a partial child selection."
          code={masterCode}
          preview={
            <div className="checkbox-preview">
              <Checkbox
                label="Send me product updates"
                size={size}
                checked={checked}
                indeterminate={indeterminate}
                disabled={disabled}
                error={
                showError ? 'Accept updates to continue.' : undefined
                }
                onCheckedChange={handleCheckedChange}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Checked"
                    size="lg"
                    checked={checked}
                    onCheckedChange={handleCheckedChange}
                  />
                  <Switch
                    label="Indeterminate"
                    size="lg"
                    checked={indeterminate}
                    onCheckedChange={handleIndeterminateChange}
                  />
                  <Switch
                    label="Error"
                    size="lg"
                    checked={showError}
                    onCheckedChange={setShowError}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="checkbox-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use lg when the choice is a primary decision, md for most forms, and sm in dense tables or filters."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<Checkbox label="Email digests (${option})" size="${option}" defaultChecked />`,
              )
              .join('\n')}
            preview={
              <div className="checkbox-preview">
                {sizes.map((option) => (
                      <Checkbox
                        key={option}
                        label={`Email digests (${option})`}
                        size={option}
                        defaultChecked
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="checkbox-group"
              title="Group"
              aboutTitle="Usage"
              about="Group related checkboxes when people can pick more than one. Keep the shared label as the question being answered."
              lang="jsx"
              code={`<CheckboxGroup label="Notify me about" size="lg">
              <Checkbox label="Comments" defaultChecked />
            <Checkbox label="Mentions" />
            <Checkbox label="Releases" defaultChecked />
            </CheckboxGroup>`}
            preview={
              <div className="checkbox-preview">
                <CheckboxGroup label="Notify me about" size="lg">
                  <Checkbox label="Comments" defaultChecked />
                  <Checkbox label="Mentions" />
                  <Checkbox label="Releases" defaultChecked />
                </CheckboxGroup>
              </div>
            }
            />

            <ComponentDoc
              id="checkbox-indeterminate"
              title="Indeterminate"
              aboutTitle="Usage"
              about="Use indeterminate for parent selects when some children are checked. Clearing or checking the parent should exit indeterminate."
              lang="jsx"
              code={`<Checkbox label="Select all pages" indeterminate />`}
              preview={
              <div className="checkbox-preview">
              <Checkbox label="Select all pages" indeterminate size="lg" />
            </div>
            }
            />

            <ComponentDoc
              id="checkbox-error"
              title="Error"
              aboutTitle="Usage"
              about="Show error when a required confirmation is missing, or when a group needs at least one selection."
              lang="jsx"
              code={`<Checkbox
              label="I agree to the terms"
              error="Accept the terms to continue."
              size="lg"
            />`}
            preview={
              <div className="checkbox-preview">
                <Checkbox
                  label="I agree to the terms"
                  error="Accept the terms to continue."
                  size="lg"
                />
              </div>
            }
            />

            <ComponentDoc
              id="checkbox-disabled"
              title="Disabled"
              aboutTitle="Usage"
              about="Disable checkboxes when the option is locked by plan or permissions. Prefer explaining why nearby when you can."
              lang="jsx"
              code={`<Checkbox label="Early access features" defaultChecked disabled size="lg" />`}
              preview={
              <div className="checkbox-preview">
              <Checkbox
                label="Early access features"
                defaultChecked
                disabled
                size="lg"
              />
            </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function SelectsPage() {
  const sizes = ['lg', 'md', 'sm']
  const regionOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'in', label: 'India' },
  ]
  const [size, setSize] = useState('lg')
  const [value, setValue] = useState('us')
  const [showHint, setShowHint] = useState(true)
  const [showError, setShowError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const masterCode = [
    `<Select`,
    `  label="Region"`,
    `  size="${size}"`,
    `  value="${value}"`,
    `  options={regionOptions}`,
    showError ? `  error="Select a region to continue."` : null,
    !showError && showHint
      ? `  hint="Used for billing and compliance."`
      : null,
    disabled ? `  disabled` : null,
    `  onValueChange={setValue}`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="select"
      title="Selects"
      lede="Single choice from a list - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="select-master"
          summary="Toggle size and states to preview every Select combination."
          about="Use Select when options exceed a short radio list. Pair hint for guidance and swap to error after validation fails."
          code={masterCode}
          preview={
            <div className="select-preview">
              <Select
                label="Region"
                size={size}
                value={value}
                options={regionOptions}
                disabled={disabled}
                hint={
                !showError && showHint
                ? 'Used for billing and compliance.'
                : undefined
                }
                error={
                showError
                ? 'Select a region to continue.'
                : undefined
                }
                onValueChange={setValue}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Hint"
                    size="lg"
                    checked={showHint}
                    onCheckedChange={setShowHint}
                  />
                  <Switch
                    label="Error"
                    size="lg"
                    checked={showError}
                    onCheckedChange={setShowError}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="select-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use lg when the field is the main focus, md for most forms, and sm in dense filters or toolbars."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<Select label="Region (${option})" size="${option}" defaultValue="us" options={regionOptions} />`,
              )
              .join('\n')}
            preview={
              <div className="select-preview">
                {sizes.map((option) => (
                      <Select
                        key={option}
                        label={`Region (${option})`}
                        size={option}
                        defaultValue="us"
                        options={regionOptions}
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="select-placeholder"
              title="Placeholder"
              aboutTitle="Usage"
              about="Use a placeholder when no default is safe. Disable the empty option so people must pick a real value."
              lang="jsx"
              code={`<Select
              label="Timezone"
              placeholder="Select a timezone"
              options={[
              { value: 'pt', label: 'Pacific Time' },
              { value: 'et', label: 'Eastern Time' },
              ]}
            />`}
            preview={
              <div className="select-preview">
                <Select
                  label="Timezone"
                  placeholder="Select a timezone"
                  size="lg"
                  defaultValue=""
                  options={[
                  { value: 'pt', label: 'Pacific Time' },
                  { value: 'et', label: 'Eastern Time' },
                  ]}
                />
              </div>
            }
            />

            <ComponentDoc
              id="select-hint"
              title="Hint"
              aboutTitle="Usage"
              about="Use hint for short guidance about how the value is used. Keep it to one line when you can."
              lang="jsx"
              code={`<Select
              label="Workspace"
              hint="You can change this later in settings."
              defaultValue="design"
              options={[
              { value: 'design', label: 'Design' },
              { value: 'eng', label: 'Engineering' },
              ]}
            />`}
            preview={
              <div className="select-preview">
                <Select
                  label="Workspace"
                  hint="You can change this later in settings."
                  size="lg"
                  defaultValue="design"
                  options={[
                  { value: 'design', label: 'Design' },
                  { value: 'eng', label: 'Engineering' },
                  ]}
                />
              </div>
            }
            />

            <ComponentDoc
              id="select-error"
              title="Error"
              aboutTitle="Usage"
              about="Swap hint for error when validation fails. Be specific about what to choose next."
              lang="jsx"
              code={`<Select
              label="Country"
              error="Select a country to continue."
              placeholder="Select a country"
              options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              ]}
            />`}
            preview={
              <div className="select-preview">
                <Select
                  label="Country"
                  error="Select a country to continue."
                  placeholder="Select a country"
                  size="lg"
                  defaultValue=""
                  options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  ]}
                />
              </div>
            }
            />

            <ComponentDoc
              id="select-disabled"
              title="Disabled"
              aboutTitle="Usage"
              about="Disable selects when the value is locked by plan or a prior step. Prefer read-only copy if people still need to see the value."
              lang="jsx"
              code={`<Select
              label="Plan"
              defaultValue="pro"
              disabled
              options={[
              { value: 'pro', label: 'Studio Pro' },
              { value: 'team', label: 'Team' },
              ]}
            />`}
            preview={
              <div className="select-preview">
                <Select
                  label="Plan"
                  defaultValue="pro"
                  disabled
                  size="lg"
                  options={[
                  { value: 'pro', label: 'Studio Pro' },
                  { value: 'team', label: 'Team' },
                  ]}
                />
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function TabsPage() {
  const sizes = ['lg', 'md', 'sm']
  const variants = ['segmented', 'line']
  const [size, setSize] = useState('lg')
  const [variant, setVariant] = useState('segmented')
  const [value, setValue] = useState('overview')

  const masterCode = [
    `<Tabs`,
    `  value="${value}"`,
    `  size="${size}"`,
    `  variant="${variant}"`,
    `  onValueChange={setValue}`,
    `>`,
    `  <TabsList>`,
    `    <TabsTrigger value="overview">Overview</TabsTrigger>`,
    `    <TabsTrigger value="docs">Docs</TabsTrigger>`,
    `    <TabsTrigger value="api">API</TabsTrigger>`,
    `  </TabsList>`,
    `  <TabsContent value="overview">…</TabsContent>`,
    `  <TabsContent value="docs">…</TabsContent>`,
    `  <TabsContent value="api">…</TabsContent>`,
    `</Tabs>`,
  ].join('\n')

  const panels = {
    overview: 'What’s shipping now and how Florence is positioned.',
    docs: 'Token usage and how to compose this set.',
    api: 'Props, callbacks, and a11y details.',
  }

  return (
    <ComponentAccessLayout
      componentId="tabs"
      title="Tabs"
      lede="Switch between related views in place - segmented or line, in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="tabs-master"
          summary="Toggle size and variant to preview every Tabs combination."
          about="Use Tabs to switch related views in place. Keep labels short and avoid nesting tabs inside tabs."
          code={masterCode}
          preview={
            <div className="tabs-preview">
              <Tabs
                value={value}
                size={size}
                variant={variant}
                onValueChange={setValue}
              >
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="docs">Docs</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  {panels.overview}
                </TabsContent>
                <TabsContent value="docs">{panels.docs}</TabsContent>
                <TabsContent value="api">{panels.api}</TabsContent>
              </Tabs>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Variant</span>
                <RadioGroup
                  size="lg"
                  value={variant}
                  onValueChange={setVariant}
                  aria-label="Variant"
                >
                  {variants.map((option) => (
                        <Radio key={option} value={option} label={option} />
                      ))}
                </RadioGroup>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="tabs-segmented"
                title="Segmented"
                aboutTitle="Usage"
                about="Use segmented tabs for compact local switching - preview/code, filters, or settings panes."
                lang="jsx"
                code={`<Tabs defaultValue="preview" size="lg" variant="segmented">
                <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">Live composition.</TabsContent>
              <TabsContent value="code">Source for this example.</TabsContent>
            </Tabs>`}
            preview={
              <div className="tabs-preview">
                <Tabs defaultValue="preview" size="lg" variant="segmented">
                  <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview">Live composition.</TabsContent>
                  <TabsContent value="code">Source for this example.</TabsContent>
                </Tabs>
              </div>
            }
            />

            <ComponentDoc
              id="tabs-line"
              title="Line"
              aboutTitle="Usage"
              about="Use line tabs for page-level sections where the list should stretch with the content width."
              lang="jsx"
              code={`<Tabs defaultValue="activity" size="lg" variant="line">
              <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">Recent updates.</TabsContent>
            <TabsContent value="members">People with access.</TabsContent>
            <TabsContent value="settings">Workspace preferences.</TabsContent>
            </Tabs>`}
            preview={
              <div className="tabs-preview">
                <Tabs defaultValue="activity" size="lg" variant="line">
                  <TabsList>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="activity">Recent updates.</TabsContent>
                  <TabsContent value="members">People with access.</TabsContent>
                  <TabsContent value="settings">
                    Workspace preferences.
                  </TabsContent>
                </Tabs>
              </div>
            }
            />

            <ComponentDoc
              id="tabs-sizes"
              title="Sizes"
              aboutTitle="Usage"
              about="Use lg for page chrome, md for cards and drawers, and sm for dense toolbars."
              lang="jsx"
              code={sizes
              .map(
              (option) =>
              `<Tabs defaultValue="one" size="${option}" variant="segmented">\n  <TabsList>\n    <TabsTrigger value="one">One</TabsTrigger>\n    <TabsTrigger value="two">Two</TabsTrigger>\n  </TabsList>\n</Tabs>`,
            )
            .join('\n\n')}
            preview={
              <div className="tabs-preview">
                {sizes.map((option) => (
                      <Tabs
                        key={option}
                        defaultValue="one"
                        size={option}
                        variant="segmented"
                      >
                        <TabsList>
                          <TabsTrigger value="one">{`One (${option})`}</TabsTrigger>
                          <TabsTrigger value="two">Two</TabsTrigger>
                        </TabsList>
                        <TabsContent value="one">
                          Content for {option}.
                        </TabsContent>
                        <TabsContent value="two">Second panel.</TabsContent>
                      </Tabs>
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="tabs-disabled"
              title="Disabled"
              aboutTitle="Usage"
              about="Disable a tab when that section isn’t available yet. Keep the label so people know what’s coming."
              lang="jsx"
              code={`<Tabs defaultValue="general" size="lg">
              <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="general">Profile and preferences.</TabsContent>
            </Tabs>`}
            preview={
              <div className="tabs-preview">
                <Tabs defaultValue="general" size="lg">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="billing" disabled>
                      Billing
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="general">
                    Profile and preferences.
                  </TabsContent>
                </Tabs>
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function TextareasPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('lg')
  const [showHint, setShowHint] = useState(true)
  const [showError, setShowError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')

  function handleErrorChange(next) {
    setShowError(next)
    if (next) setValue('too short')
  }

  const masterCode = [
    `<Textarea`,
    `  label="Message"`,
    `  size="${size}"`,
    `  placeholder="Tell us what you need…"`,
    showError ? `  error="Add a few more details."` : null,
    !showError && showHint
      ? `  hint="Keep it under a few short paragraphs."`
      : null,
    disabled ? `  disabled` : null,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="textarea"
      title="Textareas"
      lede="Multi-line fields for notes and messages - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="textarea-master"
          summary="Toggle size and states to preview every Textarea combination."
          about="Use Textarea for multi-line input. Pair hint for guidance, swap to error after validation, and disable when locked."
          code={masterCode}
          preview={
            <div className="textarea-preview">
              <Textarea
                label="Message"
                size={size}
                placeholder="Tell us what you need…"
                value={value}
                disabled={disabled}
                hint={
                !showError && showHint
                ? 'Keep it under a few short paragraphs.'
                : undefined
                }
                error={
                showError ? 'Add a few more details.' : undefined
                }
                onChange={(event) => setValue(event.target.value)}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Hint"
                    size="lg"
                    checked={showHint}
                    onCheckedChange={setShowHint}
                  />
                  <Switch
                    label="Error"
                    size="lg"
                    checked={showError}
                    onCheckedChange={handleErrorChange}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="textarea-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use lg for primary writing tasks, md for most forms, and sm in dense side panels."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<Textarea label="Notes (${option})" size="${option}" placeholder="Add a note…" />`,
              )
              .join('\n')}
            preview={
              <div className="textarea-preview textarea-preview--horizontal">
                {sizes.map((option) => (
                      <Textarea
                        key={option}
                        label={`Notes (${option})`}
                        size={option}
                        placeholder="Add a note…"
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="textarea-hint"
              title="Hint"
              aboutTitle="Usage"
              about="Use hint for length, tone, or formatting guidance. Keep it short so scanning the form stays easy."
              lang="jsx"
              code={`<Textarea
              label="Feedback"
              hint="Optional - share anything we should know."
              placeholder="What stood out?"
            />`}
            preview={
              <div className="textarea-preview">
                <Textarea
                  label="Feedback"
                  hint="Optional - share anything we should know."
                  placeholder="What stood out?"
                  size="lg"
                />
              </div>
            }
            />

            <ComponentDoc
              id="textarea-error"
              title="Error"
              aboutTitle="Usage"
              about="Swap hint for error once validation fails. Say what to fix in concrete terms."
              lang="jsx"
              code={`<Textarea
              label="Description"
              error="Add at least two sentences."
              defaultValue="Too short."
            />`}
            preview={
              <div className="textarea-preview">
                <Textarea
                  label="Description"
                  error="Add at least two sentences."
                  defaultValue="Too short."
                  size="lg"
                />
              </div>
            }
            />

            <ComponentDoc
              id="textarea-disabled"
              title="Disabled"
              aboutTitle="Usage"
              about="Disable textareas when the value is locked by permissions or a prior step."
              lang="jsx"
              code={`<Textarea
              label="Internal notes"
              defaultValue="Synced from CRM."
              disabled
            />`}
            preview={
              <div className="textarea-preview">
                <Textarea
                  label="Internal notes"
                  defaultValue="Synced from CRM."
                  disabled
                  size="lg"
                />
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function ModalsPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('lg')
  const [open, setOpen] = useState(false)
  const [exampleOpen, setExampleOpen] = useState(null)

  const bodyCopy =
    'Your team will see this update on their next visit. You can change it again anytime from settings.'

  const masterCode = [
    `<Modal`,
    `  open={open}`,
    `  onOpenChange={setOpen}`,
    `  size="${size}"`,
    `  title="Update published"`,
    `  footer={`,
    `    <>`,
    `      <Button variant="secondary" onClick={() => setOpen(false)}>Dismiss</Button>`,
    `      <Button onClick={() => setOpen(false)}>Got it</Button>`,
    `    </>`,
    `  }`,
    `>`,
    `  ${bodyCopy}`,
    `</Modal>`,
  ].join('\n')

  return (
    <ComponentAccessLayout
      componentId="modal"
      title="Modals"
      lede="Focused dialogs for confirmations and short tasks - each in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="modal-master"
          summary="Toggle size and open the dialog to preview every Modal combination."
          about="Use Modal for focused tasks that need attention before returning to the page. Keep one primary action."
          code={masterCode}
          preview={
            <div className="modal-preview">
              <Button size="lg" onClick={() => setOpen(true)}>
                Open modal
              </Button>
              <Modal
                contained
                open={open}
                onOpenChange={setOpen}
                size={size}
                title="Update published"
                footer={
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => setOpen(false)}
                    >
                      Dismiss
                    </Button>
                    <Button onClick={() => setOpen(false)}>Got it</Button>
                  </>
                }
              >
                {bodyCopy}
              </Modal>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="modal-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use sm for short notices, md for most messages, and lg when the body needs more room."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<Modal size="${option}" title="Size ${option}" open onOpenChange={() => {}} footer={<Button>Done</Button>}>\n  Preview the ${option} dialog with a short body.\n</Modal>`,
              )
              .join('\n\n')}
            preview={
              <div className="modal-preview">
                {sizes.map((option) => (
                      <Button
                        key={option}
                        variant="secondary"
                        size="lg"
                        onClick={() => setExampleOpen(option)}
                      >
                        Open {option}
                      </Button>
                    ))}
                <Modal
                  contained
                  open={
                  exampleOpen === 'sm' ||
                  exampleOpen === 'md' ||
                  exampleOpen === 'lg'
                  }
                  onOpenChange={(next) => {
                  if (!next) setExampleOpen(null)
                  }}
                  size={
                  exampleOpen === 'sm' ||
                  exampleOpen === 'md' ||
                  exampleOpen === 'lg'
                  ? exampleOpen
                  : 'md'
                  }
                  title={`Size ${exampleOpen ?? 'md'}`}
                  footer={
                  <Button onClick={() => setExampleOpen(null)}>Done</Button>
              }
              >
              {`Preview the ${exampleOpen ?? 'md'} dialog with a short body.`}
            </Modal>
            </div>
            }
            />

            <ComponentDoc
              id="modal-confirm"
              title="Confirm"
              aboutTitle="Usage"
              about="Lead with a clear title, then one short body sentence. Keep the footer to cancel and one decisive action."
              lang="jsx"
              code={`<Modal
              open={open}
              onOpenChange={setOpen}
              title="Delete project?"
              footer={
              <>
              <Button variant="secondary">Cancel</Button>
              <Button variant="danger">Delete</Button>
            </>
            }
            >
            This removes the project and its drafts. This can’t be undone.
            </Modal>`}
            preview={
              <div className="modal-preview">
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => setExampleOpen('confirm')}
                >
                  Delete project
                </Button>
                <Modal
                  contained
                  open={exampleOpen === 'confirm'}
                  onOpenChange={(next) => {
                  if (!next) setExampleOpen(null)
                  }}
                  size="md"
                  title="Delete project?"
                  footer={
                  <>
                  <Button
                    variant="secondary"
                    onClick={() => setExampleOpen(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setExampleOpen(null)}
                  >
                    Delete
                  </Button>
                </>
              }
              >
              This removes the project and its drafts. This can’t be undone.
            </Modal>
            </div>
            }
            />

            <ComponentDoc
              id="modal-body"
              title="Body copy"
              aboutTitle="Usage"
              about="Modal wraps ModalCard - title, body copy, and actions. Use denser forms only when the flow truly needs inputs."
              lang="jsx"
              code={`<Modal
              open={open}
              onOpenChange={setOpen}
              title="Invite sent"
              footer={
              <>
              <Button variant="secondary">Close</Button>
              <Button>View invites</Button>
            </>
            }
            >
            We’ve emailed name@studio.com. They’ll appear in the workspace once they accept.
            </Modal>`}
            preview={
              <div className="modal-preview">
                <Button size="lg" onClick={() => setExampleOpen('body')}>
                  Show invite
                </Button>
                <Modal
                  contained
                  open={exampleOpen === 'body'}
                  onOpenChange={(next) => {
                  if (!next) setExampleOpen(null)
                  }}
                  size="md"
                  title="Invite sent"
                  footer={
                  <>
                  <Button
                    variant="secondary"
                    onClick={() => setExampleOpen(null)}
                  >
                    Close
                  </Button>
                  <Button onClick={() => setExampleOpen(null)}>
                    View invites
                  </Button>
                </>
              }
              >
              We’ve emailed name@studio.com. They’ll appear in the workspace
              once they accept.
            </Modal>
            </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function ModalCardSizeScroll({ sizes }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const target =
      track.querySelector('.modal-card--md') ?? track.querySelector('.modal-card')

    function center() {
      if (!target) return
      const trackRect = track.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const delta =
        targetRect.left +
        targetRect.width / 2 -
        (trackRect.left + trackRect.width / 2)
      track.scrollLeft += delta
    }

    center()
    const frame = requestAnimationFrame(center)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      ref={trackRef}
      className="modal-card-preview modal-card-preview--scroll"
    >
      {sizes.map((option) => (
        <ModalCard
          key={option}
          size={option}
          title={`Size ${option}`}
          onClose={() => {}}
          footer={<Button size={option === 'lg' ? 'lg' : 'md'}>Done</Button>}
        >
          {`Preview the ${option} surface with a short body.`}
        </ModalCard>
      ))}
    </div>
  )
}

function ModalCardsPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('lg')
  const [showBody, setShowBody] = useState(true)
  const [showClose, setShowClose] = useState(true)

  const bodyCopy =
    'Your team will see this update on their next visit. You can change it again anytime from settings.'

  const masterCode = [
    `<ModalCard`,
    `  size="${size}"`,
    `  title="Update published"`,
    showClose ? `  onClose={() => {}}` : null,
    `  footer={`,
    `    <>`,
    `      <Button variant="secondary">Dismiss</Button>`,
    `      <Button>Got it</Button>`,
    `    </>`,
    `  }`,
    `>`,
    showBody ? `  ${bodyCopy}` : null,
    `</ModalCard>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="modal-card"
      title="Modal cards"
      lede="The dialog surface used inside Modals with title, body copy, and actions in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="modal-card-master"
          summary="Toggle size and structure to preview every Modal card combination."
          about="Use Modal cards for structured dialog content with a clear header, body, and actions."
          code={masterCode}
          preview={
            <div className="modal-card-preview">
              <ModalCard
                size={size}
                title="Update published"
                onClose={showClose ? () => {} : undefined}
                footer={
                  <>
                    <Button variant="secondary">Dismiss</Button>
                    <Button>Got it</Button>
                  </>
                }
              >
                {showBody ? bodyCopy : null}
              </ModalCard>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Structure</span>
                <div className="switch-list">
                  <Switch
                    label="Body"
                    size="lg"
                    checked={showBody}
                    onCheckedChange={setShowBody}
                  />
                  <Switch
                    label="Close"
                    size="lg"
                    checked={showClose}
                    onCheckedChange={setShowClose}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="modal-card-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Match Modal card size to the accompanying Modal. Use sm for short notices, md for most messages, and lg when the body needs more room."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<ModalCard size="${option}" title="Size ${option}" onClose={() => {}} footer={<Button>Done</Button>}>\n  Preview the ${option} surface with a short body.\n</ModalCard>`,
              )
              .join('\n\n')}
            preview={<ModalCardSizeScroll sizes={sizes} />}
            />

            <ComponentDoc
              id="modal-card-confirm"
              title="Confirm"
              aboutTitle="Usage"
              about="Lead with a clear title, then one short body sentence. Keep the footer to cancel and one decisive action."
              lang="jsx"
              code={`<ModalCard
              title="Delete project?"
              onClose={() => {}}
              footer={
              <>
              <Button variant="secondary">Cancel</Button>
              <Button variant="danger">Delete</Button>
            </>
            }
            >
            This removes the project and its drafts. This can’t be undone.
            </ModalCard>`}
            preview={
              <div className="modal-card-preview">
                <ModalCard
                  size="md"
                  title="Delete project?"
                  onClose={() => {}}
                  footer={
                  <>
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="danger">Delete</Button>
                </>
              }
              >
              This removes the project and its drafts. This can’t be undone.
            </ModalCard>
            </div>
            }
            />

            <ComponentDoc
              id="modal-card-body"
              title="Body copy"
              aboutTitle="Usage"
              about="Use the body for supporting copy. Keep it to a few sentences. Denser work belongs on a page."
              lang="jsx"
              code={`<ModalCard
              title="Invite sent"
              onClose={() => {}}
              footer={
              <>
              <Button variant="secondary">Close</Button>
              <Button>View invites</Button>
            </>
            }
            >
            We’ve emailed name@studio.com. They’ll appear in the workspace once they accept.
            </ModalCard>`}
            preview={
              <div className="modal-card-preview">
                <ModalCard
                  size="md"
                  title="Invite sent"
                  onClose={() => {}}
                  footer={
                  <>
                  <Button variant="secondary">Close</Button>
                  <Button>View invites</Button>
                </>
              }
              >
              We’ve emailed name@studio.com. They’ll appear in the workspace
              once they accept.
            </ModalCard>
            </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function KpiCardsPage() {
  const sizes = ['lg', 'md', 'sm']
  const trends = ['up', 'down', 'flat', 'neutral']
  const [size, setSize] = useState('md')
  const [trend, setTrend] = useState('up')
  const [showDelta, setShowDelta] = useState(true)
  const [showHint, setShowHint] = useState(true)

  const deltaByTrend = {
    up: '+12.4%',
    down: '-3.8%',
    flat: '0.0%',
    neutral: '+0.4%',
  }

  const masterCode = [
    `<KpiCard`,
    `  size="${size}"`,
    `  label="Revenue"`,
    `  value="$48.2k"`,
    showDelta ? `  delta="${deltaByTrend[trend]}"` : null,
    showDelta || trend !== 'neutral' ? `  trend="${trend}"` : null,
    showHint ? `  hint="vs last 30 days"` : null,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="kpi-card"
      title="KPI cards"
      lede="Metric surfaces for dashboards with a label, value, and trend in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="kpi-card-master"
          summary="Toggle size and trend to preview every KPI card combination."
          about="Use KPI cards to surface a key metric with optional trend. Keep labels short and values scannable."
          code={masterCode}
          preview={
            <div className="kpi-card-preview">
              <KpiCard
                size={size}
                label="Revenue"
                value="$48.2k"
                delta={showDelta ? deltaByTrend[trend] : undefined}
                trend={trend}
                hint={showHint ? 'vs last 30 days' : undefined}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Trend</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Trend"
                >
                  {trends.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${trend === option ? 'is-active' : ''}`}
                          aria-pressed={trend === option}
                          onClick={() => setTrend(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Structure</span>
                <div className="switch-list">
                  <Switch
                    label="Delta"
                    size="lg"
                    checked={showDelta}
                    onCheckedChange={setShowDelta}
                  />
                  <Switch
                    label="Hint"
                    size="lg"
                    checked={showHint}
                    onCheckedChange={setShowHint}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="kpi-card-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use sm in dense dashboards, md for most summary rows, and lg when the metric is a page hero."
                lang="jsx"
                code={sizes
                .map(
                (option) =>
                `<KpiCard size="${option}" label="Active users" value="12,480" delta="+8.1%" trend="up" hint="vs last week" />`,
              )
              .join('\n')}
            preview={
              <div className="kpi-card-preview kpi-card-preview--row">
                {sizes.map((option) => (
                      <KpiCard
                        key={option}
                        size={option}
                        label="Active users"
                        value="12,480"
                        delta="+8.1%"
                        trend="up"
                        hint="vs last week"
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="kpi-card-trends"
              title="Trends"
              aboutTitle="Usage"
              about="Map trend to direction. Up for growth, down for declines, and flat or neutral when the change is not directional."
              lang="jsx"
              code={`<KpiCard label="Conversion" value="3.6%" delta="+0.4%" trend="up" hint="vs prior period" />
              <KpiCard label="Churn" value="1.2%" delta="-0.3%" trend="down" hint="vs prior period" />
            <KpiCard label="NPS" value="62" delta="0.0%" trend="flat" hint="vs prior period" />`}
            preview={
              <div className="kpi-card-preview kpi-card-preview--row">
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
                  label="Churn"
                  value="1.2%"
                  delta="-0.3%"
                  trend="down"
                  hint="vs prior period"
                />
                <KpiCard
                  size="md"
                  label="NPS"
                  value="62"
                  delta="0.0%"
                  trend="flat"
                  hint="vs prior period"
                />
              </div>
            }
            />

            <ComponentDoc
              id="kpi-card-interactive"
              title="Interactive"
              aboutTitle="Usage"
              about="Pass onClick when the card opens a detail view. Keep the press feedback subtle so scanning still feels fast."
              lang="jsx"
              code={`<KpiCard
              label="Pipeline"
              value="$192k"
              delta="+18%"
              trend="up"
              hint="vs last month"
              onClick={() => openDetail('pipeline')}
            />`}
            preview={
              <div className="kpi-card-preview">
                <KpiCard
                  size="md"
                  label="Pipeline"
                  value="$192k"
                  delta="+18%"
                  trend="up"
                  hint="vs last month"
                  onClick={() => {}}
                />
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function InsightCardsPage() {
  const sizes = ['lg', 'md', 'sm']
  const tones = ['opportunity', 'warning', 'info', 'danger', 'neutral']
  const [size, setSize] = useState('md')
  const [tone, setTone] = useState('opportunity')
  const [showConfidence, setShowConfidence] = useState(true)
  const [showActions, setShowActions] = useState(true)
  const [showSource, setShowSource] = useState(false)

  const masterCode = [
    `<InsightCard`,
    `  size="${size}"`,
    `  tone="${tone}"`,
    `  eyebrow="Recommendation"`,
    `  title="Raise listing price on 3 underpriced units"`,
    `  description="Comparable closes in the last 14 days suggest these listings are 6-9% below market. Adjusting could add about $42k in projected revenue."`,
    showConfidence ? `  confidence="High confidence"` : null,
    showSource ? `  source="Based on last 30 days of closes"` : null,
    showActions
      ? `  primaryAction={{ label: 'Review listings', onClick: () => {} }}`
      : null,
    showActions
      ? `  secondaryAction={{ label: 'See analysis', onClick: () => {} }}`
      : null,
    showActions ? `  onDismiss={() => {}}` : null,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="insight-card"
      title="Insight cards"
      lede="Dedicated surfaces for AI recommendations and analytical findings - one idea per card, with optional confidence and actions."
    >

      <div className="component-stack">
        <ComponentMaster
          id="insight-card-master"
          summary="Toggle size, tone, and structure to preview insight cards."
          about="Use insight cards when the system has a finding the reader can act on. Keep the title concrete, the body short, and actions limited to one primary path."
          code={masterCode}
          preview={
            <div className="insight-card-preview">
              <InsightCard
                size={size}
                tone={tone}
                eyebrow="Recommendation"
                title="Raise listing price on 3 underpriced units"
                description="Comparable closes in the last 14 days suggest these listings are 6-9% below market. Adjusting could add about $42k in projected revenue."
                confidence={showConfidence ? 'High confidence' : undefined}
                source={
                  showSource ? 'Based on last 30 days of closes' : undefined
                }
                primaryAction={
                  showActions
                    ? { label: 'Review listings', onClick: () => {} }
                    : undefined
                }
                secondaryAction={
                  showActions
                    ? { label: 'See analysis', onClick: () => {} }
                    : undefined
                }
                onDismiss={showActions ? () => {} : undefined}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Tone</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Tone"
                >
                  {tones.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`foundation-tabs__tab ${tone === option ? 'is-active' : ''}`}
                      aria-pressed={tone === option}
                      onClick={() => setTone(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Structure</span>
                <div className="switch-list">
                  <Switch
                    label="Confidence"
                    size="sm"
                    checked={showConfidence}
                    onCheckedChange={setShowConfidence}
                  />
                  <Switch
                    label="Source"
                    size="sm"
                    checked={showSource}
                    onCheckedChange={setShowSource}
                  />
                  <Switch
                    label="Actions"
                    size="sm"
                    checked={showActions}
                    onCheckedChange={setShowActions}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="insight-card-warning"
                title="Warning tone"
                aboutTitle="Usage"
                about="Use warning when the finding needs attention but is not a failure - risk of churn, stalled tasks, or a threshold approaching."
                lang="jsx"
                code={`<InsightCard
  tone="warning"
  eyebrow="Watch"
  title="4 listings have gone stale"
  description="No inquiry in 18+ days. Relisting or refreshing photos usually recovers interest within a week."
  confidence="Medium confidence"
  primaryAction={{ label: 'View stale listings' }}
/>`}
                preview={
                  <div className="insight-card-preview">
                    <InsightCard
                      tone="warning"
                      eyebrow="Watch"
                      title="4 listings have gone stale"
                      description="No inquiry in 18+ days. Relisting or refreshing photos usually recovers interest within a week."
                      confidence="Medium confidence"
                      primaryAction={{
                        label: 'View stale listings',
                        onClick: () => {},
                      }}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="insight-card-info"
                title="Informational"
                aboutTitle="Usage"
                about="Use info for explanatory findings that do not demand an immediate action - patterns, context, or summaries the reader should know."
                lang="jsx"
                code={`<InsightCard
  tone="info"
  eyebrow="Insight"
  title="Weekend traffic is outpacing weekdays"
  description="Saturday sessions are up 22% versus the weekday average. Consider shifting promo spend toward Friday-Sunday."
  source="Traffic, last 28 days"
/>`}
                preview={
                  <div className="insight-card-preview">
                    <InsightCard
                      tone="info"
                      eyebrow="Insight"
                      title="Weekend traffic is outpacing weekdays"
                      description="Saturday sessions are up 22% versus the weekday average. Consider shifting promo spend toward Friday-Sunday."
                      source="Traffic, last 28 days"
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="insight-card-stack"
                title="Insight stack"
                aboutTitle="Usage"
                about="Surface a short stack of insights beside metrics. Keep each card to one finding so the reader can scan and pick an action."
                lang="jsx"
                code={`<InsightCard tone="opportunity" title="…" />
<InsightCard tone="warning" title="…" />`}
                preview={
                  <div className="insight-card-preview insight-card-preview--stack">
                    <InsightCard
                      size="sm"
                      tone="opportunity"
                      eyebrow="Recommendation"
                      title="Assign Final QA this afternoon"
                      description="Two reviewers are free after 2pm and the sprint board is blocked on this task."
                      primaryAction={{
                        label: 'Assign',
                        onClick: () => {},
                      }}
                    />
                    <InsightCard
                      size="sm"
                      tone="warning"
                      eyebrow="Watch"
                      title="Conversion dipped on paid search"
                      description="CTR is steady but landing bounce rose 11% since the headline change on Tuesday."
                      primaryAction={{
                        label: 'Inspect funnel',
                        onClick: () => {},
                      }}
                    />
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

const PIE_TRAFFIC = [
  { label: 'Listed', value: 256 },
  { label: 'Under offer', value: 385 },
  { label: 'Under contract', value: 770 },
  { label: 'Closed', value: 514 },
  { label: 'Off market', value: 385 },
  { label: 'Draft', value: 258 },
]

const PIE_LONG_TAIL = [
  { label: 'Organic search', value: 4820 },
  { label: 'Direct', value: 2410 },
  { label: 'Referral', value: 1290 },
  { label: 'Social', value: 860 },
  { label: 'Email', value: 540 },
  { label: 'Affiliates', value: 320 },
  { label: 'Paid search', value: 280 },
  { label: 'Display', value: 190 },
  { label: 'Podcast', value: 90 },
]

const PIE_CLOSE_VALUES = [
  { label: 'Region A', value: 2610 },
  { label: 'Region B', value: 2540 },
  { label: 'Region C', value: 2480 },
  { label: 'Region D', value: 2430 },
]

function PieChartsPage() {
  const [variant, setVariant] = useState('donut')
  const [showCenterTotal, setShowCenterTotal] = useState(true)
  const [sort, setSort] = useState(true)

  const masterCode = [
    `<PieChart`,
    `  title="Properties by status"`,
    `  variant="${variant}"`,
    !sort ? `  sort={false}` : null,
    variant === 'donut' && !showCenterTotal ? `  showCenterTotal={false}` : null,
    `  data={[`,
    `    { label: 'Listed', value: 256 },`,
    `    { label: 'Under offer', value: 385 },`,
    `    { label: 'Under contract', value: 770 },`,
    `    { label: 'Closed', value: 514 },`,
    `    { label: 'Off market', value: 385 },`,
    `    { label: 'Draft', value: 258 },`,
    `  ]}`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="pie-chart"
      title="Pie charts"
      lede="Part-to-whole share for a handful of segments, as a donut or a solid pie. Reach for it when the reader needs a rough share at a glance - not when they need to rank close values."
    >

      <div className="component-stack">
        <ComponentMaster
          id="pie-chart-master"
          summary="Switch between donut and pie, and toggle the centre total."
          about="A pie answers “roughly what share?” for up to six segments. Segments are sorted largest-first so the ranking is legible, and anything past the sixth folds into Other. Every value stays readable in the table view."
          code={masterCode}
          preview={
            <div className="pie-chart-preview">
              <PieChart
                title="Properties by status"
                variant={variant}
                sort={sort}
                showCenterTotal={showCenterTotal}
                data={PIE_TRAFFIC}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Variant</span>
                <div className="switch-list">
                  <Switch
                    label="Donut"
                    size="lg"
                    checked={variant === 'donut'}
                    onCheckedChange={(next) => setVariant(next ? 'donut' : 'pie')}
                  />
                  <Switch
                    label="Centre total"
                    size="lg"
                    checked={showCenterTotal}
                    onCheckedChange={setShowCenterTotal}
                  />
                  <Switch
                    label="Sort by size"
                    size="lg"
                    checked={sort}
                    onCheckedChange={setSort}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="pie-chart-other"
                title="The six-segment cap"
                aboutTitle="Usage"
                about="Past six slices adjacent angles stop being distinguishable, so the component folds the tail into a single Other slice in the de-emphasis gray. The folded categories are still listed individually in the table view - nothing is lost, it just stops competing for a hue."
                lang="jsx"
                code={`<PieChart
  title="Traffic by source"
  maxSegments={6}
  data={nineSources}
/>`}
                preview={
                  <div className="pie-chart-preview">
                    <PieChart
                      title="Traffic by source"
                      description="Nine sources, folded to six"
                      data={PIE_LONG_TAIL}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="pie-chart-wrong-form"
                title="When not to use it"
                aboutTitle="Usage"
                about="These four regions are within 7% of each other. The pie makes them look identical because the eye cannot rank similar angles - the same data as a bar chart is read instantly. Use a pie for rough share, a bar for comparison."
                lang="jsx"
                code={`// Close values: reach for a bar chart instead.
<PieChart data={regions} />`}
                preview={
                  <div className="pie-chart-preview">
                    <PieChart
                      title="Revenue by region"
                      description="Close values - the wrong job for this form"
                      variant="pie"
                      data={PIE_CLOSE_VALUES}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="pie-chart-empty"
                title="Empty state"
                aboutTitle="Usage"
                about="With no data the frame holds its shape and states why it is blank, rather than collapsing or rendering an empty ring."
                lang="jsx"
                code={`<PieChart title="Traffic by source" data={[]} />`}
                preview={
                  <div className="pie-chart-preview">
                    <PieChart
                      title="Traffic by source"
                      description="Sessions, last 30 days"
                      data={[]}
                    />
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function BarChartsPage() {
  const [orientation, setOrientation] = useState('vertical')
  const [showGrid, setShowGrid] = useState(true)

  const masterCode = [
    `<BarChart`,
    `  title="Revenue by region"`,
    orientation !== 'vertical' ? `  orientation="${orientation}"` : null,
    !showGrid ? `  showGrid={false}` : null,
    `  data={[`,
    `    { label: 'North', value: 2610 },`,
    `    { label: 'South', value: 2540 },`,
    `    { label: 'East', value: 2480 },`,
    `    { label: 'West', value: 2430 },`,
    `  ]}`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="bar-chart"
      title="Bar charts"
      lede="Compare magnitudes across categories. Reach for it when the reader needs to rank values - close numbers read instantly as bar length."
    >

      <div className="component-stack">
        <ComponentMaster
          id="bar-chart-master"
          summary="Switch orientation and grid lines to preview the bar chart."
          about="A bar chart answers “which is larger?” at a glance. Single-series accepts a flat data array; multi-series uses categories plus series and renders grouped columns with a shared legend. Every value stays readable in the table view."
          code={masterCode}
          preview={
            <div className="bar-chart-preview">
              <BarChart
                title="Revenue by region"
                description="Close values - the right job for this form"
                orientation={orientation}
                showGrid={showGrid}
                data={PIE_CLOSE_VALUES}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Layout</span>
                <div className="switch-list">
                  <Switch
                    label="Vertical columns"
                    size="lg"
                    checked={orientation === 'vertical'}
                    onCheckedChange={(next) =>
                      setOrientation(next ? 'vertical' : 'horizontal')
                    }
                  />
                  <Switch
                    label="Grid lines"
                    size="lg"
                    checked={showGrid}
                    onCheckedChange={setShowGrid}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="bar-chart-multi"
                title="Grouped series"
                aboutTitle="Usage"
                about="When two or more series share the same categories, bars group within each band and the legend identifies each series. Hover one bar to read its value without losing the category context."
                lang="jsx"
                code={`<BarChart
  title="Quarterly revenue"
  categories={['Q1', 'Q2', 'Q3', 'Q4']}
  series={[
    { label: 'Product A', data: [120, 180, 150, 210] },
    { label: 'Product B', data: [90, 110, 130, 140] },
  ]}
/>`}
                preview={
                  <div className="bar-chart-preview">
                    <BarChart
                      title="Quarterly revenue"
                      description="Grouped by product"
                      categories={['Q1', 'Q2', 'Q3', 'Q4']}
                      series={[
                        { label: 'Product A', data: [120, 180, 150, 210] },
                        { label: 'Product B', data: [90, 110, 130, 140] },
                      ]}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="bar-chart-traffic"
                title="Single series"
                aboutTitle="Usage"
                about="For one measure per category, pass a flat data array. Each bar gets its own hue from the data slot ramp unless you override color per item."
                lang="jsx"
                code={`<BarChart
  title="Traffic by source"
  data={[
    { label: 'Organic', value: 4820 },
    { label: 'Direct', value: 2410 },
    { label: 'Referral', value: 1290 },
    { label: 'Social', value: 860 },
  ]}
/>`}
                preview={
                  <div className="bar-chart-preview">
                    <BarChart
                      title="Traffic by source"
                      description="Sessions, last 30 days"
                      data={PIE_TRAFFIC.slice(0, 4)}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="bar-chart-empty"
                title="Empty state"
                aboutTitle="Usage"
                about="With no data the frame holds its shape and states why it is blank, rather than collapsing or rendering an empty plot."
                lang="jsx"
                code={`<BarChart title="Traffic by source" data={[]} />`}
                preview={
                  <div className="bar-chart-preview">
                    <BarChart
                      title="Traffic by source"
                      description="Sessions, last 30 days"
                      data={[]}
                    />
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function LineChartsPage() {
  const [variant, setVariant] = useState('area')
  const [showGrid, setShowGrid] = useState(true)

  const masterCode = [
    `<LineChart`,
    `  title="Weekly active users"`,
    variant !== 'area' ? `  variant="${variant}"` : null,
    !showGrid ? `  showGrid={false}` : null,
    `  data={[`,
    `    { label: 'Mon', value: 1240 },`,
    `    { label: 'Tue', value: 1380 },`,
    `    { label: 'Wed', value: 1290 },`,
    `    { label: 'Thu', value: 1520 },`,
    `    { label: 'Fri', value: 1680 },`,
    `    { label: 'Sat', value: 1410 },`,
    `    { label: 'Sun', value: 1320 },`,
    `  ]}`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  const LINE_WEEKLY = [
    { label: 'Mon', value: 1240 },
    { label: 'Tue', value: 1380 },
    { label: 'Wed', value: 1290 },
    { label: 'Thu', value: 1520 },
    { label: 'Fri', value: 1680 },
    { label: 'Sat', value: 1410 },
    { label: 'Sun', value: 1320 },
  ]

  return (
    <ComponentAccessLayout
      componentId="line-chart"
      title="Line charts"
      lede="Change and progress over time. Reach for it when the reader needs to follow a trajectory - not compare unrelated magnitudes at one moment."
    >

      <div className="component-stack">
        <ComponentMaster
          id="line-chart-master"
          summary="Switch between line and area, and toggle grid lines."
          about="A line chart answers “how is this moving?” across ordered samples. Segments stay straight - no smoothing that invents values between points. Hover snaps to the nearest sample and reads every series at that moment."
          code={masterCode}
          preview={
            <div className="line-chart-preview">
              <LineChart
                title="Weekly active users"
                description="Daily average, last 7 days"
                variant={variant}
                showGrid={showGrid}
                data={LINE_WEEKLY}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Variant</span>
                <div className="switch-list">
                  <Switch
                    label="Area fill"
                    size="lg"
                    checked={variant === 'area'}
                    onCheckedChange={(next) =>
                      setVariant(next ? 'area' : 'line')
                    }
                  />
                  <Switch
                    label="Grid lines"
                    size="lg"
                    checked={showGrid}
                    onCheckedChange={setShowGrid}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="line-chart-multi"
                title="Multiple series"
                aboutTitle="Usage"
                about="Overlay series share the same time axis. Hover one moment to read every series at that sample, and use the legend to emphasise a single trajectory."
                lang="jsx"
                code={`<LineChart
  title="Monthly revenue"
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  series={[
    { label: '2025', data: [4200, 5100, 4800, 6200, 5900, 7100] },
    { label: '2024', data: [3800, 4200, 4500, 5100, 5400, 5800] },
  ]}
/>`}
                preview={
                  <div className="line-chart-preview">
                    <LineChart
                      title="Monthly revenue"
                      description="Year over year"
                      labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                      series={[
                        {
                          label: '2025',
                          data: [4200, 5100, 4800, 6200, 5900, 7100],
                        },
                        {
                          label: '2024',
                          data: [3800, 4200, 4500, 5100, 5400, 5800],
                        },
                      ]}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="line-chart-area"
                title="Area variant"
                aboutTitle="Usage"
                about="Area fill helps when volume under the curve matters - cumulative totals, capacity used, or anything where the space below the line carries meaning. Keep single-series area unless the reader truly needs to compare stacked volume."
                lang="jsx"
                code={`<LineChart
  title="Sessions"
  variant="area"
  data={weeklySessions}
/>`}
                preview={
                  <div className="line-chart-preview">
                    <LineChart
                      title="Sessions"
                      description="Daily total, last 7 days"
                      variant="area"
                      data={LINE_WEEKLY}
                    />
                  </div>
                }
              />

              <ComponentDoc
                id="line-chart-empty"
                title="Empty state"
                aboutTitle="Usage"
                about="With no data the frame holds its shape and states why it is blank, rather than collapsing or rendering an empty plot."
                lang="jsx"
                code={`<LineChart title="Weekly active users" data={[]} />`}
                preview={
                  <div className="line-chart-preview">
                    <LineChart
                      title="Weekly active users"
                      description="Daily average, last 7 days"
                      data={[]}
                    />
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function CalendarsPage() {
  const sizes = ['lg', 'md', 'sm']
  const [size, setSize] = useState('md')
  const [disabled, setDisabled] = useState(false)
  const [pickedDate, setPickedDate] = useState(null)
  const constraintStart = new Date()
  const constraintEnd = new Date(
    constraintStart.getFullYear(),
    constraintStart.getMonth() + 1,
    constraintStart.getDate(),
  )

  const masterCode = [
    `<Calendar`,
    `  size="${size}"`,
    disabled ? `  disabled` : null,
    `  onValueChange={(date) => setDate(date)}`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="calendar"
      title="Calendars"
      lede="Month view for picking a single date in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="calendar-master"
          summary="Toggle size and states to preview every Calendar combination."
          about="Use Calendar for date selection. Disable unavailable dates and keep the selected day obvious."
          code={masterCode}
          preview={
            <div className="calendar-preview">
              <Calendar key={size} size={size} disabled={disabled} />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="calendar-sizes"
                title="Sizes"
                aboutTitle="Usage"
                about="Use sm inside popovers and dense side panels, md for most pickers, and lg when the calendar is the main surface."
                lang="jsx"
                code={sizes
                .map((option) => `<Calendar size="${option}" />`)
              .join('\n')}
            preview={
              <div className="calendar-preview calendar-preview--row">
                {sizes.map((option) => (
                      <Calendar key={option} size={option} />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="calendar-selected"
              title="Selected date"
              aboutTitle="Usage"
              about="Control the value to sync the calendar with fields or filters. Today keeps a subtle outline so users stay oriented."
              lang="jsx"
              code={`const [date, setDate] = useState(null)

              <Calendar value={date} onValueChange={setDate} />`}
            preview={
              <div className="calendar-preview calendar-preview--stack">
                <Calendar
                  size="md"
                  value={pickedDate}
                  onValueChange={setPickedDate}
                />
                <p className="calendar-preview__note">
                  {pickedDate
                    ? `Selected: ${pickedDate.toDateString()}`
                    : 'No date selected yet.'}
                </p>
              </div>
            }
            />

            <ComponentDoc
              id="calendar-constraints"
              title="Date constraints"
              aboutTitle="Usage"
              about="Use minDate and maxDate for a bounded window. Use isDateDisabled for business rules such as unavailable weekends."
              lang="jsx"
              code={`<Calendar
              minDate={new Date()}
              maxDate={endDate}
              isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}
            />`}
            preview={
              <div className="calendar-preview">
                <Calendar
                  size="md"
                  minDate={constraintStart}
                  maxDate={constraintEnd}
                  isDateDisabled={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                  }
                />
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function TimelinesPage() {
  const masterCode = `<Timeline
  label="Florence roadmap"
  items={[
    { status: "now", phase: "Now", title: "V1 shipped", body: "MVP design system, React components with component contracts, and architecture that’s retrievable by agents." },
    { status: "next", phase: "Next", title: "V2 for coding agents", body: "Copy-paste prompts, snippets, and chat-ready code." },
    { status: "next", phase: "Next", title: "Figma file launch", body: "Design and code share one system." },
    { status: "later", phase: "Later", title: "More agentic", body: "Agents that compose, review, and ship against Florence." },
  ]}
/>`

  return (
    <ComponentAccessLayout
      componentId="timeline"
      title="Timelines"
      lede="A vertical sequence of now, next, and later - for roadmaps and multi-stage work, not for charts."
    >

      <div className="component-stack">
        <ComponentMaster
          id="timeline-master"
          summary="Filled node is current. Hollow is next. Muted is later."
          about="Use Timeline when order and status matter more than dates or magnitudes. One now. Do not use it to compare values or switch peer views."
          code={masterCode}
          preview={
            <div className="timeline-preview">
              <Timeline
                label="Florence roadmap"
                items={FLORENCE_ROADMAP}
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function TagsPage() {
  const sizes = ['sm', 'md', 'lg']
  const tones = ['neutral', 'brand', 'success', 'warning', 'danger', 'info']
  const [size, setSize] = useState('md')
  const [tone, setTone] = useState('neutral')
  const [removable, setRemovable] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [filters, setFilters] = useState(['Research', 'Design', 'Engineering'])

  const masterCode = [
    `<Tag`,
    `  size="${size}"`,
    `  tone="${tone}"`,
    removable ? `  onRemove={() => {}}` : null,
    disabled ? `  disabled` : null,
    `>`,
    `  In progress`,
    `</Tag>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="tag"
      title="Tags"
      lede="Compact labels for categories, filters, and status."
    >

      <div className="component-stack">
        <ComponentMaster
          id="tag-master"
          summary="Toggle size, tone, and state to preview every Tag combination."
          about="Use Tags for compact status, category, or filter labels. Prefer dismissible tags only when removal is meaningful."
          code={masterCode}
          preview={
            <div className="tag-preview">
              <Tag
                size={size}
                tone={tone}
                disabled={disabled}
                onRemove={removable ? () => {} : undefined}
              >
                In progress
              </Tag>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Tone</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Tone"
                >
                  {tones.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${tone === option ? 'is-active' : ''}`}
                          aria-pressed={tone === option}
                          onClick={() => setTone(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Removable"
                    size="lg"
                    checked={removable}
                    onCheckedChange={setRemovable}
                  />
                  <Switch
                    label="Disabled"
                    size="lg"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="tag-tones"
                title="Tones"
                aboutTitle="Usage"
                about="Use neutral and brand for categories. Reserve status tones for information with a real semantic meaning."
                lang="jsx"
                code={tones
                .map(
                (option) =>
                `<Tag tone="${option}">${option}</Tag>`,
              )
              .join('\n')}
            preview={
              <div className="tag-preview tag-preview--row">
                {tones.map((option) => (
                      <Tag key={option} tone={option}>
                        {option}
                      </Tag>
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="tag-sizes"
              title="Sizes"
              aboutTitle="Usage"
              about="Use sm in dense tables, md in most interfaces, and lg when tags sit beside larger controls."
              lang="jsx"
              code={sizes
              .map((option) => `<Tag size="${option}">Design</Tag>`)
            .join('\n')}
            preview={
              <div className="tag-preview tag-preview--row">
                {sizes.map((option) => (
                      <Tag key={option} size={option} tone="brand">
                        Design
                      </Tag>
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="tag-removable"
              title="Removable tags"
              aboutTitle="Usage"
              about="Use removable tags for active filters or user-created selections. The remove action has an accessible label and remains keyboard operable."
              lang="jsx"
              code={`<Tag onRemove={() => removeFilter('Design')}>
              Design
              </Tag>`}
              preview={
                <div className="tag-preview tag-preview--row">
                  {filters.map((filter) => (
                        <Tag
                          key={filter}
                          tone="brand"
                          onRemove={() =>
                          setFilters((current) =>
                          current.filter((item) => item !== filter),
                        )
                      }
                      >
                      {filter}
                    </Tag>
                  ))}
              {filters.length === 0 ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                    setFilters(['Research', 'Design', 'Engineering'])
                    }
                  >
                    Reset tags
                  </Button>
                ) : null}
            </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function TooltipsPage() {
  const sides = ['top', 'bottom', 'left', 'right']
  const [side, setSide] = useState('top')
  const [forceOpen, setForceOpen] = useState(false)

  const masterCode = [
    `<Tooltip content="Save changes"${side === 'top' ? '' : ` side="${side}"`}${forceOpen ? ' open' : ''}>`,
    `  <Button size="md">Save</Button>`,
    `</Tooltip>`,
  ].join('\n')

  return (
    <ComponentAccessLayout
      componentId="tooltip"
      title="Tooltips"
      lede="Short labels that appear on hover and focus to clarify a control."
    >

      <div className="component-stack">
        <ComponentMaster
          id="tooltip-master"
          summary="Toggle side and state to preview every Tooltip combination."
          about="Use Tooltip for brief helper text on hover or focus. Keep copy short and never hide required information only in a tooltip."
          code={masterCode}
          preview={
            <div className="tooltip-preview">
              <Tooltip
                content="Save changes"
                side={side}
                open={forceOpen ? true : undefined}
              >
                <Button size="md">Save</Button>
              </Tooltip>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Side</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Side"
                >
                  {sides.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${side === option ? 'is-active' : ''}`}
                          aria-pressed={side === option}
                          onClick={() => setSide(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">States</span>
                <div className="switch-list">
                  <Switch
                    label="Always open"
                    size="lg"
                    checked={forceOpen}
                    onCheckedChange={setForceOpen}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="tooltip-sides"
                title="Sides"
                aboutTitle="Usage"
                about="Default to top. Pick the side with the most room so the tooltip never covers the control it describes."
                lang="jsx"
                code={sides
                .map(
                (option) =>
                `<Tooltip content="Tooltip" side="${option}">...</Tooltip>`,
              )
              .join('\n')}
            preview={
              <div className="tooltip-preview tooltip-preview--row">
                {sides.map((option) => (
                      <Tooltip key={option} content="Tooltip" side={option}>
                        <Button size="md" variant="secondary">
                          {option}
                        </Button>
                      </Tooltip>
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="tooltip-focus"
              title="Keyboard and focus"
              aboutTitle="Usage"
              about="Tooltips open on keyboard focus as well as hover, and Escape dismisses them. Keep content to a short label, never interactive controls."
              lang="jsx"
              code={`<Tooltip content="Duplicate row" side="bottom">
              <Button size="md" variant="secondary">Duplicate</Button>
            </Tooltip>`}
            preview={
              <div className="tooltip-preview tooltip-preview--row">
                <Tooltip content="Duplicate row" side="bottom">
                  <Button size="md" variant="secondary">
                    Duplicate
                  </Button>
                </Tooltip>
                <Tooltip content="Delete row" side="bottom">
                  <Button size="md" variant="secondary">
                    Delete
                  </Button>
                </Tooltip>
              </div>
            }
            />

            <ComponentDoc
              id="tooltip-delay"
              title="Delay"
              aboutTitle="Usage"
              about="The default 150ms delay avoids flicker while scanning the page. Set delay to 0 for grouped icon actions where instant feedback feels better."
              lang="jsx"
              code={`<Tooltip content="Opens instantly" delay={0}>...</Tooltip>
              <Tooltip content="Opens after 600ms" delay={600}>...</Tooltip>`}
            preview={
              <div className="tooltip-preview tooltip-preview--row">
                <Tooltip content="Opens instantly" delay={0}>
                  <Button size="md" variant="secondary">
                    No delay
                  </Button>
                </Tooltip>
                <Tooltip content="Opens after 600ms" delay={600}>
                  <Button size="md" variant="secondary">
                    Long delay
                  </Button>
                </Tooltip>
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function ToastsPage() {
  const sizes = ['lg', 'md', 'sm']
  const statuses = ['default', 'success', 'warning', 'danger', 'info']
  const [size, setSize] = useState('lg')
  const [status, setStatus] = useState('success')
  const [showDescription, setShowDescription] = useState(true)
  const [showClose, setShowClose] = useState(true)
  const [liveOpen, setLiveOpen] = useState(false)

  const description =
    'Your changes are live. Anyone with access can see the update now.'

  const masterCode = [
    `<Toast`,
    `  size="${size}"`,
    `  status="${status}"`,
    `  title="Update published"`,
    showDescription ? `  description="${description}"` : null,
    showClose ? `  onClose={() => {}}` : null,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <ComponentAccessLayout
      componentId="toast"
      title="Toasts"
      lede="Short feedback messages that appear without blocking the page, in lg, md, and sm."
    >

      <div className="component-stack">
        <ComponentMaster
          id="toast-master"
          summary="Toggle size and status to preview every Toast combination."
          about="Use Toast for short, transient feedback after an action. Prefer status tones that match success, warning, or error."
          code={masterCode}
          preview={
            <div className="toast-preview">
              <Toast
                size={size}
                status={status}
                title="Update published"
                description={showDescription ? description : undefined}
                onClose={showClose ? () => {} : undefined}
              />
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                          aria-pressed={size === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Status</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Status"
                >
                  {statuses.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`foundation-tabs__tab ${status === option ? 'is-active' : ''}`}
                          aria-pressed={status === option}
                          onClick={() => setStatus(option)}
                        >
                          {option}
                        </button>
                      ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Structure</span>
                <div className="switch-list">
                  <Switch
                    label="Description"
                    size="lg"
                    checked={showDescription}
                    onCheckedChange={setShowDescription}
                  />
                  <Switch
                    label="Close"
                    size="lg"
                    checked={showClose}
                    onCheckedChange={setShowClose}
                  />
                </div>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="toast-statuses"
                title="Statuses"
                aboutTitle="Usage"
                about="Match status to the outcome. Success for completed actions, danger for failures, and default for neutral notices."
                lang="jsx"
                code={statuses
                .map(
                (option) =>
                `<Toast status="${option}" title="${option[0].toUpperCase()}${option.slice(1)} notice" description="Short supporting copy." onClose={() => {}} />`,
              )
              .join('\n')}
            preview={
              <div className="toast-preview toast-preview--stack">
                {statuses.map((option) => (
                      <Toast
                        key={option}
                        size="md"
                        status={option}
                        title={`${option[0].toUpperCase()}${option.slice(1)} notice`}
                        description="Short supporting copy."
                        onClose={() => {}}
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="toast-sizes"
              title="Sizes"
              aboutTitle="Usage"
              about="Use sm for dense chrome, md for most feedback, and lg when the message needs more room."
              lang="jsx"
              code={sizes
              .map(
              (option) =>
              `<Toast size="${option}" status="info" title="Size ${option}" description="Preview the ${option} surface." onClose={() => {}} />`,
            )
            .join('\n')}
            preview={
              <div className="toast-preview toast-preview--stack">
                {sizes.map((option) => (
                      <Toast
                        key={option}
                        size={option}
                        status="info"
                        title={`Size ${option}`}
                        description={`Preview the ${option} surface.`}
                        onClose={() => {}}
                      />
                    ))}
              </div>
            }
            />

            <ComponentDoc
              id="toast-action"
              title="With action"
              aboutTitle="Usage"
              about="Add one clear follow-up when the next step matters - undo, view, or retry."
              lang="jsx"
              code={`<Toast
              status="success"
              title="Invite sent"
              description="name@studio.com can join once they accept."
              onClose={() => {}}
              action={<Button size="sm" variant="tertiary">View invites</Button>}
            />`}
            preview={
              <div className="toast-preview">
                <Toast
                  size="md"
                  status="success"
                  title="Invite sent"
                  description="name@studio.com can join once they accept."
                  onClose={() => {}}
                  action={
                  <Button size="sm" variant="tertiary">
                  View invites
                </Button>
              }
            />
            </div>
            }
            />

            <ComponentDoc
              id="toast-live"
              title="Timed"
              aboutTitle="Usage"
              about="Use duration for brief confirmations. Keep copy short - anything critical belongs in a modal."
              lang="jsx"
              code={`<Toast
              open={open}
              onOpenChange={setOpen}
              status="success"
              title="Saved"
              description="This notice dismisses on its own."
              duration={3200}
              onClose={() => setOpen(false)}
            />`}
            preview={
              <div className="toast-preview toast-preview--live">
                <Button size="lg" onClick={() => setLiveOpen(true)}>
                  Show toast
                </Button>
                <Toast
                  open={liveOpen}
                  onOpenChange={setLiveOpen}
                  size="md"
                  status="success"
                  title="Saved"
                  description="This notice dismisses on its own."
                  duration={3200}
                  onClose={() => setLiveOpen(false)}
                />
              </div>
            }
            />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

const CHAT_DEMO_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    content:
      'I reviewed the workspace. The launch brief is ready, and two tasks still need owners.',
    timestamp: 'Just now',
  },
  {
    id: 2,
    role: 'user',
    content: 'Summarize the open tasks.',
    timestamp: 'Just now',
  },
  {
    id: 3,
    role: 'assistant',
    content:
      'Assign an owner to final QA, then confirm the release notes before Friday.',
    timestamp: 'Just now',
  },
]

function ChatPatternPage() {
  const nextMessageId = useRef(4)
  const replyTimer = useRef(null)
  const [isThinking, setIsThinking] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [messages, setMessages] = useState(CHAT_DEMO_MESSAGES)

  useEffect(
    () => () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current)
    },
    [],
  )

  function cancelPendingReply() {
    if (replyTimer.current) window.clearTimeout(replyTimer.current)
    replyTimer.current = null
    setIsThinking(false)
  }

  function startNewConversation() {
    cancelPendingReply()
    nextMessageId.current = 1
    setMessages([])
    setShowSuggestions(true)
  }

  function resetExample() {
    cancelPendingReply()
    nextMessageId.current = 4
    setMessages(CHAT_DEMO_MESSAGES)
    setShowSuggestions(true)
  }

  function handleSend(content) {
    const userId = nextMessageId.current
    const assistantId = userId + 1
    nextMessageId.current += 2

    setMessages((current) => [
      ...current,
      { id: userId, role: 'user', content, timestamp: 'Just now' },
    ])
    setShowSuggestions(false)
    setIsThinking(true)

    if (replyTimer.current) window.clearTimeout(replyTimer.current)
    replyTimer.current = window.setTimeout(() => {
      const normalizedMessage = content.toLowerCase()
      let response =
        'Got it. I can help you turn that into a clear next step or draft.'

      if (normalizedMessage.includes('task')) {
        response =
          'I drafted the task. What deadline and owner should I add before creating it?'
      } else if (
        normalizedMessage.includes('draft') ||
        normalizedMessage.includes('update')
      ) {
        response =
          'Here’s a concise update: Final QA still needs an owner, and the release notes need confirmation before Friday.'
      }

      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: 'assistant',
          content: response,
          timestamp: 'Just now',
        },
      ])
      setIsThinking(false)
      replyTimer.current = null
    }, 2000)
  }

  return (
    <ComponentAccessLayout
      componentId="chat-pattern"
      title="Chat Pattern"
      lede="A reusable conversation surface for assistants, copilots, and task-oriented agents."
    >
          <div className="component-stack">
            <ComponentDoc
              id="chat-pattern-default"
              title="Interactive chat"
              summary="Send a message or choose a suggested prompt."
              aboutTitle="Usage"
              about="Use Chat Pattern when the agent needs an ongoing conversational workspace. Keep suggested prompts specific, useful, and easy to scan."
              preview={
                <div className="chat-pattern-preview">
                  <ChatPattern
                    title="Workspace assistant"
                    status="Ready"
                    messages={messages}
                    suggestions={
                      showSuggestions
                        ? ['Create a task', 'Draft an update']
                        : []
                    }
                    isThinking={isThinking}
                    disabled={isThinking}
                    menuItems={[
                      {
                        id: 'new',
                        label: 'New conversation',
                        onSelect: startNewConversation,
                      },
                      {
                        id: 'reset',
                        label: 'Reset example',
                        onSelect: resetExample,
                      },
                    ]}
                    onSend={handleSend}
                  />
                </div>
              }
            />
          </div>
    </ComponentAccessLayout>
  )
}

function ThinkingAnimationPage() {
  return (
    <ComponentAccessLayout
      componentId="thinking-animation"
      title="Thinking Animation"
      lede="A calm processing indicator for assistants, agents, and short system waits."
    >

      <div className="component-stack">
        <ComponentDoc
          id="thinking-animation-default"
          title="Sizes"
          summary="Use the smallest size that remains clear in context."
          aboutTitle="Usage"
          about="Show the indicator only while work is actively happening. Replace it with the result as soon as processing completes."
          lang="jsx"
          code={`<ThinkingAnimation label="Thinking" size="sm" />
<ThinkingAnimation label="Thinking" size="md" />
<ThinkingAnimation label="Thinking" size="lg" />`}
          preview={
            <div className="thinking-animation-preview">
              <ThinkingAnimation label="Thinking" size="sm" />
              <ThinkingAnimation label="Thinking" size="md" />
              <ThinkingAnimation label="Thinking" size="lg" />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function ShimmerTextPage() {
  const [speed, setSpeed] = useState(1)
  const speedLabel = `${speed.toFixed(2).replace(/\.?0+$/, '')}×`
  const masterCode = `<ShimmerText speed={${Number(speed.toFixed(2))}}>Generating response…</ShimmerText>`

  return (
    <ComponentAccessLayout
      componentId="shimmer-text"
      title="Shimmer Text"
      lede="Animated text for short, indeterminate processing states."
    >

      <div className="component-stack">
        <ComponentMaster
          id="shimmer-text-master"
          summary="Change the speed to preview the shimmer treatment."
          about="Use ShimmerText for short indeterminate processing copy. Prefer it only while waiting - swap to real content when ready."
          code={masterCode}
          preview={
            <div className="shimmer-text-preview">
              <ShimmerText speed={speed}>
                Generating response…
              </ShimmerText>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <div className="component-master__range-heading">
                  <label
                    className="component-master__panel-label"
                    htmlFor="shimmer-speed"
                  >
                    Speed
                  </label>
                  <output htmlFor="shimmer-speed">{speedLabel}</output>
                </div>
                <input
                  id="shimmer-speed"
                  className="component-master__range"
                  type="range"
                  min="0.5"
                  max="2"
                  step="any"
                  value={speed}
                  aria-valuetext={`${speedLabel} speed`}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                />
                <div className="component-master__range-labels" aria-hidden="true">
                  <span>0.5×</span>
                  <span>2×</span>
                </div>
              </div>
            </aside>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function LoadingAnimationPage() {
  const sizes = ['sm', 'md', 'lg']
  const variants = [
    { value: 'grid', label: 'Crossfade' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'circular', label: 'Circular' },
  ]
  const [size, setSize] = useState('md')
  const [variant, setVariant] = useState('grid')
  const masterCode = `<LoadingAnimation
  label="Loading"
  size="${size}"
  variant="${variant}"
/>`

  return (
    <ComponentAccessLayout
      componentId="loading-animation"
      title="Loading Animation"
      lede="Configurable dot-grid indicators for active loading states."
    >

      <div className="component-stack">
        <ComponentMaster
          id="loading-animation-master"
          summary="Choose a motion treatment and size to fit the surrounding surface."
          about="Use while a contained surface is loading. Replace the indicator as soon as content is ready."
          code={masterCode}
          preview={
            <div className="loading-animation-preview">
              <LoadingAnimation
                label="Loading"
                size={size}
                variant={variant}
              />
            </div>
          }
          panel={
            <aside
              className="component-master__panel loading-animation-config"
              aria-label="Controls"
            >
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">Size</span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Size"
                >
                  {sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`foundation-tabs__tab ${size === option ? 'is-active' : ''}`}
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="component-master__panel-group">
                <span className="component-master__panel-label">
                  Animation
                </span>
                <div
                  className="foundation-tabs foundation-tabs--compact"
                  role="group"
                  aria-label="Animation"
                >
                  {variants.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`foundation-tabs__tab ${variant === option.value ? 'is-active' : ''}`}
                      aria-pressed={variant === option.value}
                      onClick={() => setVariant(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function NumberTransitionPage() {
  const [value, setValue] = useState(128)
  const previewSectionRef = useRef(null)
  const masterCode = `<NumberTransition value={${value}} size="lg" />`

  useEffect(() => {
    const section = previewSectionRef.current
    if (!section) return undefined

    let direction = 1
    let sectionVisible = false
    let pageVisible = document.visibilityState === 'visible'
    let startTimer = null
    let loopTimer = null

    function clearTimers() {
      if (startTimer != null) window.clearTimeout(startTimer)
      if (loopTimer != null) window.clearInterval(loopTimer)
      startTimer = null
      loopTimer = null
    }

    function advance() {
      setValue((current) => {
        if (current >= 138) direction = -1
        if (current <= 128) direction = 1
        return current + direction
      })
    }

    function syncPlayback() {
      clearTimers()
      if (!sectionVisible || !pageVisible) return

      startTimer = window.setTimeout(() => {
        advance()
        loopTimer = window.setInterval(advance, 1600)
      }, 700)
    }

    const observer = new IntersectionObserver(([entry]) => {
      sectionVisible = entry.isIntersecting
      syncPlayback()
    })

    function handleVisibilityChange() {
      pageVisible = document.visibilityState === 'visible'
      syncPlayback()
    }

    observer.observe(section)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearTimers()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <ComponentAccessLayout
      componentId="number-transition"
      title="Number Transition"
      lede="Spring-like rolling transitions for changing numeric values."
    >

      <div className="component-stack">
        <div ref={previewSectionRef}>
          <ComponentMaster
            id="number-transition-master"
            summary="Watch consecutive values change slowly, or drag the slider to preview either direction."
            about="Use NumberTransition when a metric updates and you want the change to feel continuous rather than abrupt."
            code={masterCode}
            preview={
              <div className="number-transition-preview">
                <NumberTransition
                  value={value}
                  size="lg"
                  aria-live="off"
                />
              </div>
            }
            panel={
              <aside className="component-master__panel" aria-label="Controls">
                <div className="component-master__panel-group">
                  <div className="component-master__range-heading">
                    <label
                      className="component-master__panel-label"
                      htmlFor="number-transition-value"
                    >
                      Value
                    </label>
                    <output htmlFor="number-transition-value">{value}</output>
                  </div>
                  <input
                    id="number-transition-value"
                    className="component-master__range"
                    type="range"
                    min="0"
                    max="999"
                    step="1"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                  />
                  <div className="component-master__range-labels" aria-hidden="true">
                    <span>0</span>
                    <span>999</span>
                  </div>
                </div>
              </aside>
            }
          />
        </div>
      </div>
    </ComponentAccessLayout>
  )
}

function DataTablesPage() {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
    { key: 'projects', header: 'Projects', type: 'number' },
  ]
  const rows = [
    {
      id: 1,
      name: 'Maya Chen',
      role: 'Product designer',
      status: 'Active',
      projects: 8,
    },
    {
      id: 2,
      name: 'Noah Williams',
      role: 'Engineer',
      status: 'Active',
      projects: 5,
    },
    {
      id: 3,
      name: 'Iris Okafor',
      role: 'Researcher',
      status: 'Away',
      projects: 3,
    },
    {
      id: 4,
      name: 'Jordan Lee',
      role: 'Engineer',
      status: 'Active',
      projects: 6,
    },
    {
      id: 5,
      name: 'Alex Rivera',
      role: 'Product designer',
      status: 'Away',
      projects: 4,
    },
  ]

  return (
    <ComponentAccessLayout
      componentId="data-table"
      title="Data Tables"
      lede="Responsive structured data with search, filters, column settings, and clear empty states."
    >

      <div className="component-stack">
        <ComponentDoc
          id="data-table-default"
          title="Toolbar"
          summary="Search, filters, column settings, and selection for real datasets."
          aboutTitle="Usage"
          about="Use the toolbar for searchable tables with faceted filters. Column settings let people hide fields without leaving the page."
          lang="jsx"
          code={`<DataTable
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
    { key: 'status', header: 'Status' },
    { key: 'projects', header: 'Projects', type: 'number' },
  ]}
  rows={rows}
/>`}
          preview={
            <div className="data-table-preview">
              <DataTable
                caption="Team members"
                columns={columns}
                rows={rows}
                selectable
                toolbar
                searchPlaceholder="Search members..."
                filters={[
                  { key: 'status', label: 'Status' },
                  { key: 'role', label: 'Role' },
                ]}
                columnSettings
              />
            </div>
          }
        />

        <div className="component-grid">
          <ComponentDoc
            id="data-table-empty"
            title="Empty state"
            aboutTitle="Usage"
            about="Explain why the table is empty or what action will populate it."
            lang="jsx"
            code={`<DataTable
  columns={columns}
  rows={[]}
  emptyMessage="No team members yet."
/>`}
            preview={
              <div className="data-table-preview">
                <DataTable
                  columns={columns}
                  rows={[]}
                  emptyMessage="No team members yet."
                  size="sm"
                />
              </div>
            }
          />
        </div>
      </div>
    </ComponentAccessLayout>
  )
}

function SidebarsPage() {
  const destinations = ['dashboard', 'documents', 'tasks']
  const [activeItem, setActiveItem] = useState('documents')

  const itemDetails = {
    dashboard: { label: 'Dashboard' },
    documents: { label: 'Documents' },
    tasks: { label: 'Tasks' },
  }

  const code = `<Sidebar aria-label="Workspace">
  <SidebarHeader>Flowrix</SidebarHeader>
  <SidebarNav>
    <SidebarSection label="Folders">
      <SidebarItem icon={<House />} badge="48">Dashboard</SidebarItem>
      <SidebarItem icon={<CalendarDays />} badge="12">Calendar</SidebarItem>
    </SidebarSection>
    <SidebarSection label="Workspace">
      <SidebarItem
        disclosure={<ChevronDown />}
        icon={<FolderOpen />}
        badge="12"
      >
        Folders
      </SidebarItem>
      <SidebarSubmenu>
        <SidebarItem active icon={<File />}>Documents</SidebarItem>
        <SidebarItem icon={<File />}>Product spec</SidebarItem>
      </SidebarSubmenu>
    </SidebarSection>
  </SidebarNav>
</Sidebar>`

  return (
    <ComponentAccessLayout
      componentId="sidebar"
      title="Sidebars"
      lede="App navigation with grouped destinations, active context, badges, and a persistent footer."
    >

      <div className="component-stack">
        <ComponentMaster
          id="sidebar-master"
          summary="A taller, information-dense navigation surface with counts and nested folders."
          about="Use Sidebar as the first child of a .layout-app shell. Keep labels quiet, align counts consistently, and reveal hierarchy with nested items instead of adding more visual chrome."
          code={code}
          preview={
            <div className="sidebar-preview">
              <Sidebar aria-label="Workspace">
                <SidebarHeader>
                  <span className="sidebar-preview__mark">F</span>
                  <span className="sidebar-preview__brand">Flowrix</span>
                </SidebarHeader>
                <SidebarNav>
                  <SidebarSection label="Folders">
                    <SidebarItem
                      active={activeItem === 'dashboard'}
                      icon={<ChartBar />}
                      badge="48"
                      onClick={() => setActiveItem('dashboard')}
                    >
                      Dashboard
                    </SidebarItem>
                    <SidebarItem icon={<CalendarDays />} badge="12">
                      Calendar
                    </SidebarItem>
                    <SidebarItem icon={<Archive />} badge="127">
                      Inbox
                    </SidebarItem>
                    <SidebarItem icon={<Sparkles />} badge="21">
                      My tasks
                    </SidebarItem>
                  </SidebarSection>
                  <SidebarSection label="Flowrix space">
                    <SidebarItem
                      disclosure={<ChevronRight />}
                      icon={<ChartBar />}
                      badge="48"
                    >
                      Operations
                    </SidebarItem>
                    <SidebarItem
                      disclosure={<ChevronDown />}
                      icon={<FolderOpen />}
                      badge="12"
                    >
                      Folders
                    </SidebarItem>
                    <SidebarSubmenu>
                      <SidebarItem
                        active={activeItem === 'documents'}
                        icon={<Folder />}
                        onClick={() => setActiveItem('documents')}
                      >
                        Documents
                      </SidebarItem>
                      <SidebarItem icon={<File />}>Sprint 28 - Product spec</SidebarItem>
                      <SidebarItem icon={<Layers />}>
                        Design system update
                      </SidebarItem>
                    </SidebarSubmenu>
                    <SidebarItem
                      active={activeItem === 'tasks'}
                      disclosure={<ChevronRight />}
                      icon={<Zap />}
                      badge="127"
                      onClick={() => setActiveItem('tasks')}
                    >
                      Tasks
                    </SidebarItem>
                    <SidebarItem
                      disclosure={<ChevronRight />}
                      icon={<Clock />}
                      badge="54"
                    >
                      Activity
                    </SidebarItem>
                    <SidebarItem
                      disclosure={<ChevronRight />}
                      icon={<MessageCircle />}
                      badge="12"
                    >
                      Channels
                    </SidebarItem>
                  </SidebarSection>
                  <SidebarSection label="Tags">
                    <SidebarItem
                      icon={
                        <span className="sidebar-preview__status sidebar-preview__status--danger" />
                      }
                      badge="12"
                    >
                      Important
                    </SidebarItem>
                    <SidebarItem
                      icon={
                        <span className="sidebar-preview__status sidebar-preview__status--warning" />
                      }
                      badge="47"
                    >
                      Normal
                    </SidebarItem>
                    <SidebarItem
                      icon={
                        <span className="sidebar-preview__status sidebar-preview__status--success" />
                      }
                      badge="194"
                    >
                      Minor
                    </SidebarItem>
                  </SidebarSection>
                </SidebarNav>
                <SidebarFooter>
                  <SidebarItem icon={<CirclePlus />}>Invite members</SidebarItem>
                  <SidebarItem icon={<Settings />}>Settings</SidebarItem>
                </SidebarFooter>
              </Sidebar>
            </div>
          }
          panel={
            <aside className="component-master__panel" aria-label="Controls">
              <div className="component-master__panel-group">
                <span className="component-master__panel-label">
                  Active item
                </span>
                <RadioGroup
                  size="lg"
                  value={activeItem}
                  onValueChange={setActiveItem}
                  aria-label="Active item"
                >
                  {destinations.map((destination) => (
                    <Radio
                      key={destination}
                      value={destination}
                      label={itemDetails[destination].label}
                    />
                  ))}
                </RadioGroup>
              </div>
            </aside>
          }
          variants={
            <div className="component-grid">
              <ComponentDoc
                id="sidebar-link-items"
                title="Link items"
                aboutTitle="Usage"
                about="Pass href for navigation links. The active item exposes aria-current=page for assistive technology."
                lang="jsx"
                code={`<SidebarItem href="/home" active icon={<House />}>Home</SidebarItem>
<SidebarItem href="/reports" badge="8" icon={<ChartBar />}>Reports</SidebarItem>`}
                preview={
                  <div className="sidebar-item-preview">
                    <SidebarItem href="#home" active icon={<House />}>
                      Dashboard
                    </SidebarItem>
                    <SidebarItem href="#reports" badge="8" icon={<ChartBar />}>
                      Reports
                    </SidebarItem>
                  </div>
                }
              />
              <ComponentDoc
                id="sidebar-item-states"
                title="Item states"
                aboutTitle="Usage"
                about="Use the disabled state only when a destination is visible but temporarily unavailable."
                lang="jsx"
                code={`<SidebarItem icon={<Folder />}>Default</SidebarItem>
<SidebarItem active icon={<Folder />}>Active</SidebarItem>
<SidebarItem disabled icon={<Lock />}>Disabled</SidebarItem>`}
                preview={
                  <div className="sidebar-item-preview">
                    <SidebarItem icon={<Folder />}>Default</SidebarItem>
                    <SidebarItem active icon={<Folder />}>Active</SidebarItem>
                    <SidebarItem disabled icon={<Lock />}>
                      Disabled
                    </SidebarItem>
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </ComponentAccessLayout>
  )
}

function Placeholder({ title }) {
  return (
    <div className="content-block">
      <header className="hero">
        <h1>{title}</h1>
        <p className="lede">Coming soon.</p>
      </header>
    </div>
  )
}

function ThemeToggle({ theme, onChange }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => onChange(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState('gallery')
  const [navOpen, setNavOpen] = useState(false)
  const {
    user,
    setCheckoutOpen,
  } = useFlorenceAuth()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('flowrix-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('flowrix-theme', theme)
  }, [theme])

  function select(id) {
    setActiveId(id)
    setNavOpen(false)
  }

  useEffect(() => {
    function handleVisitHome() {
      select('about')
    }
    window.addEventListener(FLORENCE_VISIT_HOME_EVENT, handleVisitHome)
    return () =>
      window.removeEventListener(FLORENCE_VISIT_HOME_EVENT, handleVisitHome)
  }, [])

  let content = <Placeholder title="Page" />
  if (activeId === 'account') {
    content = <AccountPage />
  } else if (activeId === 'overview' || activeId === 'getting-started') {
    content = (
      <InstallationPage
        onNavigate={select}
        onUpgradeToPro={() =>
          setCheckoutOpen(true)
        }
      />
    )
  } else if (activeId === 'about') {
    content = (
      <AboutPage
        onNavigate={select}
        onUpgradeToPro={() =>
          setCheckoutOpen(true)
        }
      />
    )
  } else if (activeId === 'agents' || activeId === 'agents-overview') {
    content = <AgentsOverviewPage onNavigate={select} />
  } else if (activeId === 'agents-guidelines') {
    content = <AgentsGuidelinesPage />
  } else if (
    activeId === 'playground' ||
    activeId === 'playground-dashboard' ||
    activeId === 'playground-sandbox'
  ) {
    content = <PlaygroundPage />
  } else if (
    activeId === 'color' ||
    activeId === 'colors' ||
    activeId === 'primitives' ||
    activeId === 'semantics'
  ) {
    content = <ColorPage />
  } else if (
    activeId === 'typography' ||
    activeId === 'typography-semantics'
  ) {
    content = <TypographyFoundationPage />
  } else if (activeId === 'icons') {
    content = <IconsPage />
  } else if (
    activeId === 'spacing' ||
    activeId === 'spacing-semantics'
  ) {
    content = <SpacingPage />
  } else if (activeId === 'grid' || activeId === 'grid-semantics') {
    content = <GridPage />
  } else if (activeId === 'radius' || activeId === 'radius-semantics') {
    content = <RadiusPage />
  } else if (activeId === 'border' || activeId === 'border-semantics') {
    content = <BorderPage />
  } else if (activeId === 'shadow' || activeId === 'shadow-semantics') {
    content = <ShadowPage />
  } else if (activeId === 'motion' || activeId === 'motion-semantics') {
    content = <MotionPage />
  } else if (activeId === 'opacity' || activeId === 'opacity-semantics') {
    content = <OpacityPage />
  } else if (activeId === 'foundations') {
    content = <Placeholder title="Foundations" />
  } else if (activeId === 'components' || activeId === 'gallery') {
    content = <ComponentsIndex onNavigate={select} />
  } else if (activeId === 'buttons') {
    content = <ButtonsPage />
  } else if (activeId === 'inputs') {
    content = <InputsPage />
  } else if (activeId === 'data-tables') {
    content = <DataTablesPage />
  } else if (activeId === 'sidebars') {
    content = <SidebarsPage />
  } else if (activeId === 'switches') {
    content = <SwitchesPage />
  } else if (activeId === 'radios') {
    content = <RadiosPage />
  } else if (activeId === 'checkboxes') {
    content = <CheckboxesPage />
  } else if (activeId === 'selects') {
    content = <SelectsPage />
  } else if (activeId === 'tabs') {
    content = <TabsPage />
  } else if (activeId === 'textareas') {
    content = <TextareasPage />
  } else if (activeId === 'modals') {
    content = <ModalsPage />
  } else if (activeId === 'modal-cards') {
    content = <ModalCardsPage />
  } else if (activeId === 'kpi-cards') {
    content = <KpiCardsPage />
  } else if (activeId === 'insight-cards') {
    content = <InsightCardsPage />
  } else if (activeId === 'pie-charts') {
    content = <PieChartsPage />
  } else if (activeId === 'bar-charts') {
    content = <BarChartsPage />
  } else if (activeId === 'line-charts') {
    content = <LineChartsPage />
  } else if (activeId === 'calendars') {
    content = <CalendarsPage />
  } else if (activeId === 'timelines') {
    content = <TimelinesPage />
  } else if (activeId === 'tags') {
    content = <TagsPage />
  } else if (activeId === 'tooltips') {
    content = <TooltipsPage />
  } else if (activeId === 'toasts') {
    content = <ToastsPage />
  } else if (activeId === 'chat-pattern') {
    content = <ChatPatternPage />
  } else if (activeId === 'thinking-animation') {
    content = <ThinkingAnimationPage />
  } else if (activeId === 'shimmer-text') {
    content = <ShimmerTextPage />
  } else if (activeId === 'loading-animation') {
    content = <LoadingAnimationPage />
  } else if (activeId === 'number-transition') {
    content = <NumberTransitionPage />
  }

  return (
    <div
      className={`shell ${navOpen ? 'shell--nav-open' : ''}${
        activeId === 'playground' ||
        activeId === 'playground-dashboard' ||
        activeId === 'playground-sandbox'
          ? ' shell--playground'
          : ''
      }`}
    >
      <header className="topbar">
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setNavOpen((open) => !open)}
          aria-expanded={navOpen}
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
        >
          {navOpen ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
        </button>
        <div className="topbar__brand">
          <strong>Florence</strong>
          <span>AI-ready design system</span>
        </div>
        <div className="topbar__actions">
          <div className="topbar__account">
            <TopbarAccount />
          </div>
          <ThemeToggle theme={theme} onChange={setTheme} />
        </div>
      </header>

      <aside className="sidebar">
        <nav className="sidebar__nav" aria-label="Design system">
          <NavItems items={NAV} activeId={activeId} onSelect={select} />
        </nav>
        {user ? (
          <div className="sidebar__manage">
            <Button
              variant="tertiary"
              size="md"
              className="sidebar__manage-btn"
              onClick={() => select('account')}
            >
              <Settings aria-hidden="true" />
              Settings
            </Button>
          </div>
        ) : (
          <aside className="sidebar__upsell" aria-label="Florence Pro">
            <div className="sidebar__upsell-icon" aria-hidden="true">
              <StatementVisual theme={theme} />
            </div>
            <p className="sidebar__upsell-eyebrow">Pro</p>
            <p className="sidebar__upsell-title">{FLORENCE_PRO_COPY.title}</p>
            <p className="sidebar__upsell-body">{FLORENCE_PRO_COPY.body}</p>
            <Button
              variant="primary"
              size="md"
              className="sidebar__upsell-cta topbar__btn topbar__btn--upgrade"
              onClick={() => setCheckoutOpen(true)}
            >
              {FLORENCE_PRO_COPY.cta}
            </Button>
          </aside>
        )}
      </aside>

      <div className="main">
        {content}
      </div>

      {navOpen ? (
        <button
          type="button"
          className="scrim"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      ) : null}
    </div>
  )
}
