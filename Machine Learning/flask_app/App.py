import os
from flask import Flask, render_template, request, jsonify
import numpy as np
from keras.models import load_model
import json

app = Flask(__name__)

@app.route('/')
def Hello():
    return "Server Up"

@app.route('/risk', methods=['POST'])
def riskCalculate():

    #Handling JSON Data from Post Request
    data = request.json

    input_data = np.zeros((1,7))

    input_data[0][0] = data["LAST_RT"]
    input_data[0][1] = data["LAST_UPB"]
    input_data[0][2] = data["Loan.Age"]
    input_data[0][3] = data["Months.To.Legal.Mat"]
    input_data[0][4] = data["Adj.Month.To.Mat"]
    input_data[0][5] = data["MSA"]
    input_data[0][6] = data["Maturity.date"]

    #Loading Model
    model = load_model('final_model.hdf5')

    #Making the prediction
    pred = float(model.predict(input_data))
    pred = round(pred)
    if pred == 1:
        outcome= "Default Predicted"
    else:
        outcome = "Will be able to repay"
    result = { 'predicted_outcome' : outcome }
    return json.dumps(result)
