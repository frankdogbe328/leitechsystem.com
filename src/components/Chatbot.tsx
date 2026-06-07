import { useState, useRef, useEffect } from 'react'
import { X, Send, ChevronDown } from 'lucide-react'

type Msg = { id: number; from: 'bot' | 'user'; text: string }
type HistoryMsg = { role: 'user' | 'assistant'; content: string }

const defaultQr = ['Solar Pricing', 'Book a Site Visit', 'System for My Home', 'Contact / Call Us']

// ── Markdown-like bold renderer ───────────────────────────────────────────────
function renderText(text: string) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    )
  })
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '10px 14px', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#F59E0B',
            display: 'inline-block',
            animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ── Rotating placeholder hints ────────────────────────────────────────────────
const PLACEHOLDERS = [
  'Type a message…',
  'e.g. How much does solar cost?',
  'e.g. Do you offer payment plans?',
  'e.g. What is the warranty?',
  'e.g. Book a free site visit',
  'e.g. Off-grid or hybrid solar?',
]

// ── Main component ────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: 'bot',
      text: "Hello! 👋 I'm **LeitechSupport**, your AI assistant powered by Claude.\n\nI can answer any question about our Solar, Security, Smart Infrastructure, and Communications services.\n\nHow can I assist you today?",
    },
  ])
  const [history, setHistory] = useState<HistoryMsg[]>([])
  const [quickReplies, setQuickReplies] = useState<string[]>(defaultQr)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const [phIdx, setPhIdx] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (!open) return
    const t = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 4000)
    return () => clearInterval(t)
  }, [open])

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages((m) => [...m, { id: Date.now(), from: 'user', text: trimmed }])
    setInput('')
    setQuickReplies([])
    setTyping(true)

    const newHistory: HistoryMsg[] = [...history, { role: 'user', content: trimmed }]
    setHistory(newHistory)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      })
      const { reply } = await res.json()
      setHistory((h) => [...h, { role: 'assistant', content: reply }])
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: reply }])
      setQuickReplies(defaultQr)
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: 'bot',
          text: "Sorry, I'm having trouble right now. Call us directly at **+233 508 096 108** — we're available 24/7! 📞",
        },
      ])
      setQuickReplies(defaultQr)
    } finally {
      setTyping(false)
    }
  }

  const buttonSize = 56

  return (
    <>
      <style>{`
        @keyframes chatDot {
          0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes chatPulse {
          0%,100% { box-shadow: 0 4px 24px rgba(134,59,255,0.45); }
          50%      { box-shadow: 0 4px 40px rgba(134,59,255,0.75); }
        }
        .chat-msg-enter { animation: chatSlideUp 0.25s ease forwards; }
        .chat-qr-btn:hover { background: #F59E0B !important; color: #050D1A !important; }
        .chat-send-btn:hover { background: #D97706 !important; }
        .chat-input:focus { outline: none; border-color: rgba(245,158,11,0.6) !important; }
        .chat-close-btn:hover { background: rgba(255,255,255,0.12) !important; }
        @media (max-width: 420px) {
          .chat-window {
            width: calc(100vw - 2rem) !important;
            left: 1rem !important;
            bottom: 5rem !important;
          }
        }
      `}</style>

      {/* ── Floating toggle button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open LeitechSupport chat'}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 900,
          width: buttonSize,
          height: buttonSize,
          borderRadius: '50%',
          background: open
            ? 'linear-gradient(135deg,#1e3a5f,#0f1e35)'
            : 'linear-gradient(135deg,#1a0a2e,#0f0520)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: open
            ? '0 4px 24px rgba(0,0,0,0.4)'
            : '0 4px 24px rgba(134,59,255,0.45)',
          animation: open ? 'none' : 'chatPulse 2.5s ease-in-out infinite',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        {open
          ? <ChevronDown size={22} color="#F59E0B" />
          : <img src="/favicon.svg" alt="Leitech" style={{ width: 28, height: 28, objectFit: 'contain' }} />}

        {!open && unread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#EF4444',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #050D1A',
            }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: `calc(2rem + ${buttonSize}px + 1rem)`,
            left: '2rem',
            zIndex: 899,
            width: 360,
            maxHeight: '75vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.15)',
            animation: 'chatSlideUp 0.3s ease forwards',
            background: '#0B1930',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg,#0f2a50,#0B1930)',
              borderBottom: '1px solid rgba(245,158,11,0.2)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#F59E0B,#D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: 18,
              }}
            >
              ⚡
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.03em' }}>
                LeitechSupport
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>Online · AI-Powered Assistant</span>
              </div>
            </div>

            <button
              className="chat-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(245,158,11,0.2) transparent',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="chat-msg-enter"
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 13px',
                    borderRadius: msg.from === 'user'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg,#F59E0B,#D97706)'
                      : 'rgba(255,255,255,0.06)',
                    color: msg.from === 'user' ? '#050D1A' : '#E2E8F0',
                    fontSize: '0.82rem',
                    lineHeight: 1.55,
                    fontWeight: msg.from === 'user' ? 600 : 400,
                    border: msg.from === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    wordBreak: 'break-word',
                  }}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px 16px 16px 4px',
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div
              style={{
                padding: '8px 12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                flexShrink: 0,
                background: '#0B1930',
              }}
            >
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  className="chat-qr-btn"
                  onClick={() => sendMessage(qr)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 20,
                    border: '1px solid rgba(245,158,11,0.4)',
                    background: 'transparent',
                    color: '#F59E0B',
                    fontSize: '0.73rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              background: '#0B1930',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder={PLACEHOLDERS[phIdx]}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24,
                padding: '9px 14px',
                color: '#E2E8F0',
                fontSize: '0.82rem',
                transition: 'border-color 0.2s',
              }}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage(input)}
              aria-label="Send message"
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#F59E0B,#D97706)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <Send size={15} color="#050D1A" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
