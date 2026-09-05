// AUTO-GENERATED from calendar.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Calendar } from './Calendar.jsx'

export default {
  title: 'Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Pick a single date from a month grid with keyboard-friendly day navigation.\\n\\n**When to use**\\n\\n- Scheduling\\n- Filters by day\\n- Form date fields\\n\\n**When not to use**\\n\\n- Date ranges in v1 without extra composition\\n- Time-of-day - pair with a time control\\n\\n**Accessibility**\\n\\n- Days are buttons\\n- Month navigation labeled\\n- Selected day announced" } },
  },
  argTypes: {
  "value": {
    "control": false,
    "table": {
      "type": {
        "summary": "Date|null"
      }
    }
  },
  "defaultValue": {
    "control": false,
    "table": {
      "type": {
        "summary": "Date|null"
      },
      "defaultValue": {
        "summary": "null"
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
  "minDate": {
    "control": false,
    "table": {
      "type": {
        "summary": "Date"
      }
    }
  },
  "maxDate": {
    "control": false,
    "table": {
      "type": {
        "summary": "Date"
      }
    }
  }
},
  args: {
  "size": "md",
  "disabled": false
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
