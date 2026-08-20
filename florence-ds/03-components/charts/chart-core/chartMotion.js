import { useReducedMotion } from 'motion/react'

/**
 * Shared motion presets for chart hover.
 *
 * Position uses a long ease-out tween - springs feel jerky when scrubbing
 * between discrete samples. Opacity uses slightly slower fades so dimming
 * and tooltips feel calm, not snappy.
 */
export function useChartMotion() {
  const reduced = useReducedMotion()

  if (reduced) {
    return {
      reduced: true,
      follow: { duration: 0 },
      reveal: { duration: 0 },
      hide: { duration: 0 },
      dim: { duration: 0 },
      hoverScale: { duration: 0 },
      hoverGlow: { duration: 0 },
      dimmedOpacity: 0.45,
      pieHoverScale: 1,
    }
  }

  const smoothEase = [0.22, 1, 0.36, 1]

  return {
    reduced: false,
    follow: { duration: 0.55, ease: smoothEase },
    reveal: { duration: 0.38, ease: smoothEase },
    hide: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    dim: { duration: 0.48, ease: smoothEase },
    hoverScale: { duration: 0.68, ease: smoothEase },
    hoverGlow: { duration: 0.72, ease: smoothEase },
    dimmedOpacity: 0.45,
    pieHoverScale: 1.015,
  }
}
