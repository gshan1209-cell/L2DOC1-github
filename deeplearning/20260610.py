from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Define the model
My_First_Model = Sequential()

# Add a hidden Dense layer with 'relu' activation
My_First_Model.add(Dense(8, activation='relu', input_dim=3))

# Add the output Dense layer for binary classification
# The layer should have 1 unit with 'sigmoid' activation for binary_crossentropy
My_First_Model.add(Dense(1, activation='sigmoid'))

# Compile the model
My_First_Model.compile(optimizer='sgd', loss='binary_crossentropy', metrics=['acc'])

# Fit the model
My_First_Model.fit(X, y, epochs=1000, batch_size=4)