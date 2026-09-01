import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { SiteHeader } from "../SiteHeader.jsx";
import { Entrance, EntranceItem, entranceViewport } from "../entrance.jsx";
import { FlorenceVisitors } from "./FlorenceVisitors.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { startFlorenceCheckout } from "./stripeCheckout.js";
import "./florence-website.css";

const DEMO_VIDEO_SRC = "/florence/F2.mp4";

const DEMO_URL = '/florence/system'
const BOOKING_URL = 'https://cal.com/john-rodrigues-rqt2lg/15min'
const NEWSLETTER_URL = 'https://substack.com/@johnrodrigues'
const GIANT_WORD = 'FLORENCE'
const ASCII_GLYPHS = '█▓▒░#@*+=-:/\\'

const CODING_AGENTS = [
  { id: 'cursor', name: 'Cursor', logo: '/logos/cursor.png' },
  { id: 'claude-code', name: 'Claude Code', logo: '/logos/claude-code.png' },
  { id: 'codex', name: 'Codex', logo: '/logos/codex.png' },
]

function GiantMark() {
  const [chars, setChars] = useState(GIANT_WORD.split(''))
  const [burst, setBurst] = useState(false)
  const scrambleRef = useRef(null)
  const burstRef = useRef(null)

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function stopScramble(restore = true) {
    if (scrambleRef.current) {
      window.clearInterval(scrambleRef.current)
      scrambleRef.current = null
    }
    if (restore) setChars(GIANT_WORD.split(''))
  }

  function scramble() {
    stopScramble(false)
    let ticks = 0
    scrambleRef.current = window.setInterval(() => {
      ticks += 1
      setChars(
        GIANT_WORD.split('').map((letter) => {
          if (ticks > 10 && Math.random() > 0.35) return letter
          return ASCII_GLYPHS[Math.floor(Math.random() * ASCII_GLYPHS.length)]
        }),
      )
      if (ticks > 14) stopScramble(true)
    }, 45)
  }

  function playBurst() {
    if (prefersReducedMotion()) return
    scramble()
    setBurst(true)
    if (burstRef.current) window.clearTimeout(burstRef.current)
    burstRef.current = window.setTimeout(() => setBurst(false), 1400)
  }

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const kickoff = window.setTimeout(playBurst, 2200)

    return () => {
      window.clearTimeout(kickoff)
      if (burstRef.current) window.clearTimeout(burstRef.current)
      stopScramble(false)
    }
  }, [])

  const mid = (GIANT_WORD.length - 1) / 2

  return (
    <p
      className={['hero__giant', burst ? 'hero__giant--burst' : '']
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
      onMouseEnter={playBurst}
    >
      <span className="hero__giant-bloom">{GIANT_WORD}</span>
      <span className="hero__giant-fill">
        {chars.map((char, index) => (
          <span
            key={`${GIANT_WORD[index]}-${index}`}
            className="hero__giant-letter"
            data-char={char}
            style={{
              '--i': index,
              '--spread': index - mid,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </p>
  )
}

function SelectFrame({ children }) {
  return (
    <span className="hero__select">
      <span className="hero__select-box" aria-hidden="true">
        <span className="hero__select-corner hero__select-corner--tl" />
        <span className="hero__select-corner hero__select-corner--tr" />
        <span className="hero__select-corner hero__select-corner--bl" />
        <span className="hero__select-corner hero__select-corner--br" />
      </span>
      {children}
    </span>
  )
}

function ProgressiveBlur({ steps = 4 }) {
  return (
    <div className="hero__progressive" aria-hidden="true">
      {Array.from({ length: steps }, (_, index) => (
        <span
          key={index}
          className="hero__progressive-band"
          style={{
            '--i': index + 1,
            '--steps': steps,
          }}
        />
      ))}
    </div>
  )
}

function DemoReel() {
  return (
    <figure className="hero__reel layout-container-lg">
      <div className="hero__reel-chrome">
        <span className="hero__reel-rec">
          <span className="hero__reel-dot" />
          Agent Ready
        </span>
        <span>For Humans</span>
        <span>Ship fast</span>
      </div>
      <div className="hero__reel-frame">
        <span className="hero__reel-rule hero__reel-rule--top" aria-hidden="true" />
        <span className="hero__reel-rule hero__reel-rule--end" aria-hidden="true" />
        <span className="hero__reel-rule hero__reel-rule--bottom" aria-hidden="true" />
        <span className="hero__reel-rule hero__reel-rule--start" aria-hidden="true" />
        <div className="hero__reel-stage">
          <video
            className="hero__video"
            src={DEMO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Florence demo reel"
          />
          <ProgressiveBlur />
        </div>
      </div>
    </figure>
  )
}

function FlorenceFooter() {
  return (
    <div className="current-home">
      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <Entrance className="footer-brand">
            <EntranceItem as="a" className="brand" href="/#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </EntranceItem>
            <EntranceItem as="p">
              AI product studio for design systems, agents, and AI-native workflows.
            </EntranceItem>
          </Entrance>

          <Entrance className="footer-column">
            <EntranceItem as="p">Contact</EntranceItem>
            <EntranceItem as="a" href={NEWSLETTER_URL} target="_blank" rel="noreferrer">
              Publication
            </EntranceItem>
            <EntranceItem as="a" href="mailto:john@humanaistudio.ai">
              john@humanaistudio.ai
            </EntranceItem>
            <EntranceItem as="address" className="footer-address">
              Human AI Studio<br />
              455 Market St Ste 1940<br />
              PMB 769150<br />
              San Francisco, California 94105-2448 US
            </EntranceItem>
            <EntranceItem as="a" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book a call
            </EntranceItem>
          </Entrance>
        </div>
        <EntranceItem
          as="div"
          className="footer-wordmark"
          aria-hidden="true"
          initial={false}
          whileInView="visible"
          viewport={entranceViewport}
        >
          Human AI Studio
        </EntranceItem>
      </footer>
    </div>
  )
}

export default function FlorenceWebsite() {
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", "dark");
    const prevHtml = html.style.background;
    const prevBody = document.body.style.background;
    html.style.background = "#050506";
    document.body.style.background = "#050506";
    return () => {
      html.style.background = prevHtml;
      document.body.style.background = prevBody;
    };
  }, []);

  return (
    <div className="florence-site">
      <SiteHeader />
      <main className="florence-main">
      <section className="hero" aria-label="Florence">
      <div className="hero__bloom" aria-hidden="true" />
      <div className="hero__mast">
        <FlorenceVisitors />
        <GiantMark />
      </div>

      <div className="hero__copy layout-container-md">
        <p className="hero__lede">
          Florence is an <SelectFrame>AI-ready design system</SelectFrame>{' '}
          for humans and agents so you can ship fast without shipping AI slop.
          Copy and paste into{' '}
          {CODING_AGENTS.map((agent, index) => {
            const last = index === CODING_AGENTS.length - 1
            return (
              <span key={agent.id} className="hero__inline-agent">
                {index > 0 && (last ? ' or ' : ', ')}
                <img
                  src={agent.logo}
                  alt=""
                  width={18}
                  height={18}
                  decoding="async"
                />
                {agent.name}
              </span>
            )
          })}
          .
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg hero__btn" href={DEMO_URL}>
            Browse all components
            <Play aria-hidden="true" />
          </a>
          <button
            type="button"
            className="btn btn--secondary btn--lg hero__btn hero__btn--ghost"
            onClick={() => startFlorenceCheckout()}
          >
            Upgrade to Pro
            <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <DemoReel />
      </section>

      <Pricing
        demoUrl={DEMO_URL}
        onUpgradeToPro={() => startFlorenceCheckout()}
      />
      </main>
      <FlorenceFooter />
    </div>
  )
}
