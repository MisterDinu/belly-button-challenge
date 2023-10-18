let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// function initialChart(){
//   data = [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] }];
//   Plotly.newPlot("bar", data)
// }
// initialChart();
  
// TO RETRIEVE THE SAMPLE VALUES, LABELS, AND HOVERTEXT

d3.json(url).then(function(data) {
  let sampleVal = data.samples;
  // console.log(sampleVal)
  
  let metadata = data.metadata;
  console.log(metadata[0])

  // CREATING ARRAYS FOR THE PLOTS (THE DATA I NEED)
  let sampleData = sampleVal.map(function(sample){
    return sample.sample_values;
  })
  let ids = sampleVal.map(function(sample){
    return sample.id;
  })
  let labels = sampleVal.map(function(sample){
    return sample.otu_ids;
  })
  let hovertext = sampleVal.map(function(sample){
    return sample.otu_labels;
  })

  // console.log("the sample data is" + sampleData)
  // console.log("the labels are" + labels)
  // console.log("the hovertext is" + hovertext)
  // console.log("the ids are" + ids)

  // SETTING BAR CHART
  var trace = {
  x: sampleData[0].slice(0, 10),
  y: labels[0].slice(0, 10).map(id => `OTU ${id}`),
  text: hovertext[0].slice(0, 10),
  type: 'bar',
  orientation: 'h'
};

  var data = [trace]

  // PLOTING BAR CHART
  function initialChart(){
      Plotly.newPlot("bar", data)
  }

  initialChart();

  // BUBURI CHARTO!!
  var traceBubble = {
    x: labels,
    y: sampleData,
    text:hovertext,
    mode: 'markers',
    marker: {
      size: sampleData,
      color:labels,
      sizeref: 2.0 * Math.max(10) / (4**2)
    }
  }

  var layout = {
    title: 'Bubble Chart Size Scaling',
    showlegend: false,
    height: 600,
    width: 600
  };

  var dataBubble = [traceBubble]

  // PLOTING BUBURI CHART
  function initialBubbleChart(){
      Plotly.newPlot("bubble", dataBubble, layout)
  }
  initialBubbleChart()

// DROPDOWN FUNCTION
  function initializeDropdown(){
    const dropdown = d3.select("#selDataset");
      ids.forEach((item) => {
        dropdown
        .append("option")
        .text(`${item}`)
        });
      dropdown.on("change", function () {
        const selectedOTU = this.value;
        fetchAndDisplayData(selectedOTU); // NEW
      });
  }

  fetchAndDisplayData(ids[0]);
  initializeDropdown(data);


  // TO CHANGE THE DISPLAYED DEMOGRAPHIC INFO
  function fetchAndDisplayData(selectedOTU) { // NEW
    // console.log("selected otu: " + selectedOTU);
    var sampleMetadata = d3.select("#sample-metadata"); // NEW
    var selectedMetadata = metadata.find(item => item.id === parseInt(selectedOTU));
    var selectedId = selectedMetadata.id;
    var selectedEthnicity = selectedMetadata.ethnicity;
    var selectedGender = selectedMetadata.gender;
    var selectedAge = selectedMetadata.age;
    var selectedLocation = selectedMetadata.location;
    var selectedBbtype = selectedMetadata.bbtype;
    var selectedWfreq = selectedMetadata.wfreq;

    console.log("selected metadata: " + selectedMetadata)
    var text = "Fetching data: " + "<br>"+ "ID: " + selectedId +
    "<br>" + "Ethnicity: " + selectedEthnicity + "<br>" +
    "Gender: " + selectedGender + "<br>" +
    "Age: " + selectedAge + "<br>" + 
    "Location: " + selectedLocation + "<br>" + 
    "Bbtype: " + selectedBbtype + "<br>" + 
    "Wfreq: " + selectedWfreq + "<br>";
    sampleMetadata.html(text); 

    // TO UPDATE THE BARCHART
    var OTUSample = ids.indexOf(selectedOTU);
    if (OTUSample !== -1) {
        var trace = {
            x: sampleData[OTUSample].slice(0, 10),
            y: labels[OTUSample].slice(0, 10).map(id => `OTU ${id}`),
            text: hovertext[OTUSample].slice(0, 10),
            type: 'bar',
            orientation: 'h'
        };
        var trace2 = {
          x: labels[OTUSample],
          y: sampleData[OTUSample],
          text:hovertext[OTUSample],
          mode: 'markers',
          marker: {
            size: sampleData[OTUSample],
            color:labels[OTUSample],
            sizeref: 2.0 * Math.max(10) / (4**2)
          }
        }

        var updatedData = [trace];
        var updatedBubble = [trace2];

        Plotly.newPlot("bar", updatedData);
        Plotly.newPlot("bubble", updatedBubble)
    }
  }
    // TO UPDATE THE BUBURICHART

  // ERROR HANDLER

  }).catch(function(error) {
    console.error("Error loading data:", error);
});

