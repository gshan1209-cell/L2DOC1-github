"use client";

import { useMemo, useState } from "react";

import AlgorithmCard from "./AlgorithmCard";
import type { DisplayAlgorithm } from "../lib/types";

export default function AlgorithmGrid({ algorithms }: { algorithms: DisplayAlgorithm[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const categories = [...new Set(algorithms.map((algorithm) => algorithm.displayCategory))];
  const difficulties = [...new Set(algorithms.map((algorithm) => algorithm.displayDifficulty))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return algorithms.filter((algorithm) => {
      const haystack = `${algorithm.displayName} ${algorithm.displayCategory} ${algorithm.summary}`.toLowerCase();
      return (!q || haystack.includes(q))
        && (!category || algorithm.displayCategory === category)
        && (!difficulty || algorithm.displayDifficulty === difficulty);
    });
  }, [algorithms, category, difficulty, query]);

  return (
    <>
      <div className="toolbar">
        <input
          className="field"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜尋演算法、分類或用途"
          type="search"
        />
        <select className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">所有分類</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className="field" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="">所有難度</option>
          {difficulties.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">沒有找到符合條件的演算法。</p>
      ) : (
        <div className="grid">
          {filtered.map((algorithm, index) => (
            <AlgorithmCard key={algorithm.slug} algorithm={algorithm} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
