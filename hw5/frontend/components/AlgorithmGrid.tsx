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
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-400 shadow-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋演算法、分類或用途..."
            type="search"
          />
          <svg className="w-5 h-5 absolute left-4 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm cursor-pointer" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">所有分類</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm cursor-pointer" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="">所有難度</option>
          {difficulties.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
          <span className="text-4xl mb-4">🔍</span>
          <p className="text-slate-500 font-medium">沒有找到符合條件的演算法。</p>
          <button onClick={() => { setQuery(''); setCategory(''); setDifficulty(''); }} className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors">
            清除篩選條件
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((algorithm, index) => (
            <AlgorithmCard key={algorithm.slug} algorithm={algorithm} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
