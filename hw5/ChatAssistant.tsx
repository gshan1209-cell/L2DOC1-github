"use client";

import { useState, useRef, useEffect } from 'react';
import Live2DFallbackAvatar from './Live2DFallbackAvatar';
import { usePathname } from 'next/navigation';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: '哈囉！我是小璃老師，有任何機器學習的問題都可以問我喔！' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [assistantState, setAssistantState] = useState('idle');
    const [suggestions, setSuggestions] = useState<string[]>(['可以用圖解說明嗎？', '它適合解決什麼問題？']);
    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 解析目前的路由以了解使用者在哪個演算法下
    const currentSlug = pathname.startsWith('/algorithms/') ? pathname.split('/').pop() || 'general' : 'general';

    // 自動滾動到底部
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: text }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setAssistantState('thinking');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: 'guest',
                    algorithm_slug: currentSlug,
                    message: text,
                    history: messages.slice(-5) // 傳送最後 5 筆當作上下文
                })
            });

            if (res.ok) {
                const data = await res.json();
                setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
                setSuggestions(data.suggested_questions || []);
                setAssistantState(data.assistant_state || 'idle');
            } else {
                throw new Error("API Error");
            }
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: '抱歉，我現在連線有點問題，請稍後再試！' }]);
            setAssistantState('confused');
        } finally {
            setIsLoading(false);
            setTimeout(() => setAssistantState('idle'), 3000); // 對話完幾秒後回歸一般狀態
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-4">
            {/* 聊天視窗 */}
            <div className={`w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute'}`}>
                {/* Header */}
                <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3">
                        <Live2DFallbackAvatar state={assistantState} size="sm" />
                        <div>
                            <h3 className="font-bold">小璃老師</h3>
                            <p className="text-xs text-blue-200">機器學習導師</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700 w-8 h-8 flex justify-center items-center rounded-full transition-colors">✖</button>
                </div>

                {/* 訊息區 */}
                <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-500 text-white self-end rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 self-start rounded-tl-sm shadow-sm'}`}>
                            {msg.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-white border border-slate-200 text-slate-500 self-start px-4 py-3 rounded-xl rounded-tl-sm shadow-sm text-sm flex gap-1 items-center">
                            <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 建議問題 */}
                {suggestions.length > 0 && (
                    <div className="px-4 py-3 bg-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
                        {suggestions.map((sug, idx) => (
                            <button key={idx} onClick={() => sendMessage(sug)} className="bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full text-xs hover:bg-blue-50 transition-colors shadow-sm flex-shrink-0">
                                {sug}
                            </button>
                        ))}
                    </div>
                )}

                {/* 輸入框 */}
                <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                        placeholder="問問小璃老師..."
                        className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-full px-4 py-2 text-sm transition-all outline-none"
                    />
                    <button onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading} className="w-10 h-10 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
                        ➤
                    </button>
                </div>
            </div>

            {/* 懸浮按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center gap-3 bg-white p-2 pr-4 rounded-full shadow-lg border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <Live2DFallbackAvatar state="idle" size="md" />
                <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600">有問題嗎？問我！</span>
            </button>
        </div>
    );
}