import { useEffect, useId, useRef, useState } from 'react'
import {
  ShaderFitOptions,
  ShaderMount,
  emptyPixel,
  getShaderColorFromString,
  liquidMetalFragmentShader,
  LiquidMetalShapes,
  defaultPatternSizing,
} from '@paper-design/shaders'

const SIZES = {
  sm: 'btn-liquid--sm',
  md: 'btn-liquid--md',
  lg: 'btn-liquid--lg',
}

const SPEED = {
  rest: 0.6,
  hover: 1,
  press: 2.4,
}

const RIPPLE_MS = 400
const PRESS_BURST_MS = 240

let emptyImagePromise

function loadEmptyImage() {
  if (!emptyImagePromise) {
    emptyImagePromise = new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = reject
      image.src = emptyPixel
    })
  }
  return emptyImagePromise
}

function tokenColor(tokenName, fallback) {
  const probe = document.createElement('span')
  probe.style.color = `var(${tokenName})`
  document.body.append(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()

  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return getShaderColorFromString(fallback)
  ctx.fillStyle = resolved || fallback
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255, a / 255]
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function LiquidMetalButton({
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  ...props
}) {
  const shaderRef = useRef(null)
  const shaderMount = useRef(null)
  const buttonRef = useRef(null)
  const hoverRef = useRef(false)
  const rippleSeed = useId()
  const rippleCount = useRef(0)
  const [ripples, setRipples] = useState([])
  const isInactive = disabled || loading

  useEffect(() => {
    const node = shaderRef.current
    if (!node) return undefined

    let cancelled = false

    const mount = async () => {
      try {
        const image = await loadEmptyImage()
        if (cancelled || !shaderRef.current) return

        shaderMount.current?.dispose()
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_colorBack: tokenColor('--color-overlay-scrim', 'rgb(0 0 0)'),
            u_colorTint: tokenColor('--color-brand-on-brand', 'rgb(255 255 255)'),
            u_image: image,
            u_isImage: false,
            u_shape: LiquidMetalShapes.none,
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_fit: ShaderFitOptions.cover,
            u_scale: 1,
            u_rotation: defaultPatternSizing.rotation,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
            u_originX: defaultPatternSizing.originX,
            u_originY: defaultPatternSizing.originY,
            u_worldWidth: defaultPatternSizing.worldWidth,
            u_worldHeight: defaultPatternSizing.worldHeight,
          },
          { alpha: true, premultipliedAlpha: true },
          prefersReducedMotion() ? 0 : SPEED.rest,
        )
      } catch (error) {
        console.error('Liquid metal button shader failed to mount', error)
      }
    }

    mount()

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotion = () => {
      shaderMount.current?.setSpeed(motionQuery.matches ? 0 : SPEED.rest)
    }
    motionQuery.addEventListener('change', handleMotion)

    return () => {
      cancelled = true
      motionQuery.removeEventListener('change', handleMotion)
      shaderMount.current?.dispose()
      shaderMount.current = null
    }
  }, [])

  function setShaderSpeed(next) {
    if (prefersReducedMotion()) {
      shaderMount.current?.setSpeed(0)
      return
    }
    shaderMount.current?.setSpeed(next)
  }

  function handleMouseEnter(event) {
    hoverRef.current = true
    setShaderSpeed(SPEED.hover)
    onMouseEnter?.(event)
  }

  function handleMouseLeave(event) {
    hoverRef.current = false
    setShaderSpeed(SPEED.rest)
    onMouseLeave?.(event)
  }

  function handleFocus(event) {
    setShaderSpeed(SPEED.hover)
    onFocus?.(event)
  }

  function handleBlur(event) {
    setShaderSpeed(hoverRef.current ? SPEED.hover : SPEED.rest)
    onBlur?.(event)
  }

  function handleClick(event) {
    if (isInactive) return

    setShaderSpeed(SPEED.press)
    window.setTimeout(() => {
      setShaderSpeed(hoverRef.current ? SPEED.hover : SPEED.rest)
    }, PRESS_BURST_MS)

    if (!prefersReducedMotion() && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const ripple = {
        id: `${rippleSeed}-${rippleCount.current++}`,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
      setRipples((current) => [...current, ripple])
      window.setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== ripple.id))
      }, RIPPLE_MS)
    }

    onClick?.(event)
  }

  const classes = [
    'btn-liquid',
    SIZES[size] ?? SIZES.md,
    loading ? 'btn-liquid--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes}>
      <button
        ref={buttonRef}
        type={type}
        className="btn-liquid__control"
        {...props}
        disabled={isInactive}
        aria-busy={loading || undefined}
        aria-disabled={isInactive || undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <span ref={shaderRef} className="btn-liquid__shader" aria-hidden="true" />
        <span className="btn-liquid__face" aria-hidden="true" />
        {loading ? <span className="btn__spinner" aria-hidden="true" /> : null}
        <span className="btn-liquid__label">{children}</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="btn-liquid__ripple"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        ))}
      </button>
    </span>
  )
}
