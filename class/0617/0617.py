"""
隨機產生15個1~50之間的整數，找出其中的第2大數值，不能使用排序函式
"""
import random
random.seed(42)
sample = random.choices(range(1, 51), k=15)
max1 = -1
max2 = -1
for num in sample:
    if num > max1:
        max2 = max1
        max1 = num
    elif num > max2 and num != max1:
        max2 = num
print(max1)
print(max2)

