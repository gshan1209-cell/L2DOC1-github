import random
def XOR_Coder(data:str | bytes, key:str):
    encode_mode = isinstance(data, str)
    # ---
    if encode_mode:
        data = data.encode("utf-8")
    # ---
    key = key.encode("utf-8")
    # ---
    newdata = bytearray()
    for ndx, value in enumerate(data):
        ndx = ndx % len(key)
        newdata.append(value ^ key[ndx])
    # ---
    if encode_mode:
        return bytes(newdata)
    else:
        return newdata.decode("utf-8")

orgStr = "NCHU中興大學"
key    = "".join(random.sample("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=8))
encStr = XOR_Coder(orgStr, key)
decStr = XOR_Coder(encStr, key)
# ----
print("加密金鑰:", key)
print("原始資料:", orgStr)
print("加密資料:", encStr)
print("解密資料:", decStr)