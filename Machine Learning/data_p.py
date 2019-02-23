# -*- coding: utf-8 -*-
"""
Created on Sat Feb 23 23:01:52 2019

@author: jainr
"""

import tensorflow as tf
import pandas as pd
from keras.models import Sequential
import numpy as np

Performance_names =["LOAN_ID",
                    "Monthly.Rpt.Prd",
                    "Servicer.Name",
                    "LAST_RT",
                    "LAST_UPB",
                    "Loan.Age",
                    "Months.To.Legal.Mat",
                    "Adj.Month.To.Mat",
                    "Maturity.Date",
                    "MSA",
                    "Delq.Status",
                    "MOD_FLAG",
                    "Zero.Bal.Code",
                    "ZB_DTE",
                    "LPI_DTE",
                    "FCC_DTE",
                    "DISP_DT",
                    "FCC_COST",
                   "PP_COST",
                    "AR_COST",
                    "IE_COST",
                    "TAX_COST",
                    "NS_PROCS",
                    "CE_PROCS",
                    "RMW_PROCS",
                    "O_PROCS",
                    "NON_INT_UPB",
                    "PRIN_FORG_UPB",
                    "RM1",
                    "RM2",
                    "RM3"
]

df = pd.read_csv('Performance_2017Q1.txt', sep='|', names = Performance_names, header=None)

df_temp = df

rem_cols = ["LOAN_ID",  "Monthly.Rpt.Prd", "Servicer.Name" ,"ZB_DTE",
                    "LPI_DTE",
                    "FCC_DTE",
                    "DISP_DT","FCC_DTE",
                    "DISP_DT",
                    "FCC_COST",
                   "PP_COST",
                    "AR_COST",
                    "IE_COST",
                    "TAX_COST",
                    "NS_PROCS",
                    "CE_PROCS",
                    "RMW_PROCS",
                    "O_PROCS",
                    "NON_INT_UPB",
                    "PRIN_FORG_UPB","RM1","RM2",
                    "RM3"]

df = df.drop(rem_cols, axis=1)


## Maturity date converted to continous variable
dates = df['Maturity.Date']
dates = dates.values

conv_dates=np.zeros(shape=(len(dates),1))

i=0
for date in dates:
    conv_dates[i] = float(int(date[0:2])/12) + float(date[3:7])
    i+=1
    print(i)

####

# Removing and Adding Columns    
df = df.drop(columns=['Maturity.Date'], axis=1)

df['Maturity.date'] = conv_dates

df.isnull().sum()

df = df.drop(columns=['Zero.Bal.Code'], axis=1)

#Removing NA Columns

df = df.dropna()

df = df.drop(columns=['MOD_FLAG'],axis=1)
df.to_csv('final_data.csv')

