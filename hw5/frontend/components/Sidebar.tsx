"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import algorithms from "../data/algorithms.json";

export default function Sidebar() {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    function sync() {
      const items = JSON.parse(localStorage.getItem("completed") || "[]") as string[];
      setCompleted(items);
    }
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <aside className="sticky top-0 h-screen bg-white/80 backdrop-blur-2xl border-r border-slate-200/60 flex-col z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden min-[900px]:flex custom-sidebar-scroll">

      {/* ================= 品牌 Logo 區塊 ================= */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
            ML
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight leading-tight">
              ML Tutor
            </h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
              互動學習平台
            </p>
          </div>
        </Link>
      </div>

      <div className="px-6 py-2">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />
      </div>

      {/* ================= 十大演算法選單 ================= */}
      <div className="flex-1 px-4 py-2 overflow-y-auto custom-sidebar-scroll">
        <h2 className="text-[11px] font-black text-slate-400 tracking-[0.2em] mb-4 mt-2 px-2 uppercase flex items-center gap-2">
          十大演算法
        </h2>
        <nav className="flex flex-col gap-1.5">
          {algorithms.map((algo) => {
            const isActive = pathname === ("/algorithms/" + algo.slug);
            const isCompleted = completed.includes(algo.slug);

            return (
              <Link
                key={algo.slug}
                href={"/algorithms/" + algo.slug}
                className={
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden " +
                  (isActive
                    ? "bg-blue-50/80 text-blue-700 shadow-sm ring-1 ring-blue-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:ring-1 hover:ring-slate-200/50")
                }
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                )}

                {/* Number Badge */}
                <span
                  className={
                    "flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-all duration-300 z-10 " +
                    (isActive
                      ? "bg-white text-blue-600 shadow-md shadow-blue-500/10"
                      : "bg-slate-100/80 text-slate-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm")
                  }
                >
                  {algo.id.toString().padStart(2, "0")}
                </span>

                {/* Title */}
                <span className="flex-1 truncate z-10 tracking-wide">{algo.name_zh}</span>

                {/* Check Icon for Completed Status */}
                {isCompleted && (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 flex-shrink-0 z-10 shadow-sm transition-transform hover:scale-110" title="已完成學習">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Subtle Background effect for hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= 底部導覽選單 ================= */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-200/60 backdrop-blur-md">
        <h2 className="text-[11px] font-black text-slate-400 tracking-[0.2em] mb-3 px-2 uppercase">
          探索更多
        </h2>
        <nav className="flex flex-col gap-1.5">
          <Link
            href="/favorites"
            className={
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group " +
              (pathname === "/favorites"
                ? "bg-rose-50 text-rose-700 shadow-sm ring-1 ring-rose-100/50"
                : "text-slate-600 hover:bg-white hover:text-rose-600 hover:shadow-sm hover:ring-1 hover:ring-slate-200/50")
            }
          >
            <span className={
              "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 " +
              (pathname === "/favorites"
                ? "bg-white text-rose-500 shadow-md shadow-rose-500/10"
                : "bg-slate-100/80 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500")
            }>
              <svg className="w-4 h-4" fill={pathname === "/favorites" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </span>
            我的收藏
          </Link>
          <Link
            href="/about"
            className={
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group " +
              (pathname === "/about"
                ? "bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-100/50"
                : "text-slate-600 hover:bg-white hover:text-purple-600 hover:shadow-sm hover:ring-1 hover:ring-slate-200/50")
            }
          >
            <span className={
              "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 " +
              (pathname === "/about"
                ? "bg-white text-purple-500 shadow-md shadow-purple-500/10"
                : "bg-slate-100/80 text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-500")
            }>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            關於本站
          </Link>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.2);
          border-radius: 20px;
        }
        .custom-sidebar-scroll:hover::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.4);
        }
      `}} />
    </aside>
  );
}
