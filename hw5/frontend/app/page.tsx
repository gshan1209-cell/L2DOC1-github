import Link from "next/link";
import AlgorithmGrid from "../components/AlgorithmGrid";
import ProgressBar from "../components/ProgressBar";
import { getAlgorithms } from "../lib/algorithms";

export default function HomePage() {
  const algorithms = getAlgorithms();
  const categories = new Set(algorithms.map((item) => item.displayCategory));

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* ================= 頂部 Hero 區塊 ================= */}
      <section className="relative bg-gradient-to-b from-blue-50/50 to-white pt-20 pb-16 px-6 lg:px-12 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            輕鬆搞懂 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">機器學習</span>
            <br />不再被數學公式打敗
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            用卡片、視覺化、收藏、進度與 AI 助教，把十大機器學習演算法整理成可以反覆練習的學習介面。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/about" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all shadow-sm border border-slate-200 hover:border-slate-300">
              了解平台特色
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 演算法網格區塊 ================= */}
      <section className="py-16 px-6 lg:px-12 bg-slate-50/50 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">探索十大演算法</h2>
              <p className="text-slate-500 font-medium">挑選你想學習的主題，點擊卡片即可開始</p>
            </div>

            <div className="flex-grow max-w-sm w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-center">
              <ProgressBar total={algorithms.length} />
            </div>
          </div>

          <AlgorithmGrid algorithms={algorithms} />
        </div>
      </section>
    </main>
  );
}
