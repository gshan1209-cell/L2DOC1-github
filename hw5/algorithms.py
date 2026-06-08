from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

def load_algorithms_data():
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "algorithms.json")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/")
def get_all_algorithms():
    """取得所有演算法列表"""
    data = load_algorithms_data()
    # 回傳輕量版列表資料供首頁卡片使用
    return [{"id": item["id"], "slug": item["slug"], "name_zh": item["name_zh"], "name_en": item["name_en"], "category": item["category"], "difficulty": item["difficulty"], "one_liner": item["one_liner"]} for item in data]

@router.get("/{slug}")
def get_algorithm_by_slug(slug: str):
    """取得單一演算法詳細資料"""
    data = load_algorithms_data()
    for item in data:
        if item["slug"] == slug:
            return item
    raise HTTPException(status_code=404, detail="找不到此演算法")