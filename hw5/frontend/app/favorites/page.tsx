"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight, Trash2 } from "lucide-react";

type Algorithm = {
  id: number;
  slug: string;
  name_zh: string;
  name_en: string;
  category: string;
  one_liner: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) {
          const parsed = JSON.parse(storedFavs);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          } else if (typeof parsed === "object") {
            setFavorites(Object.keys(parsed).filter((k) => parsed[k]));
          }
        }
      } catch (e) {
        console.error("無法解析收藏紀錄:", e);
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

    loadFavorites();
    fetchAlgorithms();
  }, []);

  const removeFavorite = (slug: string) => {
    const newFavs = favorites.filter((f) => f !== slug);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--panel-border)', borderTopColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  const favoriteAlgorithms = algorithms.filter((algo) => favorites.includes(algo.slug));

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div className="flex-between mb-8" style={{ justifyContent: 'flex-start', gap: '12px' }}>
        <Bookmark size={32} color="var(--accent-cyan)" />
        <h1 className="heading-1" style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>我的收藏</h1>
      </div>

      {favoriteAlgorithms.length === 0 ? (
        <div className="glass-panel flex-center" style={{ padding: '60px', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '50%', marginBottom: '16px' }}>
            <Bookmark size={48} color="var(--text-muted)" />
          </div>
          <h2 className="heading-2">目前還沒有收藏任何演算法喔！</h2>
          <p className="subtitle" style={{ textAlign: 'center' }}>
            去探索十大機器學習演算法，把想重複複習的內容收藏起來吧。
          </p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
            探索演算法 <ArrowRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="grid-container">
          {favoriteAlgorithms.map((algo) => (
            <article key={algo.slug} className="card">
              <div className="card-header">
                <span className="tag">{algo.category}</span>
                <button
                  onClick={() => removeFavorite(algo.slug)}
                  className="btn-icon"
                  title="取消收藏"
                  style={{ border: 'none' }}
                >
                  <Trash2 size={20} color="var(--status-error)" />
                </button>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <h2 className="card-title">{algo.name_zh}</h2>
                <p className="card-subtitle">{algo.name_en}</p>
              </div>
              <p className="card-body">{algo.one_liner}</p>
              <Link
                href={`/algorithms/${algo.slug}`}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                開始學習 <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}