import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <div className="flex-between mb-8" style={{ justifyContent: 'flex-start', gap: '12px' }}>
        <Info size={32} color="var(--accent-purple)" />
        <h1 className="heading-1" style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>關於本站</h1>
      </div>

      <section className="glass-panel" style={{ padding: '40px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '8px' }}>About</div>
        <h2 className="heading-2" style={{ marginBottom: '16px' }}>ML Algorithm Tutor</h2>
        <p className="card-body" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          這個網站把機器學習入門最常遇到的十種演算法整理成可掃描、可收藏、可追蹤進度的學習介面。
          前端使用 Next.js App Router，後端使用 FastAPI，AI 助教可透過 OpenAI API 擴充。
        </p>
      </section>

      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        <section className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.2)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🎯</span>
            學習設計
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '8px', flexShrink: 0 }}></div>
              先用卡片建立整體地圖。
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '8px', flexShrink: 0 }}></div>
              再進入詳細頁理解用途、優點與限制。
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '8px', flexShrink: 0 }}></div>
              用收藏與完成狀態管理自己的學習節奏。
            </li>
          </ul>
        </section>

        <section className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚙️</span>
            技術架構
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '8px', flexShrink: 0 }}></div>
              Next.js 前端：頁面、互動元件與 API proxy。
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '8px', flexShrink: 0 }}></div>
              FastAPI 後端：演算法資料與聊天 API。
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '8px', flexShrink: 0 }}></div>
              localStorage：保存收藏與完成狀態。
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
