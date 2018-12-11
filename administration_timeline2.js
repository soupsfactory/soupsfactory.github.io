var width=document.getElementById("viz_administration_timeline").clientWidth;
var height=document.getElementById("viz_administration_timeline").clientHeight;
console.log(height);
console.log(width);
var padding_x=width/10;
var padding_y=height/10;




//viz
var svg_administration_timeline=d3.select("#viz_administration_timeline")
          .append("svg")
          .attr("width", "100%")
          .attr("height","100%")
          .attr("preserveAspectRatio","xMidYMid")
          .attr("viewBox", "0 0 " + width + " " + height);
//slider
var svg_slider=d3.selectAll("#slider_div")
        .append("svg")
        .attr("width","100%")
        .attr("height","100%")
        .attr("preserveAspectRatio","xMidYMid")
        .attr("viewBox", "0 0 " + width-padding_x + " " + 50);
var xSlider = d3.scaleLinear()
    .domain([1228, 1826])
    .range([0, width-padding_x/5])
    .clamp(true);



var xScale=d3.scaleLinear()
          .domain([0,8])
          .range([0,width-padding_x*2]);
var yScale=d3.scaleLinear()
            .domain([0,6])
            .range([0,height-padding_y*3]);
var rScale = d3.scaleSqrt() // <--New!
            .domain([0, d3.max(admin_dataset[0].people, function(d) { return d.size; })])
            .range([0, height/50]); // <--New!


//colorscale
var color_rects=["#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c"];
var colorScale=d3.scaleOrdinal()
                .domain([6,5,4,3,2,1,0])
                .range(color_rects);

//rects
console.log(admin_dataset[0].levels);

//console.log(levels);
//nsole.log(levels_index);
var adm_back=svg_administration_timeline.selectAll("#viz_administration_timeline")
            .data(admin_dataset[1].levels)
            .enter()
            .append("g")
            .append("rect")
            .attr("id","levels")
            .attr("x",0)
            .attr("y",yScale(-2))
            .attr("width", xScale(8)+xScale(1))
            .attr("height",function(d){
              console.log("rect:"+yScale(d)+(padding_y*4)+rScale(10-d));
              // console.log(colorScale(d));
             return yScale(d)+padding_y*4+rScale(d);})
            // .attr("opacity",0.05)
            // .attr("stroke","red")
            .attr("fill",function(d){return colorScale(d);})
            .attr("rx",width)
            .attr("ry",height/10)
            .attr("transform","translate("+padding_x/2+","+padding_y+")");






//circles
console.log(admin_dataset);

var strlenMultiplier=10;

var adm_system=svg_administration_timeline.selectAll("#viz_administration_timeline")
              .data(admin_dataset[1].people)
              .enter()
              .append("g")
              .append("circle")
              .attr("id","officials")
              .attr("cx",function(d){
              //  console.log(d.x);

                return xScale(d.x);
              })
              .attr("cy", function(d){
              //  console.log("level:"+d.levels);
                return yScale(d.levels);
              })
              .attr("r",function(d){
                return rScale(5);
              })
              .attr("fill","violet")
              .attr("transform","translate("+padding_x/1.05+","+padding_y*2+")")
              .on("mouseover",function(d)
              {
                svg_administration_timeline.append("rect")
              				.attr("id","admin_hover_rect")
              				.attr("x",xScale(d.x)+padding_x/1.25+20)
              				.attr("y",yScale(d.levels)+padding_y*2-30)
              				.attr("width",function()
              			{
              				var strlen=(d.description).length;
              			//	console.log(strlen);
              			//	if(strlen>10)
              				return strlen*strlenMultiplier;
              			//	else return 11*strlenMultiplier;
              			})
              				.attr("height",60)
              				.attr("fill","white")
              				.attr("stroke-opacity",0.2)
              				.attr("stroke","blue")
              				.attr("rx", 3)
              				.attr("ry",3);




                // console.log(d.description);
                      svg_administration_timeline.append("text")
                      .attr("id","admin_text_hover")
                      .attr("x",xScale(d.x)+padding_x/1.25+30)
                      .attr("y",yScale(d.levels)+padding_y*2)
                      .text(d.description);
              })
              .on("mouseout",function()
              {
                svg_administration_timeline.selectAll("#admin_text_hover").remove();
                svg_administration_timeline.selectAll("#admin_hover_rect").remove();
              });





  //colorlegends
svg_administration_timeline.append("rect")
  .attr("x",0)
  .attr("y",-yScale(2))
  .attr("width",width-padding_x/2)
  .attr("height",yScale(2)+height/7)
  .attr("transform","translate("+padding_x/2.5+",-1)")
  .attr("stroke-width",10)
  .attr("fill","white")
;

  var xScale_legend=d3.scaleLinear()
            .domain([0,6])
            .range([0,width/3]);
  for(var i=0;i<7;i++)
  {
  svg_administration_timeline//.selectAll("#viz_administration")
                .append("g")
                .append("rect")
                .attr("x",xScale_legend(i))
                .attr("y", 0)
                .attr("width",xScale_legend(1))
                .attr("height",20)
                .attr("fill",colorScale(i))
                .attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/3+")")
                ;
  }

  svg_administration_timeline.append("text")
          .attr("x",xScale_legend(0))
          .attr("y", 0)
          .attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/1.25+")")
          .text("Higher")
          .style("text-anchor","middle");
svg_administration_timeline.append("text")
        .attr("x",xScale_legend(8))
        .attr("y", 0)
        .attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/1.25+")")
        .text("Lower")
        .style("text-anchor","middle");
svg_administration_timeline.append("text")
        .attr("x",xScale_legend(3.5))
        .attr("y", 0)
        .attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/5+")")
        .text("Political Hierarchy")
        .style("text-anchor","middle");




//xSlider
var slider = svg_slider.append("g")
    .attr("class", "slider")
     .attr("transform", "translate(" + padding_x/10 + "," + 10 + ")")
    ;



slider.append("line")
  .attr("class", "track")
  .attr("x1", xSlider.range()[0])
  .attr("x2", xSlider.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
  .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
  .attr("class", "track-overlay")
  .call(d3.drag()
      .on("start.interrupt", function() { slider.interrupt(); })
      .on("start drag", function() { hue(xSlider.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
  .attr("class", "ticks")
  .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
  .data(xSlider.ticks(10))
  .enter().append("text")
  .attr("x", xSlider)
  .attr("text-anchor", "middle")
  .text(function(d) { return d; });

var handle = slider.insert("circle", ".track-overlay")
  .attr("class", "handle")
  .attr("r", 9);

function sliderAnimation(){
slider.transition() // Gratuitous intro!
  .duration(7000)
  .tween("hue", function() {
    var i = d3.interpolate(1228, 1826);
    return function(t) { hue(i(t)); };
  });
}

function hue(h) {
  handle.attr("cx", xSlider(h));
  check(h);
}


function check(h)
{
  var year=year_check(h);
console.log(year);

var levels_index;
switch(year)
{
  case 1604:
  levels_index=0;
  break;
  case 1228:
  levels_index=1;
  break;
  case 1332:
  levels_index=2;
  break;
  case 1497:
  levels_index=3;
  break;
  case 1552:
  levels_index=4;
  break;
}

var levels=admin_dataset[levels_index].levels;
console.log(levels);


svg_administration_timeline.selectAll("#levels")
.data(admin_dataset[levels_index].levels)
.transition()
.duration(100)
.ease(d3.easeLinear)
.attr("height",function(d){

return yScale(d)+padding_y*4+rScale(10-d);
})

.attr("fill",function(d){return colorScale(d);})
;

    console.log(admin_dataset[levels_index].people);

svg_administration_timeline.selectAll("#officials")
.data(admin_dataset[levels_index].people)
.transition()
.duration(300)
.ease(d3.easeLinear)
.attr("cx",function(d){
console.log(d.officials);

return xScale(d.x);
})
.attr("cy", function(d){

return yScale(d.levels);
})

;


    console.log("done");



}



  function year_check(year)
  {
    if(year<1827)
    {
        {if(year<1604){
            if(year<1552)
                {
                    if(year<1497)
                    {
                        if(year<1332)
                        {
                          return 1228;
                        }
                    return 1332;
                    }
                  return 1497;
                }
            return 1552;}
        return 1604;}
    }
  }
