from flask import Flask, render_template, request, jsonify, make_response, Response
from flask_restful import Resource, Api
import pandas as pd

app=Flask(__name__)

@app.route('/result')
def get():
    df = pd.read_csv('C:\\Users\\Jack Fetzer\\Documents\\GitHub\\StagHack2022\\Providers.csv')
    response = make_response(df.to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
 
if __name__ == '__main__':
    app.run(debug=True, port=9090)