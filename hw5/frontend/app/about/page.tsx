export default function AboutPage() {
  return (
    <div className="page">
      <section className="panel">
        <div className="eyebrow">About</div>
        <h1>關於 ML Algorithm Tutor</h1>
        <p className="summary">
          這個網站把機器學習入門最常遇到的十種演算法整理成可掃描、可收藏、可追蹤進度的學習介面。
          前端使用 Next.js App Router，後端使用 FastAPI，AI 助教可透過 OpenAI API 擴充。
        </p>
      </section>
      <section className="section-grid" style={{ marginTop: 18 }}>
        <div className="panel">
          <h2>學習設計</h2>
          <ul className="list">
            <li>先用卡片建立整體地圖。</li>
            <li>再進入詳細頁理解用途、優點與限制。</li>
            <li>用收藏與完成狀態管理自己的學習節奏。</li>
          </ul>
        </div>
        <div className="panel">
          <h2>技術架構</h2>
          <ul className="list">
            <li>Next.js 前端：頁面、互動元件與 API proxy。</li>
            <li>FastAPI 後端：演算法資料與聊天 API。</li>
            <li>localStorage：保存收藏與完成狀態。</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
