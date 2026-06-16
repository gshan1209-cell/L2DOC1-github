"""
用亂數隨機產生10個介於1~100的整數，將其中奇數排前，偶數排後，奇/偶數不分大小
再列印出來
"""
import random

numbers = []

for _ in range(10):
    numbers.append(random.randint(1, 100))

print(f"原始數列: {numbers}")

odd_numbers = [num for num in numbers if num % 2 != 0]
even_numbers = [num for num in numbers if num % 2 == 0]

result = odd_numbers + even_numbers
print(f"奇偶排序後: {result}")