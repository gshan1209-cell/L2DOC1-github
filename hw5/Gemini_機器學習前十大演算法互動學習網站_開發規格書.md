# Gemini 開發規格書提示語｜機器學習前十大演算法互動學習網站

請根據以下規格，開發一個「機器學習前十大演算法互動學習網站」。

本專案要把「機器學習前十大演算法」的靜態圖片，轉換成一個可互動、可學習、可問答的動態網頁。

前端使用：

- Next.js
- React
- TypeScript
- Tailwind CSS

後端使用：

- FastAPI
- Python

AI 助理功能：

- 使用者可以針對每個演算法提問
- AI 助理可以用白話回答
- AI 助理最好以 Live2D 虛擬助教方式呈現
- 若 Live2D 模型資源尚未準備，請先用可替換的 Live2D 容器與 fallback 角色卡片實作

---

# 一、專案目標

本專案的目標是建立一個適合新手小白學習機器學習的互動式網站。

使用者進入網站後，可以看到「機器學習前十大演算法」的互動式總覽，並可點選不同演算法主題進入學習頁面。

每個主題都要提供：

1. 白話解釋
2. 生活化比喻
3. 簡單圖解
4. 實務應用
5. 適合什麼問題
6. 優點與限制
7. 新手常見誤解
8. 小測驗
9. AI 助理問答
10. 學習進度記錄

網站要讓完全沒有資訊背景的人，也能理解機器學習演算法的基本概念。

---

# 二、參考圖片內容

請將原本的靜態資訊圖轉換成互動式學習頁面。

原圖主題為：

# 機器學習前十大演算法

圖片中包含以下 10 個演算法：

1. 線性回歸 Linear Regression
2. 邏輯回歸 Logistic Regression
3. 決策樹 Decision Tree
4. 隨機森林 Random Forest
5. 支援向量機 SVM
6. K 近鄰演算法 K-Nearest Neighbors
7. K-means 分群 K-means Clustering
8. 樸素貝氏分類 Naive Bayes
9. 梯度下降法 Gradient Descent
10. 主成分分析 PCA

請把這張圖片的概念延伸成完整互動網站，而不是只把圖片貼到網頁上。

---

# 三、網站定位

網站定位為：

# 新手友善的機器學習互動學習平台

核心精神：

不是教使用者寫複雜公式，而是先讓使用者理解：

- 這個演算法在解決什麼問題
- 它像生活中的什麼情境
- 它適合用在哪裡
- 什麼時候不適合用
- 新手應該如何選擇演算法

請避免過度學術化。

請用白話、圖解、互動、卡片、動畫來降低學習門檻。

---

# 四、使用者角色

主要使用者：

1. AI / 資料科學初學者
2. 沒有程式背景但想理解機器學習的人
3. 學生
4. 產品經理
5. 行銷或業務人員
6. 企業主管
7. 想快速理解演算法差異的人

---

# 五、核心功能總覽

本系統需包含以下功能：

1. 首頁互動總覽
2. 十大演算法主題卡片
3. 演算法詳細學習頁
4. 圖解動畫區
5. AI 助理問答區
6. Live2D 虛擬助教
7. 主題式小測驗
8. 學習進度紀錄
9. 搜尋功能
10. 收藏功能
11. 推薦下一個學習主題
12. 後端 API 管理演算法內容
13. AI 問答 API
14. 使用者學習紀錄 API
15. 響應式設計，支援桌機與手機

---

# 六、前端技術規格

## 6.1 前端框架

使用 Next.js。

建議使用：

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Server Components 適度使用
- Client Components 用於互動區塊

## 6.2 前端建議套件

可使用以下套件：

- framer-motion：動畫與轉場
- lucide-react：圖示
- zustand：前端狀態管理
- react-markdown：顯示 AI 回答或學習內容
- axios 或 fetch：串接 FastAPI
- react-syntax-highlighter：若未來需要程式碼範例
- pixi.js 或 live2d-widget：Live2D 呈現
- clsx / tailwind-merge：className 管理

## 6.3 前端頁面結構

請建立以下頁面：

```text
/
首頁：十大演算法互動總覽

/algorithms
演算法列表頁

/algorithms/[slug]
單一演算法詳細學習頁

/quiz
綜合測驗頁

/progress
學習進度頁

/favorites
收藏頁

/about
網站介紹頁
```

---

# 七、首頁設計

首頁要有強烈的學習入口感。

## 7.1 首頁區塊

首頁包含：

1. Hero 區塊
2. 機器學習是什麼
3. 十大演算法互動總覽
4. 任務類型分類
5. AI 助理介紹
6. 推薦學習路線
7. 開始學習 CTA

## 7.2 Hero 區塊

標題：

# 機器學習前十大演算法

副標：

用白話、圖解與 AI 助理，帶你從零理解機器學習核心工具。

CTA 按鈕：

- 開始學習
- 問 AI 助理
- 查看十大演算法

視覺效果：

- 背景使用資料點、線條、節點網路動畫
- 卡片淡入
- 演算法名稱輪播
- AI 助理角色浮在右側

## 7.3 十大演算法互動總覽

請將 10 個演算法做成卡片。

每張卡片包含：

- 編號
- 中文名稱
- 英文名稱
- 任務類型
- 一句白話解釋
- 生活化例子
- 難度標籤
- 點擊進入詳細頁

卡片 hover 效果：

- 微放大
- 邊框發光
- 顯示「開始學習」
- 背景出現簡單動畫

---

# 八、十大演算法資料結構

請建立前端與後端共用概念的資料欄位。

每個演算法至少包含：

```json
{
  "id": 1,
  "slug": "linear-regression",
  "name_zh": "線性回歸",
  "name_en": "Linear Regression",
  "category": "回歸",
  "difficulty": "入門",
  "one_liner": "用一條線預測數字。",
  "analogy": "像用房子坪數估算房價。",
  "description": "白話詳細說明",
  "how_it_works": ["步驟一", "步驟二", "步驟三"],
  "use_cases": ["房價預測", "銷售額預測", "成本估算"],
  "pros": ["簡單好理解", "適合入門", "結果容易解釋"],
  "cons": ["不適合太複雜的非線性關係", "容易受極端值影響"],
  "common_mistakes": ["以為所有資料都適合用直線解釋"],
  "visual_type": "scatter-line",
  "quiz": [
    {
      "question": "線性回歸最適合用來做什麼？",
      "options": ["預測連續數字", "把圖片分群", "壓縮圖片", "產生文字"],
      "answer": "預測連續數字",
      "explanation": "線性回歸常用於預測房價、銷售額等連續數值。"
    }
  ]
}
```

---

# 九、十大演算法內容要求

請內建以下 10 個主題資料。

## 9.1 線性回歸 Linear Regression

定位：

預測連續數字。

白話：

用一條最適合的線，描述資料之間的關係。

生活例子：

用房子坪數預測房價。

實務應用：

- 房價預測
- 銷售額預測
- 成本估算
- 溫度預測

動畫：

資料點逐一出現，紅色預測線慢慢畫出。

## 9.2 邏輯回歸 Logistic Regression

定位：

預測是或不是的機率。

白話：

雖然名字有回歸，但常用來做二分類。

生活例子：

判斷一封信是不是垃圾郵件。

實務應用：

- 垃圾郵件判斷
- 客戶是否流失
- 是否會購買
- 是否通過審核

動畫：

兩群資料點出現，中間顯示分類曲線或分界。

## 9.3 決策樹 Decision Tree

定位：

像流程圖一樣做判斷。

白話：

一步一步問問題，最後做出決定。

生活例子：

天氣好嗎？有空嗎？要不要出門？

實務應用：

- 貸款審核
- 客戶分類
- 醫療初步判斷
- 產品推薦

動畫：

樹狀節點一層一層展開。

## 9.4 隨機森林 Random Forest

定位：

很多棵決策樹一起投票。

白話：

一棵樹可能判斷錯，很多棵樹一起投票會更穩。

生活例子：

很多位專家一起投票，比一個人決定更可靠。

實務應用：

- 信用風險評估
- 銷售預測
- 客戶流失預測
- 特徵重要性分析

動畫：

多棵樹出現，每棵樹投票，最後多數決。

## 9.5 支援向量機 SVM

定位：

找到最穩的分界線。

白話：

把不同類別的資料分開，並讓中間間隔盡量大。

生活例子：

在兩群人中間畫一條最公平、最不容易誤判的界線。

實務應用：

- 圖片分類
- 文字分類
- 異常偵測
- 小型高維資料分類

動畫：

兩群資料點出現，中間分界線逐步移動到最佳位置。

## 9.6 K 近鄰 KNN

定位：

看附近鄰居來判斷。

白話：

新資料靠近哪一群，就比較可能屬於哪一群。

生活例子：

看一個人周圍朋友的興趣，推測他可能喜歡什麼。

實務應用：

- 推薦系統
- 相似商品搜尋
- 簡單分類
- 客戶相似度分析

動畫：

新資料點出現，附近 K 個鄰居被圈起來，多數決分類。

## 9.7 K-means 分群

定位：

把相似資料自動分群。

白話：

沒有標準答案時，讓電腦自己把像的人分在一起。

生活例子：

把顧客分成高消費族、價格敏感族、偶爾購買族。

實務應用：

- 顧客分群
- 市場區隔
- 使用者行為分析
- 商品分組

動畫：

資料點從散亂狀態逐漸分成不同顏色群組。

## 9.8 樸素貝氏 Naive Bayes

定位：

用機率快速分類。

白話：

根據特徵出現的機率，判斷資料屬於哪一類。

生活例子：

看到信件中出現「免費」「中獎」「立即領取」，就提高垃圾郵件機率。

實務應用：

- 垃圾郵件分類
- 新聞分類
- 情緒分析
- 文字分類

動畫：

文字關鍵詞逐一亮起，最後產生分類結果。

## 9.9 梯度下降 Gradient Descent

定位：

一步一步把錯誤變小。

白話：

像從山坡上往最低點走，最低點代表模型錯誤最小。

生活例子：

做菜時一次次調整鹹淡，直到味道接近最好。

實務應用：

- 訓練機器學習模型
- 神經網路訓練
- 找最佳參數
- 降低預測錯誤

動畫：

小球沿著曲線山坡往最低點移動。

## 9.10 主成分分析 PCA

定位：

把複雜資料簡化。

白話：

把很多欄位的資料壓縮成比較容易看懂的形式，同時保留重要資訊。

生活例子：

把一大堆問卷題目整理成幾個主要方向，例如價格敏感、品牌忠誠、功能需求。

實務應用：

- 資料視覺化
- 特徵壓縮
- 降低資料維度
- 前處理

動畫：

高維資料點被投影到較簡單的 2D 平面。

---

# 十、單一演算法詳細頁設計

路由：

```text
/algorithms/[slug]
```

每個詳細頁包含：

1. 頁首 Hero
2. 白話一句話
3. 生活化比喻
4. 圖解動畫
5. 運作流程
6. 實務應用
7. 優點與限制
8. 常見誤解
9. 小測驗
10. AI 助理問答
11. 推薦下一個主題

## 10.1 頁首 Hero

內容：

- 中文名稱
- 英文名稱
- 任務類型
- 難度
- 一句白話解釋
- 開始學習按鈕
- 收藏按鈕

## 10.2 圖解動畫區

根據 `visual_type` 顯示不同動畫。

請建立通用元件：

```text
AlgorithmVisualizer
```

根據類型切換：

- scatter-line
- logistic-curve
- decision-tree
- random-forest
- svm-margin
- knn-neighbors
- kmeans-clustering
- naive-bayes-text
- gradient-descent
- pca-projection

初版可以用 SVG + CSS animation + framer-motion 實作，不必使用複雜圖表套件。

## 10.3 小測驗

每個主題至少 3 題。

題型：

- 單選題
- 是非題
- 情境選擇題

答題後要顯示：

- 是否答對
- 正確答案
- 白話解析

完成測驗後更新學習進度。

---

# 十一、AI 助理功能

## 11.1 AI 助理定位

AI 助理是一位「機器學習新手導師」。

特色：

- 白話解釋
- 不嘲笑新手問題
- 能用生活例子回答
- 盡量避免複雜公式
- 可以針對目前頁面的演算法回答
- 可以推薦下一個學習主題

## 11.2 AI 助理 UI

前端顯示方式：

- 右下角浮動 AI 助理按鈕
- 點擊後展開聊天視窗
- 聊天視窗旁邊顯示 Live2D 助教角色
- 支援輸入文字問題
- 支援快速問題按鈕

快速問題範例：

- 這個演算法可以用一句話解釋嗎？
- 它適合解決什麼問題？
- 它和另一個演算法有什麼不同？
- 可以給我生活例子嗎？
- 新手最容易誤解什麼？
- 我該先學哪一個？

## 11.3 AI 回答要求

AI 回答需遵守：

- 使用繁體中文
- 白話
- 短段落
- 有例子
- 避免過多公式
- 若使用術語，立即解釋
- 優先根據內建十大演算法資料回答
- 不確定時要說明不確定，不要亂編

## 11.4 AI 問答流程

流程：

1. 使用者在前端輸入問題
2. 前端送出目前頁面演算法 slug、問題與聊天紀錄
3. FastAPI 接收請求
4. 後端組合 prompt
5. 呼叫 LLM API
6. 回傳回答
7. 前端顯示回答
8. Live2D 角色做出說話動畫

---

# 十二、Live2D 虛擬助教設計

## 12.1 角色定位

Live2D 角色是一位「AI 學習助教」。

角色風格：

- 親切
- 教學感
- 有耐心
- 不壓迫
- 適合新手
- 科技感與可愛感兼具

角色名稱建議：

- 小璃老師
- Algo 小助教
- ML 小老師
- Data Sensei

可先預設名稱為：

# 小璃老師

## 12.2 Live2D 功能

初版功能：

- idle 待機動畫
- speaking 說話動畫
- thinking 思考動畫
- happy 答對題目時
- confused 使用者答錯時
- wave 歡迎使用者

## 12.3 Live2D 技術實作

請建立前端元件：

```text
Live2DAssistant
```

功能：

- 載入 Live2D 模型
- 控制角色狀態
- 與聊天狀態連動
- 若沒有模型檔案，顯示 fallback 2D 角色卡片
- fallback 卡片也要有簡單動畫，例如眨眼、浮動、說話泡泡

建議資料夾：

```text
public/live2d/models/koharu/
public/live2d/models/assistant/
```

如果沒有可用 Live2D 模型，請不要讓系統壞掉。

請實作 fallback：

```text
Live2DFallbackAvatar
```

顯示一個可愛助教角色卡片，包含：

- 頭像
- 名稱
- 狀態文字
- 說話時嘴巴動畫或對話泡泡閃爍

---

# 十三、FastAPI 後端規格

## 13.1 後端功能

FastAPI 後端需提供：

1. 演算法列表 API
2. 單一演算法內容 API
3. 小測驗 API
4. AI 問答 API
5. 學習進度 API
6. 收藏 API
7. 搜尋 API

## 13.2 API 路由設計

```text
GET /api/algorithms
取得十大演算法列表

GET /api/algorithms/{slug}
取得單一演算法詳細資料

GET /api/algorithms/{slug}/quiz
取得單一演算法測驗

POST /api/chat
AI 助理問答

GET /api/progress/{user_id}
取得使用者學習進度

POST /api/progress
更新使用者學習進度

GET /api/favorites/{user_id}
取得收藏清單

POST /api/favorites
新增收藏

DELETE /api/favorites
取消收藏

GET /api/search?q=keyword
搜尋演算法內容
```

## 13.3 AI 問答 Request

```json
{
  "user_id": "guest",
  "algorithm_slug": "linear-regression",
  "message": "線性回歸和邏輯回歸差在哪？",
  "history": [
    {
      "role": "user",
      "content": "線性回歸是什麼？"
    },
    {
      "role": "assistant",
      "content": "線性回歸可以想成用一條線預測數字。"
    }
  ]
}
```

## 13.4 AI 問答 Response

```json
{
  "reply": "線性回歸主要用來預測連續數字，例如房價；邏輯回歸常用來判斷是或不是，例如是不是垃圾郵件。你可以把線性回歸想成估價格，把邏輯回歸想成做判斷。",
  "suggested_questions": [
    "可以用圖解說明嗎？",
    "哪一個比較適合新手先學？",
    "可以給我實務例子嗎？"
  ],
  "assistant_state": "speaking"
}
```

---

# 十四、資料儲存設計

初版可使用 JSON 檔案或 SQLite。

建議初版使用：

- 後端內建 JSON 資料
- 進度與收藏使用 SQLite
- 未登入使用者使用 localStorage
- 未來可擴充登入系統

## 14.1 資料表建議

```text
users
- id
- name
- created_at

progress
- id
- user_id
- algorithm_slug
- completed_sections
- quiz_score
- is_completed
- updated_at

favorites
- id
- user_id
- algorithm_slug
- created_at

chat_logs
- id
- user_id
- algorithm_slug
- message
- reply
- created_at
```

---

# 十五、專案資料夾結構

請產生以下專案結構。

## 15.1 前端

```text
frontend/
  app/
    page.tsx
    layout.tsx
    algorithms/
      page.tsx
      [slug]/
        page.tsx
    quiz/
      page.tsx
    progress/
      page.tsx
    favorites/
      page.tsx
    about/
      page.tsx
  components/
    AlgorithmCard.tsx
    AlgorithmGrid.tsx
    AlgorithmVisualizer.tsx
    ChatAssistant.tsx
    Live2DAssistant.tsx
    Live2DFallbackAvatar.tsx
    QuizBlock.tsx
    ProgressBar.tsx
    SearchBox.tsx
    CategoryFilter.tsx
    LearningPath.tsx
  lib/
    api.ts
    types.ts
    constants.ts
  store/
    useLearningStore.ts
  styles/
    globals.css
  public/
    images/
    live2d/
```

## 15.2 後端

```text
backend/
  main.py
  app/
    api/
      algorithms.py
      chat.py
      progress.py
      favorites.py
      search.py
    core/
      config.py
      prompts.py
    data/
      algorithms.json
      quizzes.json
    models/
      schemas.py
    services/
      algorithm_service.py
      chat_service.py
      progress_service.py
      favorite_service.py
      search_service.py
    db/
      database.py
      models.py
  requirements.txt
```

---

# 十六、AI Prompt 設計

請在後端建立 AI 助理系統提示詞。

## 16.1 系統提示詞

```text
你是一位親切、有耐心的機器學習新手導師，名字叫「小璃老師」。

你的任務是用繁體中文，協助完全沒有資訊背景的使用者理解機器學習演算法。

回答規則：

1. 使用白話中文。
2. 不要嘲笑新手問題。
3. 儘量用生活化比喻。
4. 避免複雜公式。
5. 如果一定要提到術語，請立刻解釋。
6. 優先根據系統提供的演算法資料回答。
7. 回答不要太長，先給清楚結論，再補例子。
8. 如果使用者問比較進階的問題，可以分成「簡單版」與「進階補充」。
9. 不確定時請說明不確定，不要亂編。
10. 鼓勵使用者繼續探索下一個主題。
```

## 16.2 單一演算法上下文 Prompt

當使用者在某個演算法頁面提問時，請把該演算法資料一起放入 prompt。

格式：

```text
目前使用者正在學習的演算法：

中文名稱：{name_zh}
英文名稱：{name_en}
任務類型：{category}
一句話解釋：{one_liner}
生活比喻：{analogy}
詳細說明：{description}
常見應用：{use_cases}
優點：{pros}
限制：{cons}
常見誤解：{common_mistakes}

請根據以上內容回答使用者問題。
```

---

# 十七、互動設計細節

## 17.1 學習路線

請在首頁提供推薦學習順序：

1. 線性回歸
2. 邏輯回歸
3. 決策樹
4. 隨機森林
5. KNN
6. SVM
7. K-means
8. 樸素貝氏
9. PCA
10. 梯度下降

也可以依任務類型分類：

- 預測數字：線性回歸
- 判斷類別：邏輯回歸、決策樹、隨機森林、SVM、KNN、樸素貝氏
- 自動分群：K-means
- 簡化資料：PCA
- 訓練模型：梯度下降

## 17.2 搜尋功能

使用者可以搜尋：

- 演算法名稱
- 中文名稱
- 英文名稱
- 任務類型
- 生活例子
- 應用場景

例如搜尋：

- 房價
- 垃圾郵件
- 分群
- 分類
- 預測
- 顧客
- 文字分類

## 17.3 收藏功能

每個演算法頁面都可以收藏。

收藏後出現在 `/favorites` 頁面。

## 17.4 學習進度

每個演算法要有進度：

- 已閱讀
- 已完成測驗
- 測驗分數
- 是否收藏
- 最近學習時間

---

# 十八、UI / UX 設計要求

## 18.1 視覺風格

請使用：

- 乾淨明亮
- 教育型
- 科技感
- 友善
- 圖文卡片式
- 適合新手學習

## 18.2 色彩建議

- 主色：藍色
- 輔色：綠色、橘色、紫色
- 背景：白色或淺灰
- 重點提示：黃色或淡橘色
- 錯誤提示：紅色
- 正確提示：綠色

## 18.3 動畫要求

使用 framer-motion 實作：

- 首頁卡片淡入
- 卡片 hover 微放大
- 詳細頁區塊滾動淡入
- 圖解動畫逐步出現
- 測驗答對顯示成功動畫
- AI 助理展開與收合動畫
- Live2D fallback 頭像浮動動畫

---

# 十九、RWD 響應式設計

請支援：

- 桌機
- 平板
- 手機

手機版要求：

- 卡片改為單欄
- AI 助理聊天視窗不要遮住全部畫面
- Live2D 角色可縮小或收合
- 測驗按鈕要容易點擊
- 圖表可橫向滑動或縮放

---

# 二十、錯誤處理

請處理以下狀況：

1. 後端 API 無法連線
2. AI API 回覆失敗
3. 使用者輸入空白問題
4. 找不到演算法 slug
5. Live2D 模型載入失敗
6. 測驗資料不存在
7. localStorage 不可用

錯誤訊息請用白話顯示。

例如：

- 「小璃老師暫時連不上，請稍後再試。」
- 「找不到這個演算法主題。」
- 「請先輸入想問的問題。」

---

# 二十一、環境變數

## 21.1 前端 `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=ML Algorithm Tutor
```

## 21.2 後端 `.env`

```env
APP_NAME=ML Algorithm Tutor API
ENV=development
CORS_ORIGINS=http://localhost:3000
LLM_PROVIDER=openai
OPENAI_API_KEY=請填入金鑰
MODEL_NAME=gpt-4o-mini
DATABASE_URL=sqlite:///./ml_tutor.db
```

請注意：

如果沒有 API Key，AI 問答請提供 mock 模式，讓開發者仍可測試 UI。

---

# 二十二、開發階段建議

請依照以下階段開發。

## Phase 1：靜態學習網站

完成：

- Next.js 專案
- 首頁
- 十大演算法卡片
- 詳細頁
- 靜態資料
- 基本圖解
- RWD

## Phase 2：FastAPI 後端

完成：

- 演算法 API
- 測驗 API
- 搜尋 API
- CORS
- JSON 資料管理

## Phase 3：互動學習功能

完成：

- 小測驗
- 收藏
- 學習進度
- localStorage 或 SQLite 儲存

## Phase 4：AI 助理

完成：

- ChatAssistant UI
- FastAPI `/api/chat`
- Prompt 設計
- LLM 串接
- mock 模式

## Phase 5：Live2D 助教

完成：

- Live2D 容器
- fallback 角色
- speaking / thinking / happy 狀態
- 與 AI 回答狀態連動

## Phase 6：視覺優化

完成：

- 動畫
- 演算法圖解動畫
- 首頁特效
- 手機版優化
- 錯誤處理

---

# 二十三、驗收標準

完成後應符合以下標準：

1. 使用者可以瀏覽十大機器學習演算法。
2. 每個演算法都有白話解釋、生活例子、實務應用。
3. 每個演算法都有至少一個圖解或動畫。
4. 使用者可以進行小測驗。
5. 使用者可以收藏主題。
6. 使用者可以查看學習進度。
7. 使用者可以向 AI 助理提問。
8. AI 助理回答要使用繁體中文與白話說明。
9. Live2D 或 fallback 助教可以正常顯示。
10. 前端 Next.js 可以正常啟動。
11. 後端 FastAPI 可以正常啟動。
12. 前後端可以正常串接。
13. 手機與桌機都能正常瀏覽。
14. 沒有 LLM API Key 時，仍可使用 mock 回答測試。
15. 專案 README 要包含安裝與啟動方式。

---

# 二十四、README 要求

請產生 README.md，內容包含：

1. 專案介紹
2. 技術棧
3. 功能列表
4. 專案結構
5. 前端啟動方式
6. 後端啟動方式
7. 環境變數設定
8. AI API Key 設定
9. Live2D 模型替換方式
10. 開發階段說明
11. 常見問題
12. 未來擴充方向

---

# 二十五、請直接產出

請依照以上規格，直接產生可執行的專案程式碼。

請優先完成 MVP：

1. Next.js 首頁
2. 十大演算法列表
3. 單一演算法詳細頁
4. FastAPI 演算法 API
5. AI 助理 mock / 真實 API 架構
6. Live2D fallback 角色
7. 小測驗
8. 學習進度 localStorage
9. README

若一次無法完成全部，請先產出完整專案骨架與核心功能，再列出後續待辦清單。
