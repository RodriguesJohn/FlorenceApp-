// AUTO-GENERATED from insight-card.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { InsightCard } from './InsightCard.jsx'

export default {
  title: 'Data Display/InsightCard',
  component: InsightCard,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Surface a recommended action or observation with tone, copy, and optional CTAs.\\n\\n**When to use**\\n\\n- AI or analytics recommendations\\n- Risk / opportunity callouts\\n\\n**When not to use**\\n\\n- Raw metrics without narrative - use KpiCard\\n- System toasts - use Toast\\n\\n**Accessibility**\\n\\n- Actions are real buttons\\n- Dismiss control needs accessible name" } },
  },
  argTypes: {
  "title": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "description": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "tone": {
    "control": "select",
    "options": [
      "opportunity",
      "risk",
      "info",
      "success"
    ],
    "table": {
      "type": {
        "summary": "opportunity | risk | info | success"
      },
      "defaultValue": {
        "summary": "opportunity"
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
  },
  "primaryAction": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ label: string, onClick: () => void }"
      }
    }
  },
  "secondaryAction": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ label: string, onClick: () => void }"
      }
    }
  }
},
  args: {
  "tone": "opportunity",
  "size": "md",
  "title": "Revenue is up 12%",
  "body": "Growth driven by the North region."
},
}

export const Playground = {}
export const Opportunity = { args: { tone: "opportunity" } }
export const Risk = { args: { tone: "risk" } }
export const Info = { args: { tone: "info" } }
export const Success = { args: { tone: "success" } }
