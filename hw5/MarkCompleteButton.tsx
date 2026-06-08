"use client";

import { useState, useEffect } from 'react';

export default function MarkCompleteButton({ slug }: { slug: string }) {
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const loadProgress = () => {
            const savedProgress = JSON.parse(localStorage.getItem('ml_tutor_progress') || '{}');
            if (savedProgress[slug]?.is_completed) {
                setIsCompleted(true);
            } else {
                setIsCompleted(false);
            }
        };
        loadProgress();

        window.addEventListener('progressUpdated', loadProgress);
        return () => window.removeEventListener('progressUpdated', loadProgress);
    }, [slug]);

    const toggleComplete = () => {
        const progress = JSON.parse(localStorage.getItem('ml_tutor_progress') || '{}');
        const newState = !isCompleted;
        progress[slug] = { ...progress[slug], is_completed: newState };
        localStorage.setItem('ml_tutor_progress', JSON.stringify(progress));

        // 觸發全域事件讓 Sidebar 重新讀取進度
        window.dispatchEvent(new Event('progressUpdated'));
    };

    return (
        <button onClick={toggleComplete} className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${isCompleted ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'}`}>
            {isCompleted ? '✓ 已標記為完成' : '標記為已學習'}
        </button>
    );
}