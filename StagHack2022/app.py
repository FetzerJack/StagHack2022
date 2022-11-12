import flask
from flask import Flask, render_template, request
import pandas as pd
import csv
import json

app=Flask(__name__)

def makeDataFrame(csvf):
    df =pd.read_csv(csvf)
    print(df)

def make_json(csvFilePath , jsonFilePath):
    data = {}

    with open(csvFilePath , encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        for rows in csvReader:

            key = rows['NPI']
            data[key] = rows
    
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

def init():
    print("initializing... ")

  
@app.route('/')
def index():
    return flask.render_template('index.html')


@app.route('/result')
def result():
    df =pd.read_csv('Quality_MIPS.csv')
    print(df)
    return render_template('results.html', df = df)
 

if __name__ == '__main__':
    init()
    app.run(debug=True, port=9090)
   
