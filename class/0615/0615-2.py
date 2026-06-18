"""
讓用戶輸入一個整數，將其數值反向輸出
例:12345 => 54321
"""
number = int(input("請輸入一個整數: "))

while number > 0:
    last_digit = number % 10
    print(last_digit, end="")
    number //= 10