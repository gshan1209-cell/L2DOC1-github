"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Circle, ArrowRight, RotateCcw, Target } from "lucide-react";

type Algorithm = {
  id: number;
  slug: string;
  name_zh: string;
  name_en: string;
  category: string;
  difficulty: string;
  one_liner: string;
};

export default function ProgressPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = () => {
      try {
        const storedProgress = localStorage.getItem("completed");
        if (storedProgress) {
          setCompleted(JSON.parse(storedProgress));
        }
      } catch (e) {
        console.error("無法解析進度紀錄:", e);
      }
    };

    const fetchAlgorithms = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8010";
        const res = await fetch(`${baseUrl}/api/algorithms/`);
        if (res.ok) {
          const data = await res.json();
          setAlgorithms(data);
        }
      } catch (error) {
        console.error("無法取得演算法資料:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
    fetchAlgorithms();
  }, []);

  const resetProgress = () => {
    if (confirm("確定要重置所有學習進度嗎？此操作無法還原。")) {
      setCompleted([]);
      localStorage.removeItem("completed");
      window.dispatchEvent(new Event("progressUpdated"));
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--panel-border)', borderTopColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  const completedAlgorithms = algorithms.filter((algo) => completed.includes(algo.slug));
  const uncompletedAlgorithms = algorithms.filter((algo) => !completed.includes(algo.slug));
  
  const total = algorithms.length || 10;
  const progressPercentage = Math.round((completed.length / total) * 100) || 0;

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div className="flex-between mb-8" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Target size={32} color="var(--accent-cyan)" />
          <h1 className="heading-1" style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>學習進度</h1>
        </div>
        <button onClick={resetProgress} className="btn btn-secondary">
          <RotateCcw size={16} /> 重置進度
        </button>
      </div>

      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '40px', marginBottom: '48px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--panel-border)" strokeWidth="10" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#progressGradient)" 
              strokeWidth="10"
              strokeDasharray={`${progressPercentage * 2.83} 283`}
              style={{ transition: 'stroke-dasharray 1s ease-out', strokeLinecap: 'round' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-blue)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex-center" style={{ position: 'absolute', inset: 0, flexDirection: 'column' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{progressPercentage}%</span>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <h2 className="heading-2" style={{ marginBottom: '8px' }}>
            {progressPercentage === 100 ? "太棒了！您已經完成所有學習目標！" : "繼續保持！"}
          </h2>
          <p className="card-body" style={{ marginBottom: '16px' }}>
            您已經學習了 <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{completed.length}</span> / {total} 個核心機器學習演算法。
          </p>
          <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercentage}%`, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))', height: '100%', transition: 'width 1s ease-out', boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}></div>
          </div>
        </div>
      </div>

      {uncompletedAlgorithms.length > 0 && (
        <div className="mb-8">
          <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Circle size={24} color="var(--status-warning)" />
            繼續學習 ({uncompletedAlgorithms.length})
          </h2>
          <div className="grid-container">
            {uncompletedAlgorithms.map((algo) => (
              <article key={algo.slug} className="card">
                <div className="card-header">
                  <span className="tag" style={{ color: 'var(--status-warning)', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>尚未學習</span>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <h2 className="card-title">{algo.name_zh}</h2>
                </div>
                <p className="card-body">{algo.one_liner}</p>
                <Link href={`/algorithms/${algo.slug}`} className="btn btn-primary" style={{ width: '100%' }}>
                  前往學習 <ArrowRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {completedAlgorithms.length > 0 && (
        <div>
          <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <CheckCircle size={24} color="var(--status-success)" />
            已完成 ({completedAlgorithms.length})
          </h2>
          <div className="grid-container">
            {completedAlgorithms.map((algo) => (
              <article key={algo.slug} className="card" style={{ opacity: 0.7, filter: 'grayscale(0.3)' }}>
                <div className="card-header">
                  <span className="tag" style={{ color: 'var(--status-success)', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={12} /> 已完成
                  </span>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <h2 className="card-title">{algo.name_zh}</h2>
                </div>
                <p className="card-body">{algo.one_liner}</p>
                <Link href={`/algorithms/${algo.slug}`} className="btn btn-secondary" style={{ width: '100%' }}>
                  重新複習
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
