"use client";

import { useState } from "react";

export default function QuizBlock({ title }: { title: string }) {
  const [answer, setAnswer] = useState("");
  const correct = "看資料目標與輸出型態";

  return (
    <div>
      <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '1.5rem' }}>🧠</span> 快速測驗
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{title} 最重要的選用線索通常是什麼？</p>
      <div style={{ position: 'relative' }}>
        <select
          className="btn-secondary"
          style={{ width: '100%', padding: '16px 20px', appearance: 'none', cursor: 'pointer', textAlign: 'left', background: 'rgba(255, 255, 255, 0.05)', fontSize: '1rem' }}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        >
          <option value="" disabled>請選擇答案...</option>
          <option value="看資料目標與輸出型態">看資料目標與輸出型態</option>
          <option value="只看模型名稱是否熱門">只看模型名稱是否熱門</option>
          <option value="永遠選最複雜的模型">永遠選最複雜的模型</option>
        </select>
        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
          <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {answer && (
        <div style={{ 
          marginTop: '24px', 
          padding: '20px', 
          borderRadius: 'var(--radius-md)', 
          display: 'flex', 
          gap: '16px', 
          background: answer === correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${answer === correct ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{answer === correct ? "✅" : "❌"}</div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '4px', color: answer === correct ? 'var(--status-success)' : 'var(--status-error)' }}>
              {answer === correct ? "答對了！" : "再想一下！"}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {answer === correct ? "先判斷問題是回歸、分類、分群或降維，是選模型的第一步。" : "模型選擇應該從問題型態與資料限制開始。"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
