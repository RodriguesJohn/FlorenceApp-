// AUTO-GENERATED from data-table.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { DataTable } from './DataTable.jsx'

export default {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Present structured rows with optional search, filters, selection, and column visibility.\\n\\n**When to use**\\n\\n- Operational datasets\\n- Admin lists\\n- Task backlogs\\n\\n**When not to use**\\n\\n- Simple key/value details - use definition list or cards\\n- Heavy analytics pivots - use charts + specialized grids\\n\\n**Accessibility**\\n\\n- Caption optional\\n- Selection checkboxes labeled\\n- Empty state in table body" } },
  },
  argTypes: {
  "columns": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ key, header, type?, render?, align? }[]"
      }
    }
  },
  "rows": {
    "control": false,
    "table": {
      "type": {
        "summary": "object[]"
      }
    }
  },
  "caption": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "emptyMessage": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": "No data available."
      }
    }
  },
  "filteredEmptyMessage": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
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
  "selectable": {
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
  "toolbar": {
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
  "searchPlaceholder": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "searchKeys": {
    "control": false,
    "table": {
      "type": {
        "summary": "string[]"
      }
    }
  },
  "filters": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ key, label, options? }[]"
      }
    }
  },
  "columnSettings": {
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      },
      "defaultValue": {
        "summary": "true"
      }
    }
  }
},
  args: {
  "emptyMessage": "No data available.",
  "size": "md",
  "selectable": false,
  "toolbar": false,
  "columnSettings": true,
  "columns": [
    {
      "key": "region",
      "header": "Region"
    },
    {
      "key": "revenue",
      "header": "Revenue",
      "type": "number",
      "align": "right"
    },
    {
      "key": "owner",
      "header": "Owner"
    }
  ],
  "rows": [
    {
      "region": "North",
      "revenue": 2610,
      "owner": "A. Chen"
    },
    {
      "region": "South",
      "revenue": 1840,
      "owner": "M. Diaz"
    },
    {
      "region": "East",
      "revenue": 2210,
      "owner": "R. Okafor"
    }
  ]
},
}

export const Playground = {}
export const Sm = { args: { size: "sm" } }
export const Md = { args: { size: "md" } }
export const Lg = { args: { size: "lg" } }
