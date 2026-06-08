"""
BMI = 體重(kg) /  (身高 * 身高)
讓用戶輸入體重&身高，計算BMI 值，至小數第二位
格式:

BMI =  ###.# / (#.## x #.##) = ####.##
wkg = float(input("體重(Kg) : "))
hm2 = float(input("身高(M) : "))
BMI = wkg / (hm2 * hm2)
print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}")
"""


"""
承上題，男性標準值: 22 ~28，女性標準值 18~25
請依據BMI 輸出，過輕、適中、偏重
格式:
BMI =  ###.# / (#.## x #.##) = ####.## (狀態)

方法一
# 取得資料
wkg = float(input("體重(Kg) : "))
hm2 = float(input("身高(M) : "))
ged = input("性別(M:男生/F:女生) :")
# 處理資料
BMI = wkg / (hm2 * hm2)
# 輸出結果
if  ged == "M":
    if   BMI < 22:
        print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(過輕)")
    elif BMI > 28:   
        print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(偏重)")
    else:
        print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(適中)")
else:
    if   BMI < 18:
        print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(過輕)")
    elif BMI > 25:   
        print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(偏重)")
    else:
        print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(適中)")
"""

"""
方法二
# 取得資料
wkg = float(input("體重(Kg) : "))
hm2 = float(input("身高(M) : "))
ged = input("性別(M:男生/F:女生) :")
# 處理資料
BMI = wkg / (hm2 * hm2)
BMI_min = 22
BMI_max = 28
if ged != "M":
    BMI_min = 18
    BMI_max = 25
# ---
if   BMI < BMI_min:
    print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(過輕)")
elif BMI > BMI_max:   
    print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(偏重)")
else:
    print(f"BMI = {wkg:4.1f} / ({hm2:3.2f} x {hm2:3.2f}) = {BMI:6.2f}(適中)")
"""



"""
某停車場前15分鐘免費，第一個小時40 元，
之後每30分鐘20 元， 當日最高不超過 180 元
請輸入停車分鐘數， 計算應收費金額
格式:
停車時間  計算金額 應付金額
-------- -------- --------
12345678 12345678 12345678

方法一
tot_tm  = int(input("總分鐘數 : "))
tot_amt = 0
if tot_tm > 15:
    tot_amt = 40
# ---
if tot_tm > 60:
    tm = (tot_tm - 60) // 30
    if tot_tm % 30 > 0:
        tm = tm + 1
else:
    tm = 0
# --- 
tot_amt = tot_amt + tm * 20
if tot_amt > 180:
    pay_amt = 180
else:
    pay_amt = tot_amt
# ---
print("停車時間  計算金額 應付金額")
print("-------- -------- --------")
print(f"{tot_tm:8d} {tot_amt:8d} {pay_amt:8d}")
"""

tot_tm  = int(input("總分鐘數 : "))
tot_amt = pay_amt = 0
if tot_tm > 15:
    tot_amt = (tot_tm // 30) * 20
    if tot_tm % 30 > 0:
        tot_amt = tot_amt + 20
    # ---
    if   tot_amt < 40:
        pay_amt = 40
    elif tot_amt > 180:
        pay_amt = 180
    else:
        pay_amt = tot_amt
# ---
print("停車時間  計算金額 應付金額")
print("-------- -------- --------")
print(f"{tot_tm:8d} {tot_amt:8d} {pay_amt:8d}")
