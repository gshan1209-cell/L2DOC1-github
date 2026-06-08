"use client";

import { useState } from 'react';

interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

export default function QuizBlock({ quiz, slug }: { quiz: QuizQuestion[], slug: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    if (!quiz || quiz.length === 0) return null;

    const currentQ = quiz[currentIndex];

    const handleSubmit = () => {
        if (!selected) return;
        setIsSubmitted(true);
        if (selected === currentQ.answer) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex + 1 < quiz.length) {
            setCurrentIndex(currentIndex + 1);
            setSelected(null);
            setIsSubmitted(false);
        } else {
            setIsFinished(true);
            // 更新學習進度
            const finalScore = score + (selected === currentQ.answer ? 1 : 0);
            try {
                const progress = JSON.parse(localStorage.getItem('ml_tutor_progress') || '{}');
                progress[slug] = { ...progress[slug], quiz_score: finalScore, is_completed: true };
                localStorage.setItem('ml_tutor_progress', JSON.stringify(progress));
                window.dispatchEvent(new Event('progressUpdated')); // 觸發 Sidebar 與按鈕更新
            } catch (e) {
                console.error("Failed to update progress", e);
            }
        }
    };

    if (isFinished) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">🎉 測驗完成！</h3>
                <div className="text-5xl font-black text-blue-600 mb-4">
                    {score} <span className="text-2xl text-slate-400">/ {quiz.length}</span>
                </div>
                <p className="text-slate-600 mb-6">太棒了！你已經完成這個章節的學習與測驗囉。</p>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-full hover:bg-blue-100 transition-colors">
                    回頁首
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">🧠 觀念小測驗</h3>
                <span className="text-sm font-bold text-slate-400">
                    Question {currentIndex + 1} of {quiz.length}
                </span>
            </div>

            <div className="mb-8">
                <h4 className="text-lg font-medium text-slate-700 mb-4">{currentQ.question}</h4>
                <div className="space-y-3">
                    {currentQ.options.map((opt, idx) => {
                        let btnClass = "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ";
                        if (isSubmitted) {
                            if (opt === currentQ.answer) {
                                btnClass += "bg-green-50 border-green-400 text-green-800";
                            } else if (opt === selected) {
                                btnClass += "bg-rose-50 border-rose-400 text-rose-800";
                            } else {
                                btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50 cursor-not-allowed";
                            }
                        } else {
                            if (selected === opt) {
                                btnClass += "bg-blue-50 border-blue-400 text-blue-700";
                            } else {
                                btnClass += "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-slate-50";
                            }
                        }

                        return (
                            <button key={idx} onClick={() => !isSubmitted && setSelected(opt)} disabled={isSubmitted} className={btnClass}>
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>

            {isSubmitted && (
                <div className={`p-5 rounded-xl mb-6 ${selected === currentQ.answer ? 'bg-green-50 border border-green-200' : 'bg-rose-50 border border-rose-200'}`}>
                    <div className={`font-bold mb-2 ${selected === currentQ.answer ? 'text-green-700' : 'text-rose-700'}`}>
                        {selected === currentQ.answer ? '✅ 答對了！' : '❌ 答錯囉！'}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{currentQ.explanation}</p>
                </div>
            )}

            <div className="flex justify-end">
                {!isSubmitted ? (
                    <button onClick={handleSubmit} disabled={!selected} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                        送出答案
                    </button>
                ) : (
                    <button onClick={handleNext} className="px-8 py-3 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-900 transition-colors shadow-sm">
                        {currentIndex + 1 < quiz.length ? '下一題' : '查看結果'}
                    </button>
                )}
            </div>
        </div>
    );
}