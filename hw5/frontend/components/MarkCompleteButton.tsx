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
      className={`btn ${done ? 'btn-secondary' : 'btn-primary'}`}
      style={done ? { color: 'var(--status-success)', borderColor: 'rgba(16, 185, 129, 0.3)' } : { width: '100%' }}
      onClick={toggle}
    >
      {done ? (
        <>
          <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          已完成，點擊取消
        </>
      ) : (
        "標記為完成"
      )}
    </button>
  );
}
