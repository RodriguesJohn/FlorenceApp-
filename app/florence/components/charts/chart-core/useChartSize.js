import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Measure the plot area in real pixels.
 *
 * Charts render at measured size rather than through a scaled viewBox: a
 * `preserveAspectRatio="none"` viewBox stretches strokes and text along with
 * the geometry, so a 2px line becomes 2×5px and labels distort. Measuring
 * keeps every mark spec literal at every container width.
 */
export function useChartSize(height) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    setWidth(node.clientWidth)

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, width, height }
}

/** Respect the user's reduced-motion setting for the draw-in animation. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
