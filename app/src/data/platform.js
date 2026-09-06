export const TEST_UNLOCK_PIN = '2024'

export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    seats: 1,
    summary: 'Connect the Florence MCP and keep agents on-system.',
    features: [
      'Florence MCP endpoint',
      'Read brand, tokens, and component contracts',
      'Evals against the shared Florence system',
      'One viewer seat',
    ],
  },
  studio: {
    id: 'studio',
    name: 'Studio',
    price: '$49',
    cadence: 'per editor / month',
    seats: 1,
    summary: 'Generate one design system and plug it into your product.',
    features: [
      'Everything in Free',
      'One design system generator',
      'Publish tokens and components to this workspace',
      'MCP serves your system, not the shared default',
      'Billed per editor / month',
    ],
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    price: 'Talk to us',
    cadence: 'scoped to your org',
    seats: null,
    summary: 'Same Free and Studio flows, sized to more seats and workspaces.',
    features: [
      'Everything in Studio',
      'More seats and workspaces',
      'Private MCP and review with your team',
      'Custom eval suites',
    ],
  },
}

export const DEFAULT_PRINCIPLES = [
  {
    title: 'Name the action',
    body: 'Buttons start with a verb. Agents must not invent “Get started” or “Learn more” when a specific action exists.',
  },
  {
    title: 'Stay on tokens',
    body: 'Color, type, space, and motion come from semantic roles. Hex and one-off rem values are off-system.',
  },
  {
    title: 'Retrieve, then compose',
    body: 'Read the component contract before drawing UI. Do not invent a sibling control when one already exists.',
  },
]

export const DEFAULT_LOCKUPS = [
  { name: 'Wordmark', use: 'Product chrome and legal' },
  { name: 'Mark', use: 'Favicon, avatar, dense toolbars' },
  { name: 'Lockup', use: 'Marketing and the MCP welcome card' },
]

export const DEMO_BRAND_DEFAULTS = {
  name: 'Northwind Health',
  product: 'Northwind Clinic',
  voice:
    'Warm, exact, unhurried. Sentence case. One idea per sentence. Sound like a clinician handing off a chart, not a growth team. Never say wellness journey, unlock, or seamless.',
}

export const DEMO_BRAND_PRINCIPLES = [
  {
    title: 'Name the visit',
    body: 'Buttons and titles name the clinical action. Do not invent “Get started” or “Your wellness journey.”',
  },
  {
    title: 'Stay on this kit',
    body: 'Color, type, and space come from this brand. Hex and one-off rem in UI are off-system.',
  },
  {
    title: 'One record, one voice',
    body: 'Front desk, clinician, and billing share the same names. Do not fork a sibling product.',
  },
]

export function buildDemoBrandKit({ name, product, voice } = {}) {
  const brandName = name?.trim() || DEMO_BRAND_DEFAULTS.name
  const productName = product?.trim() || DEMO_BRAND_DEFAULTS.product
  const brandVoice = voice?.trim() || DEMO_BRAND_DEFAULTS.voice

  return {
    kind: 'Independent clinic network',
    voice: brandVoice,
    identity: {
      who: `${brandName} is an independent clinic network in the Pacific Northwest. They keep small practices in one organism: front desk, clinicians, and billing share a single patient record.`,
      what: `${productName} runs scheduling, intake, charting, and follow-up. It is for practices that outgrew paper and still refuse an EHR that feels like a warehouse.`,
      audience:
        'Practice managers, clinicians, and the ops lead who owns the design system. Agents write for that trio, not for a campaign.',
    },
    colors: [
      {
        name: 'Pine',
        token: '--color-brand-pine',
        hex: '#1B3A34',
        role: 'Ink',
        usage: 'Primary text, chrome, wordmark',
      },
      {
        name: 'Linen',
        token: '--color-brand-linen',
        hex: '#F3EEE4',
        role: 'Page',
        usage: 'App canvas and printed summaries',
      },
      {
        name: 'Tide',
        token: '--color-brand-tide',
        hex: '#2A6B62',
        role: 'Brand',
        usage: 'Primary action and focus',
      },
      {
        name: 'Clay',
        token: '--color-brand-clay',
        hex: '#C45C26',
        role: 'Attention',
        usage: 'Warnings, overdue visits, alerts',
      },
      {
        name: 'Fog',
        token: '--color-brand-fog',
        hex: '#D7E3DE',
        role: 'Subtle',
        usage: 'Secondary fills and selected rows',
      },
      {
        name: 'Line',
        token: '--color-brand-line',
        hex: '#B7C7C1',
        role: 'Stroke',
        usage: 'Borders, dividers, input rings',
      },
    ],
    typography: {
      note: 'Optical serif for the human voice. Grotesque sans for the chart. Never mix in a third family.',
      roles: [
        {
          id: 'display',
          name: 'Fraunces',
          family: '"Fraunces", serif',
          role: 'Display',
          use: 'Heroes and the clinic name',
          sample: productName,
        },
        {
          id: 'heading',
          name: 'Fraunces',
          family: '"Fraunces", serif',
          role: 'Heading',
          use: 'Section titles',
          sample: 'The visit, not the campaign.',
        },
        {
          id: 'body',
          name: 'IBM Plex Sans',
          family: '"IBM Plex Sans", sans-serif',
          role: 'Body',
          use: 'Reading copy and chart notes',
          sample:
            'Write like a clinician handing off a chart. One idea per sentence. Name the person, the visit, and the next step.',
        },
        {
          id: 'label',
          name: 'IBM Plex Sans',
          family: '"IBM Plex Sans", sans-serif',
          role: 'Label',
          use: 'Controls and buttons',
          sample: 'Schedule follow-up',
        },
        {
          id: 'caption',
          name: 'IBM Plex Sans',
          family: '"IBM Plex Sans", sans-serif',
          role: 'Caption',
          use: 'Meta, timestamps, hints',
          sample: 'Chart updated 2 hours ago',
        },
      ],
    },
    principles: DEMO_BRAND_PRINCIPLES,
    lockups: [
      {
        name: 'Wordmark',
        use: `${productName} chrome, legal, and printed after-visit summaries`,
      },
      {
        name: 'Mark',
        use: 'Favicon, avatar, and the chart header when space is tight',
      },
      {
        name: 'Lockup',
        use: 'Marketing, the waiting-room screen, and the MCP welcome card',
      },
    ],
  }
}

export function attachDemoBrandKit(brand) {
  const kit = buildDemoBrandKit({
    name: brand?.name,
    product: brand?.product,
    voice: brand?.voice,
  })
  return {
    ...brand,
    kind: brand?.kind && brand.kind !== 'Design system workspace' ? brand.kind : kit.kind,
    voice: brand?.voice || kit.voice,
    identity: brand?.identity ?? kit.identity,
    colors: brand?.colors?.length ? brand.colors : kit.colors,
    typography: brand?.typography ?? kit.typography,
    principles: brand?.principles?.length ? brand.principles : kit.principles,
    lockups: brand?.lockups?.length ? brand.lockups : kit.lockups,
  }
}

export function colorValue(colors, token) {
  return colors?.find((item) => item.token === token)?.hex
}

export const CREATIVE_KINDS = [
  { value: 'Motion', label: 'Motion' },
  { value: 'Print', label: 'Print' },
  { value: 'Spatial', label: 'Spatial' },
  { value: 'Social', label: 'Social' },
]

export function slugifyBrand(name) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base || 'brand'
}

export function buildMcpSnippet(_endpoint) {
  return JSON.stringify(
    {
      mcpServers: {
        florence: {
          command: 'npx',
          args: ['-y', 'github:RodriguesJohn/florence-mcp'],
        },
      },
    },
    null,
    2,
  )
}

export const DEFAULT_SKILLS = [
  {
    id: 'compose-on-system',
    name: 'Compose on-system',
    body: 'Retrieve the component contract, then compose. Do not invent a sibling control.',
    enabled: true,
  },
  {
    id: 'write-voice',
    name: 'Write in brand voice',
    body: 'Use this brand’s voice before writing labels, empty states, or errors.',
    enabled: true,
  },
  {
    id: 'review-tokens',
    name: 'Review tokens',
    body: 'Flag hex, primitive ramps, and hard-coded rem before UI ships.',
    enabled: true,
  },
  {
    id: 'serve-mcp',
    name: 'Serve over MCP',
    body: 'Return brand, tokens, contracts, and constraints instead of guessing.',
    enabled: true,
  },
]

export const DRAFT_BRAND_ID = 'draft'

export function createDraftBrand() {
  return normalizeBrand({
    id: DRAFT_BRAND_ID,
    name: 'Untitled brand',
    kind: 'Not set up yet',
    product: '',
    voice: '',
    origin: null,
    principles: [],
    lockups: [],
    creatives: [],
    designSystem: null,
  })
}

export function isBrandSetup(brand) {
  return Boolean(
    brand?.origin || brand?.guidelines || (brand?.uploads?.length ?? 0) > 0,
  )
}

export function lockupsForProduct(product) {
  const name = product?.trim() || 'this product'
  return [
    { name: 'Wordmark', use: `${name} chrome and legal` },
    { name: 'Mark', use: 'Favicon, avatar, dense toolbars' },
    { name: 'Lockup', use: 'Marketing and the MCP welcome card' },
  ]
}

export function inferBrandNameFromFiles(files) {
  const first = files[0]?.name
  if (!first) return ''
  const base = first
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  if (!base) return ''
  return base.replace(/\b\w/g, (char) => char.toUpperCase())
}

function filesToUploads(files) {
  return files.map((file) => ({
    id: `upload-${Date.now().toString(36)}-${file.name}`,
    name: file.name,
    size: file.size,
    type: file.type || 'file',
    addedAt: new Date().toISOString(),
  }))
}

export function buildGeneratedBrand({ name, product, voice }) {
  const kit = buildDemoBrandKit({ name, product, voice })
  const trimmedName = name.trim() || DEMO_BRAND_DEFAULTS.name
  const trimmedProduct = product.trim() || DEMO_BRAND_DEFAULTS.product
  const next = {
    name: trimmedName,
    product: trimmedProduct,
    origin: 'generated',
    creatives: [],
    designSystem: null,
    ...kit,
  }
  return {
    ...next,
    guidelines: buildBrandGuidelines({
      ...next,
      skills: DEFAULT_SKILLS,
    }),
  }
}

export function buildUploadedBrand({ name, product, voice, files }) {
  const uploads = filesToUploads(files)
  const trimmedName =
    name.trim() || inferBrandNameFromFiles(files) || 'Untitled brand'
  const trimmedProduct = product.trim() || trimmedName
  const trimmedVoice =
    voice.trim() ||
    `Derived from the uploaded kit for ${trimmedName}. Stay specific, sentence case, and on-token. Do not invent campaign language.`
  const principles = DEFAULT_PRINCIPLES
  const lockups = lockupsForProduct(trimmedProduct)
  const next = {
    name: trimmedName,
    kind: 'Design system workspace',
    product: trimmedProduct,
    voice: trimmedVoice,
    origin: 'uploaded',
    principles,
    lockups,
    uploads,
  }
  return {
    ...next,
    guidelines: buildBrandGuidelines({
      ...next,
      skills: DEFAULT_SKILLS,
    }),
  }
}

export function createBrandRecord({ name, product, voice }) {
  const slug = slugifyBrand(name)
  return normalizeBrand({
    id: `${slug}-${Date.now().toString(36)}`,
    name: name.trim(),
    kind: 'Design system workspace',
    product: product.trim() || name.trim(),
    voice: voice.trim(),
    origin: null,
    principles: [],
    lockups: [],
    creatives: [],
    designSystem: null,
  })
}

export function normalizeBrand(brand) {
  return {
    ...brand,
    origin: brand.origin ?? null,
    skills: brand.skills?.length
      ? brand.skills
      : DEFAULT_SKILLS.map((skill) => ({ ...skill })),
    guidelines: brand.guidelines ?? null,
    uploads: brand.uploads ?? [],
    connectors: brand.connectors ?? [],
    references: brand.references ?? [],
    identity: brand.identity ?? null,
    colors: brand.colors ?? [],
    typography: brand.typography ?? null,
  }
}

export function buildBrandGuidelines(brand) {
  const colors = brand.colors ?? []
  const typeRoles = brand.typography?.roles ?? []
  const identity = brand.identity
  const sections = [
    identity?.who
      ? {
          heading: 'Who they are',
          body: identity.who,
        }
      : null,
    identity?.what
      ? {
          heading: 'What they do',
          body: identity.what,
        }
      : null,
    identity?.audience
      ? {
          heading: 'Who it is for',
          body: identity.audience,
        }
      : null,
    {
      heading: 'Product',
      body: `${brand.product} is the product surface. Agents must keep this name and not invent a sibling brand.`,
    },
    {
      heading: 'Voice',
      body: brand.voice,
    },
    {
      heading: 'Principles',
      body: brand.principles
        .map((principle) => `${principle.title}. ${principle.body}`)
        .join(' '),
    },
    {
      heading: 'Lockups',
      body: brand.lockups
        .map((lockup) => `${lockup.name}: ${lockup.use}.`)
        .join(' '),
    },
    colors.length
      ? {
          heading: 'Color',
          body: colors
            .map(
              (color) =>
                `${color.name} (${color.token}) is ${color.role.toLowerCase()}: ${color.usage}.`,
            )
            .join(' '),
        }
      : {
          heading: 'Color and type',
          body: 'Use semantic tokens only: text, background, border, interactive, and focus roles. Type uses display, metric, heading, body, label, and caption. Never hex or primitive ramps.',
        },
    typeRoles.length
      ? {
          heading: 'Typography',
          body: `${typeRoles
            .map((role) => `${role.name} for ${role.role.toLowerCase()} (${role.use}).`)
            .join(' ')} ${brand.typography?.note ?? ''}`.trim(),
        }
      : null,
    {
      heading: 'For agents',
      body: `Skills on this brand are served over MCP. Read the contract before composing. Enabled skills: ${(
        brand.skills ?? DEFAULT_SKILLS
      )
        .filter((skill) => skill.enabled)
        .map((skill) => skill.name)
        .join(', ')}.${referenceLine(brand)}`,
    },
  ].filter(Boolean)

  return {
    generatedAt: new Date().toISOString(),
    title: `${brand.name} brand guidelines`,
    sections,
  }
}

export const SEED_BRANDS = [
  {
    id: 'acme',
    name: 'Acme Product',
    kind: 'Design system workspace',
    product: 'Acme Ledger',
    voice:
      'Calm, precise, and specific. No hype. Sentence case. One idea per sentence.',
    principles: DEFAULT_PRINCIPLES,
    lockups: DEFAULT_LOCKUPS,
    references: [{ id: 'polaris' }, { id: 'radix' }, { id: 'lucide' }],
    creatives: [
      {
        id: 'launch-film',
        title: 'Q3 ledger launch film',
        kind: 'Motion',
        status: 'Live',
        tone: 'success',
        usedIn: 'Website hero, sales deck',
      },
      {
        id: 'token-poster',
        title: 'Foundation token poster',
        kind: 'Print',
        status: 'In review',
        tone: 'warning',
        usedIn: 'Studio wall, onboarding kit',
      },
      {
        id: 'booth',
        title: 'Conference booth kit',
        kind: 'Spatial',
        status: 'Draft',
        tone: 'neutral',
        usedIn: 'Config 2026',
      },
      {
        id: 'social',
        title: 'Weekly shipping stills',
        kind: 'Social',
        status: 'Live',
        tone: 'success',
        usedIn: 'LinkedIn, X',
      },
    ],
    designSystem: null,
  },
  {
    id: 'florence',
    name: 'Florence starter',
    kind: 'Shared system',
    product: 'Florence',
    voice:
      'Calm, precise, sentence case. Retrieve the contract, then compose. No invented siblings.',
    principles: DEFAULT_PRINCIPLES,
    lockups: DEFAULT_LOCKUPS,
    creatives: [],
    designSystem: null,
  },
].map(normalizeBrand)

export const WORKSPACES = SEED_BRANDS

export const BRAND = {
  product: 'Acme Ledger',
  voice: 'Calm, precise, and specific. No hype. Sentence case. One idea per sentence.',
  principles: DEFAULT_PRINCIPLES,
  lockups: DEFAULT_LOCKUPS,
}

export const CREATIVES = [
  {
    id: 'launch-film',
    title: 'Q3 ledger launch film',
    kind: 'Motion',
    status: 'Live',
    tone: 'success',
    usedIn: 'Website hero, sales deck',
  },
  {
    id: 'token-poster',
    title: 'Foundation token poster',
    kind: 'Print',
    status: 'In review',
    tone: 'warning',
    usedIn: 'Studio wall, onboarding kit',
  },
  {
    id: 'booth',
    title: 'Conference booth kit',
    kind: 'Spatial',
    status: 'Draft',
    tone: 'neutral',
    usedIn: 'Config 2026',
  },
  {
    id: 'social',
    title: 'Weekly shipping stills',
    kind: 'Social',
    status: 'Live',
    tone: 'success',
    usedIn: 'LinkedIn, X',
  },
]

export const TOKEN_GROUPS = [
  {
    id: 'color',
    label: 'Color',
    items: [
      { name: '--color-text-primary', role: 'Primary text', swatch: 'var(--color-text-primary)' },
      { name: '--color-text-secondary', role: 'Secondary text', swatch: 'var(--color-text-secondary)' },
      { name: '--color-bg-page', role: 'Page', swatch: 'var(--color-bg-page)' },
      { name: '--color-bg-subtle', role: 'Canvas', swatch: 'var(--color-bg-subtle)' },
      { name: '--color-bg-brand', role: 'Brand fill', swatch: 'var(--color-bg-brand)' },
      { name: '--color-border-default', role: 'Default stroke', swatch: 'var(--color-border-default)' },
      { name: '--color-interactive-primary', role: 'Primary action', swatch: 'var(--color-interactive-primary)' },
      { name: '--color-focus-ring', role: 'Focus', swatch: 'var(--color-focus-ring)' },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    items: [
      { name: '--text-display-*', role: 'Page heroes' },
      { name: '--text-metric-*', role: 'Balances and KPIs' },
      { name: '--text-heading-*', role: 'Section titles' },
      { name: '--text-body-*', role: 'Reading copy' },
      { name: '--text-label-*', role: 'Controls' },
      { name: '--text-caption-*', role: 'Meta and hints' },
    ],
  },
  {
    id: 'spacing',
    label: 'Spacing',
    items: [
      { name: '--space-inset-*', role: 'Padding inside surfaces' },
      { name: '--space-stack-*', role: 'Vertical rhythm' },
      { name: '--space-inline-*', role: 'Horizontal gaps' },
      { name: '--space-section-*', role: 'Section breaks' },
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    items: [
      { name: '--motion-interaction-*', role: 'Buttons and controls' },
      { name: '--motion-expand-*', role: 'Disclosure' },
      { name: '--motion-overlay-*', role: 'Menus and toasts' },
      { name: '--motion-modal-*', role: 'Dialogs' },
    ],
  },
]

export const CONNECTOR_CATALOG = [
  {
    id: 'github',
    name: 'GitHub',
    kind: 'Source',
    imports: 'Components, tokens, and contracts from a repo',
    sourceLabel: 'Repository',
    sourcePlaceholder: 'https://github.com/acme/design-system',
    sourceHint: 'A repo with tokens, contracts, or a component package.',
  },
  {
    id: 'figma',
    name: 'Figma',
    kind: 'Design',
    imports: 'Variables, components, and Code Connect mappings',
    sourceLabel: 'File URL',
    sourcePlaceholder: 'https://www.figma.com/design/…',
    sourceHint: 'A Figma file or published team library.',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    kind: 'Library',
    imports: 'Stories, args, and documented variants',
    sourceLabel: 'Storybook URL',
    sourcePlaceholder: 'https://storybook.acme.com',
    sourceHint: 'A published Storybook, including Chromatic-hosted ones.',
  },
  {
    id: 'chromatic',
    name: 'Chromatic',
    kind: 'Library',
    imports: 'Reviewed stories and visual component snapshots',
    sourceLabel: 'Project URL',
    sourcePlaceholder: 'https://www.chromatic.com/library?appId=…',
    sourceHint: 'A Chromatic library linked to this brand.',
  },
  {
    id: 'bit',
    name: 'Bit',
    kind: 'Library',
    imports: 'Composable components from a Bit scope',
    sourceLabel: 'Scope URL',
    sourcePlaceholder: 'https://bit.cloud/acme/ui',
    sourceHint: 'A Bit cloud scope or collection.',
  },
]

export const LIBRARY_KINDS = [
  { value: 'Library', label: 'Component library' },
  { value: 'Source', label: 'Token source' },
  { value: 'Docs', label: 'Documentation' },
]

export const REFERENCE_KINDS = [
  { value: 'Design system', label: 'Design system' },
  { value: 'Component library', label: 'Component library' },
  { value: 'Icons', label: 'Icons' },
]

export const REFERENCE_LIBRARIES = [
  {
    id: 'material',
    name: 'Material Design 3',
    maker: 'Google',
    kind: 'Design system',
    summary: 'Adaptive layout, color, and type for Android, Flutter, and web.',
    url: 'https://m3.material.io',
  },
  {
    id: 'polaris',
    name: 'Polaris',
    maker: 'Shopify',
    kind: 'Design system',
    summary: 'Admin patterns and tokens for merchant products and apps.',
    url: 'https://polaris.shopify.com',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    maker: 'IBM',
    kind: 'Design system',
    summary: 'Open-source components and guidance for enterprise products.',
    url: 'https://carbondesignsystem.com',
  },
  {
    id: 'spectrum',
    name: 'Spectrum',
    maker: 'Adobe',
    kind: 'Design system',
    summary: 'Cross-product language for Creative Cloud and Experience Cloud.',
    url: 'https://spectrum.adobe.com',
  },
  {
    id: 'primer',
    name: 'Primer',
    maker: 'GitHub',
    kind: 'Design system',
    summary: 'UI, tokens, and CSS for github.com and Enterprise.',
    url: 'https://primer.style',
  },
  {
    id: 'atlassian',
    name: 'Atlassian Design System',
    maker: 'Atlassian',
    kind: 'Design system',
    summary: 'Components and content for Jira, Confluence, and Trello.',
    url: 'https://atlassian.design',
  },
  {
    id: 'fluent',
    name: 'Fluent 2',
    maker: 'Microsoft',
    kind: 'Design system',
    summary: 'Windows, Office, and web controls on a shared token set.',
    url: 'https://fluent2.microsoft.design',
  },
  {
    id: 'lightning',
    name: 'Lightning',
    maker: 'Salesforce',
    kind: 'Design system',
    summary: 'Dense CRM patterns, tokens, and accessibility guidance.',
    url: 'https://www.lightningdesignsystem.com',
  },
  {
    id: 'apple-hig',
    name: 'Human Interface Guidelines',
    maker: 'Apple',
    kind: 'Design system',
    summary: 'Platform conventions for iOS, iPadOS, macOS, and visionOS.',
    url: 'https://developer.apple.com/design/human-interface-guidelines',
  },
  {
    id: 'geist',
    name: 'Geist',
    maker: 'Vercel',
    kind: 'Design system',
    summary: 'Product chrome, type, and components for dashboards and docs.',
    url: 'https://vercel.com/geist/introduction',
  },
  {
    id: 'radix',
    name: 'Radix UI',
    maker: 'WorkOS',
    kind: 'Component library',
    summary: 'Unstyled accessible primitives. Compose, then apply tokens.',
    url: 'https://www.radix-ui.com',
  },
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    maker: 'shadcn',
    kind: 'Component library',
    summary: 'Copy-paste components on Radix and Tailwind. Own the code.',
    url: 'https://ui.shadcn.com',
  },
  {
    id: 'base-ui',
    name: 'Base UI',
    maker: 'MUI',
    kind: 'Component library',
    summary: 'Unstyled, accessible primitives for React product UI.',
    url: 'https://base-ui.com',
  },
  {
    id: 'react-aria',
    name: 'React Aria',
    maker: 'Adobe',
    kind: 'Component library',
    summary: 'Hooks and components with keyboard, focus, and screen reader behavior.',
    url: 'https://react-spectrum.adobe.com/react-aria',
  },
  {
    id: 'ant',
    name: 'Ant Design',
    maker: 'Ant Group',
    kind: 'Component library',
    summary: 'Enterprise React components for dense operational tools.',
    url: 'https://ant.design',
  },
  {
    id: 'chakra',
    name: 'Chakra UI',
    maker: 'Chakra',
    kind: 'Component library',
    summary: 'Token-driven React components with style props.',
    url: 'https://chakra-ui.com',
  },
  {
    id: 'mantine',
    name: 'Mantine',
    maker: 'Mantine',
    kind: 'Component library',
    summary: 'Full React kit: components, hooks, and dates.',
    url: 'https://mantine.dev',
  },
  {
    id: 'headless',
    name: 'Headless UI',
    maker: 'Tailwind Labs',
    kind: 'Component library',
    summary: 'Unstyled, accessible components that pair with utility CSS.',
    url: 'https://headlessui.com',
  },
  {
    id: 'lucide',
    name: 'Lucide',
    maker: 'Lucide',
    kind: 'Icons',
    summary: 'Open-source icon set used in this product.',
    url: 'https://lucide.dev',
  },
  {
    id: 'phosphor',
    name: 'Phosphor',
    maker: 'Phosphor',
    kind: 'Icons',
    summary: 'Flexible icon family with weight variants.',
    url: 'https://phosphoricons.com',
  },
  {
    id: 'heroicons',
    name: 'Heroicons',
    maker: 'Tailwind Labs',
    kind: 'Icons',
    summary: 'Outline and solid icons for product UI.',
    url: 'https://heroicons.com',
  },
  {
    id: 'radix-icons',
    name: 'Radix Icons',
    maker: 'WorkOS',
    kind: 'Icons',
    summary: '15×15 icons sized for dense toolbars and menus.',
    url: 'https://www.radix-ui.com/icons',
  },
]

export function resolveReferences(brand) {
  const selected = brand?.references ?? []
  const catalogById = Object.fromEntries(
    REFERENCE_LIBRARIES.map((item) => [item.id, item]),
  )
  return selected
    .map((ref) => {
      if (ref.provider === 'custom') return { ...ref, enabled: ref.enabled !== false }
      const catalog = catalogById[ref.id]
      if (!catalog) return null
      return { ...catalog, enabled: true }
    })
    .filter(Boolean)
}

function referenceLine(brand) {
  const names = resolveReferences(brand).map((item) => item.name)
  if (!names.length) return ''
  return ` Reference libraries: ${names.join(', ')}.`
}

export const ANIMATION_ROLES = [
  { name: '--motion-interaction-*', role: 'Buttons and controls' },
  { name: '--motion-expand-*', role: 'Disclosure' },
  { name: '--motion-overlay-*', role: 'Menus and toasts' },
  { name: '--motion-modal-*', role: 'Dialogs' },
  { name: '--motion-page-*', role: 'View transitions' },
]

export const ANIMATION_PATTERNS = [
  {
    id: 'thinking-animation',
    name: 'Thinking animation',
    when: 'Assistant thinking states',
    avoid: 'Full-page loads of unknown length',
  },
  {
    id: 'loading-animation',
    name: 'Loading animation',
    when: 'Panel refresh and empty canvas waits',
    avoid: 'Agent cognition cues',
  },
  {
    id: 'shimmer-text',
    name: 'Shimmer text',
    when: 'Inline generating or working copy',
    avoid: 'Numeric KPI ticks',
  },
  {
    id: 'number-transition',
    name: 'Number transition',
    when: 'KPI heroes and live counters',
    avoid: 'Static copy',
  },
]

export const COMPONENT_CATALOG = [
  { id: 'button', name: 'Button', category: 'Actions', when: 'Primary CTA, submit, or destructive confirm' },
  { id: 'input', name: 'Input', category: 'Forms', when: 'Single-line text with label and error' },
  { id: 'select', name: 'Select', category: 'Forms', when: 'One value from a known list' },
  { id: 'switch', name: 'Switch', category: 'Forms', when: 'Immediate on/off setting' },
  { id: 'sidebar', name: 'Sidebar', category: 'Navigation', when: 'App shell primary nav' },
  { id: 'tabs', name: 'Tabs', category: 'Navigation', when: 'Peer views in the same page' },
  { id: 'kpi-card', name: 'KPI card', category: 'Data', when: 'One metric with optional delta' },
  { id: 'insight-card', name: 'Insight card', category: 'Data', when: 'A recommended action or finding' },
  { id: 'data-table', name: 'Data table', category: 'Data', when: 'Structured operational rows' },
  { id: 'chat-pattern', name: 'Chat pattern', category: 'Agentic', when: 'Full assistant conversation surface' },
  { id: 'modal', name: 'Modal', category: 'Overlays', when: 'A task that must finish now' },
  { id: 'toast', name: 'Toast', category: 'Feedback', when: 'A short, non-blocking outcome' },
]

export const CONSTRAINTS = [
  {
    id: 'tokens',
    title: 'Semantic tokens only',
    body: 'Use color, type, space, radius, border, shadow, motion, and opacity roles. Never hex, primitive ramps, or hard-coded rem in components.',
    mcp: 'florence.tokens.semantics',
  },
  {
    id: 'contracts',
    title: 'Read the contract first',
    body: 'Before composing, retrieve <id>.json. Honor whenToUse and whenNotToUse. Do not invent a sibling control.',
    mcp: 'florence.components.get',
  },
  {
    id: 'layout',
    title: 'Stay on the layout grid',
    body: 'Product shells use layout-app → canvas → workspace → content. Marketing uses layout-page. No one-off max-widths.',
    mcp: 'florence.layout.rules',
  },
  {
    id: 'copy',
    title: 'Sentence-case product chrome',
    body: 'Soft medium weights. Verb-first buttons. No tiny uppercase overlines for UI chrome.',
    mcp: 'florence.brand.voice',
  },
  {
    id: 'motion',
    title: 'Ease-out, under 300ms',
    body: 'Animate transform and opacity only. Never enter from scale(0). Honor prefers-reduced-motion.',
    mcp: 'florence.motion.rules',
  },
]

export const EVAL_RUNS = [
  {
    id: 'eval-184',
    suite: 'Checkout slop',
    score: '96',
    status: 'Pass',
    tone: 'success',
    ran: '2 hours ago',
  },
  {
    id: 'eval-183',
    suite: 'Token violations',
    score: '88',
    status: 'Watch',
    tone: 'warning',
    ran: 'Yesterday',
  },
  {
    id: 'eval-182',
    suite: 'Contract retrieval',
    score: '99',
    status: 'Pass',
    tone: 'success',
    ran: 'Yesterday',
  },
  {
    id: 'eval-181',
    suite: 'Off-brand copy',
    score: '74',
    status: 'Fail',
    tone: 'danger',
    ran: '3 days ago',
  },
]
