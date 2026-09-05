// AUTO-GENERATED from input.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Input } from './Input.jsx'

export default {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Capture a single line of text with optional label, hint, and validation error.\\n\\n**When to use**\\n\\n- Names, emails, search fields, short numeric values\\n- Forms that need inline validation messaging\\n\\n**When not to use**\\n\\n- Multi-line copy - use Textarea\\n- Choosing from known options - use Select or Radio\\n- On/off settings - use Switch\\n\\n**Accessibility**\\n\\n- Associate label with control\\n- Surface errors in accessible message text" } },
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
    "description": "Helper text when valid",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "error": {
    "control": false,
    "description": "Error message or invalid flag",
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
  "...native input attrs": {
    "control": false,
    "description": "value, onChange, placeholder, type, etc.",
    "table": {
      "type": {
        "summary": "HTMLAttributes"
      }
    }
  }
},
  args: {
  "size": "md",
  "disabled": false,
  "label": "Email",
  "placeholder": "you@company.com"
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
