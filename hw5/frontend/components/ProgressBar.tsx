"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ total }: { total: number }) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    function sync() {
      const items = JSON.parse(localStorage.getItem("completed") || "[]") as string[];
      setCompleted(items.length);
    }
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div className="metric">
        <span>完成進度</span>
        <b>{percent}%</b>
      </div>
      <div className="progress-track" aria-label="Learning progress">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
