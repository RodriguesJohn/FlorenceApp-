// AUTO-GENERATED from shimmer-text.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { ShimmerText } from './ShimmerText.jsx'

export default {
  title: 'Motion/ShimmerText',
  component: ShimmerText,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Animate text as a soft progress cue while work is in flight.\\n\\n**When to use**\\n\\n- “Working…” / generating copy lines\\n- Inline agent status beside other UI\\n\\n**When not to use**\\n\\n- Numeric KPI ticks - use NumberTransition\\n- Blocking loaders - use LoadingAnimation\\n\\n**Accessibility**\\n\\n- Text remains readable; shimmer is decorative enhancement" } },
  },
  argTypes: {
  "children": {
    "control": "text",
    "table": {
      "type": {
        "summary": "ReactNode"
      },
      "defaultValue": {
        "summary": "Working…"
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
  "children": "Thinking through your request",
  "size": "md"
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
