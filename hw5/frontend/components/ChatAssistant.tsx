"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatAssistant() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "你好，我是 AI 助教。可以問我某個演算法怎麼選、怎麼解釋，或適合什麼情境。" }
  ]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setMessage("");
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: nextMessages, algorithm_slug: "general" })
    });
    const data = await response.json();
    setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
  }

  return (
    <section className="chat" aria-label="AI assistant">
      <div className="chat-header">
        <strong>AI 助教</strong>
        <button className="icon-button" onClick={() => setOpen(!open)} aria-label={open ? "收合" : "展開"}>
          {open ? "−" : "+"}
        </button>
      </div>
      {open && (
        <div className="chat-body">
          <div className="chat-log">
            {messages.map((item, index) => (
              <div key={index} className={`bubble ${item.role === "user" ? "user" : ""}`}>
                {item.content}
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={submit}>
            <input className="field" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="輸入問題" />
            <button className="primary" type="submit">送出</button>
          </form>
        </div>
      )}
    </section>
  );
}
