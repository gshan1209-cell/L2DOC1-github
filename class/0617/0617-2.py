"""
利用usser_list名單，搭配隨機功能，為每一位user
產生一個介於(1~100)的成績，再重中找出最高分的user
"""
import random
random.seed(42)
user_list = ["Sean", "John", "Mary", "Bob", "Alice"]
scores = {user: random.randint(1, 100) for user in user_list}
print(scores)
high_scorer = max(scores, key=scores.get)
print(high_scorer)