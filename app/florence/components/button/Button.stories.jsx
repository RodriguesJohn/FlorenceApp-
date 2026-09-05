// AUTO-GENERATED from button.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Button } from './Button.jsx'

export default {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Trigger a single action with clear visual hierarchy. One primary path per view; quieter variants for secondary work.\\n\\n**When to use**\\n\\n- Primary CTA on a screen or dialog\\n- Form submit and destructive confirms (danger)\\n- Toolbar or empty-state actions (secondary / tertiary)\\n\\n**When not to use**\\n\\n- In-page navigation - use a link\\n- Binary on/off settings - use Switch\\n- Choosing one of many options - use Radio or Select\\n\\n**Accessibility**\\n\\n- Native `<button>` — keyboard (Enter/Space), implicit button role, form submit support\\n- Visible label in children, or aria-label when icon-only — never an unnamed icon control\\n- :focus-visible ring via --color-focus-ring and --border-focus (keyboard only, not mouse click)\\n- disabled and loading set aria-disabled, remove pointer events, and use --opacity-disabled\\n- loading sets aria-busy and shows a decorative spinner marked aria-hidden\\n- Decorative icons inside the label should use aria-hidden=\"true\"\\n- prefers-reduced-motion: reduce removes scale feedback and spinner rotation" } },
  },
  argTypes: {
  "variant": {
    "control": "select",
    "options": [
      "primary",
      "secondary",
      "tertiary",
      "danger"
    ],
    "description": "Visual hierarchy and emphasis",
    "table": {
      "type": {
        "summary": "primary | secondary | tertiary | danger"
      },
      "defaultValue": {
        "summary": "primary"
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
    "description": "Control density",
    "table": {
      "type": {
        "summary": "sm | md | lg"
      },
      "defaultValue": {
        "summary": "md"
      }
    }
  },
  "type": {
    "control": "inline-radio",
    "options": [
      "button",
      "submit",
      "reset"
    ],
    "table": {
      "type": {
        "summary": "button | submit | reset"
      },
      "defaultValue": {
        "summary": "button"
      }
    }
  },
  "disabled": {
    "control": "boolean",
    "description": "Removes the control from interaction",
    "table": {
      "type": {
        "summary": "boolean"
      },
      "defaultValue": {
        "summary": "false"
      }
    }
  },
  "loading": {
    "control": "boolean",
    "description": "Shows a spinner, sets aria-busy, and blocks activation",
    "table": {
      "type": {
        "summary": "boolean"
      },
      "defaultValue": {
        "summary": "false"
      }
    }
  },
  "children": {
    "control": "text",
    "description": "Visible label. Icon-only buttons still need aria-label on the element.",
    "table": {
      "type": {
        "summary": "ReactNode"
      }
    }
  },
  "aria-label": {
    "control": "text",
    "description": "Required when children are icon-only",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  }
},
  args: {
  "variant": "primary",
  "size": "md",
  "type": "button",
  "disabled": false,
  "loading": false,
  "children": "Save changes"
},
}

export const Playground = {}
export const Primary = { args: { variant: "primary" } }
export const Secondary = { args: { variant: "secondary" } }
export const Tertiary = { args: { variant: "tertiary" } }
export const Danger = { args: { variant: "danger" } }
