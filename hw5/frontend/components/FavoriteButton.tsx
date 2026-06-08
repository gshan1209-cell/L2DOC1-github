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
      className={`icon-button ${active ? "active" : ""}`}
      onClick={toggle}
      title={active ? "取消收藏" : "加入收藏"}
      aria-label={active ? "取消收藏" : "加入收藏"}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
