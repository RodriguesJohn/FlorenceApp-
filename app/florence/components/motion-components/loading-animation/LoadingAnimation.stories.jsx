// AUTO-GENERATED from loading-animation.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { LoadingAnimation } from './LoadingAnimation.jsx'

export default {
  title: 'Motion/LoadingAnimation',
  component: LoadingAnimation,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Indeterminate loading mark for surfaces fetching data.\\n\\n**When to use**\\n\\n- Chart body loading\\n- Panel refresh\\n- Empty canvas waiting on data\\n\\n**When not to use**\\n\\n- Agent cognition cue - ThinkingAnimation\\n- Text-only waiting - ShimmerText\\n\\n**Accessibility**\\n\\n- Accessible label for the loading state\\n- Respect reduced motion" } },
  },
  argTypes: {
  "label": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": "Loading"
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
  "variant": {
    "control": "inline-radio",
    "options": [
      "grid",
      "dots"
    ],
    "table": {
      "type": {
        "summary": "grid | dots"
      },
      "defaultValue": {
        "summary": "grid"
      }
    }
  }
},
  args: {
  "label": "Loading",
  "size": "md",
  "variant": "grid"
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
