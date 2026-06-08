"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchBox from './SearchBox';
import ProgressBar from './ProgressBar';

interface Algorithm {
    id: number;
    slug: string;
    name_zh: string;
    category: string;
}

export default function Sidebar() {
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
    const [learned, setLearned] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        // 1. 從後端取得演算法列表
        fetch('/api/algorithms')
            .then(res => res.json())
            .then(data => setAlgorithms(data))
            .catch(err => console.error("Fetch algorithms error:", err));

        // 2. 從 localStorage 讀取學習進度，判斷哪些已經學習過
        const loadProgress = () => {
            try {
                const savedProgress = JSON.parse(localStorage.getItem('ml_tutor_progress') || '{}');
                const learnedSlugs = Object.keys(savedProgress).filter(key => savedProgress[key]?.is_completed);
                setLearned(learnedSlugs);
            } catch (e) {
                console.error("Parse progress error", e);
            }
        };

        const loadFavorites = () => {
            try {
                const savedFavorites = JSON.parse(localStorage.getItem('ml_tutor_favorites') || '[]');
                setFavorites(savedFavorites);
            } catch (e) {
                console.error("Parse favorites error", e);
            }
        };

        loadProgress();
        loadFavorites();

        // 監聽進度更新事件 (讓後續實作測驗完成時，側邊欄可以即時更新打勾狀態)
        window.addEventListener('progressUpdated', loadProgress);
        window.addEventListener('favoritesUpdated', loadFavorites);
        return () => {
            window.removeEventListener('progressUpdated', loadProgress);
            window.removeEventListener('favoritesUpdated', loadFavorites);
        };
    }, []);

    const filteredAlgorithms = algorithms.filter(algo =>
        algo.name_zh.includes(searchTerm) ||
        algo.category.includes(searchTerm)
    );

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto hidden md:flex flex-col shadow-sm flex-shrink-0 z-50">
            <div className="p-6 border-b border-slate-100">
                <Link href="/" className="text-xl font-extrabold text-slate-800 hover:text-blue-600 transition-colors">
                    ML Tutor
                </Link>
                <p className="text-xs text-slate-500 mt-1">機器學習互動學習平台</p>
            </div>

            <div className="p-4 flex-grow">
                <div className="mb-6">
                    <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="搜尋清單..." />
                </div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">學習清單 (十大演算法)</h2>
                <nav className="space-y-1">
                    {filteredAlgorithms.map((algo) => {
                        const isLearned = learned.includes(algo.slug);
                        const isActive = pathname === `/algorithms/${algo.slug}`;

                        return (
                            <Link
                                key={algo.slug}
                                href={`/algorithms/${algo.slug}`}
                                className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-blue-50 border-blue-100 shadow-sm' : 'hover:bg-slate-50 border-transparent'
                                    } border`}
                            >
                                {/* 狀態打勾圓圈 */}
                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 flex items-center justify-center transition-colors ${isLearned
                                    ? 'bg-green-500 border-green-500 shadow-sm'
                                    : isActive
                                        ? 'border-blue-400 bg-white'
                                        : 'border-slate-300 bg-slate-50 group-hover:border-slate-400'
                                    }`}>
                                    {isLearned && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>

                                {/* 名稱與分類 */}
                                <div className="min-w-0 flex-1">
                                    <div className={`text-sm font-bold truncate ${isActive ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                        {algo.name_zh}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-medium truncate">
                                        {algo.category}
                                    </div>
                                </div>
                                {favorites.includes(algo.slug) && (
                                    <svg className="w-4 h-4 text-rose-500 flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* 底部綜合進度條 */}
            {algorithms.length > 0 && (
                <ProgressBar current={learned.length} total={algorithms.length} />
            )}
        </aside>
    );
}