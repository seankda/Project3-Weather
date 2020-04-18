// initiate bubble chart page (year 2019, year 2020) with default dropdown value
function init() {

  var dropdown = d3.select("#selDataset");
  pollutant = ['avg_pm25', 'avg_pm10', 'avg_co', 'avg_o3', 'avg_no2', 'avg_so2'];
  pollutant.forEach((type) => {
    dropdown.append("option").text(type).property("value");
  })

  getChart('avg_pm25', 2019, '0');
  getChart('avg_pm25', 2020, '1');

};
init();

// optionChange function 
function optionChanged(type) {
  getChart(type, 2019, '0');
  getChart(type, 2020, '1');
}

// getChart function for drawing bubble chart
function getChart(type, year, index) {
  d3.json("http://127.0.0.1:5000/bubbledata").then(function (bubbledata) {

    var dataYear = bubbledata.data.filter(d => d.year === year);
    console.log(dataYear);

    var selecteddata = [];

    var backgroundColorset = [
      'rgba(153, 0, 102 0.2)',
      'rgba(153, 0, 204, 0.2)',
      'rgba(204, 0, 0, 0.2)',
      'rgba(204, 0, 102, 0.2)',
      'rgba(204, 0, 204, 0.2)',
      'rgba(0, 255, 102, 0.2)',
      'rgba(0, 255, 204, 0.2)',
      'rgba(51, 255, 0,  0.2)',
      'rgba(51, 255, 255, 0.2)',
      'rgba(102, 255, 0, 0.2)',
      'rgba(102, 255 204, 0.2)',
      'rgba(153, 153, 0, 0.2)',
      'rgba(153, 153, 153, 0.2)',
      'rgba(204, 153, 0, 0.2)',
      'rgba(204, 153, 153, 0.2)',
      'rgba(255, 153, 0, 0.2)',
      'rgba(102, 102, 102, 0.2)',
      'rgba(102, 102, 255, 0.2)'
    ];

    var borderColorset = [
      'rgba(153, 0, 102 1)',
      'rgba(153, 0, 204, 1)',
      'rgba(204, 0, 0, 1)',
      'rgba(204, 0, 102, 1)',
      'rgba(204, 0, 204, 1)',
      'rgba(0, 255, 102, 1)',
      'rgba(0, 255, 204, 1)',
      'rgba(51, 255, 0,  1)',
      'rgba(51, 255, 255, 1)',
      'rgba(102, 255, 0, 1)',
      'rgba(102, 255 204, 1)',
      'rgba(153, 153, 0, 1)',
      'rgba(153, 153, 153, 1)',
      'rgba(204, 153, 0, 1)',
      'rgba(204, 153, 153, 1)',
      'rgba(255, 153, 0, 1)',
      'rgba(102, 102, 102, 1)',
      'rgba(102, 102, 255, 1)'
    ]

    // chart.js chart  
    for (var i = 0; i < dataYear.length; i++) {

      var dataset = {
        label: dataYear[i].cityname,
        backgroundColor: backgroundColorset[i],
        borderColor: borderColorset[i],
        pointBackgroundColor: borderColorset[i],
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: borderColorset[i],
        data: [{
          x: i + 1,
          y: dataYear[i][type],
          r: dataYear[i][type]
        }]
      }
      selecteddata.push(dataset)
    }

    var datasets;
    datasets = selecteddata;

    var chartdata = {
      datasets
    };
    // console.log(chartdata);

    // remove previous chart and add new container for chart initalization

    
    document.getElementsByClassName('bubbleChart' + index)[0].innerHTML = '<canvas id="bubbleChart' + index + '"></canvas>';

    // create new chart and loop though year (index)

    var bubblect = document.getElementById("bubbleChart" + index);

    var bubbleChart = new Chart(bubblect, {
      type: 'bubble',
      data: chartdata,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ""
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Mean Value"
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "City Index"
            }
          }],
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50,
          }
        }
      }
    });

  })
}