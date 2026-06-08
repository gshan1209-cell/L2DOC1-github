"use client";

import { useEffect, useState } from "react";

import AlgorithmCard from "../../components/AlgorithmCard";
import type { DisplayAlgorithm } from "../../lib/types";

export default function FavoritesView({ algorithms }: { algorithms: DisplayAlgorithm[] }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    function sync() {
      setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
    }
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const rows = algorithms.filter((algorithm) => favorites.includes(algorithm.slug));

  return (
    <div className="page">
      <section className="panel">
        <div className="eyebrow">Favorites</div>
        <h1>收藏清單</h1>
        <p className="summary">這裡會顯示你用星號收藏的演算法。</p>
      </section>
      <div style={{ height: 18 }} />
      {rows.length === 0 ? (
        <p className="empty">目前還沒有收藏。回首頁點選星號即可加入。</p>
      ) : (
        <div className="grid">
          {rows.map((algorithm, index) => <AlgorithmCard key={algorithm.slug} algorithm={algorithm} index={index} />)}
        </div>
      )}
    </div>
  );
}
