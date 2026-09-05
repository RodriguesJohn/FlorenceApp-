// AUTO-GENERATED from timeline.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Timeline } from './Timeline.jsx'

export default {
  title: 'Navigation/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Show a vertical sequence of phases - what is current, what is next, and what is later - without implying a chart or a table.\\n\\n**When to use**\\n\\n- Product roadmaps and shipping plans\\n- Onboarding or process steps where order matters more than dates\\n- Status of a multi-stage workflow at a glance\\n\\n**When not to use**\\n\\n- Comparing magnitudes - use BarChart\\n- Change over time with values - use LineChart\\n- A single metric - use KpiCard\\n- Switching peer views - use Tabs\\n\\n**Accessibility**\\n\\n- Rendered as an ordered list\\n- label becomes aria-label on the list\\n- Rail is aria-hidden; meaning lives in phase, title, and body\\n- headingLevel keeps titles in the document outline" } },
  },
  argTypes: {
  "items": {
    "control": false,
    "description": "Ordered steps. status paints the rail: filled now, hollow next, muted later.",
    "table": {
      "type": {
        "summary": "{ id?: string, status: 'now' | 'next' | 'later', phase?: string, title: string, body?: string }[]"
      }
    }
  },
  "label": {
    "control": "text",
    "description": "Accessible name for the list",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "headingLevel": {
    "control": "inline-radio",
    "options": [
      2,
      3,
      4
    ],
    "description": "Heading level for step titles so the page outline stays honest",
    "table": {
      "type": {
        "summary": "2 | 3 | 4"
      },
      "defaultValue": {
        "summary": "3"
      }
    }
  }
},
  args: {
  "headingLevel": 3,
  "items": [
    {
      "id": "1",
      "status": "now",
      "phase": "Phase 1",
      "title": "Foundations",
      "body": "Tokens and primitives."
    },
    {
      "id": "2",
      "status": "next",
      "phase": "Phase 2",
      "title": "Components",
      "body": "Core library build-out."
    },
    {
      "id": "3",
      "status": "later",
      "phase": "Phase 3",
      "title": "Patterns",
      "body": "Agentic UI patterns."
    }
  ]
},
}

export const Playground = {}

