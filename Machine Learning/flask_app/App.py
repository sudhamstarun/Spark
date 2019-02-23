import os
from flask import Flask, render_template, request
import numpy as np
from keras.models import model_from_json

app = Flask(__name__)

@app.route('/')
def Hello():
    return "Server Up"

@app.route('/risk' methods=['POST'])
def riskCalculate():
    #Loading Model
    json_file = open('final_model.json', 'r')
    model_json = json_file.read()
    json_file.close()

    model = model_from_json(model_json)

    model.load_weights('final_weights.hdf5')

    model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

    #Handling JSON Data from Post Request


    #Calculating Delinquicy
    pred = model.predict()
