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

        //add values to dropdown
        for(let i=0; i <names.length; i++){
            let n = names[i]
            dropdownMenu.append("option").text(n).property("value", n);
            console.log(n);
        };

        let s_one = names[0];
        console.log(s_one);
    
        callmetadata(s_one);
        Chartdata(s_one);
        
    });

    
};

//populated demographic info 
function callmetadata(newvalue){
    //retreive data
    d3.json(url).then((data)=>{

        let metadata = data.metadata; 

        let value = metadata.filter(result => result.id == newvalue);
        console.log(value)
        let sample_meta = value[0];

        //clear metadata input
        d3.select("#sample-metadata").html("");


        Object.entries(sample_meta).forEach(([key,value]) => {
            console.log(key, value);
            
            // display information in demographic info chart/table
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};


function Chartdata(newvalue){
    d3.json(url).then((data)=>{
        //get all sample data
        let samplesinfo = data.samples;
        //filter based sample value
        let idvalues = samplesinfo.filter(result=>result.id == newvalue);

        let sampleValues = idvalues[0];

        let otu_ids = sampleValues.otu_ids;
        let otu_labels = sampleValues.otu_lables;
        let values = sampleValues.sample_values;

        console.log(otu_ids, otu_labels, values);

        //call charts function
        charts(values, otu_ids, otu_labels);

    });
};

function charts ( values, otu_ids, otu_labels){
    d3.json(url).then((data)=>{
        //bar chart
        let barchart = [{ 
            type: 'bar',
            x: values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels, 
            orientation: "h"
    
        }];
        let layoutbar ={
            title:"Top 10 OTUs Present",
            height: 500,
            width: 400
        };

        Plotly.newPlot('bar', barchart, layoutbar);
        // bubble chart 
        let bubble = [{
            x: otu_ids,
            y: values, 
            text: otu_labels,
            mode: 'markers',
            marker:{
                color: otu_ids,
                size: values
            }
        }];
        let layoutbubble = {
            title:"Bacteria Per Sample",
            height: 550,
            width: 1000
        }

        

        Plotly.newPlot('bubble', bubble, layoutbubble);
    });    
};



function optionChanged(newvalue){
    console.log(newvalue);
    //call functions
    
    callmetadata(newvalue);
    Chartdata(newvalue);
};

init();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
