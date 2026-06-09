"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrainCircuit, CheckCircle, XCircle, ArrowRight, RefreshCw } from "lucide-react";

type QuizQuestion = {
    algoSlug: string;
    algoName: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
};

export default function QuizPage() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8010";
                const res = await fetch(`${baseUrl}/api/algorithms/`);
                if (res.ok) {
                    const data = await res.json();
                    const allQuestions: QuizQuestion[] = [];
                    data.forEach((algo: any) => {
                        if (algo.quiz && Array.isArray(algo.quiz)) {
                            algo.quiz.forEach((q: any) => {
                                allQuestions.push({
                                    algoSlug: algo.slug,
                                    algoName: algo.name_zh,
                                    question: q.question,
                                    options: q.options,
                                    answer: q.answer,
                                    explanation: q.explanation,
                                });
                            });
                        }
                    });
                    // 隨機打亂所有題目
                    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
                    // 取前 10 題作為綜合測驗
                    setQuestions(shuffled.slice(0, 10));
                }
            } catch (error) {
                console.error("無法取得測驗資料:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleOptionClick = (option: string) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);

        if (option === questions[currentQuestionIndex].answer) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setQuizFinished(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">目前沒有可用的測驗題</p>
                    <Link href="/algorithms" className="text-purple-600 font-medium hover:underline">
                        回到演算法列表
                    </Link>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                    <BrainCircuit className="w-8 h-8 text-purple-500" />
                    <h1 className="text-3xl font-bold text-gray-800">綜合測驗</h1>
                </div>

                {!quizFinished ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-medium text-gray-500">
                                    第 {currentQuestionIndex + 1} / {questions.length} 題
                                </span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100">
                                    {currentQ.algoName}
                                </span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                                {currentQ.question}
                            </h2>

                            <div className="space-y-3">
                                {currentQ.options.map((option, idx) => {
                                    let buttonClass = "w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium ";

                                    if (!isAnswered) {
                                        buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700";
                                    } else {
                                        if (option === currentQ.answer) {
                                            buttonClass += "border-green-500 bg-green-50 text-green-700";
                                        } else if (option === selectedOption) {
                                            buttonClass += "border-red-500 bg-red-50 text-red-700";
                                        } else {
                                            buttonClass += "border-gray-200 text-gray-400 opacity-50";
                                        }
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(option)}
                                            disabled={isAnswered}
                                            className={buttonClass}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{option}</span>
                                                {isAnswered && option === currentQ.answer && <CheckCircle className="w-5 h-5 text-green-500" />}
                                                {isAnswered && option === selectedOption && option !== currentQ.answer && <XCircle className="w-5 h-5 text-red-500" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {isAnswered && (
                                <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
                                    <h3 className="font-bold text-blue-800 mb-2">解析：</h3>
                                    <p className="text-blue-700">{currentQ.explanation}</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleNextQuestion}
                                disabled={!isAnswered}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors ${isAnswered
                                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {currentQuestionIndex < questions.length - 1 ? "下一題" : "查看成績"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BrainCircuit className="w-12 h-12 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">測驗完成！</h2>
                        <p className="text-gray-500 mb-8">來看看你對機器學習演算法的掌握程度吧</p>

                        <div className="flex justify-center gap-8 mb-10">
                            <div className="text-center">
                                <div className="text-4xl font-black text-purple-600 mb-1">{score}</div>
                                <div className="text-sm text-gray-500 font-medium">答對題數</div>
                            </div>
                            <div className="w-px bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-gray-800 mb-1">{questions.length}</div>
                                <div className="text-sm text-gray-500 font-medium">總題數</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={handleRestart}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors shadow-sm"
                            >
                                <RefreshCw className="w-5 h-5" />
                                重新測驗
                            </button>
                            <Link
                                href="/algorithms"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors"
                            >
                                繼續學習
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}