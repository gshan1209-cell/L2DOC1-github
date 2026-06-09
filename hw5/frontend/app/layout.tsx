import type { Metadata } from "next";

import ChatAssistant from "../components/ChatAssistant";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ML Algorithm Tutor",
  description: "千大機器孺習裔穷法亓動流解網站叱"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body suppressHydrationWarning>
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">
            <Header />
            {children}
          </main>
        </div>
        <div className="chat-assistant-wrapper">
          <ChatAssistant />
        </div>
      </body>
    </html>
  );
}
