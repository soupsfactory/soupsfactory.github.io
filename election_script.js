var width=document.getElementById("viz_election").clientWidth;
var height=document.getElementById("viz_election").clientHeight;
console.log(height);
console.log("width:"+width);

var svg_election=d3.select("#viz_election")
          .append("svg")
          .attr("width", "100%")
          .attr("height","100%")
          .attr("preserveAspectRatio","xMidYMid")
          .attr("viewBox", "0 0 " + width + " " + height);



var xwidth=[0];
for(var i=1; i<=fam.length;i++)
{
xwidth.push(width/fam.length*i/1.25);
}
console.log(xwidth);
var yheight=[0];
for(var i=1; i<positions.length;i++)
{
console.log(height);
yheight.push(height*i*20/positions.length);
}
var XScale = d3.scaleOrdinal()
                      .domain(fam)
                      .range(xwidth)
                      //.round(true) // <-- Enable rounding
                     //.paddingInner(0.05)
                      ;

var YScale=d3.scaleBand()
                  .domain(positions)
                  .range(yheight)
                  ;


var colorScale=d3.scaleOrdinal()
          .domain(fam)
          .range(colors);


console.log("done");
var padding=200;
var rect_padding_x=width/fam.length/4;
var rect_padding_y=height/positions.length/2;








console.log(fam);
console.log(positions);
console.log(dataset);



var rect=svg_election.selectAll("rect")
  .data(dataset)
  .enter()
  .append("g")
  .append("rect")
  .attr("x",function(d)
  {
  // console.log("x:"+d.x+" y:"+(d.y));
  // console.log("y:"+(d.y));
  return XScale(d.x);
  })
  .attr("y",function(d)
  {
  // console.log("y:"+(d.y));
  return YScale(d.y);
  })
  .attr("height",height/positions.length-rect_padding_y/1.5)
  .attr("width",function(d)
  {
  return XScale(fam[1])-XScale(fam[0]);
  })
  .attr("transform","translate("+padding/1.5+","+padding/2+")")
  .attr("fill",function(d)
  {
  return colorScale(d.x);
  })
  .on("mouseover",function(d,i)
  {
    d3.select(this)
      .attr("stroke-width",2)
      .attr("stroke","#000000");  //color pay attention

    console.log("inside");
    svg_election.append("rect")
      .attr("id","overlay_vert")
      .attr("x",XScale(d.x))
      .attr("y",YScale(0))
      .attr("height",function(){
      return YScale(d.y);
      })//+height/positions.length-rect_padding_y/1.5)
      .attr("width",XScale(fam[1])-XScale(fam[0]))
      .attr("transform","translate("+padding/1.5+","+padding/2+")")
      // .attr("opacity",0.2)
      .attr("class","overlay") ;

      svg_election.append("rect")
        .attr("id","overlay_hori")
        .attr("x",XScale(0))
        .attr("y",YScale(d.y))
        .attr("height",YScale(positions[1])-YScale(positions[0]))
        .attr("width",XScale(d.x))
        .attr("transform","translate("+padding/1.5+","+padding/2+")")
        // .attr("opacity",0.2)
        .attr("class","overlay") ;
  })
  .on("mouseout",function()
  {
  console.log("outside");
  d3.select(this).attr("stroke-width",0)
  ;
  // .attr("stroke",)
  svg_election.selectAll("#overlay_hori").remove();
  svg_election.selectAll("#overlay_vert").remove();
  });












var xAxis = d3.axisTop()
      .scale(XScale);


svg_election.append("g")
.attr("transform","translate("+(padding/1.5+(width/fam.length/2))+","+padding/2+")")
.call(xAxis)
.attr("class","edit")
.selectAll("text")
.style("text-anchor", "start")
.attr("transform", function(d) {
          return "rotate(-65)"
          })
;

var yAxis = d3.axisLeft()
.scale(YScale)
;

svg_election.append("g")
.attr("transform","translate("+padding/1.5+","+(padding/2)+")")
.call(yAxis)
.attr("class","edit")
;

for(var i=0; i<positions.length; i++)
{
//console.log(fam[0]);
  svg_election.append("g")
  .append("rect")

    .attr("x", XScale(fam[0]))
    .attr("y", YScale(positions[i]))
    .attr("height",rect_padding_y/8)
    .attr("width",XScale(fam[fam.length]))
    // .attr("fill","#ffffff")
      .attr("transform","translate("+padding/1.5+","+padding/2+")")
      .attr("class","grid");
}
for(var i=0; i<fam.length; i++)
{
//console.log(fam[0]);
 svg_election.append("g")
 .append("rect")

   .attr("x", XScale(fam[i]))
   .attr("y", YScale(positions[0]))
   .attr("height",YScale(positions[positions.length-1])+height/positions.length-rect_padding_y/1.5)
   .attr("width",rect_padding_x/10)
   // .attr("fill","#ffffff")
     .attr("transform","translate("+(padding/1.5+XScale(fam[1]))+","+padding/2+")")
     .attr("class","grid");
}

svg_election.append("text")
.attr("x",width/2)
.attr("y",height-rect_padding_y*8)
.text("Families they were elected from")
.attr("class", "fonts lezends")

.style("text-anchor", "middle");

svg_election.append("text")
.attr("x",rect_padding_x)
.attr("y",rect_padding_y*5)
.text("Officers from the")
.attr("class", "fonts lezends")
.style("font-size",12)
.style("text-anchor","start");

svg_election.append("text")
.attr("x",rect_padding_x)
.attr("y",rect_padding_y*6)
.text("administration system")
.attr("class", "fonts lezends")
.style("font-size",12)
.style("text-anchor","start");
