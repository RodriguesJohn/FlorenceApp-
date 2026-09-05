// AUTO-GENERATED from line-chart.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { LineChart } from './LineChart.jsx'

export default {
  title: 'Data Display/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Show change over an ordered dimension (usually time), optionally with area fill.\\n\\n**When to use**\\n\\n- Weekly active users\\n- Multi-series trends\\n\\n**When not to use**\\n\\n- Unordered category compare - use BarChart\\n- Single snapshot share - use PieChart\\n\\n**Accessibility**\\n\\n- Point hit areas focusable\\n- Table twin via ChartFrame" } },
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
  "variant": {
    "control": "inline-radio",
    "options": [
      "area",
      "line"
    ],
    "table": {
      "type": {
        "summary": "area | line"
      },
      "defaultValue": {
        "summary": "area"
      }
    }
  }
},
  args: {
  "variant": "area",
  "title": "Revenue over time",
  "data": [
    {
      "label": "Jan",
      "value": 1200
    },
    {
      "label": "Feb",
      "value": 1680
    },
    {
      "label": "Mar",
      "value": 1450
    },
    {
      "label": "Apr",
      "value": 2100
    },
    {
      "label": "May",
      "value": 2480
    },
    {
      "label": "Jun",
      "value": 2610
    }
  ]
},
}

export const Playground = {}
export const Area = { args: { variant: "area" } }
export const Line = { args: { variant: "line" } }
