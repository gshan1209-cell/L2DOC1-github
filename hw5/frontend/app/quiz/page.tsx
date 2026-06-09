import ComprehensiveQuiz from "../../components/ComprehensiveQuiz";

export default function QuizPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px', animation: 'fadeInDown 0.6s ease-out' }}>
        <div style={{ display: 'inline-flex', padding: '8px 20px', borderRadius: '99px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '20px', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}>
          驗收成果 QUIZ
        </div>
        <h1 className="heading-1" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
          綜合能力 <span style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))' }}>測驗</span>
        </h1>
        <p className="subtitle" style={{ margin: '0 auto', fontSize: '1.2rem', maxWidth: '600px' }}>
          從十大演算法題庫中隨機抽出 10 題，考驗你對機器學習的綜合掌握程度！
        </p>
      </header>

      <ComprehensiveQuiz />
    </div>
  );
}
