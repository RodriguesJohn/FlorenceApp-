// AUTO-GENERATED from textarea.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Textarea } from './Textarea.jsx'

export default {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Capture multi-line text with the same label / hint / error pattern as Input.\\n\\n**When to use**\\n\\n- Comments, notes, descriptions, longer form fields\\n\\n**When not to use**\\n\\n- Single-line values - use Input\\n- Structured choices - use Select\\n\\n**Accessibility**\\n\\n- Label linked to control\\n- Error/hint announced as description" } },
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
  "hint": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "error": {
    "control": false,
    "table": {
      "type": {
        "summary": "string|boolean"
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
  },
  "rows": {
    "control": "number",
    "table": {
      "type": {
        "summary": "number"
      }
    }
  }
},
  args: {
  "size": "md",
  "disabled": false,
  "label": "Notes",
  "placeholder": "Add context…"
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
