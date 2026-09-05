// AUTO-GENERATED from number-transition.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { NumberTransition } from './NumberTransition.jsx'

export default {
  title: 'Motion/NumberTransition',
  component: NumberTransition,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Animate numeric value changes digit-by-digit for metrics that update live.\\n\\n**When to use**\\n\\n- KPI heroes\\n- Live counters\\n- Dashboard metric refresh\\n\\n**When not to use**\\n\\n- Static copy\\n- Non-numeric status labels - use Tag/text\\n\\n**Accessibility**\\n\\n- Final value remains in the accessibility tree\\n- Motion should tone down under reduced-motion" } },
  },
  argTypes: {
  "value": {
    "control": false,
    "table": {
      "type": {
        "summary": "number|string"
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
  "label": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  }
},
  args: {
  "size": "md",
  "value": 2610
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
