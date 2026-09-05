// AUTO-GENERATED from bar-chart.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { BarChart } from './BarChart.jsx'

export default {
  title: 'Data Display/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Compare magnitudes across categories with vertical or horizontal bars.\\n\\n**When to use**\\n\\n- Region / plan / owner comparisons\\n- Ranking discrete categories\\n\\n**When not to use**\\n\\n- Part-to-whole only - PieChart may suffice\\n- Continuous time series - prefer LineChart\\n\\n**Accessibility**\\n\\n- Hit targets keyboard focusable\\n- Table twin through ChartFrame" } },
  },
  argTypes: {
  "data": {
    "control": false,
    "description": "Single-series shorthand",
    "table": {
      "type": {
        "summary": "{ label: string, value: number }[]"
      }
    }
  },
  "series": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ label: string, data: number[] }[]"
      }
    }
  },
  "categories": {
    "control": false,
    "table": {
      "type": {
        "summary": "string[]"
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
  "orientation": {
    "control": "inline-radio",
    "options": [
      "vertical",
      "horizontal"
    ],
    "table": {
      "type": {
        "summary": "vertical | horizontal"
      },
      "defaultValue": {
        "summary": "vertical"
      }
    }
  }
},
  args: {
  "orientation": "vertical",
  "title": "Revenue by region",
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
export const Vertical = { args: { orientation: "vertical" } }
export const Horizontal = { args: { orientation: "horizontal" } }
