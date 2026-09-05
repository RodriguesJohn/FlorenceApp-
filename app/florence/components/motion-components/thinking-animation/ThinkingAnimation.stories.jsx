// AUTO-GENERATED from thinking-animation.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { ThinkingAnimation } from './ThinkingAnimation.jsx'

export default {
  title: 'Motion/ThinkingAnimation',
  component: ThinkingAnimation,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Calm processing indicator while an agent or system is working.\\n\\n**When to use**\\n\\n- Assistant thinking states\\n- Short indeterminate waits tied to AI\\n\\n**When not to use**\\n\\n- Full-page loads of unknown length - prefer LoadingAnimation\\n- Content placeholders - prefer ShimmerText or skeletons\\n\\n**Accessibility**\\n\\n- Provide live status text via label\\n- Honor reduced motion" } },
  },
  argTypes: {
  "label": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": "Thinking"
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
  "label": "Thinking",
  "size": "md"
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
