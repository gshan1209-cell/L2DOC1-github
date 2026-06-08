import Link from 'next/link';

export const metadata = {
    title: '關於本站 | ML Algorithm Tutor',
    description: '了解這個專為新手設計的機器學習互動學習平台。',
};

export default function AboutPage() {
    return (
        <main className="p-8 lg:p-12 max-w-4xl mx-auto w-full">
            <header className="mb-12 text-center mt-8">
                <span className="px-4 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 mb-4 inline-block">About Us</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">關於 ML Tutor</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">專為完全零基礎新手打造的機器學習互動樂園</p>
            </header>

            <div className="space-y-10">
                {/* 我們的使命 */}
                <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="text-3xl">🎯</span> 我們的使命
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        機器學習聽起來總是很遙遠、充滿了看不懂的複雜微積分與程式碼嗎？<br /><br />
                        其實，演算法的本質就是<strong className="text-blue-600">「解決問題的邏輯」</strong>。我們希望透過生活化的比喻、直覺的視覺動畫，以及互動式的問答，幫助非本科系學生、產品經理、行銷人員或是任何對 AI 有興趣的人，無痛建立機器學習的核心觀念。
                    </p>
                </section>

                {/* 平台特色 */}
                <section className="bg-blue-50/50 p-8 md:p-10 rounded-3xl border border-blue-100">
                    <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                        <span className="text-3xl">✨</span> 平台特色
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                            <div className="text-3xl mb-4">🧩</div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2">十大核心演算法</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">從基礎的線性回歸到進階的 SVM 與隨機森林，圖解每個演算法的運作原理與應用場景。</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                            <div className="text-3xl mb-4">🤖</div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2">AI 虛擬助教陪伴</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">遇到不懂的地方？隨時召喚「小璃老師」，讓 AI 助教用最白話的方式為你解惑。</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                            <div className="text-3xl mb-4">🎮</div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2">互動測驗與進度</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">每個章節都配有觀念小測驗，並自動記錄你的學習進度，看著進度條填滿超有成就感！</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center pt-10 pb-16">
                    <h2 className="text-xl font-bold text-slate-800 mb-8">準備好開始你的 AI 學習之旅了嗎？</h2>
                    <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 duration-200">
                        🚀 開始探索演算法
                    </Link>
                </section>
            </div>
        </main>
    );
}