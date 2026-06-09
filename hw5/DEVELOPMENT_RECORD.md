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
7. **UI/UX 現代化優化**：全面導入 Tailwind CSS，優化首頁、演算法內容頁及各項元件（包含卡片懸浮、測驗回饋、AI 助教動畫等）。
8. **AI 協作環境**：建立 `AGENT.md` 與 `GEMINI.md`，統整多模型協作規範與指令。
9. **收藏功能**：建立 `/favorites` 的專屬頁面，顯示從 `localStorage` 讀取出來的收藏演算法清單。
10. **學習進度**：建立 `/progress` 頁面，讀取 `localStorage` 狀態並視覺化呈現學習進度與剩餘演算法。
11. **綜合測驗**：建立 `/quiz` 頁面，從資料庫中隨機抽取測驗題，並提供即時的答題回饋與最終成績結算。
12. **UI/UX 全站優化**：針對全站卡片、按鈕增加微互動動畫 (縮放、發光)、強化 Glassmorphism 毛玻璃特效與過渡動畫。

❌ **待處理 (To-Do for Next Agent)**:
1. **持續優化與擴充**：
   - 增加更多進階演算法。
   - 考慮加入使用者帳號系統 (若未來需取代 localStorage)。

## 3. 給下一個 Agent 的指示 (Prompt for Next Agent)

> **Hello Next Agent,**
> 請根據本專案的 `Gemini_機器學習前十大演算法互動學習網站_開發規格書.md` 以及此 `DEVELOPMENT_RECORD.md` 繼續開發。
> 
> **你接下來的首要任務是：**
> 1. 確認系統目前功能是否已滿足所有需求，並協助使用者進行進一步的客製化或除錯。
> 2. 開發完成後，請更新此 `DEVELOPMENT_RECORD.md` 的進度。

---
*最後更新時間：2026-06-09 (UI 優化與測驗系統上線)*
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
