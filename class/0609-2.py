# -*- coding: utf-8 -*-
"""
讓用戶輸入一段英文字，輸出每個字母第一次出現的位置和共出現幾次
範例:ABCAA
輸出:
C Ndx Tot
- --- ---
X 123 123
A   0   3
B   1   1
C   2   1
D   3   0

"""

user_input = input("請輸入一段英文字：").upper()

# 過濾非英文字母
filtered = [(i, ch) for i, ch in enumerate(user_input) if ch.isalpha()]

if not filtered:
    print("沒有偵測到英文字母，請重新輸入。")
else:
    # 統計每個字母的首次出現位置與出現次數
    letter_info = {}
    for idx, char in filtered:
        if char not in letter_info:
            letter_info[char] = {"first_idx": idx, "count": 0}
        letter_info[char]["count"] += 1

    # 輸出表格
    print(f"{'C':1} {'Ndx':>3} {'Tot':>3}")
    print(f"{'-':1} {'---':>3} {'---':>3}")
    for letter in sorted(letter_info.keys()):
        info = letter_info[letter]
        print(f"{letter:1} {info['first_idx']:>3} {info['count']:>3}")
