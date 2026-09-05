import { useEffect, useRef, useState } from 'react'
import { Ellipsis, Send, X } from 'lucide-react'
import { ThinkingAnimation } from '../../motion-components/thinking-animation/ThinkingAnimation.jsx'
import './chat-pattern.css'

function SendIcon() {
  return <Send aria-hidden="true" />
}

function ConfigIcon() {
  return <Ellipsis aria-hidden="true" />
}

function CloseIcon() {
  return <X aria-hidden="true" />
}

export function ChatPattern({
  title = 'Assistant',
  status = 'Ready',
  messages = [],
  suggestions = [],
  placeholder = 'Message the assistant…',
  emptyState = 'Start a conversation.',
  isThinking = false,
  disabled = false,
  value,
  defaultValue = '',
  onValueChange,
  onSend,
  onClose,
  closeLabel = 'Close chat',
  menuItems = [],
  menuLabel = 'Chat settings',
  className = '',
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [menuOpen, setMenuOpen] = useState(false)
  const messagesRef = useRef(null)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const draft = value ?? internalValue
  const classes = ['chat-pattern', className].filter(Boolean).join(' ')

  useEffect(() => {
    const messageLog = messagesRef.current
    if (!messageLog) return
    messageLog.scrollTop = messageLog.scrollHeight
  }, [isThinking, messages.length])

  useEffect(() => {
    if (!menuOpen) return undefined

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false)
    }

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  function updateDraft(nextValue) {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  function sendMessage(message = draft) {
    const nextMessage = message.trim()
    if (!nextMessage || disabled) return
    onSend?.(nextMessage)
    updateDraft('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage()
  }

  return (
    <section className={classes} aria-label={`${title} chat`} {...props}>
      <header className="chat-pattern__header">
        <span className="chat-pattern__identity">
          <span className="chat-pattern__title">{title}</span>
          {status ? (
            <span className="chat-pattern__status">
              <span className="chat-pattern__status-dot" aria-hidden="true" />
              {status}
            </span>
          ) : null}
        </span>
        <div className="chat-pattern__header-actions">
          {menuItems.length > 0 ? (
            <div ref={menuRef} className="chat-pattern__config">
              <button
                ref={menuButtonRef}
                type="button"
                className="chat-pattern__config-trigger"
                aria-label={menuLabel}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <ConfigIcon />
              </button>
              {menuOpen ? (
                <div
                  className="chat-pattern__config-menu"
                  role="menu"
                  aria-label={menuLabel}
                >
                  {menuItems.map((item) => (
                    <button
                      key={item.id ?? item.label}
                      type="button"
                      role="menuitem"
                      className={`chat-pattern__config-item ${
                        item.tone === 'danger'
                          ? 'chat-pattern__config-item--danger'
                          : ''
                      }`}
                      onClick={() => {
                        item.onSelect?.()
                        setMenuOpen(false)
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {onClose ? (
            <button
              type="button"
              className="chat-pattern__close"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>
      </header>

      <div
        ref={messagesRef}
        className="chat-pattern__messages"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        aria-busy={isThinking}
      >
        {messages.length === 0 && !isThinking ? (
          <p className="chat-pattern__empty">{emptyState}</p>
        ) : null}

        {messages.map((message, index) => {
          const isUser = message.role === 'user'

          return (
            <article
              key={message.id ?? index}
              className={`chat-pattern__message ${
                isUser
                  ? 'chat-pattern__message--user'
                  : 'chat-pattern__message--assistant'
              }`}
            >
              <div className="chat-pattern__message-content">
                <div className="chat-pattern__bubble">{message.content}</div>
                {message.timestamp ? (
                  <span className="chat-pattern__timestamp">
                    {message.timestamp}
                  </span>
                ) : null}
              </div>
            </article>
          )
        })}

        {isThinking ? (
          <div className="chat-pattern__message chat-pattern__message--assistant">
            <div className="chat-pattern__thinking">
              <ThinkingAnimation label="Thinking" size="md" />
            </div>
          </div>
        ) : null}
      </div>

      {suggestions.length > 0 ? (
        <div className="chat-pattern__suggestions" aria-label="Suggested prompts">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="chat-pattern__suggestion"
              disabled={disabled}
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <form className="chat-pattern__composer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-pattern__input"
          value={draft}
          placeholder={placeholder}
          aria-label={placeholder}
          disabled={disabled}
          onChange={(event) => updateDraft(event.target.value)}
        />
        <button
          type="submit"
          className="chat-pattern__send"
          aria-label="Send message"
          disabled={disabled || !draft.trim()}
        >
          <SendIcon />
        </button>
      </form>
    </section>
  )
}
