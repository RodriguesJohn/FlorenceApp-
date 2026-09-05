// AUTO-GENERATED from select.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Select } from './Select.jsx'

export default {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Pick one value from a list of predefined options when radios would overwhelm the layout.\\n\\n**When to use**\\n\\n- Medium-to-long option lists\\n- Filters and form fields with known values\\n\\n**When not to use**\\n\\n- Free text - use Input\\n- Very short lists (2-4) that deserve permanence - consider Radio\\n\\n**Accessibility**\\n\\n- Keyboard open/navigate/select\\n- Announced label and invalid state" } },
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
  "options": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ value: string, label: string }[]"
      }
    }
  },
  "placeholder": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": "Select an option"
      }
    }
  },
  "value": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "defaultValue": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": ""
      }
    }
  }
},
  args: {
  "size": "md",
  "disabled": false,
  "placeholder": "Select an option",
  "options": [
    {
      "value": "north",
      "label": "North"
    },
    {
      "value": "south",
      "label": "South"
    },
    {
      "value": "east",
      "label": "East"
    }
  ]
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
