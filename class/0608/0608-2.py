"""
輸入一個電話號碼，將其轉為國字大寫輸出
國字大寫:O一二三四五六七八九
"""

# 國字大寫對照表 (0 對應 O，1~9 對應一~九)
chinese_digits = ["O", "一", "二", "三", "四", "五", "六", "七", "八", "九"]

# 取得用戶輸入
phone = input("請輸入電話號碼: ")

# 轉換每個字元
result = ""
for char in phone:
    if char.isdigit():
        result += chinese_digits[int(char)]
    else:
        result += char   # 保留 '-'、'(' 、')' 等分隔符號

print(f"國字大寫: {result}")