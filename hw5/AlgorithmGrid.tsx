"use client";

import { useEffect, useState } from 'react';
import AlgorithmCard from './AlgorithmCard';
import SearchBox from './SearchBox';

export default function AlgorithmGrid() {
    const [algorithms, setAlgorithms] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/algorithms')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data');
                return res.json();
            })
            .then(data => {
                setAlgorithms(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Fetch algorithms error:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center text-slate-500 py-10 bg-slate-100 rounded-lg animate-pulse">載入演算法資料中...</div>;
    }

    if (!algorithms || algorithms.length === 0) {
        return <div className="text-center text-slate-500 py-10 bg-slate-100 rounded-lg">無法載入演算法資料，請確認後端 FastAPI 是否已啟動。</div>;
    }

    const filteredAlgorithms = algorithms.filter(algo =>
        algo.name_zh.includes(searchTerm) ||
        algo.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        algo.category.includes(searchTerm) ||
        algo.one_liner.includes(searchTerm)
    );

    return (
        <div>
            <div className="max-w-md mx-auto mb-10">
                <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="輸入關鍵字 (如: 房價、分類、KNN)..." />
            </div>

            {filteredAlgorithms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAlgorithms.map((algo: any, index: number) => (
                        <AlgorithmCard key={algo.id} {...algo} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-500 py-10 bg-slate-50 rounded-lg border border-slate-100">
                    找不到符合「<span className="font-bold text-slate-700">{searchTerm}</span>」的演算法。
                </div>
            )}
        </div>
    );
}