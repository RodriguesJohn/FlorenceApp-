// AUTO-GENERATED from tag.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Tag } from './Tag.jsx'

export default {
  title: 'Feedback/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Label status, category, or metadata with a compact tone-colored chip.\\n\\n**When to use**\\n\\n- Status in tables\\n- Filter chips\\n- Lightweight categorical labels\\n\\n**When not to use**\\n\\n- Primary actions - use Button\\n- Long paragraphs of meaning - use text + insight card\\n\\n**Accessibility**\\n\\n- Remove button needs accessible name via removeLabel or children" } },
  },
  argTypes: {
  "children": {
    "control": "text",
    "table": {
      "type": {
        "summary": "ReactNode"
      }
    }
  },
  "tone": {
    "control": "select",
    "options": [
      "neutral",
      "brand",
      "success",
      "warning",
      "danger",
      "info"
    ],
    "table": {
      "type": {
        "summary": "neutral | brand | success | warning | danger | info"
      },
      "defaultValue": {
        "summary": "neutral"
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
  "removeLabel": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "disabled": {
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      },
      "defaultValue": {
        "summary": "false"
      }
    }
  }
},
  args: {
  "tone": "neutral",
  "size": "md",
  "disabled": false,
  "children": "Active"
},
}

export const Playground = {}
export const Neutral = { args: { tone: "neutral" } }
export const Brand = { args: { tone: "brand" } }
export const Success = { args: { tone: "success" } }
export const Warning = { args: { tone: "warning" } }
export const Danger = { args: { tone: "danger" } }
export const Info = { args: { tone: "info" } }
