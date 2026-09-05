// AUTO-GENERATED from chat-pattern.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { ChatPattern } from './ChatPattern.jsx'

export default {
  title: 'Agentic/ChatPattern',
  component: ChatPattern,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Full assistant conversation surface: header status, message thread, suggestions, composer, and optional menu.\\n\\n**When to use**\\n\\n- Product copilots\\n- Support / ops assistants beside a workspace\\n\\n**When not to use**\\n\\n- Simple confirmations - use Modal/Toast\\n- Non-conversational forms - use Input + Button\\n\\n**Accessibility**\\n\\n- Composer labeled\\n- Send disabled when empty\\n- Thinking state announced via status" } },
  },
  argTypes: {
  "title": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": "Assistant"
      }
    }
  },
  "status": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": "Ready"
      }
    }
  },
  "messages": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ id, role, content, timestamp? }[]"
      },
      "defaultValue": {
        "summary": ""
      }
    }
  },
  "suggestions": {
    "control": false,
    "table": {
      "type": {
        "summary": "string[]"
      }
    }
  },
  "placeholder": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "isThinking": {
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
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
  "value": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "defaultValue": {
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      },
      "defaultValue": {
        "summary": ""
      }
    }
  },
  "menuItems": {
    "control": false,
    "table": {
      "type": {
        "summary": "{ id, label, onSelect }[]"
      }
    }
  }
},
  args: {
  "title": "Workspace assistant",
  "status": "Online",
  "messages": [
    {
      "id": "1",
      "role": "user",
      "content": "Summarise the Q3 revenue shift."
    },
    {
      "id": "2",
      "role": "assistant",
      "content": "Revenue rose 12% quarter over quarter, driven mainly by the North region."
    }
  ],
  "disabled": false,
  "suggestions": [
    "Assign Final QA",
    "Draft the summary"
  ],
  "placeholder": "Ask anything…"
},
}

export const Playground = {}

