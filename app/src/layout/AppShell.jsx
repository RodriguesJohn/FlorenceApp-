import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  Boxes,
  ChevronDown,
  CircleDollarSign,
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
import { Input } from '../../florence/components/input/Input.jsx'
import { Modal } from '../../florence/components/modal/Modal.jsx'
import { Switch } from '../../florence/components/switch/Switch.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { Toast } from '../../florence/components/toast/Toast.jsx'
import { CreateBrandDialog } from './CreateBrandDialog.jsx'
import { TEST_UNLOCK_PIN } from '../data/platform.js'
import { usePlatform } from '../state/platform.jsx'
import { useTheme } from '../state/theme.jsx'
import {
  clerkDisplayEmail,
  clerkDisplayInitials,
  clerkDisplayName,
  clerkProfileOverlayOptions,
  websiteHome,
} from '../lib/clerk.js'
import { useClerk, useUser } from '@clerk/react'

const NAV = [
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
      { to: '/tokens', label: 'Tokens', icon: Layers },
      { to: '/components', label: 'Components', icon: LayoutGrid },
      { to: '/animation', label: 'Animation Library', icon: Film },
      { to: '/skills', label: 'Skills', icon: Sparkles },
    ],
  },
  {
    label: 'Connect',
    items: [
      { to: '/start', label: 'Agent Connect', icon: PlugZap },
      { to: '/connectors', label: 'Connectors', icon: Plug },
      { to: '/libraries', label: 'Libraries', icon: Library },
    ],
  },
  {
    label: 'Component Studio',
    items: [{ to: '/studio', label: 'Studio', icon: Boxes }],
  },
  {
    label: 'Quality',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/evals', label: 'Evals', icon: Activity },
      { to: '/guardrails', label: 'Guardrails', icon: Code2 },
    ],
  },
  {
    label: 'Internal',
    items: [{ to: '/internal', label: 'Internal', icon: CircleDollarSign }],
  },
]

const FREE_PATHS = new Set(['/start', '/internal'])

export function AppShell({ children }) {
  const {
    workspace,
    workspaces,
    setWorkspaceId,
    createBrand,
    plan,
    isPaid,
    isAdmin,
    choosePlan,
    toast,
    dismissToast,
  } = usePlatform()
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const accountName = clerkDisplayName(user)
  const accountEmail = clerkDisplayEmail(user)
  const accountInitials = clerkDisplayInitials(user)
  const { isDark, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [pinOpen, setPinOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [pendingPath, setPendingPath] = useState('/brand')

  useEffect(() => {
    if (isPaid || FREE_PATHS.has(location.pathname)) return
    navigate('/start', { replace: true })
  }, [isPaid, location.pathname, navigate])

  function openUnlock(path = '/brand') {
    setPendingPath(path)
    setPin('')
    setPinError('')
    setPinOpen(true)
  }

  function closeUnlock(open) {
    setPinOpen(open)
    if (!open) {
      setPin('')
      setPinError('')
    }
  }

  function unlockPaid(event) {
    event.preventDefault()
    if (pin.trim() !== TEST_UNLOCK_PIN) {
      setPinError('That PIN is not right.')
      return
    }
    choosePlan('studio')
    setPinOpen(false)
    setPin('')
    setPinError('')
    navigate(pendingPath)
  }

  function go(path) {
    if (isPaid || FREE_PATHS.has(path)) {
      navigate(path)
      return
    }
    openUnlock(path)
  }

  return (
    <div className="app-shell layout-app">
      <Sidebar className="app-sidebar" aria-label="Florence AI">
        <SidebarHeader className="app-sidebar__brand">
          <a
            className="app-brand"
            href={websiteHome()}
            aria-label="Florence AI home"
          >
            <strong>Florence AI</strong>
          </a>
          <button
            type="button"
            className="workspace-switcher"
            aria-haspopup="dialog"
            aria-expanded={workspaceOpen}
            onClick={() => {
              if (isPaid) {
                setWorkspaceOpen(true)
                return
              }
              openUnlock('/brand')
            }}
          >
            <span>
              <strong>{workspace.name}</strong>
            </span>
            <ChevronDown aria-hidden="true" />
          </button>
        </SidebarHeader>

        <SidebarNav aria-label="Workspace">
          {NAV.map((section) => (
            <SidebarSection key={section.label} label={section.label}>
              {section.items.map((item) => {
                const Icon = item.icon
                const locked = !isPaid && !FREE_PATHS.has(item.to)
                return (
                  <SidebarItem
                    key={item.to}
                    active={location.pathname === item.to}
                    icon={<Icon />}
                    className={locked ? 'app-nav-item--locked' : undefined}
                    aria-haspopup={locked ? 'dialog' : undefined}
                    onClick={() => go(item.to)}
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
            className={!isPaid ? 'app-nav-item--locked' : undefined}
            aria-haspopup={!isPaid ? 'dialog' : undefined}
            onClick={() => go('/settings')}
          >
            Settings
          </SidebarItem>
          <button
            type="button"
            className="account-card"
            onClick={() => setAccountOpen(true)}
          >
            <span className="account-card__avatar" aria-hidden="true">
              {accountInitials}
            </span>
            <span className="account-card__copy">
              <strong>{accountName}</strong>
              <span>{accountEmail}</span>
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
        open={pinOpen}
        onOpenChange={closeUnlock}
        title="Unlock paid features"
        description="Starter includes Agent Connect. Enter the test PIN to see the rest of the product."
        size="sm"
        footer={
          <Button variant="primary" type="submit" form="unlock-pin-form">
            Unlock
          </Button>
        }
      >
        <form id="unlock-pin-form" onSubmit={unlockPaid}>
          <Input
            label="PIN"
            inputMode="numeric"
            autoComplete="off"
            value={pin}
            error={pinError}
            onChange={(event) => {
              setPin(event.target.value)
              if (pinError) setPinError('')
            }}
          />
        </form>
      </Modal>

      <Modal
        open={accountOpen}
        onOpenChange={setAccountOpen}
        title={accountName}
        description={accountEmail}
        size="sm"
        footer={
          <>
            {isPaid ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setAccountOpen(false)
                    navigate('/internal')
                  }}
                >
                  Open internal
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setAccountOpen(false)
                    navigate('/settings')
                  }}
                >
                  Open settings
                </Button>
              </>
            ) : null}
            <Button
              variant="secondary"
              onClick={() => {
                setAccountOpen(false)
                openUserProfile(clerkProfileOverlayOptions)
              }}
            >
              Manage account
            </Button>
            <Button
              variant="tertiary"
              onClick={async () => {
                setAccountOpen(false)
                await signOut({ redirectUrl: websiteHome() })
              }}
            >
              Log out
            </Button>
          </>
        }
      >
        <div className="account-dialog">
          <Tag tone="brand" size="sm">
            {isAdmin ? 'Admin' : plan.name}
          </Tag>
          <p>This account keeps your MCP command. Come back and it is still here.</p>
        </div>
      </Modal>
    </div>
  )
}
