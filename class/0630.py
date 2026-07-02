# ============================================================
# 匯入所需模組
# ============================================================
import subprocess
from tkinter import filedialog
import decimal
import sqlite3          # SQLite 資料庫操作
import tkinter as tk    # GUI 視窗程式
from tkinter import ttk, messagebox, filedialog  # 進階元件、訊息框、檔案對話框
import os               # 檔案路徑處理

class AutoBar(tk.Scrollbar):
    default_width=None
    def set(self,first,last):
        if self.default_width is None:
            self.default_width = self.winfo_width()
        if float(first)<= 0.0 and float(last) >= 1.0:
            self.config(width=0)
        else:
            self.config(width=self.default_width)
        return super().set(first,last)        
         

# ============================================================
# 建立主視窗
# ============================================================
root = tk.Tk()                          # 建立主視窗物件
root.title("商品庫存管理系統")            # 設定視窗標題
root.geometry("900x650")                # 設定視窗寬度 x 高度

# ============================================================
# 計算螢幕解析度，讓視窗置中顯示
# ============================================================
win_w = 900                              # 視窗寬度
win_h = 650                              # 視窗高度
scr_w = root.winfo_screenwidth()         # 取得螢幕寬度
scr_h = root.winfo_screenheight()        # 取得螢幕高度
win_x = (scr_w - win_w) // 2             # 計算視窗左上角 X 座標 (置中)
win_y = (scr_h - win_h) // 2             # 計算視窗左上角 Y 座標 (置中)
root.geometry(f"{win_w}x{win_h}+{win_x}+{win_y}")  # 重新設定視窗大小與位置

# ============================================================
# 定義色彩與字型常數（方便統一修改）
# ============================================================
COLOR_PRIMARY = "#2c3e50"    # 主色：深藍色
COLOR_SECONDARY = "#34495e"  # 次要色：淺深藍
COLOR_ACCENT = "#27ae60"     # 強調色：綠色
COLOR_ACCENT2 = "#2980b9"    # 強調色2：藍色
COLOR_BG = "#ecf0f1"         # 背景色：淺灰
COLOR_WHITE = "#ffffff"      # 白色
COLOR_DANGER = "#e74c3c"     # 危險/刪除：紅色
COLOR_WARNING = "#f39c12"    # 警告：橙色
FONT_FAMILY = ("Segoe UI", 10)        # 一般字型
FONT_TITLE = ("Segoe UI", 11, "bold") # 標題字型（粗體）

# ============================================================
# 設定表格（Treeview）的樣式
# ============================================================
style = ttk.Style()                              # 建立樣式物件
style.theme_use("clam")                          # 使用 clam 主題（較好自訂）
style.configure("Treeview",                       # 設定表格本體樣式
    background=COLOR_WHITE,                       # 背景白色
    foreground=COLOR_PRIMARY,                     # 文字深藍色
    rowheight=28,                                 # 行高
    fieldbackground=COLOR_WHITE,                  # 欄位背景白色
    font=FONT_FAMILY)                             # 字型
style.map("Treeview",                             # 設定動態樣式（選取時）
    background=[("selected", COLOR_ACCENT2)])     # 選取列變藍色
style.configure("Treeview.Heading",               # 設定表頭樣式
    background=COLOR_PRIMARY,                     # 背景深藍色
    foreground=COLOR_WHITE,                       # 文字白色
    font=FONT_TITLE,                              # 粗體字型
    relief="flat")                                # 平面邊框
style.map("Treeview.Heading",                     # 表頭滑鼠懸停效果
    background=[("active", COLOR_SECONDARY)])      # 懸停時變色

# ============================================================
# 上方工具列（放功能按鈕）
# ============================================================
toolPanel = tk.Frame(root, bg=COLOR_PRIMARY, pady=6)  # 建立框架容器（背景深藍色）
toolPanel.pack(fill='x', expand=False)                 # 水平填滿、不伸縮

# 統一按鈕樣式字典（方便套用）
btn_style = {"bg": COLOR_ACCENT, "font": ("Segoe UI", 10, "bold"),
             "fg": COLOR_WHITE, "width": 10, "relief": "flat",
             "cursor": "hand2", "bd": 0}

# 加入功能按鈕到工具列（side="left" 表示由左至右排列）
queryBtn = tk.Button(toolPanel, text="🔍 查詢", **btn_style)
queryBtn.pack(side="left", padx=4, pady=4)

addBtn = tk.Button(toolPanel, text="➕ 新增", **btn_style)
addBtn.pack(side="left", padx=4, pady=4)

updBtn = tk.Button(toolPanel, text="✏️ 修改", **btn_style)
updBtn.pack(side="left", padx=4, pady=4)

delBtn = tk.Button(toolPanel, text="🗑️ 刪除", bg=COLOR_DANGER,
                   **{k: v for k, v in btn_style.items() if k != "bg"})
delBtn.pack(side="left", padx=4, pady=4)

# 分隔線（視覺區隔不同群組的按鈕）
tk.Frame(toolPanel, bg=COLOR_SECONDARY, width=2).pack(
    side="left", fill='y', padx=10, pady=4)

# 資料庫相關按鈕
fileBtn = tk.Button(toolPanel, text="📁 選檔案", bg=COLOR_ACCENT2,
                    **{k: v for k, v in btn_style.items() if k != "bg"})
fileBtn.pack(side="left", padx=4, pady=4)

# 顯示資料庫檔名的變數與標籤
dbPathVar = tk.StringVar(value="未選擇資料庫")   # 字串變數，內容會同步顯示在標籤上
dbLabel = tk.Label(toolPanel, textvariable=dbPathVar,
                   bg=COLOR_PRIMARY, fg="#bdc3c7", font=("Segoe UI", 9))
dbLabel.pack(side="left", padx=6, pady=4)

conBtn = tk.Button(toolPanel, text="🔌 連線", bg=COLOR_WARNING,
                   **{k: v for k, v in btn_style.items() if k != "bg"})
conBtn.pack(side="left", padx=4, pady=4)

# ============================================================
# SQL 輸入區（LabelFrame 是有標題的框架）
# ============================================================
sqlPanel = tk.LabelFrame(root, text=" SQL 指令 ", bg=COLOR_BG,
                         fg=COLOR_PRIMARY, font=FONT_TITLE,
                         padx=10, pady=8, bd=1, relief="solid")
sqlPanel.pack(fill='x', expand=False, padx=10, pady=(10, 0))

# SQL 文字編輯器（等寬字體方便排版 SQL）
sqlEditor = tk.Text(sqlPanel, height=3, font=("Consolas", 11),
                    bd=1, relief="solid", padx=6, pady=6, insertwidth=2)
sqlEditor.pack(fill='x', side="left", expand=True)

# 執行與清除按鈕
execBtn = tk.Button(sqlPanel, text="▶ 執行", bg=COLOR_ACCENT,
                    font=("Segoe UI", 10, "bold"), fg=COLOR_WHITE,
                    width=8, relief="flat", cursor="hand2", bd=0)
execBtn.pack(side="right", padx=(8, 0))

clearBtn = tk.Button(sqlPanel, text="清除", bg=COLOR_SECONDARY,
                     font=("Segoe UI", 10, "bold"), fg=COLOR_WHITE,
                     width=6, relief="flat", cursor="hand2", bd=0)
clearBtn.pack(side="right", padx=4)

# ============================================================
# 主要內容區（放資料表格）
# ============================================================
listPanel = tk.Frame(root, bg=COLOR_BG)          # 主內容框架
listPanel.pack(fill='both', expand=True, padx=10, pady=10)  # 填滿剩餘空間

# 建立 Treeview 表格元件（show="headings" 表示只顯示表頭、不顯示樹狀結構）
tree = ttk.Treeview(listPanel, show="headings", style="Treeview")
tree.pack(fill='both', expand=True, side="left")

# 加入垂直捲軸，並綁定到 Treeview
scrollbar = ttk.Scrollbar(listPanel, orient="vertical", command=tree.yview)
scrollbar.pack(side="right", fill='y')
tree.configure(yscrollcommand=scrollbar.set)  # 讓 Treeview 控制捲軸位置

# ============================================================
# 底部狀態列（顯示目前操作狀態）
# ============================================================
statusVar = tk.StringVar(value="就緒")           # 狀態文字變數
statusBar = tk.Label(root, textvariable=statusVar,
                     bg=COLOR_PRIMARY, fg=COLOR_WHITE,
                     font=("Segoe UI", 9), anchor="w", padx=12, pady=3)
statusBar.pack(fill='x', side="bottom")          # 固定在視窗底部

# ============================================================
# 函式區：選擇資料庫檔案
# ============================================================
def select_db():
    """開啟檔案對話框讓使用者選擇 .db 檔案"""
    path = filedialog.askopenfilename(
        title="選擇資料庫",
        filetypes=[("SQLite 資料庫", "*.db"), ("所有檔案", "*.*")])
    if path:                                     # 如果有選擇檔案
        dbPathVar.set(f"📄 {os.path.basename(path)}")   # 顯示檔名
        dbPathVar.path = path                    # 自訂屬性儲存完整路徑
        statusVar.set(f"已選擇資料庫：{path}")    # 更新狀態列

# ============================================================
# 函式區：連線到資料庫
# ============================================================
def connect_db():
    """根據選擇的檔案路徑連線到 SQLite 資料庫"""
    path = getattr(dbPathVar, 'path', "")         # 取得儲存的路徑
    if not path or not os.path.exists(path):     # 檢查檔案是否存在
        messagebox.showerror("錯誤", "請先選擇資料庫檔案")
        return None                              # 回傳 None 表示連線失敗
    try:
        conn = sqlite3.connect(path)             # 建立 SQLite 連線
        statusVar.set(f"✅ 已連線：{os.path.basename(path)}")
        return conn                              # 回傳連線物件
    except Exception as e:
        messagebox.showerror("連線失敗", str(e))
        return None

# ============================================================
# 函式區：執行 SQL 指令
# ============================================================
def exec_sql():
    """讀取 SQL 編輯器的內容並執行，SELECT 結果顯示在表格中"""
    conn = connect_db()                          # 先取得資料庫連線
    if not conn:                                 # 連線失敗就結束
        return

    sql = sqlEditor.get("1.0", "end-1c").strip() # 取得 SQL 編輯器內容
    if not sql:                                  # 如果沒輸入任何 SQL
        messagebox.showwarning("警告", "請輸入 SQL 語句")
        conn.close()
        return

    try:
        cursor = conn.cursor()                   # 建立游標物件
        cursor.execute(sql)                      # 執行 SQL 指令
        conn.commit()                            # 提交交易（寫入資料庫）

        # 判斷是否為查詢指令（有回傳資料列）
        # 用 cursor.description 判斷比 startswith("select") 更準確
        if cursor.description:
            rows = cursor.fetchall()             # 取得所有查詢結果
            col_names = [desc[0] for desc in cursor.description]  # 取得欄位名稱
            tree.delete(*tree.get_children())    # 清空表格舊資料

            tree["columns"] = col_names          # 設定表格欄位
            for col in col_names:
                tree.heading(col, text=col)      # 設定表頭文字
                tree.column(col, width=120, anchor="center", minwidth=60)  # 設定欄寬

            for row in rows:                     # 逐筆插入資料
                tree.insert("", "end", values=row)

            statusVar.set(f"✅ 查詢完成，共 {len(rows)} 筆資料")
        else:
            # 非查詢指令（INSERT、UPDATE、DELETE 等）
            messagebox.showinfo("成功",
                f"執行成功，影響 {cursor.rowcount} 筆資料")
            statusVar.set(f"✅ 執行成功，影響 {cursor.rowcount} 筆資料")

    except Exception as e:
        messagebox.showerror("錯誤", str(e))
        statusVar.set(f"❌ 錯誤：{str(e)}")
    finally:
        conn.close()                             # 無論成功或失敗，最後都要關閉連線

# ============================================================
# 函式區：清除 SQL 編輯器
# ============================================================
def clear_sql():
    """清空 SQL 編輯器內容"""
    sqlEditor.delete("1.0", "end")               # 刪除全部文字
    statusVar.set("已清除 SQL 輸入")

# ============================================================
# 函式區：快速查詢 products 表格
# ============================================================
def query_data():
    """自動填入查詢 SQL 並執行（教學用快速展示）"""
    sql = "SELECT name AS 名稱, price AS 價格, stock AS 庫存 FROM products"
    sqlEditor.delete("1.0", "end")               # 清除舊內容
    sqlEditor.insert("1.0", sql)                 # 填入 SQL
    exec_sql()                                   # 直接執行

# ============================================================
# 將按鈕綁定對應的函式
# ============================================================
fileBtn.config(command=select_db)     # 選檔案按鈕 → 選擇資料庫
conBtn.config(command=connect_db)     # 連線按鈕 → 連線資料庫
execBtn.config(command=exec_sql)      # 執行按鈕 → 執行 SQL
clearBtn.config(command=clear_sql)    # 清除按鈕 → 清空 SQL 編輯器
queryBtn.config(command=query_data)   # 查詢按鈕 → 快速查詢

# ============================================================
# 預設填入教學用 SQL 指令（讓初學者直接按執行體驗）
# ============================================================
default_sql = """-- 範例：查詢所有商品資料
SELECT name AS 名稱, price AS 價格, stock AS 庫存 FROM products;"""
sqlEditor.insert("1.0", default_sql)

# ============================================================
# 鍵盤快捷鍵設定
# ============================================================
root.bind("<Control-Return>", lambda e: exec_sql())   # Ctrl+Enter 執行 SQL
root.bind("<Escape>", lambda e: clear_sql())           # Esc 清除 SQL

# ============================================================
# 啟動主視窗的事件迴圈（程式從這裡開始持續執行）
# ============================================================
root.mainloop()
