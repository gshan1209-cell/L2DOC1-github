# ML Algorithm Tutor 機器學習互動學習平台

這是一個適合新手小白學習機器學習的互動式網站。透過白話解釋、生活化比喻、圖解動畫以及虛擬 AI 助理，帶領使用者無痛理解機器學習前十大核心演算法。

## 🚀 技術棧 (Tech Stack)
- **框架 (Framework)**：Next.js (App Router)
- **前端 (Frontend)**：React, TypeScript, Tailwind CSS, Framer Motion
- **AI 助理 (AI Assistant)**：OpenAI API, Live2D / CSS 動畫 Fallback
- **資料庫**：SQLite (使用者進度 / 收藏) / JSON (靜態內容)

## ✨ 功能列表
1. **十大演算法互動學習**：提供線性回歸、邏輯回歸、決策樹、隨機森林、SVM、KNN、K-means、樸素貝氏、PCA、梯度下降的白話教學與圖解。
2. **AI 助理問答**：「小璃老師」提供白話解答與學習建議。
3. **學習進度與小測驗**：每章節包含互動小測驗，並可記錄學習進度與收藏。
4. **響應式設計**：支援桌機與手機瀏覽。

## 📂 專案結構
```text
.
├── app/            # Next.js 頁面與 API 路由
│   ├── api/        # 後端 API 邏輯
│   └── (pages)/    # 頁面路由
├── components/     # 共用 React 元件
├── data/           # 靜態資料 (JSON)
├── DEVELOPMENT_RECORD.md # 開發進度與交接紀錄
└── README.md       # 專案說明
```

## 啟動方式

### 前端啟動
```bash
cd D:\SeanLin\Python\hw5\frontend
npm install
npm run dev
```
預設運行於 `http://localhost:3000`

### 後端啟動
```bash
cd D:\SeanLin\Python\hw5\backend
pip install -r requirements.txt
..\.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```
預設運行於 `http://localhost:8000`

## 環境變數設定
請在 backend 目錄下建立 `.env`：
```env
OPENAI_API_KEY=your_api_key_here
```