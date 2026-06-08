import Sidebar from './Sidebar';
import ChatAssistant from './ChatAssistant';

export const metadata = {
    title: 'ML Algorithm Tutor 機器學習互動學習平台',
    description: '用白話、圖解與 AI 助理，帶你從零理解機器學習前十大核心演算法。',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-TW" className="scroll-smooth">
            <body className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 antialiased">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    {children}
                </div>
                <ChatAssistant />
            </body>
        </html>
    );
}