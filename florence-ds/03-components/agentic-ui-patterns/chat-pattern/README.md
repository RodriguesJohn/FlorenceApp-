# Chat Pattern

An accessible, reusable conversation surface for agentic experiences. It
includes assistant and user messages, suggested prompts, a thinking state, and
a keyboard-friendly composer.

```jsx
import { ChatPattern } from './ChatPattern.jsx'

<ChatPattern
  title="Workspace assistant"
  messages={[
    {
      id: 'welcome',
      role: 'assistant',
      content: 'How can I help with your workspace?',
    },
  ]}
  suggestions={['Summarize updates', 'Draft a reply']}
  menuItems={[
    { id: 'new', label: 'New conversation', onSelect: startNewConversation },
    { id: 'clear', label: 'Clear messages', onSelect: clearMessages },
  ]}
  onSend={(message) => console.log(message)}
/>
```

Press Enter to send.
