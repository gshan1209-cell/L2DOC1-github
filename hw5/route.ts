import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import path from 'path';
import { promises as fs } from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `你是一位親切、有耐心的機器學習新手導師，名字叫「小璃老師」。
你的任務是用繁體中文，協助完全沒有資訊背景的使用者理解機器學習演算法。
回答規則：
1. 使用白話中文，避免複雜公式。
2. 優先根據系統提供的演算法資料回答。
3. 回答不要太長，先給清楚結論，再補例子。
4. 以 JSON 格式回傳，包含 "reply", "suggested_questions", "assistant_state" 三個欄位。`;

const dataFilePath = path.join(process.cwd(), 'data', 'algorithms.json');

async function getAlgorithmBySlug(slug: string) {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return data.find((item: any) => item.slug === slug) || null;
    } catch {
        return null;
    }
}

export async function POST(request: Request) {
    try {
        const { algorithm_slug, message, history } = await request.json();

        let algo_context = "";
        if (algorithm_slug && algorithm_slug !== "general") {
            const algo_data = await getAlgorithmBySlug(algorithm_slug);
            if (algo_data) {
                algo_context = `\n\n使用者正在學習「${algo_data.name_zh}」，請根據此演算法的資訊回答：\n` +
                    `說明：${algo_data.description}\n` +
                    `比喻：${algo_data.analogy}\n`;
            }
        }

        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_PROMPT + algo_context },
            ...history.slice(-5),
            { role: "user", content: message },
        ];

        const response = await openai.chat.completions.create({
            model: process.env.MODEL_NAME || "gpt-4o-mini",
            messages: messages,
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const resultText = response.choices[0].message.content;
        const resultJson = JSON.parse(resultText || '{}');

        return NextResponse.json(resultJson);

    } catch (error) {
        console.error("OpenAI API Error:", error);
        return NextResponse.json({
            reply: "抱歉，小璃老師現在連線有點問題，請檢查 OpenAI API Key 是否設定正確，或稍後再試喔！",
            suggested_questions: ["你可以重新整理頁面試試看！"],
            assistant_state: "confused"
        }, { status: 500 });
    }
}