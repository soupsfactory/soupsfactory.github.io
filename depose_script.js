var width=document.getElementById("viz_depose").clientWidth;
var height=document.getElementById("viz_depose").clientHeight;
console.log(height);
var padding_x=width/20;
var padding_y=height/20;
var svg_depose=d3.select("#viz_depose")
          .append("svg")
          .attr("width", "100%")
          .attr("height","100%")
          .attr("perserveAspectRatio", "xMinYMid")
          .attr("viewBox", "0 0 " + width + " " + height);
var depose_legend=d3.select("#depose_legend")
        .append("svg")
        .attr("width", "100%")
        .attr("height",100)
        .attr("perserveAspectRatio", "xMinYMid")
        .attr("viewBox", "0 0 " + width + " 100");


var sc_width=width-padding_x*3;
var sc_height=height-padding_y*3;
// var xScale=d3.scaleLinear()
//             .domain([0,50])
//             .range([0,sc_width]);
var xScale=d3.scaleBand()
            .domain(kings)
            .range([0,sc_width]);
var yScale=d3.scaleLinear()
            .domain([1830,1225])
            .range([sc_height,0]);

var rScale=d3.scaleLinear()
          .domain([0,width])
          .range([0,width]);



function make_x_gridlines() {
    return d3.axisBottom(xScale)
              .ticks(5)
    }
function make_y_gridlines() {
    return d3.axisLeft(yScale)
              .ticks(5)
    }

var symbolDiamondGen = d3.symbol()
.type(d3.symbolDiamond)
.size(60)
// .attr("class", "shapeDiamond")
;

svg_depose.append("g")
    .attr("class", "grid")
    .attr("transform", "translate("+padding_x*2+","+(sc_height+padding_y)+ ")")
    .call(make_x_gridlines()
    .tickSize(-(height-padding_y*3))
    .tickFormat("")
  );
svg_depose.append("g")
        .attr("class", "grid")
        .attr("transform", "translate("+padding_x*2+","+(padding_y)+")")
        .call(make_y_gridlines()
        .tickSize(-(width-padding_x*3))
        .tickFormat("")
      );
var strlenG;
var strlenMultiplier=10;
var circle=svg_depose.selectAll("circle")
          .data(dataset_depose)
          .enter()
          .append("g")
          .append("rect")
          .attr("x",function(d)
          {
          return xScale(d.name);
          })
          .attr("y",function(d){
          return yScale(d.timeline1);
          })
          .attr("width", function(d)
          {
          return xScale(kings[1])-xScale(kings[0]);
          })
          .attr("height",function(d)
          {
          return yScale(d.timeline2)-yScale(d.timeline1);
          })
          .attr("transform","translate("+padding_x*2+","+(padding_y)+")")
          .attr("fill", function(d){
            if(d.chosen==0 || d.chosen==1)
            {
              return "violet";
            }

            else if(d.chosen==2 || d.chosen==3)
            {
              return "blue";
            }

          })
          .attr("stroke-width", function(d){
            if(d.chosen==1 || d.chosen==3)
            {
              d3.select(this).attr("stroke","red");
              return 2;
            }

          })

          .attr("opacity",0.7)
          // .attr("transform","translate("+padding_x*2+","+padding_y/2+")")
          // .attr("stroke-width",10)
          .on("mouseover", function(d)
          {
            // var duration=d.duration;
            var timeline=d.timeline1;
            // var name=d.name;

            // svg_depose.append("g")
            //       .append("rect")
            //       .attr("id","hover_rect_duration")
            //       .attr("x",xScale(0)+padding_x*2)
            //       .attr("y",yScale(d.timeline1)+padding_y/2)
            //       .attr("width",xScale(d.duration))
            //       .attr("height",8)
            //       .attr("fill","red")
            //       .attr("opacity",0.2)
            //       ;


            // d3.select(this)
            // //  .attr("fill", "red")
            //   .attr("stroke", "#dddd00")
            //   .attr("stroke-opacity", 1)
            //   .attr("stroke-width", 1.5);
              //.attr()
              svg_depose.append("rect")
                    .attr("id","depose_hover_rect")
                    .attr("x",function()
                    {

                      var namestr=d.name.length;
                      var reign=d.Reign.length;
                      if(namestr>reign)
                      {
                        strlenG=namestr;
                      }
                      else {
                        strlenG=reign;
                      }


                      if((xScale(d.name)+((strlenG+5)*10))>xScale(50))
                      {

                        console.log("outside");
                        return xScale(d.name)+padding_x/1.25-((strlenG)*strlenMultiplier)-8;
                      }
                      return xScale(d.name)+padding_x*2.25;
                    })
                    .attr("y",yScale(timeline))
                    .attr("width",function()
                  {
                    var strlen=strlenG+5;
                  //	console.log(strlen);
                  //	if(strlen>10)
                    return strlen*strlenMultiplier;
                  //	else return 11*strlenMultiplier;
                  })
                    .attr("height",80)
                    .attr("fill","white")
                    .attr("stroke-opacity",0.2)
                    .attr("stroke","blue")
                    .attr("rx", 3)
                    .attr("ry",3);


            svg_depose.append("text")
                    .attr("id","depose_texthover1")
                        .attr("x",function()
                        {
                          console.log(xScale(d.name));
                          if((xScale(d.name)+((strlenG+5)*10))>xScale(50))
                          {

                            console.log("outside");
                            return xScale(d.name)+padding_x/1.25-((strlenG)*10)-2;
                          }
                          return xScale(d.name)+padding_x*2.4;
                        })
                        .attr("y", function(d)
                        {
                        // console.log();
                          return yScale(timeline)+padding_y*2-30;
                        })
                        .text(function(){
                        // console.log("Name:"+name+", Timeline:"+timeline+", Reign:"+duration);
                          return "Name:  "+d.name;
                        })
                        .attr("text-anchor","start")
                        .attr("class","fonts hover_text");

              svg_depose.append("text")
                      .attr("id","depose_texthover2")
                          .attr("x",function()
                          {
                            // console.log(xScale(duration));
                            if((xScale(d.name)+((strlenG+5)*10))>xScale(50))
                            {

                              console.log("outside");
                              return xScale(d.name)+padding_x/1.25-((strlenG)*10)-2;
                            }
                              return xScale(d.name)+padding_x*2.4;
                          })
                          .attr("y", function()
                          {
                          // console.log();
                            return yScale(timeline)+20+padding_y*2-30;
                          })
                          .text(function(d){
                          // console.log("Name:"+name+", Timeline:"+timeline+", Reign:"+duration);
                            return "Timeline:  "+timeline;
                          })
                          .attr("class","fonts hover_text")
                          .attr("text-anchor","start");


              svg_depose.append("text")
                      .attr("id","depose_texthover3")
                          .attr("x",function()
                          {
                            // console.log(xScale(durati));
                            if((xScale(d.name)+((strlenG+5)*10))>xScale(50))
                            {

                              console.log("outside");
                            return xScale(d.name)+padding_x/1.25-((strlenG)*10)-2;
                            }
                                return xScale(d.name)+padding_x*2.4;
                          })
                          .attr("y", function()
                          {
                          // console.log();
                            return yScale(timeline)+40+padding_y*2-30;
                          })
                          .text(function(){
                          // console.log("Name:"+name+", Timeline:"+timeline+", Reign:"+duration);
                          console.log(d.Reign);
                            return "Reign:  "+d.Reign;
                          })
                          .attr("class","fonts hover_text")
                          .attr("text-anchor","start");

          })
          .on("mouseout", function()
        {
          svg_depose.select("#depose_texthover1").remove();
          svg_depose.select("#depose_texthover2").remove();
          svg_depose.select("#depose_texthover3").remove();
          svg_depose.select("#depose_hover_rect").remove();
          svg_depose.select("#hover_rect_duration").remove();
        //   d3.select(this)
        //   //  .attr("fill", "red")
        //     // .attr("stroke", "#dddd00")
        //     .attr("stroke-opacity", 0)
        //     ;
        });



var xAxis=d3.axisTop()
          .scale(xScale);


var yAxis = d3.axisLeft()
              .scale(yScale)
              ;
svg_depose.append("g")
            .call(xAxis)
            .attr("transform","translate("+padding_x*2+","+(padding_y)+")")
            .attr("class","fonts")
            .style("text-anchor", "start")
            .attr("transform", function(d) {
                        return "rotate(-65)"
                        })
            ;
svg_depose.append("g")
             .attr("transform","translate("+padding_x*2+","+padding_y+")")
              .call(yAxis)
              .attr("class","fonts")
            //  .attr("class","edit")
              ;
svg_depose.append("text")
      .attr("x", (sc_width+padding_x*3)/2)
      .attr("y", sc_height+padding_y*2)
      .selectAll("text")
      .style("text-anchor", "middle")
      .text("Duration of Reign")
      .attr("class","fonts");


// svg_depose.append("text")
//                 .attr("x", padding_x)
//                 .attr("y", sc_height/2)
//                 .style("text-anchor", "start")
//                 .text("Timeline")
//                 .attr("transform", "rotate(-90)")
//                 ;




var string= "M"+(padding_x)+" "+(sc_height-padding_y*2)+" L "+(padding_x)+" 0";

  svg_depose.append("g")
            .append("defs").append("path")
            .attr("id", "s3")
            .attr("d", string);
  yAxis_thing = svg_depose.append("g")
            .attr("id", "thing")
            ;

  yAxis_thing.append("text")
            //.style("font-size", "17px")
            .append("textPath")
            .attr("xlink:href", "#s3")
            .attr("text-anchor", "middle")
            .attr("startOffset","40%")
            .text("Timeline")
            .attr("class","fonts");

  yAxis_thing.append("use")
            .attr("xlink:href", "#s3")
            .style("stroke", "none")
            .style("fill", "none");


depose_legend//.selectAll("rect")
            //  .append("g")
              .append("rect")
              .attr("x",width/5)
              .attr("y",40)
              .attr("height",10)
              .attr("width",20)
              .attr("fill", "violet")
              .attr("opacity",0.7);

depose_legend.append("rect")
              .attr("x",width/5*2)
              .attr("y",40)
              .attr("height",10)
              .attr("width",20)
              .attr("fill", "red")
              .attr("opacity",0.7);
depose_legend.append("rect")
              .attr("x", width/5*3)
              .attr("y",40)
              .attr("height",10)
              .attr("width",20)
              .attr("fill", "blue")
              .attr("opacity",0.7);


depose_legend.append("text")
            .attr("x",width/5+25)
            .attr("y",50)
            .attr("font-size","10px")
            .text("Elected through primogeniture")
            .attr("class","fonts lezends");
depose_legend.append("text")
            .attr("x",width/5*2+25)
            .attr("y",50)
            .attr("font-size","10px")
            .text("Deposed by ministers")
            .attr("class","fonts lezends");
depose_legend.append("text")
            .attr("x",width/5*3+25)
            .attr("y",50)
            .attr("font-size","10px")
            .text("Elected by ministers")
            .attr("class","fonts lezends");
