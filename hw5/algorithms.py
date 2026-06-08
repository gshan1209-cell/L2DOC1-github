import json
import os

from fastapi import APIRouter, HTTPException

router = APIRouter()


def load_algorithms_data():
    file_path = os.path.join(os.path.dirname(__file__), "algorithms.json")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


@router.get("/")
def get_all_algorithms():
    data = load_algorithms_data()
    return [
        {
            "id": item["id"],
            "slug": item["slug"],
            "name_zh": item["name_zh"],
            "name_en": item["name_en"],
            "category": item["category"],
            "difficulty": item["difficulty"],
            "one_liner": item["one_liner"],
        }
        for item in data
    ]


@router.get("/{slug}")
def get_algorithm_by_slug(slug: str):
    data = load_algorithms_data()
    for item in data:
        if item["slug"] == slug:
            return item
    raise HTTPException(status_code=404, detail="Algorithm not found")
