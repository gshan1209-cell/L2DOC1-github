"use client";

export default function AlgorithmVisualizer({ type }: { type: string }) {
    const renderVisual = () => {
        switch (type) {
            case 'scatter-line':
                // 線性回歸：散佈點與一條擬合的直線
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-8">
                        {/* 散佈點 */}
                        <div className="absolute w-3 h-3 bg-blue-300 rounded-full top-[60%] left-[20%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-300 rounded-full top-[50%] left-[35%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-300 rounded-full top-[40%] left-[50%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-300 rounded-full top-[25%] left-[65%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-300 rounded-full top-[20%] left-[80%]"></div>

                        {/* 預測線條 (帶動畫) */}
                        <div className="absolute h-1 bg-red-500 w-[80%] rotate-[-25deg] origin-left left-[10%] animate-[scale-x_2s_ease-in-out_infinite_alternate]" style={{ transformOrigin: 'left center' }}></div>

                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">正在尋找誤差最小的直線...</div>
                    </div>
                );
            case 'logistic-curve':
                // 邏輯回歸：兩群資料與 S 型分類曲線
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-8">
                        {/* A 群 (0) */}
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[10%] left-[20%]"></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[15%] left-[30%]"></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[8%] left-[40%]"></div>

                        {/* B 群 (1) */}
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[10%] left-[60%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[15%] left-[70%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[5%] left-[80%]"></div>

                        {/* 決策邊界 */}
                        <div className="absolute w-[60%] h-full border-r-2 border-dashed border-red-400 transform -skew-x-[30deg]"></div>

                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">超過閥值則歸類為藍色</div>
                    </div>
                );
            case 'decision-tree':
                // 決策樹：條件分支
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
                            <path d="M200,40 L120,100 M200,40 L280,100 M120,100 L80,160 M120,100 L160,160 M280,100 L240,160 M280,100 L320,160" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                        </svg>
                        <div className="absolute top-[24px] w-24 h-8 bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm">天氣好嗎？</div>
                        <div className="absolute top-[84px] left-[calc(50%-120px-32px)] w-16 h-8 bg-blue-400 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm">有空嗎？</div>
                        <div className="absolute top-[84px] left-[calc(50%+120px-32px)] w-16 h-8 bg-blue-400 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm">有傘嗎？</div>
                        <div className="absolute top-[144px] left-[calc(50%-160px-24px)] w-12 h-8 bg-orange-400 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm animate-pulse">去爬山</div>
                        <div className="absolute top-[144px] left-[calc(50%-80px-24px)] w-12 h-8 bg-slate-400 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm">不出門</div>
                        <div className="absolute top-[144px] left-[calc(50%+80px-24px)] w-12 h-8 bg-orange-400 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm">去逛街</div>
                        <div className="absolute top-[144px] left-[calc(50%+160px-24px)] w-12 h-8 bg-slate-400 text-white text-[10px] font-bold flex items-center justify-center rounded-md shadow-sm animate-pulse">不出門</div>
                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">依條件層層向下分支</div>
                    </div>
                );
            case 'random-forest':
                // 隨機森林：多棵樹投票
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">
                        <div className="flex gap-8 mb-6">
                            <div className="w-12 h-16 bg-blue-50 border-2 border-blue-300 rounded-md flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🌲</div>
                            <div className="w-12 h-16 bg-blue-50 border-2 border-blue-300 rounded-md flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌲</div>
                            <div className="w-12 h-16 bg-blue-50 border-2 border-blue-300 rounded-md flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌲</div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="px-3 py-1 bg-slate-200 rounded text-sm text-slate-600 font-bold">A</div>
                            <div className="px-3 py-1 bg-slate-200 rounded text-sm text-slate-600 font-bold">B</div>
                            <div className="px-3 py-1 bg-slate-200 rounded text-sm text-slate-600 font-bold">A</div>
                            <span className="text-xl font-bold text-slate-400 mx-2">→</span>
                            <div className="px-4 py-2 bg-orange-400 rounded-lg text-sm text-white font-bold animate-pulse shadow-md">最終結果: A</div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">多棵決策樹共同多數決</div>
                    </div>
                );
            case 'svm-margin':
                // 支援向量機：最大間隔界線
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[30%] left-[20%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[45%] left-[25%] ring-4 ring-blue-200"></div> {/* 支援向量 */}
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[20%] left-[35%]"></div>

                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[20%] right-[30%]"></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[35%] right-[35%] ring-4 ring-orange-200"></div> {/* 支援向量 */}
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[30%] right-[15%]"></div>

                        {/* 分界線 (Hyperplane) 與 Margin */}
                        <div className="absolute h-[150%] w-1 bg-slate-700 rotate-[35deg] transform origin-center shadow-lg"></div>
                        <div className="absolute h-[150%] w-0 border-l-2 border-dashed border-slate-400 rotate-[35deg] transform origin-center -translate-x-6"></div>
                        <div className="absolute h-[150%] w-0 border-l-2 border-dashed border-slate-400 rotate-[35deg] transform origin-center translate-x-6"></div>

                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">尋找最安全、最寬的間隔界線</div>
                    </div>
                );
            case 'knn-neighbors':
                // KNN：K個最近鄰居
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[35%] left-[40%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[45%] left-[35%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[55%] left-[48%]"></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full top-[30%] left-[60%]"></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full top-[65%] left-[55%]"></div>

                        {/* 新資料點 */}
                        <div className="absolute w-4 h-4 bg-purple-500 rounded-full top-[48%] left-[42%] animate-pulse z-10 shadow-md"></div>
                        {/* 距離圈 (K=3) */}
                        <div className="absolute w-28 h-28 border-2 border-dashed border-purple-400 rounded-full top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite] bg-purple-500/5"></div>

                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">圈出最近的 K 個鄰居 (K=3) 決定分類</div>
                    </div>
                );
            case 'kmeans-clustering':
                // K-means：自動分群與中心點
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute w-24 h-24 bg-blue-100 rounded-full top-[20%] left-[20%] opacity-50 animate-pulse"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[25%] left-[30%]"></div>
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[35%] left-[22%]"></div>
                        <div className="absolute w-5 h-5 text-blue-700 font-black top-[28%] left-[25%] flex items-center justify-center drop-shadow-md">+</div>

                        <div className="absolute w-24 h-24 bg-orange-100 rounded-full bottom-[20%] right-[20%] opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[30%] right-[30%]"></div>
                        <div className="absolute w-3 h-3 bg-orange-400 rounded-full bottom-[25%] right-[22%]"></div>
                        <div className="absolute w-5 h-5 text-orange-700 font-black bottom-[25%] right-[26%] flex items-center justify-center drop-shadow-md">+</div>

                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">中心點反覆尋找相似群聚</div>
                    </div>
                );
            case 'naive-bayes-text':
                // 樸素貝氏：機率相乘
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">
                        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm mb-4">
                            <span className="text-rose-500 font-black animate-pulse inline-block mr-1">免費</span>
                            <span className="text-slate-600 mr-1">領取</span>
                            <span className="text-rose-500 font-black animate-pulse inline-block mr-1">中獎</span>
                            <span className="text-slate-600">通知</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">P(免費|垃圾)</div>
                            <span className="text-slate-400 font-bold">×</span>
                            <div className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">P(中獎|垃圾)</div>
                        </div>
                        <div className="mt-4 px-4 py-2 bg-rose-100 text-rose-700 font-bold rounded-full shadow-sm text-sm border border-rose-200">
                            預測：垃圾郵件 (95%)
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">根據特徵機率相乘進行分類</div>
                    </div>
                );
            case 'pca-projection':
                // 主成分分析：高維度降到 2D
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-8">
                        <div className="relative w-48 h-48 border-b-2 border-l-2 border-slate-300">
                            <div className="absolute w-3 h-3 bg-blue-300 rounded-full top-[20%] left-[20%] shadow-sm"></div>
                            <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[40%] left-[35%] shadow-sm"></div>
                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-[60%] left-[60%] shadow-sm"></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full top-[80%] left-[80%] shadow-sm"></div>

                            {/* 主成分投影線 */}
                            <div className="absolute top-0 left-0 w-[140%] h-[2px] bg-red-400 rotate-[45deg] origin-top-left border-dashed border-t-2 animate-pulse"></div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">保留重點差異，降維壓縮資料</div>
                    </div>
                );
            case 'gradient-descent':
                // 梯度下降：尋找錯誤率最低點
                return (
                    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">
                        <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
                            <path d="M50,20 Q200,250 350,20" stroke="#94a3b8" strokeWidth="4" fill="none" />
                        </svg>
                        {/* 步驟軌跡 */}
                        <div className="absolute w-3 h-3 bg-red-300 rounded-full top-[40px] left-[85px]"></div>
                        <div className="absolute w-3 h-3 bg-red-400 rounded-full top-[85px] left-[125px]"></div>
                        <div className="absolute w-3 h-3 bg-red-500 rounded-full top-[120px] left-[165px]"></div>

                        {/* 目前的球 */}
                        <div className="absolute w-6 h-6 bg-red-600 border-2 border-white rounded-full animate-bounce shadow-md top-[145px] left-[200px] -translate-x-1/2"></div>

                        <div className="absolute top-4 left-4 text-xs font-bold text-slate-400">目前誤差高</div>
                        <div className="absolute bottom-[35px] left-[200px] -translate-x-1/2 text-xs font-bold text-red-600 bg-white px-2 py-1 rounded-full shadow-sm">誤差最小 (谷底)</div>
                        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">循著斜率一步步尋找最低點</div>
                    </div>
                );
            default:
                return (
                    <div className="w-full h-64 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold">
                        {type} 動畫載入中...
                    </div>
                );
        }
    };

    return renderVisual();
}