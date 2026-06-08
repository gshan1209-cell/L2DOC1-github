import AlgorithmGrid from "../components/AlgorithmGrid";
import ProgressBar from "../components/ProgressBar";
import { getAlgorithms } from "../lib/algorithms";

export default function HomePage() {
  const algorithms = getAlgorithms();
  const categories = new Set(algorithms.map((item) => item.displayCategory));

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>ML Algorithm Tutor</h1>
          <p>
            用卡片、視覺化、收藏、進度與 AI 助教，把十大機器學習演算法整理成可以反覆練習的學習介面。
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric"><span>演算法</span><b>{algorithms.length}</b></div>
          <div className="metric"><span>分類</span><b>{categories.size}</b></div>
          <ProgressBar total={algorithms.length} />
        </div>
      </section>
      <AlgorithmGrid algorithms={algorithms} />
    </div>
  );
}
