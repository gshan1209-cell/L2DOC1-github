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
    <button className="primary" onClick={toggle}>
      {done ? "已完成，點擊取消" : "標記為完成"}
    </button>
  );
}
