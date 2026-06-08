"use client";

import { useState } from "react";

export default function QuizBlock({ title }: { title: string }) {
  const [answer, setAnswer] = useState("");
  const correct = "看資料目標與輸出型態";

  return (
    <div className="panel">
      <h2>快速測驗</h2>
      <p className="summary">{title} 最重要的選用線索通常是什麼？</p>
      <select className="field" value={answer} onChange={(event) => setAnswer(event.target.value)}>
        <option value="">選擇答案</option>
        <option>看資料目標與輸出型態</option>
        <option>只看模型名稱是否熱門</option>
        <option>永遠選最複雜的模型</option>
      </select>
      {answer && (
        <p className="summary">
          {answer === correct ? "答對了。先判斷問題是回歸、分類、分群或降維，是選模型的第一步。" : "再想一下。模型選擇應該從問題型態與資料限制開始。"}
        </p>
      )}
    </div>
  );
}
