// Data
// window.addEventListener(function(d){
//   Update();
// });
var time_parse      =   d3.timeParse( '%m/%d' );
var time_format     =   d3.timeFormat( '%m/%d' );
var viewPort_width     =   jQuery(window).width();
var viewPort_height    =   jQuery(window).height();
var chart_height=viewPort_height/4*2.5;
var chart_width=viewPort_width/4*3;
var padding         =   chart_width/20;
var svg             =   d3.select("#rainfall")
    .append("svg")
    .attr("width", chart_width )
    .attr("height", chart_height);
   
 var svgdam= d3.select("#damwater")
        .append("svg")
        .attr("height", chart_height)
        .attr("width", chart_width/4); 
// svgdam.append("text")
//   .attr("x", padding)
//   .attr("y",padding)
//   .attr("id", "comment")
//   .text("Hover over the graph points to see storage level here")
//   .attr("class","info");        
var x_grid;
var y_grid;
//var storage_percentage;
var thing;
var date;
var flood_area;
var storage_show;
var warning1,warning2,warning3, warning4, warning5, warning6;
var rect_dam=svgdam
          .append("g")
          .append("rect")
          //.attr("id","dam_water_storage")
         .attr("x", padding/2)
         .attr("y", chart_height-padding*2-200)
         .attr("height", padding+200)
         .attr("width", chart_width)
         .attr("fill","#A5ACAD");
var rect_dam_white=svgdam
          .append("g")
          .append("rect")
          //.attr("id","dam_water_storage")
         .attr("x", chart_width/16+padding/4)
         .attr("y", chart_height-padding*2-200)
         .attr("height", 200)
         .attr("width", chart_width/8)
         .attr("fill","#E8DFDD"); 


 var defs = svg.append("defs");

var gradient = defs.append("linearGradient")
   .attr("id", "svgGradient")
   .attr("x1", "0%")
   .attr("x2", "100%")
   .attr("y1", "0%")
   .attr("y2", "100%");

gradient.append("stop")
   .attr('class', 'start')
   .attr("offset", "0%")
   .attr("stop-color", "#A1F1FF")
   .attr("stop-opacity", 1);

gradient.append("stop")
   .attr('class', 'end')
   .attr("offset", "100%")
   .attr("stop-color", "#003B7F")
   .attr("stop-opacity", 1);                
//var storage_status=0;
// var dam_outline=[{"x":150, "y": 200},
//        {"x":150, "y": 300},
//        {"x":250, "y": 300}
//        {"x":250, "y": 200}];

//  var line1=d3.line()
//             .x(function(d){
//                 return d.x;
//             })   
//             .y(function(d){
//                 return d.y;
//             });

//  path=svg.append("path")
//     .datum(dam_outline)
//     .attr("fill", "none")
//     .attr("stroke-width",2)
//     .attr("stroke","#000000")
//     .attr('d',line1)
//     ;




// var dam_outline= d3.select("#dam_outline")
//        .attr("fill", "none")
//             .attr("stroke-width",7)
//           .attr("stroke","#000000")  ;     

var path;
//var path2;
   var rect;
   var tangle_status=0;
var circle;
var x_axis_draw;
var y_axis_draw;
var x_scale;
var y_scale;
var x_axis;
var y_axis;
var checkformat=[
  {
    "name": "Idukki",
    "status": 0
  },
  {
    "name": "Pampa",
    "status": 0
  },
  {
    "name": "Sholayar",
    "status": 0
  },
  {
    "name": "Idamalayar",
    "status": 0
  },
  {
    "name": "Mattupetty",
    "status": 0
  },
  {
    "name": "Thariode",
    "status": 0
  },
  {
    "name": "Anayirangal",
    "status": 0
  },
  {
    "name": "Ponmudi",
    "status": 0
  },
  {
    "name": "Kuttiadi",
    "status": 0
  },
  {
    "name": "Neriamangalam",
    "status": 0
  },
  {
    "name": "Poringal",
    "status": 0
  },
  {
    "name": "Sengulam",
    "status": 0
  },
  {
    "name": "Lower_Periyar",
    "status": 0
  },
  {
    "name": "Kakkad",
    "status": 0
  }
];
function damUpdate(damname)
{
  //tangle_status=tangle_status++:
  if(tangle_status==0)
  {
      setUpTangle();
      tangle_status++;
    }
//var damname=document.getElementById("dam").value;
var dam;
console.log(damname);

switch(damname)
{
  case "Idukki":
    dam=idukki;
    break;
  case "Pampa":
    dam=pampa;  
    break;
  case "Kakki":
    dam=kakki;
    break;
  case "Sholayar":
    dam=sholayar; 
    break;
  case "Idamalayar":
    dam=Idamalayar;
    break;
  case "Kundala":
    dam=Kundala;  
    break;
  case "Mattupetty":
    dam=Mattupetty;
    break;
  case "Thariode":
    dam=Thariode; 
    break;
  case "Anayirangal":
    dam=Anayirangal;
    break;
  case "Ponmudi":
    dam=Ponmudi;  
    break;
  case "Kuttiadi":
    dam=Kuttiadi;
    break;
  case "Neriamangalam":
    dam=Neriamangalam;  
    break;
  case "Poringal":
    dam=Poringal;
    break;
  case "Sengulam":
    dam=Sengulam; 
    break;
  case "Lower_Periyar":
    dam=Lower_Periyar;  
    break;
  case "Kakkad":
    dam=Kakkad; 
    break;    
              
}
console.log(dam);
console.log(dam[0].date);

// for(var i=0; i<dam.length;i++)
// {
//  dam[i].date=dam[i].date;
// }
// var damlist=['Idukki',"Pampa","idumulayar"];
// if(damname==damlist[0])
//     {dam=pampa;
//      console.log(dam);}
// else{
//     document.getElementById("damwater").innerHTML="no data";
//     return;
// }





//Format Date
checkformat.forEach(function(e,i)
{
  if(e.name==damname)
  {
    if(e.status==0)
    {
      dam.forEach(function(e, i){
    dam[i].date    =   time_parse(e.date);
});
      e.status=1;
      //break;
    }
  }
});

//console.log(idukki[0].date);
// Scales
console.log(idukki);
console.log(pampa);

x_scale         =   d3.scaleTime()
    .domain([
        d3.min(dam, function(d) {
            return d.date;
        }),
        d3.max(dam, function(d) {
            return d.date;
        })
    ])
    .range([padding*2, chart_width - padding/2]);


y_scale         =   d3.scaleLinear()
    .domain([
        0, d3.max(dam, function(d) {
            return d.rainfall;
        })
    ])
    .range([chart_height - padding, padding]);

// Create SVG


// Create Axes
x_axis          =   d3.axisBottom(x_scale)
    .ticks(5)
    .tickFormat(time_format);
y_axis          =   d3.axisLeft(y_scale);

var y_ticks=y_axis
    .ticks(12);
x_axis_draw=svg.append("g")
    .attr("transform", "translate(0," + (chart_height - padding) + ")")
    .call(x_axis);
y_axis_draw=svg.append("g")
    .attr("transform", "translate(" + (padding*2) + ",0)")
    .call(y_axis);




flood_area=svg
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/08")))
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", function(){
          return x_scale(time_parse("08/17"))-x_scale(time_parse("08/08"));
         })
        // .attr("fill","#00FFFF")
         .attr("class", "flood_dates");    
//console.log((y_axis.ticks(9)));
warning1=svg
        //.select("#warning1")
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/02"))-3)
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", 5)
        // .attr("fill","#00FFFF")
         .attr("class", "flood_warning")
         .attr("id", "warning1")
         .on("mouseover", function(d)
          {
               svg.append("rect")
               .attr("id","warning_bg")
               .attr("x", x_scale(time_parse("08/02"))+7)
               .attr("y",padding+10)
                .attr("height",chart_height/10)
                .attr("width", 100)
               .attr("class","info_rainfall");

              var date=""+d.date;
              date=date.substring(0,10);
              svg.append("text")
          //.attr("#storage_show")
               .attr("id","warning_text1")
               .attr("x",x_scale(time_parse("08/02"))+10)
                .attr("y",padding+chart_height/24+8)
               .text("Date: Thu Aug 02")
               .attr("class","info_rainfall_details");
         //console.log(d.storage);

              svg.append("text")
           //.attr("#storage_show")
              .attr("id","warning_text2")
              .attr("x",x_scale(time_parse("08/02"))+10)
              .attr("y",padding+chart_height/24+8+15)
              .text("Warning Issued")
              .attr("fill","red")
              .attr("class","info_rainfall_details");
         //console.log(d.storage);
          })
         .on("mouseout", function()
          {
              d3.select("#warning_bg").remove();
              d3.select("#warning_text1").remove();
              d3.select("#warning_text2").remove();
          }); 


warning2=svg
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/06"))-3)
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", 5)
        // .attr("fill","#00FFFF")
         .attr("class", "flood_warning")
         .on("mouseover", function(d)
          {
               svg.append("rect")
               .attr("id","warning_bg")
               .attr("x", x_scale(time_parse("08/06"))+7)
               .attr("y",padding+10)
                .attr("height",chart_height/10)
                .attr("width", 100)
               .attr("class","info_rainfall");

              var date=""+d.date;
              date=date.substring(0,10);
              svg.append("text")
          //.attr("#storage_show")
               .attr("id","warning_text1")
               .attr("x",x_scale(time_parse("08/06"))+10)
                .attr("y",padding+chart_height/24+8)
               .text("Date: Mon Aug 06")
               .attr("class","info_rainfall_details");
         //console.log(d.storage);

              svg.append("text")
           //.attr("#storage_show")
              .attr("id","warning_text2")
              .attr("x",x_scale(time_parse("08/06"))+10)
              .attr("y",padding+chart_height/24+8+15)
              .text("Warning Issued")
              .attr("fill","red")
              .attr("class","info_rainfall_details");
         //console.log(d.storage);
          })
         .on("mouseout", function()
          {
              d3.select("#warning_bg").remove();
              d3.select("#warning_text1").remove();
              d3.select("#warning_text2").remove();
          }); ; 

warning3=svg
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/09"))-3)
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", 5)
        // .attr("fill","#00FFFF")
         .attr("class", "flood_warning")
         .on("mouseover", function(d)
          {
               svg.append("rect")
               .attr("id","warning_bg")
               .attr("x", x_scale(time_parse("08/09"))+7)
               .attr("y",padding+10)
                .attr("height",chart_height/10)
                .attr("width", 100)
               .attr("class","info_rainfall");

              var date=""+d.date;
              date=date.substring(0,10);
              svg.append("text")
          //.attr("#storage_show")
               .attr("id","warning_text1")
               .attr("x",x_scale(time_parse("08/09"))+10)
                .attr("y",padding+chart_height/24+8)
               .text("Date: Thu Aug 09")
               .attr("class","info_rainfall_details");
         //console.log(d.storage);

              svg.append("text")
           //.attr("#storage_show")
              .attr("id","warning_text2")
              .attr("x",x_scale(time_parse("08/09"))+10)
              .attr("y",padding+chart_height/24+8+15)
              .text("Warning Issued")
              .attr("fill","red")
              .attr("class","info_rainfall_details");
         //console.log(d.storage);
          })
         .on("mouseout", function()
          {
              d3.select("#warning_bg").remove();
              d3.select("#warning_text1").remove();
              d3.select("#warning_text2").remove();
          }); ; 



warning4=svg
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/10"))-3)
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", 5)
        // .attr("fill","#00FFFF")
         .attr("class", "flood_warning")
         .on("mouseover", function(d)
          {
               svg.append("rect")
               .attr("id","warning_bg")
               .attr("x", x_scale(time_parse("08/10"))+7)
               .attr("y",padding+10)
                .attr("height",chart_height/10)
                .attr("width", 100)
               .attr("class","info_rainfall");

              var date=""+d.date;
              date=date.substring(0,10);
              svg.append("text")
          //.attr("#storage_show")
               .attr("id","warning_text1")
               .attr("x",x_scale(time_parse("08/10"))+10)
                .attr("y",padding+chart_height/24+8)
               .text("Date: Fri Aug 10")
               .attr("class","info_rainfall_details");
         //console.log(d.storage);

              svg.append("text")
           //.attr("#storage_show")
              .attr("id","warning_text2")
              .attr("x",x_scale(time_parse("08/10"))+10)
              .attr("y",padding+chart_height/24+8+15)
              .text("Warning Issued")
              .attr("fill","red")
              .attr("class","info_rainfall_details");
         //console.log(d.storage);
          })
         .on("mouseout", function()
          {
              d3.select("#warning_bg").remove();
              d3.select("#warning_text1").remove();
              d3.select("#warning_text2").remove();
          }); ; 



warning5=svg
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/11"))-3)
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", 5)
        // .attr("fill","#00FFFF")
         .attr("class", "flood_warning")
         .on("mouseover", function(d)
          {
               svg.append("rect")
               .attr("id","warning_bg")
               .attr("x", x_scale(time_parse("08/11"))+7)
               .attr("y",padding+10)
                .attr("height",chart_height/10)
                .attr("width", 100)
               .attr("class","info_rainfall");

              var date=""+d.date;
              date=date.substring(0,10);
              svg.append("text")
          //.attr("#storage_show")
               .attr("id","warning_text1")
               .attr("x",x_scale(time_parse("08/11"))+10)
                .attr("y",padding+chart_height/24+8)
               .text("Date: Sat Aug 11")
               .attr("class","info_rainfall_details");
         //console.log(d.storage);

              svg.append("text")
           //.attr("#storage_show")
              .attr("id","warning_text2")
              .attr("x",x_scale(time_parse("08/11"))+10)
              .attr("y",padding+chart_height/24+8+15)
              .text("Warning Issued")
              .attr("fill","red")
              .attr("class","info_rainfall_details");
         //console.log(d.storage);
          })
         .on("mouseout", function()
          {
              d3.select("#warning_bg").remove();
              d3.select("#warning_text1").remove();
              d3.select("#warning_text2").remove();
          }); ;          


warning6=svg
        .append("g")
        .append("rect")
        .data(dam)
         .attr("x", x_scale(time_parse("08/12"))-3)
         .attr("y", function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return y_scale(max);
         })
         .attr("height",function(d){
            var max=d3.max(dam, function(d)
              { return d.rainfall;});
            return chart_height-y_scale(max)-padding;
         })
         .attr("width", 5)
        // .attr("fill","#00FFFF")
         .attr("class", "flood_warning")
         .on("mouseover", function(d)
          {
               svg.append("rect")
               .attr("id","warning_bg")
               .attr("x", x_scale(time_parse("08/12"))+7)
               .attr("y",padding+10)
                .attr("height",chart_height/10)
                .attr("width", 100)
               .attr("class","info_rainfall");

              var date=""+d.date;
              date=date.substring(0,10);
              svg.append("text")
          //.attr("#storage_show")
               .attr("id","warning_text1")
               .attr("x",x_scale(time_parse("08/12"))+10)
                .attr("y",padding+chart_height/24+8)
               .text("Date: Sun Aug 12")
               .attr("class","info_rainfall_details");
         //console.log(d.storage);

              svg.append("text")
           //.attr("#storage_show")
              .attr("id","warning_text2")
              .attr("x",x_scale(time_parse("08/12"))+10)
              .attr("y",padding+chart_height/24+8+15)
              .text("Warning Issued")
              .attr("fill","red")
              .attr("class","info_rainfall_details");
         //console.log(d.storage);
          })
         .on("mouseout", function()
          {
              d3.select("#warning_bg").remove();
              d3.select("#warning_text1").remove();
              d3.select("#warning_text2").remove();
          }); ; 






function make_y_gridlines() {   
    return d3.axisLeft(y_scale)
        .ticks(5)
}
function make_x_gridlines() {   
    return d3.axisBottom(x_scale)
        .ticks(20)
}

x_grid=svg.append("g")     
      .attr("class", "grid")
      .attr("transform", "translate(0," + (chart_height - padding) + ")")
      .call(make_x_gridlines()
          .tickSize(-(chart_height - padding*2))
          .tickFormat("")
      );


y_grid=svg.append("g")     
      .attr("class", "grid")
      .attr("transform", "translate(" + (padding*2) + ",0)")
      .call(make_y_gridlines()
          .tickSize(-(chart_width - padding*2))
          .tickFormat("")
      );      










var line=d3.line()
            .x(function(d){
                return x_scale(d.date);
            })   
            .y(function(d){
                return y_scale(d.rainfall);
            });

 path=svg.append("path")
    .datum(dam)
    .attr("fill", "none")
    .attr("stroke-width",2)
    .attr("stroke","#000000")
    .attr('d',line)
    ;


    // line.remove();

 circle=svg.append("g")
    .selectAll("circle")
    .data(dam)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      //console.log(x_scale(d.date));
        return x_scale(d.date);
    } )             
    .attr("cy", function(d){
        return y_scale(d.rainfall);
    } ) 
    .attr("r", 5)
    //.attr("")
    .on("mouseover", function(d){
        
     d3.select("#dam_water_level").remove();  
     d3.select("#dam_storage").remove();
     d3.select("#comment").remove();
      
     svg.append("rect")
      .attr("id","background_text")
      .attr("x",x_scale(d.date)+5)
      .attr("y",y_scale(d.rainfall)-chart_height/8)
      .attr("height",chart_height/10)
      .attr("width", 100)
      .attr("class","info_rainfall");

    var date=""+d.date;
    date=date.substring(0,10);
    svg.append("text")
          //.attr("#storage_show")
         .attr("id","text1")
         .attr("x",x_scale(d.date)+10)
         .attr("y",y_scale(d.rainfall)-chart_height/12)
         .text("Date: "+date)
         .attr("class","info_rainfall_details");
         console.log(d.storage);

      svg.append("text")
          //.attr("#storage_show")
         .attr("id","text2")
         .attr("x",x_scale(d.date)+10)
         .attr("y",y_scale(d.rainfall)-chart_height/12+15)
         .text("Rainfall: "+d.rainfall+"mm")
         .attr("class","info_rainfall_details");
         console.log(d.storage);    

           rect=svgdam
           .append("g")
           .append("rect")
           .attr("id","dam_water_level")
         .attr("x", chart_width/16+padding/4)
         .attr("y", chart_height-d.storage*2-padding*2)
         .attr("height", d.storage*2)
         .attr("width", chart_width/8)
         .attr("fill","url(#svgGradient)");

          svgdam
           .append("g")
           .append("text")
           .attr("id","dam_storage")
         .attr("x", chart_width/16*3+padding/4)
         .attr("y", chart_height-d.storage*2-padding*2+8)
         //.attr("height", d.storage*2)
         //.attr("width", 148)
         //.attr("fill","url(#svgGradient)");
         .attr("class", "dam_storage")
         .text(" < "+d.storage+"%");


          //storage_status++;
         d3.select(this)
          .attr("fill", "red");


        var lineFunction = d3.line()
          .x(function(d) { return d.x; })
         .y(function(d) { return d.y; });
  //.interpolate('linear')
  

//The data for our line
        var lineData = [ 
          { "x": padding+15,   "y": chart_height/2-60},  
          { "x": padding+15,  "y": chart_height/2+46},
          { "x": padding+170,  "y": chart_height/2+46}, 
          { "x": padding+170,  "y": chart_height/2-60}
        ];
  
//The line SVG Path we draw
        var lineGraph = svgdam.append("path")
          .datum(lineData)
          .attr("fill", "none")
          .attr("stroke-width",6)
          .attr("stroke","")
          .attr('d',lineFunction)
          ;
    
          console.log("working");       

        })
    .on("mouseout", function(d){
         svg.select("#text1")
         .remove();
         d3.select("#background_text").remove();
         d3.select("#text1").remove();
         d3.select("#text2").remove();
         
         //storage_percentage.remove();

         d3.select(this)
          .attr("fill","black");

    });





date=svg.append("g")
  .append("text")
  .attr("x", chart_width/2)
  .attr("y", chart_height-padding/2)
  .attr("text-anchor", "middle")
  //.attr("transform", "rotate(-90)")
  .text("Date")
  .style("font-size",17);


 date=svgdam.append("g")
  .append("text")
  .attr("x", chart_width/8)
  .attr("y", chart_height-padding/2)
  .attr("text-anchor", "middle")
  //.attr("transform", "rotate(-90)")
  .text("Storage level of Dam(in %)")
  .style("font-size",17); 

// svg.append("g")
//  .append("text")
//       //.attr("transform", "rotate(-90)")
//       .attr("x", padding/1.25 )
//       .attr("y",(chart_height / 2))
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Value");      

  // var svg= d3.select("#text1")
  //  .attr("height",500)
  //  .attr("Width",500);
var string= "M"+(padding+chart_width/64)+" "+(chart_height-padding)+" L "+(padding+chart_width/64)+" 0";
console.log(string);
  svg.append("g")
  .append("defs").append("path")
    .attr("id", "s3")
    .attr("d", string);

thing = svg.append("g")
    .attr("id", "thing")
    //.attr
    .style("fill", "navy");

thing.append("text")
    .style("font-size", "17px")
  .append("textPath")
    .attr("xlink:href", "#s3")
    .attr("text-anchor", "middle")
    .attr("startOffset","30%")
    .text("Amount of rainfall(mm)");

thing.append("use")
    .attr("xlink:href", "#s3")
    .style("stroke", "none")
    .style("fill", "none");




//bar for flood marking



    dam=[];
 }

function Update()
{
  var damname=document.getElementById("dam").value;
  circle.remove();
  //x_scale.remove();
//y_scale.remove();
//x_axis.remove();
//y_axis.remove();
  //line.remove();
  path.remove();
  x_grid.remove();
  y_grid.remove();
  x_axis_draw.remove();
  y_axis_draw.remove();
  thing.remove();
  date.remove();
  flood_area.remove();
  warning6.remove();
  warning5.remove();
  warning4.remove();
  warning3.remove();
  warning2.remove();
  warning1.remove();

 // storage_status=0;
  damUpdate(damname);
}




function setUpTangle () {
  // var damname2=damname;
  //damUpdate();
  //console.log(damname);
  var element = document.getElementById("example");
  var tangle = new Tangle(element, {
        initialize: function () {
          this.water_level = 100;
                    //this.caloriesPerCookie = 50;
          },
         update: function () {
           this.energy = Math.floor(this.water_level * 2.99);
          }
      });
}

