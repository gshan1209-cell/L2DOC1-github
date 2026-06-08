import os
import json
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from openai import AsyncOpenAI
from dotenv import load_dotenv
from algorithms import get_algorithm_by_slug

load_dotenv()
router = APIRouter()
client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    user_id: str
    algorithm_slug: str
    message: str
    history: List[Message] = []

SYSTEM_PROMPT = """你是一位親切、有耐心的機器學習新手導師，名字叫「小璃老師」。
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

請以 JSON 格式回傳，包含以下三個欄位：
- reply: 你的回答內容 (字串)
- suggested_questions: 推薦使用者的 3 個後續問題 (字串陣列)
- assistant_state: 你的表情狀態，只能是 "speaking", "thinking", "happy", "confused", 或 "idle" 其中之一。
"""

@router.post("/")
async def chat_with_assistant(request: ChatRequest):
    """接收前端提問並透過 OpenAI API 回傳真實 AI 回答"""
    
    # 取得演算法資料作為上下文
    algo_context = ""
    try:
        if request.algorithm_slug and request.algorithm_slug != "general":
            algo_data = get_algorithm_by_slug(request.algorithm_slug)
            algo_context = (
                f"\n\n目前使用者正在學習的演算法：\n"
                f"中文名稱：{algo_data['name_zh']}\n"
                f"英文名稱：{algo_data['name_en']}\n"
                f"任務類型：{algo_data['category']}\n"
                f"一句話解釋：{algo_data['one_liner']}\n"
                f"生活比喻：{algo_data['analogy']}\n"
                f"詳細說明：{algo_data['description']}\n"
                f"常見應用：{', '.join(algo_data['use_cases'])}\n"
                f"優點：{', '.join(algo_data['pros'])}\n"
                f"限制：{', '.join(algo_data['cons'])}\n"
                f"常見誤解：{', '.join(algo_data['common_mistakes'])}\n\n"
                f"請根據以上內容回答使用者問題。"
            )
    except Exception:
        pass  # 找不到對應的演算法則略過上下文

    messages = [{"role": "system", "content": SYSTEM_PROMPT + algo_context}]
    
    for msg in request.history[-5:]:  # 放入最近 5 筆對話紀錄
        messages.append({"role": msg.role, "content": msg.content})
        
    messages.append({"role": "user", "content": request.message})

    try:
        response = await client.chat.completions.create(
            model=os.environ.get("MODEL_NAME", "gpt-4o-mini"),
            messages=messages,
            response_format={ "type": "json_object" },
            temperature=0.7
        )
        
        result_text = response.choices[0].message.content
        result_json = json.loads(result_text)
        
        return {
            "reply": result_json.get("reply", "抱歉，我現在有點腦袋轉不過來，可以再問一次嗎？"),
            "suggested_questions": result_json.get("suggested_questions", []),
            "assistant_state": result_json.get("assistant_state", "speaking")
        }
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return {
            "reply": "抱歉，小璃老師現在連線有點問題，請檢查 OpenAI API Key 是否設定正確，或稍後再試喔！",
            "suggested_questions": ["你可以重新整理頁面試試看！"],
            "assistant_state": "confused"
        }