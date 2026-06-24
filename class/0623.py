import sys
sys.stdout.reconfigure(encoding='utf-8')

"""
建立一個函式，傳入圓的半徑，傳回圓的面積
圓周率用3.14
"""

def circle_area(radius):
    return 3.14 * radius * radius

# C1=circle_area(10)
# print(C1)    

"""
建立一個函式，傳入圓的半徑&圓周率，傳回圓的面積
圓周率用3.14
"""

def celsius_to_fahrenheit(radius,PI):
    return PI * radius * radius

C1=celsius_to_fahrenheit(10,3.14)
print(C1)    


"""
建立一個函式，傳入圓的半徑&圓周率和圓心角，傳回扇形/圓面積
圓周率用3.14，圓心角內定值為360度
轉換公式：扇形面積 = 半徑 * 半徑 * 圓周率 * 圓心角 / 360
"""

def circle_area3(PI=3.14,radius=10,angle=360):
    return PI * radius * radius * angle / 360

# pyrefly: ignore [unexpected-keyword]
# C1=circle_area(angle=60)
# print(C1)    

"""
建立一個函式，傳入圓的半徑&圓周率和圓心角，傳回扇形/圓面積
圓周率用3.14，圓心角內定值為360度
同時回傳兩個值，包含面積和圓周長
"""

def circle_area4(PI=3.14,radius=10,angle=360):
    area=PI * radius * radius * angle / 360
    circumference=2 * PI * radius
    return area,circumference
 
A1,C1=circle_area4(radius=10,angle=90)
print("面積：",A1,"圓周長：",C1)  

"""
如何將文字的日期格式，轉為時間
"""
from datetime import datetime
datetime_str = "2026/06/23 15:30:00"
datetime_obj = datetime.strptime(datetime_str, "%Y/%m/%d %H:%M:%S")
print(datetime_obj)

def S2D(dt:str,fm:str="%Y/%m/%d"):
    return datetime.strptime(dt,fm)
D1=S2D("2026/06/23")
print(D1)

def D2S(dt:datetime,fm:str="%Y/%m/%d"):
    return dt.strftime(fm)
D2=D2S(D1)
print(D2)

"""
讓用戶輸入個時間00:00:00~23:59:59
計算兩個時間之間的間隔秒數
"""
def get_time_dif_second(time1:str,time2:str)->int:
    t1=S2D(time1,"%H:%M:%S")
    t2=S2D(time2,"%H:%M:%S")
    return (t2-t1).total_seconds()

T1=get_time_dif_second("10:00:00","11:00:00")

print("時間差：",T1)   

"""
建立一個函式，沒有傳入值，會傳回4份結果，分別是撲克牌的發牌結果
撲克牌的四個花色分別為黑桃 (♠)、紅心 (♥)、方塊 (♦) 和梅花 (♣)
13張牌，A~K的隨機組合
"""
import random
def build_pokers():
    suits = ["黑桃(♠)", "紅心(♥)", "方塊(♦)", "梅花(♣)"]
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    pokers = []
    for suit in suits:
        for value in values:
            pokers.append((suit, value))
    random.shuffle(pokers)
    p1 = pokers[0::4]  # 第1、5、9...張牌
    p2 = pokers[1::4]  # 第2、6、10...張牌
    p3 = pokers[2::4]  # 第3、7、11...張牌
    p4 = pokers[3::4]  # 第4、8、12...張牌
    return p1, p2, p3, p4

p1, p2, p3, p4 = build_pokers()
print("第一份 (13張):", p1)
print("第二份 (13張):", p2)
print("第三份 (13張):", p3)
print("第四份 (13張):", p4)
