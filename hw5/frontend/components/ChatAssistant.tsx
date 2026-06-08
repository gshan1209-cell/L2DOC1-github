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
    <section className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-4 transition-all duration-300" aria-label="AI assistant">
      <div className={`w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${open ? 'h-[500px] scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm border border-white/30 shadow-sm">
              🤖
            </div>
            <div>
              <strong className="block font-bold tracking-wide">AI 助教</strong>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider">線上為您解答</span>
            </div>
          </div>
          <button className="text-white/80 hover:text-white hover:bg-white/10 w-8 h-8 flex justify-center items-center rounded-full transition-colors" onClick={() => setOpen(false)} aria-label="收合">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
          {messages.map((item, index) => (
            <div key={index} className={`flex max-w-[85%] ${item.role === "user" ? "self-end" : "self-start"}`}>
              <div className={`p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${item.role === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"}`}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
        <form className="p-3 bg-white border-t border-slate-100 flex gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]" onSubmit={submit}>
          <input
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-full px-4 py-2.5 text-sm transition-all outline-none text-slate-700 placeholder-slate-400"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="輸入問題..."
          />
          <button className="w-10 h-10 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50" type="submit" disabled={!message.trim()}>
            <svg className="w-4 h-4 translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
      <button
        className={`group flex items-center gap-3 bg-white p-2.5 pr-5 rounded-full shadow-lg shadow-blue-900/5 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${open ? 'hidden' : 'flex'}`}
        onClick={() => setOpen(true)}
      >
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">🤖</div>
        <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">呼叫 AI 助教</span>
      </button>
    </section>
  );
}
