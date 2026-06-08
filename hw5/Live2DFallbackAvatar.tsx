"use client";

export default function Live2DFallbackAvatar({ state = "idle", size = "md" }: { state?: string, size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "w-10 h-10 text-xl",
        md: "w-14 h-14 text-2xl",
        lg: "w-20 h-20 text-4xl"
    };
    const animClass = state === 'speaking' ? 'animate-pulse' : state === 'thinking' ? 'animate-bounce' : '';

    return (
        <div className={`${sizeClasses[size]} bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300 shadow-sm ${animClass}`}>
            <span>{state === 'speaking' ? '🗣️' : state === 'thinking' ? '🤔' : state === 'confused' ? '😵‍💫' : '👩‍🏫'}</span>
        </div>
    );
}