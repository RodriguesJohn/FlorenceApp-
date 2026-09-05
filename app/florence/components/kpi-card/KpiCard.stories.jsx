// AUTO-GENERATED from kpi-card.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { KpiCard } from './KpiCard.jsx'

export default {
  title: 'Data Display/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Highlight one metric with label, value, optional delta/trend, and supporting hint.\\n\\n**When to use**\\n\\n- Dashboard metric rows\\n- Executive summaries\\n- Single-number health signals\\n\\n**When not to use**\\n\\n- Multi-series comparison - use charts\\n- Narrative recommendations - use InsightCard\\n\\n**Accessibility**\\n\\n- Prefer article semantics; interactive cards need keyboard activation" } },
  },
  argTypes: {
  "label": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "value": {
    "control": "text",
    "table": {
      "type": {
        "summary": "ReactNode"
      }
    }
  },
  "delta": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "trend": {
    "control": "inline-radio",
    "options": [
      "up",
      "down",
      "neutral"
    ],
    "table": {
      "type": {
        "summary": "up | down | neutral"
      }
    }
  },
  "hint": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "size": {
    "control": "inline-radio",
    "options": [
      "sm",
      "md",
      "lg"
    ],
    "table": {
      "type": {
        "summary": "sm | md | lg"
      },
      "defaultValue": {
        "summary": "md"
      }
    }
  }
},
  args: {
  "size": "md",
  "label": "Monthly revenue",
  "value": "$48,120"
},
}

export const Playground = {}
export const Up = { args: { trend: "up" } }
export const Down = { args: { trend: "down" } }
export const Neutral = { args: { trend: "neutral" } }
