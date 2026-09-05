// AUTO-GENERATED from pie-chart.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { PieChart } from './PieChart.jsx'

export default {
  title: 'Data Display/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Show part-to-whole share for a small set of segments (max six; fold the rest into Other).\\n\\n**When to use**\\n\\n- Status mix\\n- Category share where ranking angles is acceptable\\n\\n**When not to use**\\n\\n- Close values that need ranking - use BarChart\\n- Trends over time - use LineChart\\n- More than six meaningful slices without aggregation\\n\\n**Accessibility**\\n\\n- Segments focusable\\n- Table twin via ChartFrame\\n- Values not hover-only" } },
  },
  argTypes: {
  "data": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ label: string, value: number }[]"
      }
    }
  },
  "title": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "description": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "variant": {
    "control": "inline-radio",
    "options": [
      "donut",
      "pie"
    ],
    "table": {
      "type": {
        "summary": "donut | pie"
      },
      "defaultValue": {
        "summary": "donut"
      }
    }
  },
  "layout": {
    "control": "inline-radio",
    "options": [
      "split",
      "stack"
    ],
    "table": {
      "type": {
        "summary": "split | stack"
      },
      "defaultValue": {
        "summary": "split"
      }
    }
  },
  "size": {
    "control": "number",
    "table": {
      "type": {
        "summary": "number"
      },
      "defaultValue": {
        "summary": "240"
      }
    }
  }
},
  args: {
  "variant": "donut",
  "layout": "split",
  "size": 240,
  "title": "Share by region",
  "data": [
    {
      "label": "North",
      "value": 2610
    },
    {
      "label": "South",
      "value": 1840
    },
    {
      "label": "East",
      "value": 2210
    },
    {
      "label": "West",
      "value": 1490
    }
  ]
},
}

export const Playground = {}
export const Donut = { args: { variant: "donut" } }
export const Pie = { args: { variant: "pie" } }
