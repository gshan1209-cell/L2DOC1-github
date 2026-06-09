"use client";

import { useState, useEffect } from "react";
import algorithms from "../data/algorithms.json";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  algoName: string;
};

export default function ComprehensiveQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  useEffect(() => {
    // 提取所有演算法中的測驗題
    const allQuestions: QuizQuestion[] = [];
    algorithms.forEach((algo) => {
      if (algo.quiz && Array.isArray(algo.quiz)) {
        algo.quiz.forEach((q: any) => {
          allQuestions.push({
            ...q,
            algoName: algo.name_zh,
          });
        });
      }
    });

    // 隨機打亂並選出 10 題
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  if (questions.length === 0) {
    return <div className="glass-panel flex-center" style={{ padding: '80px', color: 'var(--text-muted)' }}>載入題庫中...</div>;
  }

  const currentQ = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setIsAnswerChecked(true);
    if (selectedAnswer === currentQ.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="glass-panel" style={{ padding: '80px 40px', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
        <h2 className="heading-1" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, var(--accent-cyan), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          測驗完成！
        </h2>
        <div style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--accent-cyan)', textShadow: 'var(--shadow-glow)' }}>
          {score} <span style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}>/ {questions.length}</span>
        </div>
        <p className="subtitle" style={{ margin: '0 auto 40px' }}>
          {score === questions.length ? "太厲害了！你已經完美精通這十大演算法！ 🚀" : 
           score >= questions.length * 0.7 ? "表現優異！繼續保持學習的熱情！ 🌟" : 
           score >= questions.length * 0.5 ? "不錯喔！但還有進步空間，繼續加油！ 💪" :
           "看來還需要多加練習喔！建議回顧一下不熟悉的演算法。 📚"}
        </p>
        <button className="btn btn-primary" onClick={() => window.location.reload()} style={{ fontSize: '1.1rem', padding: '14px 32px' }}>
          再挑戰一次
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.3s ease-out' }}>
      {/* 頂部進度條 */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', width: `${((currentIndex) / questions.length) * 100}%`, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
      </div>
      
      <div className="flex-between mb-8">
        <span className="tag" style={{ background: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)', color: 'var(--accent-purple)' }}>
          {currentQ.algoName}
        </span>
        <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
          QUESTION {currentIndex + 1} OF {questions.length}
        </span>
      </div>

      <h3 className="heading-2" style={{ marginBottom: '32px', lineHeight: 1.4 }}>{currentQ.question}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {currentQ.options.map((option, idx) => {
          let bg = 'rgba(255, 255, 255, 0.03)';
          let border = 'var(--panel-border)';
          let icon = '';

          if (isAnswerChecked) {
            if (option === currentQ.answer) {
              bg = 'rgba(16, 185, 129, 0.1)';
              border = 'rgba(16, 185, 129, 0.5)';
              icon = '✅';
            } else if (option === selectedAnswer) {
              bg = 'rgba(239, 68, 68, 0.1)';
              border = 'rgba(239, 68, 68, 0.5)';
              icon = '❌';
            }
          } else if (option === selectedAnswer) {
            bg = 'rgba(6, 182, 212, 0.15)';
            border = 'rgba(6, 182, 212, 0.5)';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className="quiz-option"
              disabled={isAnswerChecked}
              style={{
                width: '100%',
                padding: '20px 24px',
                textAlign: 'left',
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                cursor: isAnswerChecked ? 'default' : 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>{option}</span>
              {icon && <span style={{ position: 'relative', zIndex: 1, fontSize: '1.2rem' }}>{icon}</span>}
            </button>
          );
        })}
      </div>

      {isAnswerChecked && (
        <div style={{ 
          padding: '24px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '32px', 
          borderLeft: `4px solid ${selectedAnswer === currentQ.answer ? 'var(--status-success)' : 'var(--status-error)'}`,
          animation: 'slideUp 0.3s ease-out'
        }}>
          <h4 style={{ fontWeight: 700, marginBottom: '8px', color: selectedAnswer === currentQ.answer ? 'var(--status-success)' : 'var(--status-error)' }}>
            {selectedAnswer === currentQ.answer ? '答對了！' : '答錯了！'}
          </h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{currentQ.explanation}</p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--panel-border)' }}>
        {!isAnswerChecked ? (
          <button 
            className="btn btn-primary" 
            onClick={handleCheck} 
            disabled={!selectedAnswer}
            style={{ 
              opacity: selectedAnswer ? 1 : 0.5, 
              cursor: selectedAnswer ? 'pointer' : 'not-allowed', 
              padding: '14px 36px',
              transition: 'all 0.3s ease'
            }}
          >
            送出答案
          </button>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            style={{ padding: '14px 36px', animation: 'pulse 2s infinite' }}
          >
            {currentIndex + 1 === questions.length ? "查看結算成績" : "下一題 ➔"}
          </button>
        )}
      </div>
    </div>
  );
}
