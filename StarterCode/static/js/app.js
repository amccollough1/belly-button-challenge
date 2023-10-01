// Use the D3 libray to read in samples.json from the URL 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

function init(){
    let dropdownMenu = d3.select('#selDataset');

    d3.json(url).then((data)=>{
        let names = data.names;

        for(let i=0; i <names.length; i++){
            let n = names[i]
            dropdownMenu.append("option").text(n).property("value", n);
        };
              
        
    });

    
};

init();

d3.selectAll("#selDataset").on("change", updateBarChart);

