"""
讓用戶輸入一個整數N,列出1+2+3+....X>=N
"""
N = int(input("請輸入一個整數N: "))
sum = 0
num = 0
while sum < N:
    num += 1
    sum += num
print(f"1+2+3+....{num} = {sum}")
