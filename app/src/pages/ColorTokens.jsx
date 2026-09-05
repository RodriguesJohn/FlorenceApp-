import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../florence/components/tabs/Tabs.jsx'
import {
  COLOR_SCALES,
  COLOR_SEMANTIC_GROUPS,
  COLOR_SINGLES,
  COLOR_STEPS,
} from '../data/florenceColors.js'
import { useTheme } from '../state/theme.jsx'

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
  if (raw.startsWith('#') || raw.startsWith('rgb')) return raw
  const match = raw.match(/var\((--color-[^)]+)\)/)
  if (!match) return raw
  return getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
}

function isLightHex(hex) {
  if (!hex?.startsWith('#') || hex.length < 7) return true
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

function Swatch({ tokenName, step }) {
  const cssVar = tokenVar(tokenName)
  const { theme } = useTheme()
  const [hex, setHex] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHex(resolveToken(tokenName) || readToken(tokenName))
  }, [tokenName, theme])

  async function copy() {
    try {
      await navigator.clipboard.writeText(cssVar)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 900)
    } catch {
      setCopied(false)
    }
  }

  const isLight = step !== undefined ? step <= 400 : tokenName === 'white' || isLightHex(hex)

  return (
    <button
      type="button"
      className={`color-swatch${isLight ? ' color-swatch--light' : ' color-swatch--dark'}`}
      style={{ backgroundColor: `var(${cssVar})` }}
      onClick={copy}
      title={`Copy ${cssVar}`}
    >
      <span className="color-swatch__step">{step ?? tokenName}</span>
      <span className="color-swatch__meta">
        <span className="color-swatch__token">{cssVar}</span>
        <span className="color-swatch__hex">{copied ? 'Copied' : hex}</span>
      </span>
    </button>
  )
}

function SemanticSwatch({ group, tokenName }) {
  const cssVar = tokenVar(tokenName)
  const { theme } = useTheme()
  const [hex, setHex] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHex(resolveToken(tokenName))
  }, [tokenName, theme])

  async function copy() {
    try {
      await navigator.clipboard.writeText(cssVar)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 900)
    } catch {
      setCopied(false)
    }
  }

  const label = tokenName.replace(`${group}-`, '').replace(/-/g, ' ')

  return (
    <button type="button" className="color-chip" onClick={copy} title={`Copy ${cssVar}`}>
      <span className="color-chip__themes" aria-hidden="true">
        <span
          className="color-chip__dot"
          data-theme="light"
          style={{ backgroundColor: `var(${cssVar})` }}
        />
        <span
          className="color-chip__dot"
          data-theme="dark"
          style={{ backgroundColor: `var(${cssVar})` }}
        />
      </span>
      <span className="color-chip__body">
        <span className="color-chip__name">{label}</span>
        <span className="color-chip__meta">{copied ? 'Copied' : hex || cssVar}</span>
      </span>
    </button>
  )
}

function ColorPrimitives() {
  return (
    <div className="color-scales">
      {COLOR_SCALES.map((scale) => (
        <section key={scale.name} className="color-scale" aria-label={scale.label}>
          <header className="color-scale__header">
            <h2>{scale.label}</h2>
            <code>color-{scale.name}-*</code>
          </header>
          <div className="color-scale__row">
            {COLOR_STEPS.map((step) => (
              <Swatch key={step} tokenName={`${scale.name}-${step}`} step={step} />
            ))}
          </div>
        </section>
      ))}
      <section className="color-scale" aria-label="Singles">
        <header className="color-scale__header">
          <h2>Singles</h2>
          <code>color-white · color-black</code>
        </header>
        <div className="color-scale__row color-scale__row--singles">
          {COLOR_SINGLES.map((item) => (
            <Swatch key={item.name} tokenName={item.name} />
          ))}
        </div>
      </section>
    </div>
  )
}

function ColorSemantics() {
  return (
    <div className="color-scales">
      {COLOR_SEMANTIC_GROUPS.map((group) => (
        <section key={group.id} className="color-scale" aria-label={group.label}>
          <header className="color-scale__header">
            <h2>{group.label}</h2>
            <code>color-{group.id}-*</code>
          </header>
          {group.subgroups ? (
            <div className="color-subgroups">
              {group.subgroups.map((subgroup) => (
                <div key={subgroup.label} className="color-subgroup">
                  <h3 className="color-subgroup__label">{subgroup.label}</h3>
                  <div className="color-chip-grid">
                    {subgroup.tokens.map((token) => (
                      <SemanticSwatch key={token} group={group.id} tokenName={token} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="color-chip-grid">
              {group.tokens.map((token) => (
                <SemanticSwatch key={token} group={group.id} tokenName={token} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export function ColorTokens() {
  return (
    <Tabs defaultValue="semantics" variant="line" size="sm">
      <TabsList aria-label="Color token layers">
        <TabsTrigger value="semantics">Semantics</TabsTrigger>
        <TabsTrigger value="primitives">Primitives</TabsTrigger>
      </TabsList>
      <TabsContent value="primitives">
        <ColorPrimitives />
      </TabsContent>
      <TabsContent value="semantics">
        <ColorSemantics />
      </TabsContent>
    </Tabs>
  )
}
