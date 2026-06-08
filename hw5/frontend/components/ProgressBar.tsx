"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ total }: { total: number }) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    function sync() {
      const items = JSON.parse(localStorage.getItem("completed") || "[]") as string[];
      setCompleted(items.length);
    }
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="p-5 border-t border-slate-200/60 bg-slate-50/50 mt-auto backdrop-blur-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">整體學習進度</span>
        <span className="text-sm font-black text-blue-600">{percent}%</span>
      </div>
      <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden shadow-inner" aria-label="Learning progress">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${percent}%` }} />
      </div>
      {percent === 100 ? (
        <p className="text-[10px] text-emerald-500 font-bold mt-2 text-center animate-pulse">🎉 恭喜完成所有演算法！</p>
      ) : (
        <p className="text-[10px] text-slate-400 mt-2 text-right font-medium">{completed} / {total} 已完成</p>
      )}
    </div>
  );
}
