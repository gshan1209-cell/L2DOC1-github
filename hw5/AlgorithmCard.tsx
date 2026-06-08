"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

interface AlgorithmCardProps {
    id: number;
    slug: string;
    name_zh: string;
    name_en: string;
    category: string;
    difficulty: string;
    one_liner: string;
    index?: number;
}

export default function AlgorithmCard({ id, slug, name_zh, name_en, category, difficulty, one_liner, index = 0 }: AlgorithmCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="h-full"
        >
            <Link href={`/algorithms/${slug}`} className="group block h-full">
                <div className="relative h-full flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 overflow-hidden">
                    {/* 編號與難度 */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">
                                {id.toString().padStart(2, '0')}
                            </span>
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100 h-fit">
                                {difficulty}
                            </span>
                        </div>
                        <FavoriteButton slug={slug} size="sm" />
                    </div>

                    {/* 標題與分類 */}
                    <div className="mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{category}</span>
                        <h3 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition-colors">
                            {name_zh}
                        </h3>
                        <p className="text-sm text-slate-400 font-medium">{name_en}</p>
                    </div>

                    {/* 白話解釋 */}
                    <p className="text-slate-600 text-sm mt-3 flex-grow">{one_liner}</p>

                    {/* 互動提示 */}
                    <div className="mt-6 flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        開始學習 <span className="ml-2">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}