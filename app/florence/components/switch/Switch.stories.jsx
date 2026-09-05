// AUTO-GENERATED from switch.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Switch } from './Switch.jsx'

export default {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Toggle a single immediate setting on or off.\\n\\n**When to use**\\n\\n- Feature flags\\n- Notification preferences\\n- Binary product settings\\n\\n**When not to use**\\n\\n- Submitting a form choice that needs review - use Checkbox\\n- Selecting one of many options - use Radio\\n- Triggering an action - use Button\\n\\n**Accessibility**\\n\\n- Exposes switch role / aria-checked via native or ARIA control\\n- Keyboard operable" } },
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
  "checked": {
    "control": "boolean",
    "description": "Controlled state",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "defaultChecked": {
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
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
  "disabled": false,
  "size": "md",
  "label": "Enable notifications"
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
