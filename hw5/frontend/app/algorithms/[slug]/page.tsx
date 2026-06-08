import Link from "next/link";
import { notFound } from "next/navigation";

import AlgorithmVisualizer from "../../../components/AlgorithmVisualizer";
import FavoriteButton from "../../../components/FavoriteButton";
import MarkCompleteButton from "../../../components/MarkCompleteButton";
import QuizBlock from "../../../components/QuizBlock";
import { getAlgorithm, getAlgorithms } from "../../../lib/algorithms";

export function generateStaticParams() {
  return getAlgorithms().map((algorithm) => ({ slug: algorithm.slug }));
}

export default function AlgorithmDetailPage({ params }: { params: { slug: string } }) {
  const algorithm = getAlgorithm(params.slug);
  if (!algorithm) notFound();

  return (
    <div className="page">
      <p><Link className="link" href="/">← 回到首頁</Link></p>
      <section className="detail-layout">
        <div className="panel">
          <div className="card-top">
            <div>
              <div className="eyebrow">{algorithm.displayCategory}</div>
              <h1>{algorithm.displayName}</h1>
            </div>
            <FavoriteButton slug={algorithm.slug} />
          </div>
          <p className="summary">{algorithm.summary}</p>
          <p className="summary"><strong>生活比喻：</strong>{algorithm.cleanAnalogy}</p>
          <AlgorithmVisualizer algorithm={algorithm} />
        </div>

        <aside className="panel">
          <h2>學習狀態</h2>
          <p className="summary">完成閱讀後可以標記進度，首頁會同步更新。</p>
          <MarkCompleteButton slug={algorithm.slug} />
        </aside>
      </section>

      <section className="section-grid" style={{ marginTop: 18 }}>
        <div className="panel">
          <h2>它怎麼運作</h2>
          <ul className="list">{algorithm.cleanHowItWorks.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="panel">
          <h2>常見用途</h2>
          <ul className="list">{algorithm.cleanUseCases.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="panel">
          <h2>優點</h2>
          <ul className="list">{algorithm.cleanPros.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="panel">
          <h2>限制</h2>
          <ul className="list">{algorithm.cleanCons.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <div style={{ marginTop: 18 }}>
        <QuizBlock title={algorithm.displayName} />
      </div>
    </div>
  );
}
