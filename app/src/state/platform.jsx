import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { useUser } from '@clerk/react'
import {
  DRAFT_BRAND_ID,
  PLANS,
  REFERENCE_LIBRARIES,
  attachDemoBrandKit,
  buildBrandGuidelines,
  buildMcpSnippet,
  createBrandRecord,
  createDraftBrand,
  isBrandSetup,
  normalizeBrand,
} from '../data/platform.js'
import { clerkConfigured, isClerkAdmin } from '../lib/clerk.js'

function resolveReferenceName(workspace, id) {
  const custom = (workspace.references ?? []).find((ref) => ref.id === id)
  if (custom?.name) return custom.name
  return REFERENCE_LIBRARIES.find((item) => item.id === id)?.name ?? 'Library'
}

const STORAGE_KEY = 'florence-platform-v2'

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(next) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

function hydrateBrands(stored) {
  const seeded = stored?.workspaces?.length
    ? stored.workspaces
    : [createDraftBrand()]
  return seeded.map((brand) => {
    let next = normalizeBrand(brand)
    if (isBrandSetup(next) && !next.identity) {
      next = attachDemoBrandKit(next)
      next = { ...next, guidelines: buildBrandGuidelines(next) }
    }
    if (
      stored?.designSystem &&
      brand.id === (stored.workspaceId ?? DRAFT_BRAND_ID) &&
      !next.designSystem
    ) {
      return { ...next, designSystem: stored.designSystem }
    }
    return next
  })
}

const PlatformContext = createContext(null)

export function AppPlatformProvider({ children }) {
  if (!clerkConfigured) {
    return <PlatformProvider>{children}</PlatformProvider>
  }

  return <ClerkAdminPlatform>{children}</ClerkAdminPlatform>
}

function ClerkAdminPlatform({ children }) {
  const { user } = useUser()
  return <PlatformProvider isAdmin={isClerkAdmin(user)}>{children}</PlatformProvider>
}

export function PlatformProvider({ children, isAdmin = false }) {
  const stored = loadState()
  const [planId, setPlanId] = useState(stored?.planId ?? 'free')
  const [workspaceId, setWorkspaceId] = useState(
    stored?.workspaceId ?? DRAFT_BRAND_ID,
  )
  const [workspaces, setWorkspaces] = useState(() => {
    const brands = hydrateBrands(stored)
    if (stored) {
      saveState({ ...stored, workspaces: brands })
    }
    return brands
  })
  const [mcpConnected, setMcpConnected] = useState(stored?.mcpConnected ?? false)
  const [toast, setToast] = useState(null)
  const snapshot = useRef({
    planId,
    workspaceId,
    workspaces,
    mcpConnected,
  })
  snapshot.current = { planId, workspaceId, workspaces, mcpConnected }

  function persist(patch) {
    saveState({ ...snapshot.current, ...patch })
  }

  function notify(nextToast) {
    setToast(nextToast)
  }

  const value = useMemo(() => {
    const plan =
      isAdmin && planId === 'free'
        ? PLANS.studio
        : (PLANS[planId] ?? PLANS.free)
    const workspace =
      workspaces.find((item) => item.id === workspaceId) ?? workspaces[0]
    const isPaid = planId === 'studio' || planId === 'custom' || isAdmin
    const canGenerate = isPaid
    const mcpEndpoint = 'npx -y github:RodriguesJohn/florence-mcp'
    const mcpSnippet = buildMcpSnippet(mcpEndpoint)

    function patchWorkspace(id, updater) {
      setWorkspaces((current) => {
        const next = current.map((item) =>
          item.id === id ? updater(item) : item,
        )
        persist({ workspaces: next })
        return next
      })
    }

    return {
      plan,
      planId,
      isAdmin,
      isPaid,
      workspace,
      workspaceId,
      workspaces,
      brandReady: isBrandSetup(workspace),
      mcpConnected,
      mcpEndpoint,
      mcpSnippet,
      designSystem: workspace.designSystem ?? null,
      canGenerate,
      toast,
      notify,
      setWorkspaceId: (id) => {
        setWorkspaceId(id)
        persist({ workspaceId: id })
      },
      createBrand: ({ name, product, voice }) => {
        const brand = createBrandRecord({ name, product, voice })
        setWorkspaces((current) => {
          const next = [...current, brand]
          persist({ workspaces: next, workspaceId: brand.id })
          return next
        })
        setWorkspaceId(brand.id)
        notify({
          title: `${brand.name} is open`,
          description: 'Generate guidelines or upload a kit to finish this brand.',
          status: 'success',
        })
        return brand
      },
      updateBrand: (patch) => {
        patchWorkspace(workspace.id, (item) => ({ ...item, ...patch }))
      },
      addCreative: (creative) => {
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          creatives: [...(item.creatives ?? []), creative],
        }))
        notify({
          title: 'Asset added',
          description: `${creative.title} is in ${workspace.name}.`,
          status: 'success',
        })
      },
      completeBrandSetup: (patch) => {
        patchWorkspace(workspace.id, (item) => ({ ...item, ...patch }))
        notify({
          title: `${patch.name} is ready`,
          description:
            patch.origin === 'uploaded'
              ? 'Guidelines were drafted from the files you added.'
              : 'Guidelines are ready for this brand.',
          status: 'success',
        })
      },
      generateGuidelines: () => {
        patchWorkspace(workspace.id, (item) => {
          const next = attachDemoBrandKit(item)
          return { ...next, guidelines: buildBrandGuidelines(next) }
        })
        notify({
          title: 'Brand guidelines generated',
          description: `${workspace.name} brand guidelines are ready.`,
          status: 'success',
        })
      },
      uploadBrandFiles: (files) => {
        const uploads = files.map((file) => ({
          id: `upload-${Date.now().toString(36)}-${file.name}`,
          name: file.name,
          size: file.size,
          type: file.type || 'file',
          addedAt: new Date().toISOString(),
        }))
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          uploads: [...(item.uploads ?? []), ...uploads],
        }))
        notify({
          title: uploads.length === 1 ? 'Brand file uploaded' : 'Brand files uploaded',
          description: `${uploads.map((item) => item.name).join(', ')} added to ${workspace.name}.`,
          status: 'success',
        })
      },
      addSkill: (skill) => {
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          skills: [...(item.skills ?? []), skill],
        }))
        notify({
          title: 'Skill added',
          description: `${skill.name} is available on ${workspace.name}.`,
          status: 'success',
        })
      },
      toggleSkill: (skillId, enabled) => {
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          skills: (item.skills ?? []).map((skill) =>
            skill.id === skillId ? { ...skill, enabled } : skill,
          ),
        }))
      },
      connectSource: (connection) => {
        patchWorkspace(workspace.id, (item) => {
          const remaining = (item.connectors ?? []).filter(
            (connector) => connector.id !== connection.id,
          )
          return {
            ...item,
            connectors: [
              ...remaining,
              {
                ...connection,
                connectedAt: new Date().toISOString(),
              },
            ],
          }
        })
        notify({
          title: `${connection.name} connected`,
          description: `Agents can retrieve this source for ${workspace.name}.`,
          status: 'success',
        })
      },
      disconnectSource: (id) => {
        const current = (workspace.connectors ?? []).find(
          (connector) => connector.id === id,
        )
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          connectors: (item.connectors ?? []).filter(
            (connector) => connector.id !== id,
          ),
        }))
        notify({
          title: `${current?.name ?? 'Source'} disconnected`,
          description: 'This library is no longer served with the brand.',
          status: 'warning',
        })
      },
      pinReference: (library) => {
        patchWorkspace(workspace.id, (item) => {
          const remaining = (item.references ?? []).filter(
            (ref) => ref.id !== library.id,
          )
          return {
            ...item,
            references: [
              ...remaining,
              library.provider === 'custom'
                ? { ...library, enabled: true }
                : { id: library.id },
            ],
          }
        })
        notify({
          title: `${library.name} is a reference`,
          description: `Agents can retrieve this library for ${workspace.name}.`,
          status: 'success',
        })
      },
      unpinReference: (id) => {
        const current = resolveReferenceName(workspace, id)
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          references: (item.references ?? []).filter((ref) => ref.id !== id),
        }))
        notify({
          title: `${current} removed`,
          description: 'This library is no longer a reference on the brand.',
          status: 'warning',
        })
      },
      connectMcp: () => {
        setMcpConnected(true)
        persist({ mcpConnected: true })
        notify({
          title: 'MCP connected',
          description: `Agents can now retrieve ${workspace.name}.`,
          status: 'success',
        })
      },
      disconnectMcp: () => {
        setMcpConnected(false)
        persist({ mcpConnected: false })
        notify({
          title: 'MCP disconnected',
          description: 'Agents will no longer receive this workspace.',
          status: 'warning',
        })
      },
      choosePlan: (id) => {
        setPlanId(id)
        persist({ planId: id })
        notify({
          title: `${PLANS[id].name} is active`,
          description:
            id === 'custom'
              ? 'Free and Studio flows stay available. We’ll scope seats next.'
              : PLANS[id].summary,
          status: 'success',
        })
      },
      publishSystem: (system) => {
        patchWorkspace(workspace.id, (item) => ({
          ...item,
          designSystem: system,
          voice: system.voice || item.voice,
        }))
        notify({
          title: 'Design system published',
          description: `MCP will serve this system for ${workspace.name}.`,
          status: 'success',
        })
      },
      dismissToast: () => setToast(null),
    }
  }, [isAdmin, planId, workspaceId, workspaces, mcpConnected, toast])

  return (
    <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>
  )
}

export function usePlatform() {
  const context = useContext(PlatformContext)
  if (!context) {
    throw new Error('usePlatform must be used inside PlatformProvider')
  }
  return context
}
