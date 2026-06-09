"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import algorithms from "../data/algorithms.json";

export default function Sidebar() {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    function sync() {
      const items = JSON.parse(localStorage.getItem("completed") || "[]") as string[];
      setCompleted(items);
    }
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("favoritesUpdated", sync);
    window.addEventListener("progressUpdated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("favoritesUpdated", sync);
      window.removeEventListener("progressUpdated", sync);
    };
  }, []);

  return (
    <aside className="sidebar">
      {/* Brand */}
      <Link href="/" className="brand">
        <div className="brand-icon">ML</div>
        <div className="brand-text">
          <h1>ML Tutor</h1>
          <p>互動學習平台</p>
        </div>
      </Link>

      {/* Algorithms Nav */}
      <div className="nav-group">
        <div className="nav-label">十大演算法</div>
        <ul className="nav-list">
          {algorithms.map((algo) => {
            const isActive = pathname === "/algorithms/" + algo.slug;
            const isCompleted = completed.includes(algo.slug);

            return (
              <li key={algo.slug}>
                <Link href={"/algorithms/" + algo.slug} className={`nav-item ${isActive ? "active" : ""}`}>
                  <span className="nav-badge">{algo.id.toString().padStart(2, "0")}</span>
                  <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {algo.name_zh}
                  </span>
                  {isCompleted && (
                    <span style={{ color: "var(--status-success)", display: "flex" }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Nav */}
      <div className="nav-bottom">
        <div className="nav-label">探索更多</div>
        <ul className="nav-list">
          <li>
            <Link href="/progress" className={`nav-item ${pathname === "/progress" ? "active" : ""}`}>
              <span>📈 學習進度</span>
            </Link>
          </li>
          <li>
            <Link href="/favorites" className={`nav-item ${pathname === "/favorites" ? "active" : ""}`}>
              <span>⭐ 我的收藏</span>
            </Link>
          </li>
          <li>
            <Link href="/quiz" className={`nav-item ${pathname === "/quiz" ? "active" : ""}`}>
              <span>📝 綜合測驗</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className={`nav-item ${pathname === "/about" ? "active" : ""}`}>
              <span>ℹ️ 關於本站</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
