"""
1~100的猜數字遊戲
"""
import random

answer = random.randint(1, 100)

while True:
    guess = int(input("請猜一個 1~100 的數字: "))
    if guess < answer:
        print("太小了！")
    elif guess > answer:
        print("太大了！")
    else:
        print("恭喜猜對了！")
        break