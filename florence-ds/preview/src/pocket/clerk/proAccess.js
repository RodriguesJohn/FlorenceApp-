const PRO_COMPONENT_IDS = new Set([
  'calendar',
  'chat-pattern',
  'data-table',
  'insight-card',
  'kpi-card',
  'line-chart',
  'bar-chart',
  'pie-chart',
  'loading-animation',
  'number-transition',
  'shimmer-text',
  'sidebar',
  'thinking-animation',
  'timeline',
])

export function isProComponent(componentId) {
  return PRO_COMPONENT_IDS.has(componentId)
}
