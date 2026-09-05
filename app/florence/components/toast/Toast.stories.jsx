// AUTO-GENERATED from toast.json — edit the spec, then rerun:
//   node .storybook/generator/generate-stories.mjs
import { Toast } from './Toast.jsx'

export default {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Confirm an outcome or surface a short transient system message.\\n\\n**When to use**\\n\\n- Save succeeded\\n- Background job status\\n- Non-blocking errors\\n\\n**When not to use**\\n\\n- Blocking decisions - use Modal\\n- Permanent page status - use inline alert / insight\\n\\n**Accessibility**\\n\\n- Closable with explicit control\\n- Status conveyed by copy + tone, not color alone" } },
  },
  argTypes: {
  "open": {
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      },
      "defaultValue": {
        "summary": "true"
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
  "status": {
    "control": "select",
    "options": [
      "default",
      "success",
      "warning",
      "danger",
      "info"
    ],
    "table": {
      "type": {
        "summary": "default | success | warning | danger | info"
      },
      "defaultValue": {
        "summary": "default"
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
  "open": true,
  "status": "default",
  "size": "md",
  "title": "Changes saved",
  "description": "Your workspace is up to date."
},
}

export const Playground = {}
export const Default = { args: { status: "default" } }
export const Success = { args: { status: "success" } }
export const Warning = { args: { status: "warning" } }
export const Danger = { args: { status: "danger" } }
export const Info = { args: { status: "info" } }
