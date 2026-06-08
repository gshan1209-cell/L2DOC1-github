"use client";

import { useState, useEffect } from 'react';

interface FavoriteButtonProps {
    slug: string;
    size?: 'sm' | 'md';
}

export default function FavoriteButton({ slug, size = 'md' }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const loadFavorites = () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('ml_tutor_favorites') || '[]');
                setIsFavorite(favorites.includes(slug));
            } catch (e) {
                console.error("Parse favorites error", e);
            }
        };
        loadFavorites();

        window.addEventListener('favoritesUpdated', loadFavorites);
        return () => window.removeEventListener('favoritesUpdated', loadFavorites);
    }, [slug]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault(); // 防止觸發外層的 Link 導覽
        e.stopPropagation();

        try {
            let favorites = JSON.parse(localStorage.getItem('ml_tutor_favorites') || '[]');
            if (isFavorite) {
                favorites = favorites.filter((item: string) => item !== slug);
            } else {
                favorites.push(slug);
            }
            localStorage.setItem('ml_tutor_favorites', JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
            window.dispatchEvent(new Event('favoritesUpdated')); // 觸發全域事件
        } catch (e) {
            console.error("Save favorites error", e);
        }
    };

    const iconSize = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';

    return (
        <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors flex items-center justify-center z-10 ${isFavorite ? 'text-rose-500 bg-rose-50 hover:bg-rose-100' : 'text-slate-300 bg-slate-50 hover:text-rose-400 hover:bg-slate-100'}`}
            title={isFavorite ? '取消收藏' : '加入收藏'}
        >
            <svg className={iconSize} fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    );
}