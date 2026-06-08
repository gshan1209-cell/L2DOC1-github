"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({ slug }: { slug: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setActive(favorites.includes(slug));
  }, [slug]);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation(); // 阻止事件向上冒泡，避免觸發卡片的點擊進入
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as string[];
    const next = favorites.includes(slug)
      ? favorites.filter((item) => item !== slug)
      : [...favorites, slug];
    localStorage.setItem("favorites", JSON.stringify(next));
    setActive(next.includes(slug));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center z-10 ${active ? 'text-rose-500 bg-rose-50 hover:bg-rose-100 shadow-sm' : 'text-slate-300 bg-slate-50 hover:text-rose-400 hover:bg-slate-100'}`}
      title={active ? "取消收藏" : "加入收藏"}
      aria-label={active ? "取消收藏" : "加入收藏"}
    >
      <svg className="w-5 h-5 transition-transform group-active:scale-110" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
