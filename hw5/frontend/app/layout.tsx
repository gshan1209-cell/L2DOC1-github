import type { Metadata } from "next";

import ChatAssistant from "../components/ChatAssistant";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ML Algorithm Tutor",
  description: "十大機器學習演算法互動學習網站"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="app-shell">
          <Sidebar />
          <main className="content">{children}</main>
        </div>
        <ChatAssistant />
      </body>
    </html>
  );
}
