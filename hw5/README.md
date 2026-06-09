# ML Algorithm Tutor

機器學習前十大演算法互動學習網站。專案已整理為正式的前後端結構：

```text
hw5/
  backend/   FastAPI API server
  frontend/  Next.js App Router website
```

## 啟動後端

```powershell
cd D:\SeanLin\Python\hw5\backend
..\..\.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8010
```

後端 API：

```text
http://127.0.0.1:8010
http://127.0.0.1:8010/docs
```
n
## 啟動前端

```powershell
cd D:\SeanLin\Python\hw5\frontend
$env:NEXT_PUBLIC_BACKEND_URL="http://127.0.0.1:8010"
npm run dev -- -p 4000
```

網站：

```text
http://localhost:3000
```

## 已完成功能

- Next.js App Router 前端
- FastAPI 後端
- 演算法卡片、搜尋、分類與難度篩選
- 演算法詳細頁與簡單視覺化
- 收藏頁
- localStorage 學習進度
- AI 助教面板，透過後端 `/api/chat/` 串接 OpenAI API

若要啟用 AI 助教，請在環境變數設定：

```powershell
$env:OPENAI_API_KEY="your_api_key_here"
```
