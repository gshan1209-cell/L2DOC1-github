"use client";

import { useEffect, useState } from "react";

export default function MarkCompleteButton({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem("completed") || "[]") as string[];
    setDone(completed.includes(slug));
  }, [slug]);

  function toggle() {
    const completed = JSON.parse(localStorage.getItem("completed") || "[]") as string[];
    const next = completed.includes(slug)
      ? completed.filter((item) => item !== slug)
      : [...completed, slug];
    localStorage.setItem("completed", JSON.stringify(next));
    setDone(next.includes(slug));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <button
      className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${done ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md'}`}
      onClick={toggle}
    >
      {done ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          已完成，點擊取消
        </>
      ) : (
        "標記為完成"
      )}
    </button>
  );
}
