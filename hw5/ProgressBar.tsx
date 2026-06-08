"use client";

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    // 避免 total 為 0 時發生除以零錯誤
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <div className="p-5 border-t border-slate-200 bg-slate-50 mt-auto">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">整體學習進度</span>
                <span className="text-sm font-black text-blue-600">
                    {current} <span className="text-xs text-slate-400 font-medium">/ {total}</span>
                </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            {percentage === 100 ? <p className="text-[10px] text-green-600 font-bold mt-2 text-center animate-pulse">🎉 恭喜完成所有演算法！</p> : <p className="text-[10px] text-slate-400 mt-2 text-right">{percentage}% 完成</p>}
        </div>
    );
}