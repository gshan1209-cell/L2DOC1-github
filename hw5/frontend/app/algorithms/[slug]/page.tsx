import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Brain, Cpu, Lightbulb, AlertTriangle } from "lucide-react";

import AlgorithmVisualizer from "../../../components/AlgorithmVisualizer";
import FavoriteButton from "../../../components/FavoriteButton";
import MarkCompleteButton from "../../../components/MarkCompleteButton";
import QuizBlock from "../../../components/QuizBlock";
import { getAlgorithm, getAlgorithms } from "../../../lib/algorithms";

export function generateStaticParams() {
  return getAlgorithms().map((algorithm) => ({ slug: algorithm.slug }));
}

export default async function AlgorithmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) notFound();

  return (
    <div style={{ paddingBottom: '80px' }}>
      <p style={{ marginBottom: '24px' }}>
        <Link href="/" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> 回到首頁
        </Link>
      </p>

      <div className="detail-layout" style={{ marginBottom: '32px' }}>
        <section className="glass-panel detail-content" style={{ padding: '40px' }}>
          <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '8px' }}>
                {algorithm.displayCategory}
              </div>
              <h1 className="heading-1" style={{ fontSize: '3rem', margin: 0 }}>{algorithm.displayName}</h1>
            </div>
            <FavoriteButton slug={algorithm.slug} />
          </div>
          
          <p className="card-body" style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
            {algorithm.summary}
          </p>

          <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
              <Lightbulb size={20} /> 生活比喻
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>{algorithm.cleanAnalogy}</p>
          </div>

          <div className="visual-container">
            <AlgorithmVisualizer algorithm={algorithm} />
          </div>
        </section>

        <aside className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ marginBottom: '16px' }}>學習狀態</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>完成閱讀後可以標記進度，首頁會同步更新。</p>
          <MarkCompleteButton slug={algorithm.slug} />
        </aside>
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '32px' }}>
        <section className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Cpu size={24} color="var(--accent-cyan)" /> 它怎麼運作
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {algorithm.cleanHowItWorks.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '8px', flexShrink: 0 }}></div>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Brain size={24} color="var(--accent-purple)" /> 常見用途
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {algorithm.cleanUseCases.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '8px', flexShrink: 0 }}></div>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ color: 'var(--status-success)', fontSize: '1.2rem', fontWeight: 900 }}>+</span> 優點
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {algorithm.cleanPros.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--status-success)', marginTop: '8px', flexShrink: 0 }}></div>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel" style={{ padding: '32px' }}>
          <h2 className="heading-3" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <AlertTriangle size={24} color="var(--status-error)" /> 限制
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {algorithm.cleanCons.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--status-error)', marginTop: '8px', flexShrink: 0 }}></div>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <QuizBlock title={algorithm.displayName} />
      </div>
    </div>
  );
}
