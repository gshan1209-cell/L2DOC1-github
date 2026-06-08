"use client";

import { useRouter } from "next/navigation";

import FavoriteButton from "./FavoriteButton";
import type { DisplayAlgorithm } from "../lib/types";

export default function AlgorithmCard({ algorithm, index }: { algorithm: DisplayAlgorithm; index: number }) {
  const router = useRouter();

  return (
    <article className="group relative flex flex-col p-6 h-full bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 overflow-hidden cursor-pointer" onClick={() => router.push(`/algorithms/${algorithm.slug}`)}>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex justify-between items-start mb-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">{String(index + 1).padStart(2, "0")}</span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100 h-fit">{algorithm.displayDifficulty}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteButton slug={algorithm.slug} />
        </div>
      </div>
      <div className="mb-2 z-10">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{algorithm.displayCategory}</div>
        <h2 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition-colors">{algorithm.displayName}</h2>
      </div>
      <p className="text-slate-600 text-sm mt-3 flex-grow z-10 leading-relaxed">{algorithm.summary}</p>
      <div className="mt-6 flex items-center justify-between z-10">
        <span className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          開始學習 <span className="ml-2">→</span>
        </span>
      </div>
    </article>
  );
}
