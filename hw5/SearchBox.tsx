"use client";

interface SearchBoxProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export default function SearchBox({ value, onChange, placeholder = "搜尋演算法..." }: SearchBoxProps) {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700 placeholder-slate-400 shadow-sm"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );
}