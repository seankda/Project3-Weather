

function average(label, data, year) {
  //  console.log("value",value);
   var arr=data.filter(data=>{
   selectedYear = new Date(data.Date).getFullYear();
   return  selectedYear===year
   })
   .map(data=>data[label]);  
  // console.log("arr",arr);
  var total = 0;
  for(var j = 0; j < arr.length; j++) {
      total += parseInt(arr[j]);} 
  var avg = total / arr.length;     
  return avg;
  }


d3.csv("./cleanData.csv").then(function (weatherDate) {
  console.log(weatherDate);

  var weatherdataBylocation = d3.nest()
    .key(function (d) {
      return d.City;
    })
    .entries(weatherDate);
  console.log(weatherdataBylocation);

  
  var yarr=[];
  var xarr2019=[]
  var xarr2020=[]
  for (var i in weatherdataBylocation) {
  var val = weatherdataBylocation[i].values;
  var city = weatherdataBylocation[i].key;
  // console.log('values:', weatherdataBylocation[i].values);
  // console.log('key:', weatherdataBylocation[i].key);  
  yarr.push(city);
  console.log(yarr); 


  var pm25_2019=(average("pm25",val,2019));
  console.log(pm25_2019);
  var pm25_2020=(average("pm25",val,2020));
  console.log(pm25_2020);

  xarr2019.push(pm25_2019);
  xarr2020.push(pm25_2020);

  }

  // var pm25_2019=(average("pm25",val,2019));
  // console.log(pm25_2019);
  // var pm25_2020=(average("pm25",val,2020));
  // console.log(pm25_2020); 
  // var pm10_2019=(average("pm10",val,2019));
  // console.log(pm10_2019);
  // var pm10_2020=(average("pm10",val,2020));
  // console.log(pm10_2020);   
  // var co_2019=(average("co",val,2019));
  // console.log(co_2019);   
  // var co_2020=(average("co",val,2020));
  // console.log(co_2020); 
  // var co_2019=(average("o3",val,2019));
  // console.log(co_2019);   
  // var co_2020=(average("o3",val,2020));
  // console.log(co_2020); 
  // var co_2019=(average("no2",val,2019));
  // console.log(co_2019);   
  // var co_2020=(average("no2",val,2020));
  // console.log(co_2020); 
  // var co_2019=(average("so2",val,2019));
  // console.log(co_2019);   
  // var co_2020=(average("so2",val,2020));
  // console.log(co_2020); 
    
  var trace1 = {
    x: xarr2019,
    y: yarr,
    name: '2019',
    orientation: 'h',
    marker: {
      // color: 'rgba(55,128,191,0.6)',
      borderWidth: 40,
      width: 50
    },
    type: 'bar'
  };

 
  var trace2 = {
    x: xarr2020,
    y: yarr,
    name: '2020',
    orientation: 'h',
    type: 'bar',
    marker: {
      // color: 'rgba(255,153,51,0.6)',
      borderWidth: 40,
      width: 50
    }
  };
  
  var data = [trace1, trace2];
  
  var layout = {
    title: 'PM25 Mean (2019 VS.2020)',
    barmode: 'group'
  };
  
  Plotly.newPlot('barplot', data, layout);  
})



  