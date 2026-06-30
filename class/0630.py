import subprocess
import sqlite3
import tkinter as tk
from tkinter import ttk, messagebox,filedialog
import os

root=tk.Tk()
win_w=1024
win_h=768
scr_w=root.winfo_screenwidth()
scr_h=root.winfo_screenheight()
win_x=(scr_w-win_w)//2
win_y=(scr_h-win_h)//2
 
root.title("商品庫存管理系統")
root.geometry("800x600")

toolPanel=tk.Frame(root,bg="#4a6f87",pady=5)
toolPanel.pack(fill='x',expand=False)

listPanel=tk.Frame(root)
listPanel.pack(fill='both', expand=True, padx=5, pady=5)

detailPanel=tk.Frame(root)
detailPanel.pack(fill='x', expand=False, padx=5, pady=5)

selBtn=tk.Button(toolPanel,text="查詢",bg="#a4c639",font=("Arial",12),fg="white",width=10)
selBtn.pack(side="left",fill='y' , padx=5, pady=5)

addBtn=tk.Button(toolPanel,text="新增",bg="#a4c639",font=("Arial",12),fg="white",width=10)
addBtn.pack(side="left",fill='y' , padx=5, pady=5)

updBtn=tk.Button(toolPanel,text="修改",bg="#a4c639",font=("Arial",12),fg="white",width=10)
updBtn.pack(side="left",fill='y' , padx=5, pady=5)




def connect_db():
    return sqlite3.connect("inventory.db")

def create_table():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, stock INTEGER)")
    conn.commit()
    conn.close()

create_table()

root.mainloop()

# pyrefly: ignore [name-defined]