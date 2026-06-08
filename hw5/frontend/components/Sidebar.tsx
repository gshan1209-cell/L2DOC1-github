import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">ML</div>
        <strong>ML Algorithm Tutor</strong>
        <span>十大機器學習演算法互動學習網站</span>
      </div>
      <nav className="nav" aria-label="Main navigation">
        <Link href="/">⌂ 首頁</Link>
        <Link href="/favorites">☆ 收藏</Link>
        <Link href="/about">ⓘ 關於</Link>
        <Link href="/api/algorithms">API</Link>
      </nav>
    </aside>
  );
}
