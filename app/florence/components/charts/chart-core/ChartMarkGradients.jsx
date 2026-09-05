/**
 * SVG gradient defs for chart marks.
 *
 * Each entry gets a light→deep linear fill. Orientation matches the mark:
 * vertical bars / pies fade top→bottom; horizontal bars fade left→right;
 * area fills fade into the baseline.
 */
export function ChartMarkGradients({
  id,
  marks = [],
  orientation = 'vertical',
}) {
  if (!marks.length) return null

  const isHorizontal = orientation === 'horizontal'
  const isArea = orientation === 'area'

  return (
    <defs>
      {marks.map((mark) => {
        const key = mark.key
        const from = mark.from ?? mark.color
        const to = mark.to ?? mark.color

        if (isArea) {
          return (
            <linearGradient
              key={key}
              id={`${id}-mark-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={from} stopOpacity="0.34" />
              <stop offset="55%" stopColor={to} stopOpacity="0.12" />
              <stop offset="100%" stopColor={to} stopOpacity="0" />
            </linearGradient>
          )
        }

        return (
          <linearGradient
            key={key}
            id={`${id}-mark-${key}`}
            x1={isHorizontal ? '0' : '0'}
            y1={isHorizontal ? '0' : '0'}
            x2={isHorizontal ? '1' : '0'}
            y2={isHorizontal ? '0' : '1'}
          >
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        )
      })}
    </defs>
  )
}
