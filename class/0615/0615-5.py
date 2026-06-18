"""
讓用戶重複輸入任意數量的整數，如用戶輸入空白則表示停止輸入
列出該數列，及最大、最小和平均值
"""

numbers = []

while True:
    user_input = input("請輸入一個整數 (空白鍵停止): ")
    
    # 如果輸入空白鍵，跳出迴圈
    if user_input == "":
        break
    
    try:
        # 嘗試將輸入轉換為整數
        number = int(user_input)
        numbers.append(number)
    except ValueError:
        print("輸入無效，請輸入整數。")

# 檢查是否輸入了任何數字
if not numbers:
    print("沒有輸入任何數字。")
else:
    # 計算統計值
    maximum = max(numbers)
    minimum = min(numbers)
    average = sum(numbers) / len(numbers)
    
    # 輸出結果
    print(f"\n輸入的數列: {numbers}")
    print(f"最大值: {maximum}")
    print(f"最小值: {minimum}")
    print(f"平均值: {average}")
