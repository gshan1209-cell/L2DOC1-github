import json
import os
from typing import List

from dotenv import load_dotenv
from fastapi import APIRouter
from openai import AsyncOpenAI
from pydantic import BaseModel, Field

from algorithms import get_algorithm_by_slug

load_dotenv()

router = APIRouter()
openai_api_key = os.environ.get("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=openai_api_key) if openai_api_key else None


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    user_id: str
    algorithm_slug: str
    message: str
    history: List[Message] = Field(default_factory=list)


SYSTEM_PROMPT = """
You are a friendly machine-learning tutor for students.
Explain concepts clearly, use practical examples, and answer in Traditional Chinese.

Return JSON only with these fields:
- reply: the assistant response
- suggested_questions: three follow-up questions
- assistant_state: one of "speaking", "thinking", "happy", "confused", or "idle"
"""


@router.post("/")
async def chat_with_assistant(request: ChatRequest):
    algo_context = ""
    try:
        if request.algorithm_slug and request.algorithm_slug != "general":
            algo_data = get_algorithm_by_slug(request.algorithm_slug)
            algo_context = (
                "\n\nCurrent algorithm context:\n"
                f"Chinese name: {algo_data.get('name_zh', '')}\n"
                f"English name: {algo_data.get('name_en', '')}\n"
                f"Category: {algo_data.get('category', '')}\n"
                f"Summary: {algo_data.get('one_liner', '')}\n"
                f"Analogy: {algo_data.get('analogy', '')}\n"
                f"Description: {algo_data.get('description', '')}\n"
                f"Use cases: {', '.join(algo_data.get('use_cases', []))}\n"
                f"Pros: {', '.join(algo_data.get('pros', []))}\n"
                f"Cons: {', '.join(algo_data.get('cons', []))}\n"
                f"Common mistakes: {', '.join(algo_data.get('common_mistakes', []))}\n"
            )
    except Exception:
        algo_context = ""

    messages = [{"role": "system", "content": SYSTEM_PROMPT + algo_context}]
    for msg in request.history[-5:]:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": request.message})

    if client is None:
        return {
            "reply": "AI 助教目前尚未設定 OPENAI_API_KEY，因此只能先顯示演算法內容，無法產生即時回覆。",
            "suggested_questions": [
                "這個演算法適合用在哪些情境？",
                "它和其他演算法有什麼差異？",
                "可以用簡單例子解釋嗎？",
            ],
            "assistant_state": "confused",
        }

    try:
        response = await client.chat.completions.create(
            model=os.environ.get("MODEL_NAME", "gpt-4o-mini"),
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.7,
        )

        result_text = response.choices[0].message.content or "{}"
        result_json = json.loads(result_text)

        return {
            "reply": result_json.get("reply", "我現在無法產生完整回覆，請再試一次。"),
            "suggested_questions": result_json.get("suggested_questions", []),
            "assistant_state": result_json.get("assistant_state", "speaking"),
        }
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return {
            "reply": "AI 助教目前無法連線，請確認 OPENAI_API_KEY 是否已設定，或稍後再試。",
            "suggested_questions": [
                "這個演算法適合用在哪些情境？",
                "它和其他演算法有什麼差異？",
                "可以用簡單例子解釋嗎？",
            ],
            "assistant_state": "confused",
        }
