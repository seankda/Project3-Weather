import psycopg2
import sys
from  flask import Flask,render_template
from flask import jsonify
import pandas as pd
import json

app = Flask(__name__)

@app.route('/data')
def send_data():
    con = psycopg2.connect("host='localhost' dbname='covid_polluntants_db' user='postgres' password='gmql20160214'")  
    
    data=pd.read_sql("""
    SELECT d.date,c.cityname,me.median_co,me.median_no2,me.median_o3,me.median_pm25,me.median_so2,me.median_pm10
    FROM measurements AS me
    JOIN dates AS d
    on d.dateid=me.dateid
    join cities AS c
    on me.citiyid=c.citiyid
    where d.date!='2019-12-30' or d.date!='2019-12-31';
    """, con)

    data=data.to_json(orient='records',date_format='iso')
    return jsonify(json.loads(data))


@app.route('/scatter')
def getChart1():
    return render_template("scatter_line.html")


@app.route('/dropdown')
def getChart2():
    return render_template("dropdown.html")


if __name__ == "__main__":
    app.run(debug=True)