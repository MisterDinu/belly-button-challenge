let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// TO RETRIEVE THE SAMPLE VALUES, LABELS, AND HOVERTEXT

d3.json(url).then(function(data) {
  let sampleVal = data.samples;

  // CREATING ARRAYS FOR THE PLOTS

  let sampleData = sampleVal.map(function(sample){
    return sample.sample_values;
  })
  let labels = sampleVal.map(function(sample){
    return sample.otu_ids;
  })
  let hovertext = sampleVal.map(function(sample){
    return sample.otu_labels;
  })
  console.log(sampleData)
  console.log(labels)
  console.log(hovertext)

  // SETTING BAR CHART

  var trace = {
  x: sampleData[0].slice(0, 10),
  y: labels[0].slice(0, 10).map(id => `OTU ${id}`),
  text: hovertext[0].slice(0, 10),
  type: 'bar',
  orientation: 'h'
};

  // DROPDOWN CONFIG
const dropdown = d3.select("#selDataset");

labels.forEach((item) => {
  dropdown
    .append("option")
    .text(`${item[0]}`)
    .attr("value", item); 
});

dropdown.on("change", function () {
  const selectedOTU = this.value;
  const filteredData = data.filter((item) => item.otu_ids === +selectedOTU); // Assuming otu_ids are numeric
  updateChart(filteredData);
});


  var data = [trace]

  // PLOTING BAR CHART

  function initialChart(){
      Plotly.newPlot("bar", data)
  }
  initialChart()

  // ERROR HANDLER

  }).catch(function(error) {
    console.error("Error loading data:", error);
});

