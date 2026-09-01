import { FLORENCE_FOUNDATIONS_CSS } from './florenceFoundationsCss.js'

const RAW = import.meta.glob('../../03-components/**/*.{jsx,js,css}', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const CONTRACT_MODULES = import.meta.glob('../../03-components/**/*.json', {
  eager: true,
  import: 'default',
})

function repoPath(viteKey) {
  const index = viteKey.indexOf('03-components/')
  return index === -1 ? viteKey : viteKey.slice(index)
}

function dirname(filePath) {
  return filePath.split('/').slice(0, -1).join('/')
}

function resolvePath(fromFile, spec) {
  const parts = dirname(fromFile).split('/')
  for (const segment of spec.replace(/^\.\//, '').split('/')) {
    if (segment === '..') parts.pop()
    else if (segment !== '.') parts.push(segment)
  }
  return parts.join('/')
}

const FILES = Object.entries(RAW).map(([key, source]) => ({
  path: repoPath(key),
  source: String(source),
}))

const CONTRACTS = Object.values(CONTRACT_MODULES).filter(
  (entry) => entry && typeof entry.id === 'string' && typeof entry.path === 'string',
)

const BY_ID = new Map(CONTRACTS.map((entry) => [entry.id, entry]))
const BY_FOLDER = new Map(CONTRACTS.map((entry) => [entry.path, entry]))

function filesInFolder(folder) {
  const prefix = `${folder}/`
  return FILES.filter((file) => file.path.startsWith(prefix))
}

function importedComponentIds(file) {
  const ids = new Set()
  const pattern = /from\s+['"](\.[^'"]+)['"]/g
  let match = pattern.exec(file.source)
  while (match) {
    const resolved = resolvePath(file.path, match[1])
    const folder = dirname(resolved)
    const contract = BY_FOLDER.get(folder)
    if (contract) ids.add(contract.id)
    match = pattern.exec(file.source)
  }
  return [...ids]
}

function collectBundle(rootId) {
  const seen = new Set()
  const queue = [rootId]
  const files = []

  while (queue.length) {
    const id = queue.shift()
    if (!id || seen.has(id)) continue
    seen.add(id)
    const contract = BY_ID.get(id)
    if (!contract) continue
    const folderFiles = filesInFolder(contract.path)
    files.push(...folderFiles)
    for (const dep of contract.deps ?? []) queue.push(dep)
    for (const file of folderFiles) {
      for (const imported of importedComponentIds(file)) queue.push(imported)
    }
  }

  const unique = []
  const used = new Set()
  for (const file of files) {
    if (used.has(file.path)) continue
    used.add(file.path)
    unique.push(file)
  }
  unique.sort((a, b) => a.path.localeCompare(b.path))
  return unique
}

function detectPackages(files) {
  const blob = files.map((file) => file.source).join('\n')
  const packages = ['react', 'geist']
  if (blob.includes('lucide-react')) packages.push('lucide-react')
  if (blob.includes('motion/react')) packages.push('motion')
  if (blob.includes('react-dom')) packages.push('react-dom')
  return packages
}

function formatProp(prop) {
  const bits = [prop.name]
  if (prop.type) bits.push(prop.type)
  if (prop.values) bits.push(`(${prop.values.join(' | ')})`)
  if (prop.default !== undefined) bits.push(`default ${JSON.stringify(prop.default)}`)
  if (prop.required) bits.push('required')
  if (prop.description) bits.push(`— ${prop.description}`)
  return bits.join(' ')
}

function formatApi(contract) {
  if (contract.api?.compounds) {
    return Object.entries(contract.api.compounds)
      .map(([name, keys]) => `${name}: ${keys.join(', ')}`)
      .join('\n')
  }
  const props = contract.api?.props ?? []
  return props.map((prop) => `- ${formatProp(prop)}`).join('\n') || '- (see source)'
}

function exampleBlocks(contract) {
  const examples = contract.examples ?? []
  if (!examples.length) {
    const first = contract.exports?.[0]
    return first ? `<${first} />` : null
  }
  return examples
    .map((example) => `      {/* ${example.title} */}\n      ${example.code}`)
    .join('\n\n')
}

function lucideFromExamples(code) {
  const skip = new Set(['Fragment'])
  for (const contract of CONTRACTS) {
    for (const name of contract.exports ?? []) skip.add(name)
  }
  const names = new Set()
  const pattern = /<([A-Z][A-Za-z0-9]+)/g
  let match = pattern.exec(code)
  while (match) {
    if (!skip.has(match[1])) names.add(match[1])
    match = pattern.exec(code)
  }
  return [...names]
}

function buildDemo({ contract, files }) {
  const rootFiles = files.filter((file) => file.path.startsWith(`${contract.path}/`))
  const mainFile =
    rootFiles.find((file) => file.path.endsWith('.jsx')) ??
    files.find((file) => file.path.endsWith('.jsx'))
  const exportsList = contract.exports ?? ['Component']
  const importNames = exportsList.join(', ')
  const importPath = `./${mainFile.path}`
  const body = exampleBlocks(contract) ?? `<${exportsList[0]} />`
  const needsOpen = /\bsetOpen\b|\bopen=\{open\}/.test(body)
  const icons = lucideFromExamples(body)
  const iconImport = icons.length
    ? `import { ${icons.join(', ')} } from 'lucide-react'\n`
    : ''
  const stateImport = needsOpen ? "import { useState } from 'react'\n" : ''

  return `import './florence.css'
${stateImport}${iconImport}import { ${importNames} } from '${importPath}'

export function ${contract.name.replace(/\s+/g, '')}Demo() {
${needsOpen ? '  const [open, setOpen] = useState(true)\n' : ''}  return (
    <div>
${body}
    </div>
  )
}
`
}

function buildPrompt({ contract, files, packages, demoName }) {
  const fileList = ['florence.css', ...files.map((file) => file.path), `${demoName}.jsx`]
  const a11y = (contract.a11y ?? []).map((item) => `- ${item}`).join('\n')
  const when = (contract.whenToUse ?? []).map((item) => `- ${item}`).join('\n')
  const whenNot = (contract.whenNotToUse ?? []).map((item) => `- ${item}`).join('\n')
  const extras = []
  if (packages.includes('motion')) {
    extras.push('Charts and some motion use `motion/react`. Install `motion`. Keep the motion tokens and prefers-reduced-motion branches.')
  }
  if (packages.includes('lucide-react')) {
    extras.push('Icons are lucide-react. Keep aria-hidden on decorative icons.')
  }

  return `You are implementing Florence ${contract.name}. The Code paste in this same request is the source of truth. Split it into files at the path markers. Do not rewrite JSX, JS, or CSS. Do not replace var(--token) with hex, rem, or px.

Intent
${contract.intent}

When to use
${when || '- See intent'}

When not to use
${whenNot || '- See intent'}

Split the Code paste
${fileList.map((path, index) => `${index + 1}. ${path}`).join('\n')}

Install
${packages.map((item) => `- ${item}`).join('\n')}
- Load Geist and Geist Mono variable faces from the geist package. Tokens expect those families with system fallbacks.

Wire-up
- Keep every relative import inside 03-components exactly as written
- Write florence.css at the app root (foundations: primitives then semantics for colors, typography, spacing, grid, radius, border, shadow, motion, opacity)
- ${demoName}.jsx imports './florence.css' first, then the component
- Render <${demoName} /> as the only UI (no docs chrome)
- Keep both :root (light) and [data-theme="dark"] token blocks
- Semantic tokens only. No Tailwind, no CSS-in-JS, no new theme file
${extras.map((item) => `- ${item}`).join('\n')}

API
${formatApi(contract)}

Accessibility (do not drop)
${a11y || '- Follow the source'}

Examples in ${demoName}.jsx match the contract examples. Done when the demo matches Florence ${contract.name} in View.`
}

function buildCode({ files, demoSource }) {
  const parts = [
    `/* florence.css — Florence foundations. Import once. */\n${FLORENCE_FOUNDATIONS_CSS}`,
  ]
  for (const file of files) {
    const marker = file.path.endsWith('.css') ? `/* ${file.path} */` : `// ${file.path}`
    parts.push(`${marker}\n${file.source.trim()}`)
  }
  parts.push(`// ${guessDemoFileName(demoSource)}\n${demoSource.trim()}`)
  return parts.join('\n\n')
}

function guessDemoFileName(demoSource) {
  const match = demoSource.match(/export function (\w+)Demo/)
  return match ? `${match[1]}Demo.jsx` : 'ComponentDemo.jsx'
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

function chatPatternDemoSource() {
  return `import './florence.css'
import { useEffect, useRef, useState } from 'react'
import { ChatPattern } from './03-components/agentic-ui-patterns/chat-pattern/ChatPattern.jsx'

const DEMO_MESSAGES = ${JSON.stringify(CHAT_DEMO_MESSAGES, null, 2)}

export function ChatPatternDemo() {
  const nextMessageId = useRef(4)
  const replyTimer = useRef(null)
  const [isThinking, setIsThinking] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [messages, setMessages] = useState(DEMO_MESSAGES)

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
    setMessages(DEMO_MESSAGES)
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
    <ChatPattern
      title="Workspace assistant"
      status="Ready"
      messages={messages}
      suggestions={
        showSuggestions ? ['Create a task', 'Draft an update'] : []
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
  )
}
`
}

function chatPatternPrompt(files, packages) {
  const fileList = [
    'florence.css',
    ...files.map((file) => file.path),
    'ChatPatternDemo.jsx',
  ]
  return `You are implementing Florence Chat Pattern. The Code paste in this same request is the source of truth. Split it into files at the path markers. Do not rewrite JSX or CSS. Do not replace var(--token) with hex, rem, or px.

Intent
Full assistant conversation surface: header status, message thread, suggestions, composer, and optional menu.

Split the Code paste
${fileList.map((path, index) => `${index + 1}. ${path}`).join('\n')}

Install
${packages.map((item) => `- ${item}`).join('\n')}
- Load Geist and Geist Mono variable faces from the geist package.

Wire-up
- Keep every relative import inside 03-components exactly as written (ChatPattern imports ThinkingAnimation from ../../motion-components/thinking-animation/ThinkingAnimation.jsx)
- ChatPatternDemo.jsx imports './florence.css' first
- Render <ChatPatternDemo /> as the only UI
- Keep :root and [data-theme="dark"] token blocks
- Semantic tokens only

ChatPatternDemo must match the Florence View
- nextMessageId starts at 4
- title="Workspace assistant" status="Ready"
- Starting DEMO_MESSAGES:
  1. assistant — "I reviewed the workspace. The launch brief is ready, and two tasks still need owners."
  2. user — "Summarize the open tasks."
  3. assistant — "Assign an owner to final QA, then confirm the release notes before Friday."
  Each timestamp is "Just now"
- Suggestions ['Create a task', 'Draft an update'] until first send
- Menu: New conversation (empty + suggestions back), Reset example (restore DEMO_MESSAGES)
- No close button
- On send: user bubble, thinking 2000ms (ThinkingAnimation label="Thinking" size="md"), then assistant bubble
- Reply matching is case-insensitive substring: "task" / "draft"|"update" / else (exact strings in ChatPatternDemo.jsx)
- Cancel pending timeout on new conversation, reset, and unmount

Already in source — do not drop
- Status dot, ellipsis menu, outside-click and Escape
- Assistant left / user right bubbles
- Circular inverse send, disabled when empty or thinking
- Thread auto-scroll, prefers-reduced-motion, transform/opacity only`
}

export function getComponentAccess(componentId) {
  const contract = BY_ID.get(componentId)
  if (!contract) {
    return {
      prompt: `Unknown component: ${componentId}`,
      code: '',
      name: componentId,
    }
  }

  const files = collectBundle(componentId)
  const packages = detectPackages(files)

  if (componentId === 'chat-pattern') {
    const demoSource = chatPatternDemoSource()
    return {
      name: contract.name,
      prompt: chatPatternPrompt(files, packages),
      code: buildCode({ files, demoSource }),
    }
  }

  const demoSource = buildDemo({ contract, files })
  const demoName = `${contract.name.replace(/\s+/g, '')}Demo`
  return {
    name: contract.name,
    prompt: buildPrompt({ contract, files, packages, demoName }),
    code: buildCode({ files, demoSource }),
  }
}
