"""
輸入一個五位整數，將其轉為國字大寫輸出
國字大寫:零壹貳叁肆伍陸柒捌玖
"""

# 國字大寫對照表
chinese_digits = ["零", "壹", "貳", "叁", "肆", "伍", "陸", "柒", "捌", "玖"]
units = ["萬", "仟", "佰", "拾", ""]

# 取得用戶輸入
num_str = input("請輸入一個五位整數: ")

# 檢查輸入是否合法 (長度為 5 且皆為數字)
if len(num_str) == 5 and num_str.isdigit():
    
    # 方式一：逐字轉換 (例如 12345 -> 壹貳叁肆伍)
    result_simple = ""
    for char in num_str:
        digit = int(char)
        result_simple += chinese_digits[digit]
    
    # 方式二：帶單位轉換 (例如 12345 -> 壹萬貳仟叁佰肆拾伍)
    result_with_units = ""
    for i in range(5):
        digit = int(num_str[i])
        if digit != 0:
            result_with_units += chinese_digits[digit] + units[i]
        else:
            # 處理零的顯示邏輯：避免連續的零，且結尾不加零
            if not result_with_units.endswith("零") and i != 4:
                result_with_units += "零"
    
    # 如果最後一個字是零且長度大於1，則去掉結尾的零
    if result_with_units.endswith("零") and len(result_with_units) > 1:
        result_with_units = result_with_units[:-1]
        
    print(f"逐字轉換: {result_simple}")
    print(f"帶單位轉換: {result_with_units}")

else:
    print("錯誤！請輸入剛好五位數的整數。")
