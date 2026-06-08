# 機器學習前十大演算法互動學習網站 - 開發紀錄 (Development Record)

這份文件用於記錄專案的開發進度，並作為不同 AI Agent 之間的交接文件。下一個接手的 Agent 請優先閱讀此文件以了解目前進度。

## 1. 專案總覽
- **專案名稱**：機器學習前十大演算法互動學習網站 (ML Algorithm Tutor)
- **技術架構**：Next.js (App Router), TypeScript, Tailwind CSS, React
- **核心目標**：建立新手友善的機器學習演算法互動教學網站，包含 10 大演算法圖解、測驗與 AI 助理 (Live2D/Fallback)。

## 2. 目前開發進度 (Current Phase)
**目前狀態：功能趨近完成，待整合與優化**

✅ **已完成 (Done)**:
1. **專案架構重構**：將專案從前後端分離重構為純 Next.js 應用，移除獨立的 Python 後端，並將所有 API 邏輯移轉至 Next.js API Routes。
2. **核心內容與 API**：完成十大演算法的靜態資料 (`data/algorithms.json`) 與對應的 API (`/api/algorithms`)。
3. **前端核心頁面**：完成首頁、演算法詳細頁、關於我們頁面。
4. **核心元件**：完成演算法卡片、左側導覽列、搜尋框、進度條、視覺圖解等元件。
5. **互動功能**：完成小測驗 (`QuizBlock`)、收藏 (`FavoriteButton`)、學習進度標記功能，並與 `localStorage` 連動。
6. **AI 助理**：完成 AI 助理聊天介面 (`ChatAssistant`)，並透過 API Route 串接 OpenAI API。

❌ **待處理 (To-Do for Next Agent)**:
1. **功能擴充**：
   - 建立一個 `/favorites` 的專屬頁面，讓使用者可以集中查看他們有標記愛心的演算法。

## 3. 給下一個 Agent 的指示 (Prompt for Next Agent)

> **Hello Next Agent,**
> 請根據本專案的 `Gemini_機器學習前十大演算法互動學習網站_開發規格書.md` 以及此 `DEVELOPMENT_RECORD.md` 繼續開發。
> 
> **你接下來的首要任務是：**
> 1. 請建立一個 `/favorites` 的專屬頁面，顯示從 `localStorage` 讀取出來的收藏演算法清單。
> 2. 請在 `Sidebar` 左側導覽列加上 `/about` 與 `/favorites` 的導覽連結。
> 3. 開發完成後，請更新此 `DEVELOPMENT_RECORD.md` 的進度。

---
*最後更新時間：2026-06-08*
---

## 2026-06-08 Refactor Update

已將原本散落在 `hw5/` 根目錄的檔案重構為正式前後端專案：

```text
hw5/
  backend/
    main.py
    algorithms.py
    chat.py
    data/algorithms.json
    requirements.txt
  frontend/
    app/
    components/
    data/algorithms.json
    lib/
    package.json
```

目前可執行服務：

- Backend: FastAPI, `http://127.0.0.1:8010`
- Frontend: Next.js App Router, `http://localhost:3000`

前端已完成：

- 首頁演算法卡片
- 搜尋、分類與難度篩選
- 演算法詳細頁
- 簡單 SVG 視覺化
- 收藏頁
- localStorage 學習進度
- AI 助教面板與 `/api/chat` proxy

驗證紀錄：

- `npm install` 完成
- `npm audit` 回報 0 vulnerabilities
- `npm run build` 通過
- FastAPI `/api/algorithms/` 回傳 10 筆資料
