#匯入資料庫連接函式庫
import sqlite3 
import os

# 取得目前腳本所在的目錄，並建立資料庫的絕對路徑
db_path = os.path.join(os.path.dirname(__file__), 'data.db')

#產生資料庫連線
conn = sqlite3.connect(db_path)
#產生對應資料庫通道指標
cur = conn.cursor()
#執行SQL語句
cur.execute("SELECT * FROM MOCK_DATA WHERE id<=5" )
#取出資料欄位
column = tuple(row[0] for row in cur.description)
# 取得並列印查詢結果
print(cur.fetchall())
