var width=document.getElementById("viz_administration").clientWidth;
var height=document.getElementById("viz_administration").clientHeight;
console.log(height);
console.log(width);
var padding_x=width/10;
var padding_y=height/10;
var svg_administration=d3.select("#viz_administration")
          .append("svg")
          .attr("width", "100%")
          .attr("height","100%")
          .attr("preserveAspectRatio","xMidYMid")
          .attr("viewBox", "0 0 " + width + " " + height);





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

var color_officials=[];
// var color_officials_scale=d3.scaleOrdinal()
          // .range([0,6]);
//rects
console.log(admin_dataset[4].levels);
var levels=function(){
for(var i=0;i<5;i++)
{
if(admin_dataset[i].time==1603)
return admin_dataset[i].levels;
}
};
console.log(levels);

var adm_back=svg_administration.selectAll("#viz_administration")
    .data(levels)
    .enter()
    .append("g")
    .append("rect")
    .attr("x",0)
    .attr("y",-yScale(2))
    .attr("width", xScale(8)+xScale(1))
    .attr("height",function(d){
      console.log("rect:"+yScale(d)+(padding_y*4)+rScale(10));
      // console.log(colorScale(d));
     return yScale(d)+padding_y*4+rScale(10);})
    // .attr("opacity",0.05)
    // .attr("stroke","red")
    .attr("fill",function(d){return colorScale(d);})
    .attr("rx",width)
    .attr("ry",height/10)
    .attr("transform","translate("+padding_x/2+","+padding_y+")");






//circles
console.log(admin_dataset);

var strlenMultiplier=8.5;
//diamond

var symbolDiamondGen = d3.symbol()
.type(d3.symbolDiamond)
.size(150);

var symbolCircleGen = d3.symbol()
.type(d3.symbolCircle)
.size(100)
;
// .attr("class", "shapeDiamond")

var strlenG_ad;
var adm_system=svg_administration.selectAll("#viz_administration")
      .data(admin_dataset[0].people)
      .enter()
      .append("g")
      .append("circle")

      .attr("cx",function(d){
      //  console.log(d.x);
      console.log(xScale(d.x));
        return xScale(d.x);
      })
      .attr("cy", function(d){
      //  console.log("level:"+d.levels);
        return yScale(d.levels);
      })
      .attr("stroke","white")
      .attr("stroke-width",2)
      .attr("r",function(d){
        return rScale(6);
      })
      // .call(function(d){
      //   if(d.officials=="King")
      //   {
      //     console.log("king"+d.officials);
      //   }
      // })
      .attr("fill","violet")
      .attr("opacity",function(d){
        return d.size/2.5;
      })
      .attr("transform","translate("+padding_x/1.05+","+padding_y*2+")")
      .on("mouseover",function(d)
      {
        svg_administration.append("rect")
              .attr("id","admin_hover_rect")
              .attr("x",function()
              {
                var strlenG_ad=(d.officials).length;
                // var reign=d.Reign.length;



                if((xScale(d.x)+((strlenG_ad+5)*10))>xScale(8))
                {

                  console.log("outside");
                  return xScale(d.x)+padding_x/1.25-((strlenG_ad)*strlenMultiplier)-8;
                }
                return xScale(d.x)+padding_x*1.25;
                // xScale(d.x)+padding_x/1.25+20
              })
              .attr("y",yScale(d.levels)+padding_y*2-17)
              .attr("width",function()
            {
              var strlen=(d.officials).length;
            //	console.log(strlen);
            //	if(strlen>10)
              return strlen*strlenMultiplier;
            //	else return 11*strlenMultiplier;
            })
              .attr("height",25)
              .attr("fill","white")
              .attr("stroke-opacity",0.2)
              .attr("stroke","blue")
              .attr("rx", 3)
              .attr("ry",3);




        // console.log(d.description);
          svg_administration.append("text")
          .attr("id","admin_text_hover")
          .attr("x",function()
          {
            var strlenG_ad=(d.officials).length;
            // var reign=d.Reign.length;



            if((xScale(d.x)+((strlenG_ad+5)*10))>xScale(8))
            {

              console.log("outside");
              d3.select(this)
              .style("text-anchor","end");
              return xScale(d.x)+padding_x/1.25-15;
              // d3.select(this)
              // .style("text-anchor","end");
            }
            return xScale(d.x)+padding_x*1.3;
          }

        )
          .attr("y",yScale(d.levels)+padding_y*2)
          .text(d.officials)
          .attr("class","fonts hover_text");
      })
      .on("mouseout",function()
      {
        svg_administration.selectAll("#admin_text_hover").remove();
        svg_administration.selectAll("#admin_hover_rect").remove();
      })
      .on("mousedown",function(d)
    {
      console.log("indie");
      document.getElementById("administration_officers_info").innerHTML=d.description;
    });


//colorlegends
svg_administration.append("rect")
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
svg_administration//.selectAll("#viz_administration")
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

svg_administration.append("text")
  .attr("x",xScale_legend(0))
  .attr("y", 0)
  .attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/1.25+")")
  .text("Higher")
  .attr("class", "fonts ")
  .attr("class","fonts lezends_small")
  .style("text-anchor","middle");
svg_administration.append("text")
.attr("x",xScale_legend(8))
.attr("y", 0)
.attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/1.25+")")
.text("Lower")
.attr("class","fonts lezends_small")
.style("text-anchor","middle");
svg_administration.append("text")
.attr("x",xScale_legend(3.5))
.attr("y", 0)
.attr("transform","translate("+(width-xScale_legend(1)*7-padding_x)+","+padding_y/5+")")
.text("Political Hierarchy")
.attr("class","fonts lezends_small")
.style("text-anchor","middle");
