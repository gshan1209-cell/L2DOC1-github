"""
讓用戶輸入一段5個字的內容，
將其中大/小寫字母轉換，不是英文則不變
"""

# 取得用戶輸入
user_input = input("請輸入5個字的內容：")

# 驗證輸入是否為5個字
if len(user_input) != 5:
    print(f"錯誤：您輸入了 {len(user_input)} 個字，請輸入恰好 5 個字！")
else:
    result = ""
    for char in user_input:
        if char.isupper():
            result += char.lower()   # 大寫 → 小寫
        elif char.islower():
            result += char.upper()   # 小寫 → 大寫
        else:
            result += char           # 非英文字母，不變

    print(f"原始內容：{user_input}")
    print(f"轉換結果：{result}")