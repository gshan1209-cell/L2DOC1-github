import sqlite3
import os

# 取得目前腳本所在的目錄，並建立資料庫的絕對路徑
db_path = os.path.join(os.path.dirname(__file__), 'data.db')

# 建立資料庫連線
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # 執行 SQL 查詢
    cursor.execute("SELECT * FROM MOCK_DATA")
    
    # 取得欄位名稱
    columns = [desc[0] for desc in cursor.description]
    print(f"欄位名稱: {columns}")
    print("-" * 80)
    
    # 取得所有資料
    rows = cursor.fetchall()
    print(f"總共取得 {len(rows)} 筆資料，前 10 筆資料如下：")
    for row in rows[:10]:
        print(row)
        
finally:
    # 關閉資料庫連線
    conn.close()
