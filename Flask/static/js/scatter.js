  $(document).ready(function () {
    $("select").change(function () {
      $(this).find("option:selected").each(function () {
        var optionValue = $(this).attr("value");
        if (optionValue) {
          $(".box").not("." + optionValue).hide();
          $("." + optionValue).show();
        } else {
          $(".box").hide();
        }
      });

      // Reference data from url
      d3.json("http://127.0.0.1:5000/data").then(function (airData) {
        console.log(airData);

        // restructure data by JS gourpby function d3.nest
        var airDataBylocation = d3.nest()
          .key(function (d) {
            return d.cityname;
          })
          .entries(airData);
        console.log(airDataBylocation);

        // loop through the new object (key:values) and initiate chart function
        for (var i in airDataBylocation) {
          var val = airDataBylocation[i].values;
          var city = airDataBylocation[i].key;
          console.log('loc:', airDataBylocation[i].values);
          console.log('loc:', airDataBylocation[i].key);
          chart(city, val, i, '2019');
          chart(city, val, i, '2020');
        }
      })

      // create chart function and pass city, values, year and index parameters 
      function chart(city, data, index, year) {

        // loop out the specific values for each pollutant type (datay) as well as keys (datax), then push them into empty array
        var datax = [];
        var datay1 = [];
        var datay2 = [];
        var datay3 = [];
        var datay4 = [];
        var datay5 = [];
        var datay6 = [];

        for (var i in data) {
          selectedYear = (data[i].date).substr(0, 4);

          if (selectedYear == year) {
            datax.push(data[i].date);
            datay1.push(data[i].median_pm25);
            datay2.push(data[i].median_pm10);
            datay3.push(data[i].median_o3);
            datay4.push(data[i].median_no2);
            datay5.push(data[i].median_so2);
            datay6.push(data[i].median_co);
          }
        }

        // d3 scatter plot
        var trace1 = {
          x: datax,
          y: datay1,
          mode: 'markers',
          type: 'scatter',
          name: 'PM25',
          marker: {
            size: 9
          }
        };
        var trace2 = {
          x: datax,
          y: datay2,
          mode: 'markers',
          type: 'scatter',
          name: 'PM10',
          marker: {
            size: 9
          }
        };
        var trace3 = {
          x: datax,
          y: datay3,
          mode: 'markers',
          type: 'scatter',
          name: 'O3',
          marker: {
            size: 9
          }
        };
        var trace4 = {
          x: datax,
          y: datay4,
          mode: 'markers',
          type: 'scatter',
          name: 'NO2',
          marker: {
            size: 9
          }
        };
        var trace5 = {
          x: datax,
          y: datay5,
          mode: 'markers',
          type: 'scatter',
          name: 'SO2',
          marker: {
            size: 9
          }
        };
        var trace6 = {
          x: datax,
          y: datay6,
          mode: 'markers',
          type: 'scatter',
          name: 'CO',
          marker: {
            size: 9
          }
        };

        var data = [trace1, trace2, trace3, trace4, trace5, trace6];
        var layout = {
          title: city,
          autosize: true,
          height: 350,
          margin: {
            l: 100,
            r: 300,
            b: 50,
            t: 50
          }
        };
        var config = {
          responsive: true
        }
        Plotly.newPlot("plot" + index + year, data, layout, config);
      }

    }).change();
  });