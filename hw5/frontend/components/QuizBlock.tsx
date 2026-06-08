"use client";

import { useState } from "react";

export default function QuizBlock({ title }: { title: string }) {
  const [answer, setAnswer] = useState("");
  const correct = "看資料目標與輸出型態";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mt-8">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
        <span className="text-2xl">🧠</span> 快速測驗
      </h2>
      <p className="text-slate-600 font-medium mb-6">{title} 最重要的選用線索通常是什麼？</p>
      <div className="relative">
        <select
          className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all cursor-pointer shadow-sm"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        >
          <option value="" disabled>請選擇答案...</option>
          <option value="看資料目標與輸出型態">看資料目標與輸出型態</option>
          <option value="只看模型名稱是否熱門">只看模型名稱是否熱門</option>
          <option value="永遠選最複雜的模型">永遠選最複雜的模型</option>
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {answer && (
        <div className={`mt-6 p-5 rounded-xl border flex gap-4 ${answer === correct ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"}`}>
          <div className="text-2xl mt-0.5">{answer === correct ? "✅" : "❌"}</div>
          <div>
            <h4 className={`font-bold mb-1 ${answer === correct ? "text-emerald-700" : "text-rose-700"}`}>{answer === correct ? "答對了！" : "再想一下！"}</h4>
            <p className="text-sm opacity-90 leading-relaxed">{answer === correct ? "先判斷問題是回歸、分類、分群或降維，是選模型的第一步。" : "模型選擇應該從問題型態與資料限制開始。"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
