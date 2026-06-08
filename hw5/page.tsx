import { notFound } from 'next/navigation';
import AlgorithmVisualizer from '../../AlgorithmVisualizer';
import MarkCompleteButton from '../../MarkCompleteButton';
import QuizBlock from '../../QuizBlock';
import FavoriteButton from '../../FavoriteButton';

async function getAlgorithmData(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/algorithms/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Fetch algorithm details error:", error);
        return null;
    }
}

export default async function AlgorithmDetailPage({ params }: { params: { slug: string } }) {
    const data = await getAlgorithmData(params.slug);

    if (!data) {
        notFound();
    }

    return (
        <main className="p-8 lg:p-12 max-w-5xl mx-auto w-full">
            {/* 頁首 Hero */}
            <header className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">{data.category}</span>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-200 text-slate-700">難度：{data.difficulty}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{data.name_zh}</h1>
                <h2 className="text-xl text-slate-400 font-medium tracking-wide mb-6">{data.name_en}</h2>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg mb-6">
                    <p className="text-lg text-blue-900 font-bold">💡 {data.one_liner}</p>
                </div>

                <div className="flex items-center gap-4">
                    <MarkCompleteButton slug={data.slug} />
                    <FavoriteButton slug={data.slug} size="md" />
                </div>
            </header>

            {/* 視覺化圖解區塊 */}
            <section className="mb-12">
                <h3 className="text-xl font-bold text-slate-800 mb-4">互動圖解</h3>
                <AlgorithmVisualizer type={data.visual_type} />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 左欄：說明與比喻 */}
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">📖 詳細說明</h3>
                        <p className="text-slate-600 leading-relaxed">{data.description}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">🍎 生活化比喻</h3>
                        <p className="text-slate-600 italic bg-amber-50 p-4 rounded-lg border border-amber-100">{data.analogy}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">⚙️ 運作流程</h3>
                        <ol className="list-decimal list-inside space-y-2 text-slate-600 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            {data.how_it_works.map((step: string, idx: number) => (
                                <li key={idx} className="pb-1">{step}</li>
                            ))}
                        </ol>
                    </section>
                </div>

                {/* 右欄：優缺點與應用 */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">🚀 實務應用</h3>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                            {data.use_cases.map((use_case: string, idx: number) => <li key={idx}>{use_case}</li>)}
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">⚠️ 常見誤解</h3>
                        <ul className="list-disc list-inside space-y-1 text-rose-600 font-medium">
                            {data.common_mistakes.map((mistake: string, idx: number) => <li key={idx}>{mistake}</li>)}
                        </ul>
                    </section>
                </div>
            </div>

            {/* 互動測驗區塊 */}
            {data.quiz && data.quiz.length > 0 && (
                <section className="mt-16">
                    <QuizBlock quiz={data.quiz} slug={data.slug} />
                </section>
            )}
        </main>
    );
}