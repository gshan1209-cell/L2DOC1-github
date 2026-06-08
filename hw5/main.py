from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import algorithms
from app.api import chat

app = FastAPI(
    title="ML Algorithm Tutor API",
    description="機器學習前十大演算法互動學習網站 API",
    version="1.0.0"
)

# 設定 CORS 允許前端連線
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(algorithms.router, prefix="/api/algorithms", tags=["Algorithms"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ML Algorithm Tutor API"}