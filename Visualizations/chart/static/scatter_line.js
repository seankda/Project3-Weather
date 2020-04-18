
d3.json("http://127.0.0.1:5000/data").then(function (weatherDate) {
  console.log(weatherDate);

  var weatherdataBylocation = d3.nest()
    .key(function (d) {
      return d.cityname;
    })
    .entries(weatherDate);
    console.log(weatherdataBylocation);

  for (var i in weatherdataBylocation) {
    var val = weatherdataBylocation[i].values;
    var city = weatherdataBylocation[i].key;
    console.log('loc:', weatherdataBylocation[i].values);
    console.log('loc:', weatherdataBylocation[i].key);
    chart(city, val, i, '2019');
    chart(city, val, i, '2020');
  }
})

function chart(city, data, index, year) {

  var datax = [];
  var datay1 = [];
  var datay2 = [];
  var datay3 = [];
  var datay4 = [];
  var datay5 = [];
  var datay6 = [];

 
  for (var i in data) {
    selectedYear = (data[i].date).substr(0,4);
    selectedMonth =  (data[i].date).substr(5,2);
    if (selectedYear== year && selectedMonth != '12' ) {
      datax.push(data[i].date);
      datay1.push(data[i].median_pm25);
      datay2.push(data[i].median_pm10);
      datay3.push(data[i].median_o3);
      datay4.push(data[i].median_no2);
      datay5.push(data[i].median_so2);
      datay6.push(data[i].median_co);
    }
  }

  // Part 3 - Line Chart
  var trace1 = {
    x: datax,
    y: datay1,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'PM25',
    marker: { size: 9 }
  };
  var trace2 = {
    x: datax,
    y: datay2,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'PM10',
    marker: { size: 9 }
  };  
  var trace3 = {
    x: datax,
    y: datay3,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'O3',
    marker: { size: 9 }
  };    
  var trace4 = {
    x: datax,
    y: datay4,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'NO2',
    marker: { size: 9 }
  };    
  var trace5 = {
    x: datax,
    y: datay5,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'SO2',
    marker: { size: 9 }
  };    
  var trace6 = {
    x: datax,
    y: datay6,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'CO',
    marker: { size: 9 }
  };
  
  var data = [trace1, trace2,trace3,trace4,trace5,trace6];
  var layout = {
    title: city,
  };
  Plotly.newPlot("plot" + index+year, data, layout);

}
