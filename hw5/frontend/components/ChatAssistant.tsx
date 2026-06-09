"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "你好！我是專屬 AI 助教 🤖\n可以問我任何關於演算法的問題，例如：「隨機森林跟決策樹差在哪？」" }
  ]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setMessage("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: nextMessages, algorithm_slug: "general" })
      });
      const data = await response.json();
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages([...nextMessages, { role: "assistant", content: "抱歉，連線發生錯誤，請稍後再試。" }]);
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
            borderRadius: '99px', color: '#fff', border: 'none', cursor: 'pointer',
            boxShadow: 'var(--shadow-glow)', transition: 'all 0.3s ease',
            animation: 'slideUp 0.5s ease-out', fontWeight: 700, fontSize: '0.95rem'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
        >
          <span style={{ fontSize: '1.4rem' }}>🤖</span>
          <span>呼叫 AI 助教</span>
        </button>
      )}

      {/* Chat Panel */}
      <div 
        className="glass-panel"
        style={{
          display: open ? 'flex' : 'none',
          flexDirection: 'column',
          width: '380px', height: '550px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), var(--shadow-glow)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          animation: 'slideUp 0.3s ease-out',
          transformOrigin: 'bottom right'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.1))',
          borderBottom: '1px solid var(--panel-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              🤖
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>AI 助教系統</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-success)', boxShadow: '0 0 10px var(--status-success)', animation: 'pulse 2s infinite' }}></span>
                <span style={{ fontSize: '0.75rem', color: 'var(--status-success)', fontWeight: 700, letterSpacing: '0.1em' }}>線上為您解答</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setOpen(false)}
            style={{
              background: 'transparent', border: 'none', color: 'var(--text-secondary)',
              cursor: 'pointer', fontSize: '1.8rem', padding: '4px', lineHeight: 1
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            ×
          </button>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1, padding: '20px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '20px',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          {messages.map((item, index) => (
            <div key={index} style={{
              alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}>
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                background: item.role === 'user' ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))' : 'var(--panel-bg)',
                color: item.role === 'user' ? '#fff' : 'var(--text-primary)',
                border: item.role === 'user' ? 'none' : '1px solid var(--panel-border)',
                borderBottomRightRadius: item.role === 'user' ? '4px' : 'var(--radius-lg)',
                borderTopLeftRadius: item.role === 'assistant' ? '4px' : 'var(--radius-lg)',
                boxShadow: item.role === 'user' ? '0 4px 14px rgba(6, 182, 212, 0.2)' : '0 2px 8px rgba(0,0,0,0.2)',
                whiteSpace: 'pre-wrap'
              }}>
                {item.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={submit} style={{
          padding: '16px', borderTop: '1px solid var(--panel-border)',
          background: 'rgba(22, 32, 50, 0.8)', display: 'flex', gap: '12px'
        }}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="請輸入您的問題..."
            style={{
              flex: 1, padding: '12px 18px', borderRadius: '99px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)',
              color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s, background 0.3s'
            }}
            onFocus={(e) => { e.currentTarget.style.border = '1px solid var(--accent-cyan)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onBlur={(e) => { e.currentTarget.style.border = '1px solid var(--panel-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            style={{
              width: '46px', height: '46px', borderRadius: '50%',
              background: message.trim() ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))' : 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', cursor: message.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s', boxShadow: message.trim() ? '0 2px 10px rgba(6, 182, 212, 0.3)' : 'none',
              transform: message.trim() ? 'scale(1)' : 'scale(0.95)',
              opacity: message.trim() ? 1 : 0.5
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
