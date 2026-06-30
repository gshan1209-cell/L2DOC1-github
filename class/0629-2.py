"""
波士頓房價預測：兩層與三層類神經網路
"""
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.datasets import boston_housing
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.callbacks import EarlyStopping

#1. 載入資料
(X_train, y_train), (X_test, y_test) = boston_housing.load_data()

print("X_train shape:", X_train.shape)
print("y_train shape:", y_train.shape)
print("X_test shape:", X_test.shape)
print("y_test shape:", y_test.shape)
 
 #2. 資料標準化
mean = X_train.mean(axis=0)
std = X_train.std(axis=0)

X_train_scaled = (X_train - mean) / std
X_test_scaled = (X_test - mean) / std

#題目一：兩層類神經網路
model_2_layers = Sequential([
    Dense(64, activation='relu', input_shape=(X_train_scaled.shape[1],)),
    Dense(1)
])

model_2_layers.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

model_2_layers.summary()

#訓練模型
early_stop = EarlyStopping(
    monitor='val_loss',
    patience=20,
    restore_best_weights=True
)

history_2 = model_2_layers.fit(
    X_train_scaled,
    y_train,
    epochs=200,
    batch_size=16,
    validation_split=0.2,
    callbacks=[early_stop],
    verbose=1
)

#評估模型
test_mse_2, test_mae_2 = model_2_layers.evaluate(X_test_scaled, y_test)

print("兩層模型 Test MSE:", test_mse_2)
print("兩層模型 Test MAE:", test_mae_2)


#題目二：三層類神經網路
model_3_layers = Sequential([
    Dense(64, activation='relu', input_shape=(X_train_scaled.shape[1],)),
    Dense(32, activation='relu'),
    Dense(1)
])

model_3_layers.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

model_3_layers.summary()

#訓練模型
history_3 = model_3_layers.fit(
    X_train_scaled,
    y_train,
    epochs=200,
    batch_size=16,
    validation_split=0.2,
    callbacks=[early_stop],
    verbose=1
)

#評估模型
test_mse_3, test_mae_3 = model_3_layers.evaluate(X_test_scaled, y_test)

print("三層模型 Test MSE:", test_mse_3)
print("三層模型 Test MAE:", test_mae_3)

#比較兩層與三層模型的 MAE
mae_diff = abs(test_mae_2 - test_mae_3)
print("两層模型 Test MAE:", test_mae_2)
print("三層模型 Test MAE:", test_mae_3)
print("兩層與三層模型的 MAE 相差:", mae_diff)

#4. 畫出訓練過程
plt.figure(figsize=(12, 5))

# 兩層模型
plt.figure(figsize=(8, 5))
plt.plot(history_2.history['loss'], label='Training Loss')
plt.plot(history_2.history['val_loss'], label='Validation Loss')
plt.title('Two-layer Neural Network Loss')
plt.xlabel('Epoch')
plt.ylabel('MSE Loss')
plt.legend()
plt.show()
# 三層模型
plt.subplot(1, 2, 2)
plt.plot(history_3.history['loss'], label='Train Loss')
plt.plot(history_3.history['val_loss'], label='Validation Loss')
plt.title('3-layer Model Training')
plt.xlabel('Epoch')
plt.ylabel('Loss (MSE)')
plt.legend()
plt.grid(True)


plt.tight_layout()
plt.show()

#三層模型 Loss
plt.figure(figsize=(8, 5))
plt.plot(history_3.history['loss'], label='Training Loss')
plt.plot(history_3.history['val_loss'], label='Validation Loss')
plt.title('Three-layer Neural Network Loss')
plt.xlabel('Epoch')
plt.ylabel('MSE Loss')
plt.legend()
plt.show()

#5. 預測結果範例
predictions = model_3_layers.predict(X_test_scaled)

for i in range(10):
    print(f"第 {i+1} 筆")
    print(f"實際房價: {y_test[i]:.2f}")
    print(f"預測房價: {predictions[i][0]:.2f}")
    print("---")