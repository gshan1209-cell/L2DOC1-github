"""
讓用戶輸入一串英文字
讓輸入的內容中，將每一個英文字母向右移動3個字母，例如A->D,g->j,z->c 

程式邏輯說明：
ord() 與 chr()：ord() 將字元轉換為 ASCII 數值，chr() 則是將數值轉回字元。

% 26 (取餘數)：這是關鍵步驟，確保當字母移動到 'z' 後，能循環回到 'a'（例如 z -> c）。

條件判斷：程式會自動判斷大小寫並進行對應轉換，同時保持空白或符號不動。
"""


def caesar_cipher(text):
    result = ""
    for char in text:
        # 處理大寫字母
        if char.isupper():
            # 將字母轉為 0-25，加上 3，再取餘數，最後轉回 ASCII
            result += chr((ord(char) - ord('A') + 3) % 26 + ord('A'))
        # 處理小寫字母
        elif char.islower():
            result += chr((ord(char) - ord('a') + 3) % 26 + ord('a'))
        # 非字母字元（如空白、符號）保持不變
        else:
            result += char
    return result

# 讓用戶輸入
user_input = input("請輸入一串英文字：")
encrypted_text = caesar_cipher(user_input)

print(f"轉換後的結果：{encrypted_text}")