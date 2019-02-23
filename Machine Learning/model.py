import pandas as pd
import numpy as np
import tensorflow as tf

import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split

df['Delq.Status'].astype(str)

y = df['Delq.Status']
X = df.drop(columns=['Delq.Status'], axis=1)


y_float = y

for i in range(len(y_float)):
    if y_float[i] == '0':
        y_float[i] = 0.0
    else:
        y_float[i] = 1.0

y = np.asfarray(y_float)
x_train, x_test, y_train, y_test = train_test_split(X,y,test_size=0.2, random_state=42)
    

model = Sequential()
model.add(Dense(64, input_dim=7, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])


model.fit(x_train, y_train,
          epochs=20,
          batch_size=4000)


score = model.evaluate(x_test, y_test, batch_size=4000)