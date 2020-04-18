import psycopg2
import sys
from  flask import Flask,render_template
from flask import jsonify
import pandas as pd
import json
from sqlalchemy import create_engine

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route('/data')
def send_data():
    con = psycopg2.connect("host='localhost' dbname='covid_polluntants_db' user='postgres' password='postgres'")  
    
    data=pd.read_sql("""
    SELECT d.date,c.cityname,me.median_co,me.median_no2,me.median_o3,me.median_pm25,me.median_so2,me.median_pm10
    FROM measurements AS me
    JOIN dates AS d
    on d.dateid=me.dateid
    join cities AS c
    on me.citiyid=c.citiyid
    where (d.date!='2019-12-30' or d.date!='2019-12-31') and (date_part('month',d.date)<5);
    """, con)

    data=data.to_json(orient='records',date_format='iso')
    return jsonify(json.loads(data))

@app.route('/bubbledata')
def bubble_data():
    con = psycopg2.connect("host='localhost' dbname='covid_polluntants_db' user='postgres' password='postgres'")  
    
    data=pd.read_sql("""
    SELECT date_part('year',d.date) as year, c.cityname,avg(me.median_co) as avg_co,avg(me.median_no2)as avg_no2,avg(me.median_o3) as avg_o3,avg(me.median_pm25)as avg_pm25,avg(me.median_so2)as avg_so2,avg(me.median_pm10)as avg_pm10
    FROM measurements AS me
    JOIN dates AS d
    on d.dateid=me.dateid
    join cities AS c
    on me.citiyid=c.citiyid
   where date_part('year',d.date) > 2018
   group by date_part('year',d.date), c.cityname;
    """, con)    
    return jsonify({'data':data.to_dict(orient='records')})

@app.route("/cleanmerge")
def cleanmergeIPYNB():
    return render_template("cleanmerge.html")

@app.route("/dropdown")
def dropdownPage():
    return render_template("graphs/dropdown.html")

@app.route("/scatter")
def scatter():
    return render_template("graphs/scatter.html")

@app.route('/bubble')
def bubblePage():
    return render_template("graphs/bubble.html")



if __name__ == "__main__":
    app.run(debug=True)