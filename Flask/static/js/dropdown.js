function init(){
    var dropdown = d3.select("#selDataset"); 
    pollutant=["pm25","pm10","co","so2","no2","o3"];
    pollutant.forEach((potype)=> { 
    dropdown.append("option").text(potype).property("value");
    
    var defaultOption = ["pm25"]

  return drawbar(defaultOption)});}
init()


function activation(potype){
  drawbar(potype);
}


function optionChanged(potype){
    activation(potype);
}


function average(potype, data, year) {

  //  console.log("value",data);
   var arr=data.filter(data=>{
   selectedYear = new Date(data.date).getFullYear();
   return  selectedYear===year
   })
   .map(data=>data[`median_${potype}`]);  
  // console.log("arr",arr);

  var total = 0;
  for(var j = 0; j < arr.length; j++) {
      total += parseInt(arr[j]);} 
  var avg = total / arr.length;     
  return avg;
  }


function drawbar(potype){
  d3.json("http://127.0.0.1:5000/data").then(function (weatherDate) {
  console.log(weatherDate);

  var weatherdataBylocation = d3.nest()
    .key(function (d) {
      return d.cityname;
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

  var type_2019=(average(potype,val,2019));
  console.log(type_2019);
  var type_2020=(average(potype,val,2020));
  console.log(type_2020);

  xarr2019.push(type_2019);
  xarr2020.push(type_2020);

  }
    
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
    title: `${potype} Mean (2019 VS.2020)`,
    barmode: 'group',
    autosize: true,
    height: 725,
    margin: {
      l:200,
      r:500,
      b:50,
      t:50
    }
  };

  var config = {responsive: true}
  
  Plotly.newPlot('barplot', data, layout, config);
  }) }



  