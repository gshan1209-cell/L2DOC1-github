"""
輸入一個整數值n，找出第n個質數
"""
n = int(input("請輸入一個整數n: "))

count = 0
num = 2

while True:
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        count += 1
        if count == n:
            print(f"第 {n} 個質數是 {num}")
            break
    num += 1
