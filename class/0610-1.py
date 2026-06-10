"""
座位編排
依照下列用戶姓名，讓用戶輸入每排座位人數(2~7)，依照輸入每排座位人數將座位表排出
輸出格式:
Name       Name    Name
--------   --------   --------  
12345678   12345678  12345678  

程式使用說明：
輸入限制：程式內建了檢查機制，若您輸入的數字不在 2~7 的範圍內，系統會提示您重新輸入。

動態排版：程式會自動計算需要的排數，並將 30 位學員依序填入。

輸出視覺化：每一排會以 | 符號隔開，讓座位結構清晰易讀。
"""

names = [
    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack",
    "Kevin", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Ryan", "Sarah", "Tom",
    "Ursula", "Victor", "Wendy", "Xander", "Yara", "Zion", "Aaron", "Bella", "Caleb", "Daisy"
]

def arrange_seats():
    try:
        # 讓用戶輸入每排人數
        per_row = int(input("請輸入每排座位人數 (2~7): "))
        
        if not (2 <= per_row <= 7):
            print("輸入錯誤，請輸入 2 到 7 之間的數字。")
            return

        print("\n--- 座位安排表 ---")
        # 分組輸出
        for i in range(0, len(names), per_row):
            row = names[i:i + per_row]
            print(f"第 {i // per_row + 1} 排: {' | '.join(row)}")
            
    except ValueError:
        print("請輸入有效的數字。")

arrange_seats()