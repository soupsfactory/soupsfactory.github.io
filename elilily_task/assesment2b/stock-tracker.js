
let data1;
let dataMeta;
var allNumebers = [];
var ticker = "";
var duration = "1d";
var width,widthL;
var height,heightL;
var svg;
var margin = {top:10, right:30, left:30, bottom: 10};
var timeCloseArr=[];
var legend;

let prevclose;
let timezn;
let currency;
let x_scale;
let y_scale;


let lastPrice;
let lastTime;
let close_prev;
let index;
// var displayinfo = [];

var vline, hline, hoverRect, hoverClose, hoverOpen, hoverLow, hoverVol, hoverHigh;
// let timeline;
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}


function startWindow()
{

    document.getElementById("ticker").setAttribute('value' , "AAPL");
    width = document.getElementById("chart").clientWidth;
    height = document.getElementById("chart").clientHeight;
		widthL = document.getElementById("legend").clientWidth;
		heightL = document.getElementById("legend").clientHeight;


    svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.right + margin.left )
              .attr("height", height + margin.top + margin.bottom)
              .append("g");

		legend = d3.select("#legend")
						.append("svg")
						.attr("width", widthL +margin.right+margin.left )
						.attr("height", heightL +margin.top+ margin.bottom)
						.append("g");

  var ticker = document.getElementById("ticker").value;

fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol="+ticker+"&interval=5m&range="+duration+"&region=US&comparisons=%5EGDAXI%2C%5EFCHI", {
	"method": "GET",
	"headers": {
    "x-rapidapi-key": "2a6327d411msh9dc516e048b8e26p13ce61jsnd5eafa7273e9",
"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
  .then(status)
  .then(json)
  .then(function(data) {
		data1 = data.chart.result[0];
    console.log('Request succeeded with JSON response',  data.chart.result[0]);

		dataMeta = data.chart.result[0].meta;
		document.getElementById("selection").innerHTML = dataMeta.symbol;


    prepareData();
//drawchart
		chartDraw();
		drawRect();


//d3js







  }).catch(function(error) {
    console.log('Request failed', error);
  });


}

function prepareData()
{




  var timestamp = data1.timestamp;
  // var timeline=[];
  let close = data1.indicators.quote[0].close;
  let high = data1.indicators.quote[0].high;
  let vol = data1.indicators.quote[0].volume;
  let open = data1.indicators.quote[0].open;
  let low = data1.indicators.quote[0].low;


	prevclose = dataMeta.chartPreviousClose;
	currency = dataMeta.currency;
	timezn = dataMeta.timezone;

	console.log(currency);

  allNumebers=low.concat(high.concat(close.concat(open)));


  for(let i =0;i<timestamp.length;i++)
  {
    let timeClose = {
      "timestamp" : timestamp[i],
      "time": new Date(timestamp[i]*1000),
      "close" : close[i],
      "open": open[i],
      "high": high[i],
      "low": low[i],
      "vol": vol[i]
    }

    timeCloseArr.push(timeClose);
  }
  console.log(timeCloseArr);
  // return timeCloseArr;


}



function chartDraw()
{
console.log(allNumebers);

close_prev = document.getElementById("Precent");
lastPrice = document.getElementById("lastPrice");

var currentClosing = timeCloseArr[timeCloseArr.length-1].close;
lastPrice.innerHTML = currentClosing.toFixed(4)+" "+ currency;


document.getElementById("dates").innerHTML = "Closed: " + Date(dataMeta.currentTradingPeriod.regular.end);// +" "+ (dataMeta.currentTradingPeriod.regular.timezone)

var pf = currentClosing - prevclose;
var percent = (pf/prevclose)*100;

if(percent>0)
{
 close_prev.innerHTML = pf.toFixed(2)+ "("+percent.toFixed(2)+"% &#8593;)";
 close_prev.classList.add("green");
}
else {
 close_prev.innerHTML = pf.toFixed(2)+ "("+percent.toFixed(2)+"% &#8595;)";
 close_prev.classList.add("red");
}




//legend
legend.append("g")
.append("rect")
.attr("x", 10)
.attr("y", 10)
.attr("fill", "aliceblue")
.attr("width", widthL-margin.left)
.attr("height", 140)
// .attr("stroke", "red")
	.attr("transform", "translate("+(margin.left*2)+",0)")
;


legend.append("text")
.attr("x", 20)
.attr("y", 40)
.text("Legends")
.attr("transform", "translate("+(margin.left*2)+",0)");

legend.append("rect")
	.attr("x", 20)
	.attr("y", 50)
	.attr("width", 10)
	.attr("height", 30)
	.attr("fill", "#021E73")
	.attr("opacity", 0.3)
	.attr("transform", "translate("+(margin.left*2)+",0)");

legend.append("text")
.attr("x", 45)
.attr("y", 65)
.text("Range between")
.attr("class", "lezend")
.attr("transform", "translate("+(margin.left*2)+",0)");

legend.append("text")
.attr("x", 45)
.attr("y", 80)
.text("High and Low")
.attr("class", "lezend")
.attr("transform", "translate("+(margin.left*2)+",0)");


legend.append("g")
.append("path")
// .datum(timeCloseArr)
.attr("fill","none")
.attr("stroke","#021E73")
.attr("stroke-width", 3)
.attr("transform", "translate("+(margin.left*2)+",0)")
.attr("d", d3.line()
(
	[
		[20,100],
		[40,100]
	]
));

legend.append("text")
.attr("x", 45)
.attr("y", 105)
.text("Close")
.attr("class", "lezend")
.attr("transform", "translate("+(margin.left*2)+",0)");

legend.append("g")
		.append("path")
		// .datum(timeCloseArr)
		.attr("fill","none")
		.attr("stroke","#021E73")
		.attr("stroke-width", 2)
		.style("stroke-linecap", "round")
		.style("stroke-linejoin", "round")
		.attr("transform", "translate("+(margin.left*2)+",0)")
		.style("stroke-dasharray",("3,3"))
		.attr("d", d3.line()
			(
				[
					[20, 120],
					[40, 120]
				]
			));

legend.append("text")
.attr("x", 45)
.attr("y", 125)
.text("Opening")
.attr("class", "lezend")
.attr("transform", "translate("+(margin.left*2)+",0)");



//chart
	x_scale= d3.scaleTime()
			.domain([d3.min(timeCloseArr, function(d){ return +d.time}), d3.max(timeCloseArr, function(d){ return +d.time})])
			.range([0, width-margin.right])
      ;


	y_scale = d3.scaleLinear()
			.domain([d3.min(allNumebers, function(d){ return +d}), d3.max(allNumebers, function(d){ return +d})])
			.range([height, margin.bottom*2]);


      let timefor;
          if(duration=="1d")
            {timefor ="%a %d %I:%M %p";}
          else if(duration>="5d" || duration<"1m")
          {
            timefor = "%a %d";
          }
          else {
           timefor = "%B";
        }


svg.append("g")
.attr("id", "x_axis")
.attr("transform", "translate("+margin.left*2+","+(height-margin.bottom*2)+")")
.call(d3.axisBottom(x_scale)
  .tickFormat(d3.timeFormat(""+timefor))
  .ticks(15))
  ;


	svg.append("g")
	.attr("transform", "translate("+(margin.left*2)+","+(-margin.bottom*2)+")")
	.call(d3.axisLeft(y_scale))
  .attr("id", "y_axis");

//high area


    svg.selectAll("rect")
    .append("g")
      .data(timeCloseArr)
      .enter()
      .append("rect")
      .attr("fill", "#021E73")
      .style("opacity","0.3")
      .attr("x", function(d){
        return x_scale(d.time)-2.5;
      })
      .attr("width", 5)
      .attr("height",function(d){
        return y_scale(d.low)-y_scale(d.high);
      })
      .attr("y", function(d){
        return y_scale(d.high);
      })
      .attr("id", "rect_high_low")
      .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");







//open
			svg.append("g")
			.append("path")
			.datum(timeCloseArr)
			.attr("fill","none")
			.attr("stroke","#021E73")
			.attr("stroke-width", 1)
			.style("stroke-linecap", "round")
			.style("stroke-linejoin", "round")
			.style("stroke-dasharray",("7,3"))
			.attr("d", d3.line()
				.x(function(d){ return x_scale(d.time)})
				.y(function(d){ return y_scale(d.open)}))
      .attr("id","line_open")
			.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");



//close
	svg.append("g")
	.append("path")
	.datum(timeCloseArr)
	.attr("fill","none")
	.attr("stroke","#021E73")
	.attr("stroke-width", 3)
	.attr("d", d3.line()
		.x(function(d){ return x_scale(d.time)})
		.y(function(d){ return y_scale(d.close)}))
  .attr("id", "line_close")
	.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");

	svg.selectAll("circle")
	.append("g")
		.data(timeCloseArr)
		.enter()
		.append("circle")
		.attr("fill", "#021E73")
		.attr("cx", function(d){
			return x_scale(d.time);
		})
		.attr("r", 3)
		.attr("cy", function(d){
			return y_scale(d.close);
		})
    .attr("id", "circle_close")
		.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");



		svg.append("path")
			.attr("d", d3.line()(
				[
					[0,y_scale(prevclose)],
					[width-margin.left,y_scale(prevclose)]
				]
			))
			.attr("stroke", "grey")
			.attr("id", "prev_close")
			.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");


			svg.append("text")
			.attr("x", width-(margin.left*3))
			.attr("y", y_scale(prevclose))
			.attr("id","Prev_text1")
			.text("Previous Close: ");


			svg.append("text")
			.attr("x", width-(margin.left*3))
			.attr("y", y_scale(prevclose)+20)
			.attr("id","Prev_text2")
			.text(currency+" "+ prevclose.toFixed(4))


			svg.append("text")
			.attr("x", width/2-margin.left)
			.attr("y", height+margin.bottom+5)
			.text("Timeline");





		vline= svg.append("path")
			.attr("d", d3.line()(
				[
					[0,0],
					[0,height]
				]
			))
			.attr("id", "vline")
			.attr("stroke", "black")
			.attr("opacity", 0);


		hline= svg.append("path")
			.attr("d", d3.line()(
				[
					[0,0],
					[width,0]
				]
			))
			.attr("id", "hline")
			.attr("stroke", "black")
			.attr("opacity", 0);

			hoverRect= svg.append("g")
	    .append("rect")
	    .attr("x", 10)
	    .attr("y", margin.top*3)
	    .attr("fill", "white")
	    .attr("stroke", "cadetblue")
	    .attr("opacity", 0)
	    .attr("width", 170)
	    .attr("height", 110)
	    .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");

	    hoverClose = svg.append("g")
	    .append("text")
	    .attr("x", 20)
	    .attr("y", margin.top*2+30)
	    .attr("opacity", 0)
	    .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");

	    hoverOpen = svg.append("g")
	    .append("text")
	    .attr("x", 20)
	    .attr("y", margin.top*2+50)
	    .attr("opacity", 0)
	    .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");

	    hoverLow = svg.append("g")
	    .append("text")
	    .attr("x", 20)
	    .attr("y", margin.top*2+70)
	    .attr("opacity", 0)
	    .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");

	    hoverHigh = svg.append("g")
	    .append("text")
	    .attr("x", 20)
	    .attr("y", margin.top*2+90)
	    .attr("opacity", 0)
	    .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");

	    hoverVol = svg.append("g")
	    .append("text")
	    .attr("x", 20)
	    .attr("y", margin.top*2+110)
	    .attr("opacity", 0)
	    .attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");



}


function TickerListener()
{
  console.log("changed");
  svg.selectAll()
  updateAll();
}


function updateAll()
{
  timeCloseArr = [];
  let ticker = document.getElementById("ticker").value;
  let fetchStatement = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol="+ticker+"&interval=5m&range="+duration+"&region=US&comparisons=%5EGDAXI%2C%5EFCHI";

  fetch(fetchStatement, {
	"method": "GET",
	"headers": {
    "x-rapidapi-key": "2a6327d411msh9dc516e048b8e26p13ce61jsnd5eafa7273e9",
  "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
.then(status)
.then(json)
.then(function(data) {
  data1 = data.chart.result[0];
  console.log('Request succeeded with JSON response',  data.chart.result[0]);
	dataMeta = data.chart.result[0].meta;
  prevclose = dataMeta.chartPreviousClose;
  currency = dataMeta.currency;
  timezn = dataMeta.timezone;




  prepareData();
//drawchart
  updatechart();

})
.catch(err => {
	console.error(err);
});
}



function updatechart()
{
  console.log("inside update1");
  console.log(timeCloseArr);

	var currentClosing = timeCloseArr[timeCloseArr.length-1].close;
  lastPrice.innerHTML = currentClosing.toFixed(4)+" "+ currency;


  document.getElementById("dates").innerHTML = "Closed: " + Date(dataMeta.currentTradingPeriod.regular.end);// +" "+ (dataMeta.currentTradingPeriod.regular.timezone)
  document.getElementById("selection").innerHTML = dataMeta.symbol;
  var pf = currentClosing - prevclose;
  var percent = (pf/prevclose)*100;

  if(percent>0)
  {
    close_prev.innerHTML = pf.toFixed(2)+ "("+percent.toFixed(2)+"% &#8593;)";
    close_prev.classList.toggle("green");
  }
  else {
    close_prev.innerHTML = pf.toFixed(2)+ "("+percent.toFixed(2)+"% &#8595;)";
    close_prev.classList.toggle("red");
  }


  let new_x_scale= d3.scaleTime()
      .domain([d3.min(timeCloseArr, function(d){ return +d.time}), d3.max(timeCloseArr, function(d){ return +d.time})])
      .range([0, width-margin.right])
      ;

			let new_y_scale = d3.scaleLinear()
		      .domain([d3.min(allNumebers, function(d){ return +d}), d3.max(allNumebers, function(d){ return +d})])
		      .range([height, margin.bottom*2]);


      console.log("inside update2");
      console.log(timeCloseArr);


			let timefor;
	        if(duration=="1d")
	          {timefor ="%I:%M %p";}
	        else if(duration>="5d" || duration<"1m")
	        {
	          timefor = "%d %B";
	        }
	        else {
	         timefor = "%B";
	      }


  svg.select("#x_axis")
    .transition()
    .call(d3.axisBottom(new_x_scale));

  svg.select("#y_axis")
    .transition()
    .call(d3.axisLeft(new_y_scale));

    console.log("inside update");
    console.log(timeCloseArr);

svg.selectAll("#rect_high_low")
  .data(timeCloseArr)
  .transition()
  .attr("x", function(d){
    return new_x_scale(d.time)-2.5;
  })
  .attr("width", 5)
  .attr("height",function(d){
    return new_y_scale(d.low)-new_y_scale(d.high);
  })
  .attr("y", function(d){
    return new_y_scale(d.high);
  })



  d3.select("#line_open")
  .datum(timeCloseArr)
  .transition()
  .attr("d", d3.line()
    .x(function(d){ return new_x_scale(d.time)})
    .y(function(d){ return new_y_scale(d.open)}));

  d3.select("#line_close")
  .datum(timeCloseArr)
  .transition()
  .attr("d", d3.line()
    .x(function(d){ return new_x_scale(d.time)})
    .y(function(d){ return new_y_scale(d.close)}));

  d3.selectAll("#circle_close")
  .data(timeCloseArr)
  .transition()
  .attr("cx", function(d){ return new_x_scale(d.time)})
  .attr("cy", function(d){ return new_y_scale(d.close)});




//prev closeTime
d3.select("#prev_close")
.transition()
.attr("d", d3.line()(
	[
		[0,new_y_scale(prevclose)],
		[width-margin.left,new_y_scale(prevclose)]
	]
));


	d3.select("#Prev_text1")
	.transition()
	// .attr("x", width-(margin.left*3))
	.attr("y", new_y_scale(prevclose))
	.text("Previous Close: ");


	d3.select("#Prev_text2")
	.transition()
	// .attr("x", width-(margin.left*3))
	.attr("y", new_y_scale(prevclose)+20)
	.text(currency+" "+ prevclose.toFixed(4));



	d3.select("#hLine")
	.transition()
		.attr("d", d3.line()(
			[
				[0, new_y_scale(timeCloseArr[index].close)],
				[width-margin.left, new_y_scale(timeCloseArr[index].close)]
			]
		));

}

function checkdate(date)
{
  duration = ""+date+"d";
  // timeCloseArr=[];
  updateAll();

}


function drawRect()
{
	svg.append("g")
	.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", height)
	.attr("width", width-margin.right)
	.attr("fill", "red")
	.attr("opacity", 0)
	.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")")
	.on("mouseover", function(){
		vline.attr("opacity", 0.5);
		hline.attr("opacity", 0.5)
		hoverRect.attr("opacity", 1);
		hoverLow.attr("opacity", 1);
		hoverVol.attr("opacity", 1);
		hoverHigh.attr("opacity", 1);
		hoverOpen.attr("opacity", 1);
		hoverClose.attr("opacity", 1);
	})
	.on("mousemove", (event)=>{
		console.log("mouseover");
		console.log(d3.pointer(event)[0]);

		// d3.select("#hLine").remove();

		var selectedx = x_scale.invert(d3.pointer(event)[0]);
		var bisecting = d3.bisector(function(d){ return d.time;}).left;
		var index= bisecting(timeCloseArr, selectedx );

		console.log(selectedx);
		console.log(timeCloseArr[index]);

	vline
		.attr("d", d3.line()(
			[
				[x_scale(timeCloseArr[index].time),0],
				[x_scale(timeCloseArr[index].time), height]
			]
		))
		.attr("stroke", "grey")
		.attr("stroke-width", 1)
		.style("stroke-dasharray",("5,3"))
		.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");


		hline
			.attr("d", d3.line()(
				[
					[0, y_scale(timeCloseArr[index].close)],
					[width-margin.left, y_scale(timeCloseArr[index].close)]
				]
			))
			.attr("stroke", "grey")
			.attr("stroke-width", 1)
			.style("stroke-dasharray",("5,3"))
			.attr("transform", "translate("+margin.left*2+","+(-margin.bottom*2)+")");


			hoverClose.text("Close: "+(timeCloseArr[index].close).toFixed(4));
			hoverOpen.text("Open: "+ (timeCloseArr[index].open).toFixed(4));
			hoverLow.text("Low: "+ (timeCloseArr[index].low).toFixed(4));
			hoverHigh.text("High: "+ (timeCloseArr[index].high).toFixed(4));
			hoverVol.text("Volume: "+ (timeCloseArr[index].vol).toFixed(2));
	})
	.on("mouseout", function()
{
	// svg.select("#vLine").remove();
	vline.attr("opacity", 0);
	hline.attr("opacity", 0);

	hoverRect.attr("opacity", 0);
	hoverHigh.attr("opacity", 0);
	hoverLow.attr("opacity", 0);
	hoverClose.attr("opacity", 0);
	hoverOpen.attr("opacity", 0);
	hoverVol.attr("opacity", 0);
});

}
