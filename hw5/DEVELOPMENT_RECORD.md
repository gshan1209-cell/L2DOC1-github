# 機器學習前十大演算法互動學習網站 - 開發紀錄 (Development Record)

這份文件用於記錄專案的開發進度，並作為不同 AI Agent 之間的交接文件。下一個接手的 Agent 請優先閱讀此文件以了解目前進度。

## 1. 專案總覽
- **專案名稱**：機器學習前十大演算法互動學習網站 (ML Algorithm Tutor)
- **前端技術**：Next.js (App Router), TypeScript, Tailwind CSS, React
- **後端技術**：FastAPI, Python
- **核心目標**：建立新手友善的機器學習演算法互動教學網站，包含 10 大演算法圖解、測驗與 AI 助理 (Live2D/Fallback)。

## 2. 目前開發進度 (Current Phase)
**目前狀態：Phase 1 專案骨架與核心資料建立**

✅ **已完成 (Done)**:
1. 建立 `DEVELOPMENT_RECORD.md` (開發交接紀錄)。
2. 建立 `README.md` (包含專案介紹與啟動說明)。
3. 建立後端基礎結構 (`backend/main.py`, `backend/requirements.txt`)。
4. 建立後端 API 路由 (`backend/app/api/algorithms.py`)。
5. 建立核心演算法靜態資料 (`backend/app/data/algorithms.json`)，目前已寫入「線性回歸」與「邏輯回歸」的範例格式，需補齊另外 8 個。
6. 前端基礎架構建立：初始化 Next.js 首頁 (`frontend/app/page.tsx`)，實作 Hero 區塊。
7. 建立前端 `AlgorithmCard` 與 `AlgorithmGrid` 元件，並串接後端 API 顯示演算法列表。
8. 實作左側導覽列 `Sidebar` 與全局 `layout.tsx`，動態列出十大演算法並支援讀取 localStorage 顯示學習狀態。
9. 完成前端演算法詳細頁 (`algorithms/[slug]/page.tsx`)、學習完成進度按鈕以及初步的 `AlgorithmVisualizer` 圖解元件。
10. 完成 `algorithms.json` 剩下 8 個演算法靜態資料擴充，首頁與導覽列可呈現完整十大演算法。
11. 完成 AI 助理介面 `ChatAssistant.tsx` 與虛擬助教卡片 `Live2DFallbackAvatar.tsx`，並在後端對接 `/api/chat` Mock 路由。
12. 實作前端 `QuizBlock` 小測驗元件，並整合至詳細頁下方，同時與 `localStorage` 學習進度連動。
13. 將 FastAPI 的 `/api/chat` 路由改寫，串接 OpenAI API 提供真實的 AI 機器學習問答功能。
14. 擴充 `algorithms.json` 的 `quiz` 陣列，10 個演算法皆具備至少 3 題的互動測驗。
15. 補齊 `AlgorithmVisualizer.tsx` 的所有演算法 CSS 視覺圖解，讓 10 個主題都有生動的動畫示意。
16. 引入 `framer-motion`，為演算法卡片 (`AlgorithmCard.tsx`) 加上錯開的淡入滑動特效。
17. 建立 `SearchBox.tsx` 搜尋功能，並整合至 `AlgorithmGrid` (首頁) 與 `Sidebar` (導覽列)。
18. 實作綜合進度條 (`ProgressBar.tsx`) 並顯示於 `Sidebar` 最下方。
19. 實作「我的收藏」(favorites) 功能，建立 `FavoriteButton.tsx`，整合至詳細頁與卡片，並連動 `localStorage` 與 `Sidebar` 愛心標記。

❌ **待處理 (To-Do for Next Agent)**:
1. **功能擴充**：
   - 建立一個 `/favorites` 的專屬頁面，讓使用者可以集中查看他們有標記愛心的演算法。

## 3. 給下一個 Agent 的指示 (Prompt for Next Agent)

> **Hello Next Agent,**
> 請根據本專案的 `Gemini_機器學習前十大演算法互動學習網站_開發規格書.md` 以及此 `DEVELOPMENT_RECORD.md` 繼續開發。
> 
> **你接下來的首要任務是：**
> 1. 請建立一個 `/favorites` 的專屬頁面，顯示從 `localStorage` 讀取出來的收藏演算法清單。
> 2. 開發完成後，請更新此 `DEVELOPMENT_RECORD.md` 的進度。

---
*最後更新時間：2026-06-08*