import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  ChevronDown,
  CirclePlus,
  Code2,
  Film,
  Image,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Library,
  MessageSquare,
  MoreHorizontal,
  Plug,
  PlugZap,
  Settings,
  Sparkles,
} from 'lucide-react'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
} from '../../florence/components/sidebar/Sidebar.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'
import { Switch } from '../../florence/components/switch/Switch.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Toast } from '../../florence/components/toast/Toast.jsx'
import { CreateBrandDialog } from './CreateBrandDialog.jsx'
import { usePlatform } from '../state/platform.jsx'
import { useTheme } from '../state/theme.jsx'

const WEBSITE_HOME =
  import.meta.env.VITE_WEBSITE_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5174/'
    : 'https://florenceai-drab.vercel.app/')

const NAV = [
  {
    label: 'Start here',
    items: [{ to: '/start', label: 'Agent Connect', icon: PlugZap }],
  },
  {
    label: 'Brand',
    items: [
      { to: '/brand', label: 'Brand System', icon: MessageSquare },
      { to: '/assets', label: 'Assets', icon: Image },
    ],
  },
  {
    label: 'Product',
    items: [
      { to: '/tokens', label: 'Foundation Token', icon: Layers },
      { to: '/components', label: 'Components', icon: LayoutGrid },
      { to: '/animation', label: 'Animation Library', icon: Film },
      { to: '/skills', label: 'Skills', icon: Sparkles },
    ],
  },
  {
    label: 'Connectors',
    items: [{ to: '/connectors', label: 'Connectors', icon: Plug }],
  },
  {
    label: 'References',
    items: [{ to: '/libraries', label: 'Libraries', icon: Library }],
  },
  {
    label: 'Engineering',
    items: [{ to: '/guardrails', label: 'Guardrails', icon: Code2 }],
  },
  {
    label: 'Quality',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/evals', label: 'Evals', icon: Activity },
    ],
  },
]

export function AppShell({ children }) {
  const {
    workspace,
    workspaces,
    setWorkspaceId,
    createBrand,
    plan,
    toast,
    dismissToast,
  } = usePlatform()
  const { isDark, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <div className="app-shell layout-app">
      <Sidebar className="app-sidebar" aria-label="Florence AI">
        <SidebarHeader className="app-sidebar__brand">
          <a
            className="app-brand"
            href={WEBSITE_HOME}
            aria-label="Florence AI home"
          >
            <strong>Florence AI</strong>
          </a>
          <button
            type="button"
            className="workspace-switcher"
            aria-haspopup="dialog"
            aria-expanded={workspaceOpen}
            onClick={() => setWorkspaceOpen(true)}
          >
            <span>
              <strong>{workspace.name}</strong>
              <span>{workspace.kind || 'Design system workspace'}</span>
            </span>
            <ChevronDown aria-hidden="true" />
          </button>
        </SidebarHeader>

        <SidebarNav aria-label="Workspace">
          {NAV.map((section) => (
            <SidebarSection key={section.label} label={section.label}>
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarItem
                    key={item.to}
                    active={location.pathname === item.to}
                    icon={<Icon />}
                    onClick={() => navigate(item.to)}
                  >
                    {item.label}
                  </SidebarItem>
                )
              })}
            </SidebarSection>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <Switch
            className="theme-switch"
            size="sm"
            label="Dark mode"
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
          <SidebarItem
            active={location.pathname === '/settings'}
            icon={<Settings />}
            onClick={() => navigate('/settings')}
          >
            Settings
          </SidebarItem>
          <button
            type="button"
            className="account-card"
            onClick={() => setAccountOpen(true)}
          >
            <span className="account-card__avatar" aria-hidden="true">
              JR
            </span>
            <span className="account-card__copy">
              <strong>John Rodrigues</strong>
              <span>Workspace admin</span>
            </span>
            <MoreHorizontal aria-hidden="true" />
          </button>
        </SidebarFooter>
      </Sidebar>

      <div className="app-canvas layout-canvas">{children}</div>

      {toast ? (
        <div className="app-toast">
          <Toast
            open
            title={toast.title}
            description={toast.description}
            status={toast.status}
            onClose={dismissToast}
            onOpenChange={(open) => {
              if (!open) dismissToast()
            }}
          />
        </div>
      ) : null}

      <Modal
        open={workspaceOpen}
        onOpenChange={setWorkspaceOpen}
        title="Brands"
        description="Each brand has its own voice, assets, tokens, and MCP endpoint."
        size="sm"
        footer={
          <Button
            variant="primary"
            onClick={() => {
              setWorkspaceOpen(false)
              setCreateOpen(true)
            }}
          >
            <CirclePlus size={16} aria-hidden="true" />
            Create brand
          </Button>
        }
      >
        <ul className="workspace-list">
          {workspaces.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`workspace-list__item${
                  item.id === workspace.id ? ' workspace-list__item--active' : ''
                }`}
                onClick={() => {
                  setWorkspaceId(item.id)
                  setWorkspaceOpen(false)
                }}
              >
                <strong>{item.name}</strong>
                <span>{item.product}</span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <CreateBrandDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={(values) => {
          createBrand(values)
          navigate('/brand')
        }}
      />

      <Modal
        open={accountOpen}
        onOpenChange={setAccountOpen}
        title="John Rodrigues"
        description="Workspace admin"
        size="sm"
        footer={
          <Button
            variant="secondary"
            onClick={() => {
              setAccountOpen(false)
              navigate('/settings')
            }}
          >
            Open settings
          </Button>
        }
      >
        <div className="account-dialog">
          <Tag tone="brand" size="sm">
            {plan.name}
          </Tag>
          <p>One seat on this workspace. Manage plan and MCP in settings.</p>
        </div>
      </Modal>
    </div>
  )
}
