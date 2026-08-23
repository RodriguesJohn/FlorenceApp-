import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import demoStill from "./assets/demo-still.png";
import { SiteHeader } from "../SiteHeader.jsx";
import "./florence-website.css";

const MASTERCLASS_URL = '/design-systems'
const DEMO_URL = '/florence/system'
const GIANT_WORD = 'FLORENCE'
const ASCII_GLYPHS = '█▓▒░#@*+=-:/\\'

function GiantMark() {
  const [chars, setChars] = useState(GIANT_WORD.split(''))
  const [burst, setBurst] = useState(false)
  const scrambleRef = useRef(null)
  const burstRef = useRef(null)
  const loopRef = useRef(null)

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

    const kickoff = window.setTimeout(playBurst, 1600)
    loopRef.current = window.setInterval(playBurst, 5600)

    return () => {
      window.clearTimeout(kickoff)
      if (loopRef.current) window.clearInterval(loopRef.current)
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
          Rec
        </span>
        <span>Demo reel</span>
        <span>Still</span>
      </div>
      <div className="hero__reel-frame">
        <span className="hero__reel-rule hero__reel-rule--top" aria-hidden="true" />
        <span className="hero__reel-rule hero__reel-rule--end" aria-hidden="true" />
        <span className="hero__reel-rule hero__reel-rule--bottom" aria-hidden="true" />
        <span className="hero__reel-rule hero__reel-rule--start" aria-hidden="true" />
        <div className="hero__reel-stage">
          <img
            className="hero__video"
            src={demoStill}
            alt="Florence component gallery"
          />
          <ProgressiveBlur />
        </div>
      </div>
    </figure>
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
    <>
      <SiteHeader />
      <div className="hero">
      <div className="hero__bloom" aria-hidden="true" />
      <div className="hero__mast">
        <GiantMark />
      </div>

      <div className="hero__copy layout-container-md">
        <p className="hero__lede">
          <span className="hero__lede-line">
            Florence is an <SelectFrame>AI-ready design system</SelectFrame>.
          </span>
          <span className="hero__lede-line">
            So humans and agents ship on-brand product.
          </span>
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg hero__btn" href={DEMO_URL}>
            View the design system
            <Play aria-hidden="true" />
          </a>
          <a
            className="btn btn--secondary btn--lg hero__btn hero__btn--ghost"
            href={MASTERCLASS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the upcoming workshop
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <DemoReel />
      </div>
    </>
  )
}
