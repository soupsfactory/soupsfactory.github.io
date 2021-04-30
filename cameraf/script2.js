// let cameraPath = 'M 0,0 L 0,50 30,50 30,25 70,28 70,7 30,10 30,0 0,0';
let cameraPathB = 'M 30,0 L 80,0 80,25 130,15 130,55 80,45 80,70 30,70 30,0';
let cameraPathN = 'M 30,0 L 80,0 80,25 85,20 85,50 80,45 80,70 30,70 30,0';
// let lensPath = 'M 0,30 Q 0,20 10,10 Q 20,20 20,30 Q 20,40 10,50 Q 0,40 0,30 ';
let lensPath = 'M 10,0 C 20,20 20,40 10,50 C 0,40 0,20 10,0';
let cameraIntervaly = 140;
let cameraIntervalx = 150;
let padding = 20;
let total_width = document.getElementById("draw").clientWidth;
let numcameras = Math.floor((total_width-20)/cameraIntervalx);

//scale
// let minMaxlens1 = d3.min(dataset, d=>+d.ZoomW);
let minMaxEPixel = d3.extent(dataset, d=>+d.Effective_pixels);
let minmaxLens = [d3.min(dataset, d=>+d.ZoomW), d3.max(dataset, d=>+d.ZoomT)];
console.log(minMaxEPixel);

let EPixelScale = d3.scaleQuantize()
  .domain(minMaxEPixel)
  .range([9,  18, 27]);

let lenScale =  d3.scaleLinear()
  .domain(minmaxLens)
  .range([0.25, 1]);

let Brandset = d3.set(_.times(dataset.length, i=>{return dataset[i].Brand})).values();
let RealeaseYear = d3.set(_.times(dataset.length, i=>{return dataset[i].Release})).values();
RealeaseYear.sort(d3.ascending)

// console.log(RealeaseYear);

let Brandcolor = d3.scalePoint()
  .domain(Brandset)
  .range([1,21])

console.log(Brandcolor(Brandset[0]));






let cameraInfo = _.map(dataset, d=>{
  let camerapath;
  let zoomWsize = (d.ZoomW);
  let zoomTsize = (d.ZoomT);
  let epradius = (d.Effective_pixels);
  let name = d.Model;
  let brand = d.Brand;
  let year = d.Release;

  if(zoomTsize==0 && zoomWsize ==0)
  {
    camerapath = cameraPathN;
  }

  else {
    camerapath = cameraPathB;
  }

  return{
    zoomWsize, zoomTsize, epradius, camerapath, name, brand, year

  }

});



let cameradataperYear = []

for(let i=0; i<RealeaseYear.length;i++)
{
  let data = {
    year: RealeaseYear[i],
    info: cameraInfo.filter(function(d){
      return d.year == RealeaseYear[i];
    })
  }

  cameradataperYear.push(data);
}





let svg = [];
let cameras =[];


//legends
let svg_cameraN = d3.select("#NLens")
  .append("svg")
  .attr("height", 100)
  .attr("width", document.getElementById("NLens").clientWidth)
  .attr("class", "legend_text");

  svg_cameraN.append("path")
  .attr("d", cameraPathN)
  .attr("fill", "grey")
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("fill-opacity", 0.3)
  .attr("transform", "translate("+(document.getElementById("NLens").clientWidth/4)+",10) scale(0.7) ");

  svg_cameraN.append("text")
  .attr("x", 0)
  .attr("y", 70)
  .attr("transform", "translate("+(document.getElementById("NLens").clientWidth/2)+",10) ")
  .style("text-anchor", "middle")
  .text("Camera kits");

  svg_cameraN.append("text")
  .attr("x", 0)
  .attr("y", 85)
  .attr("transform", "translate("+(document.getElementById("NLens").clientWidth/2)+",10) ")
  .style("text-anchor", "middle")
  .text("without Lens");

let svg_cameraB = d3.select("#BLens")
  .append("svg")
  .attr("height", 100)
  .attr("width", document.getElementById("BLens").clientWidth)
  .attr("class", "legend_text");

  svg_cameraB. append("path")
  .attr("d", cameraPathB)
  .attr("fill", "grey")
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("fill-opacity", 0.3)
  .attr("transform", "translate( "+(document.getElementById("BLens").clientWidth/4)+",10) scale(0.7)");


  svg_cameraB.append("text")
  .attr("x", 0)
  .attr("y", 70)
  .attr("transform", "translate("+(document.getElementById("BLens").clientWidth/2)+",10) ")
  .style("text-anchor", "middle")
  .text("Camera kits");

  svg_cameraB.append("text")
  .attr("x", 0)
  .attr("y", 85)
  .attr("transform", "translate("+(document.getElementById("BLens").clientWidth/2)+",10) ")
  .style("text-anchor", "middle")
  .text("with Lens");


let ep=[];
for(let i=0; i<4;i++)
{
  ep[i] = d3.select("#Ep"+i)
  .append("svg")
  .attr("height",100)
  .attr("width", document.getElementById("Ep"+i).clientWidth)
  .attr("class", "legend_text");

  ep[i].append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("fill", "black")
  .attr("transform", "translate("+document.getElementById("Ep"+i).clientWidth/2+","+document.getElementById("Ep"+i).clientWidth/2+") ")
  .attr("r", d=>{
    switch(i)
    {
      case 0:
      return 0;
      break;

      case 1:
      return 9;
      break;

      case 2:
      return 18;
      break;

      case 3:
      return 27;
      break;


    }
  });

  ep[i].append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("fill", "url(#rectpattern)")
  .attr("transform", "translate("+document.getElementById("Ep"+i).clientWidth/2+","+document.getElementById("Ep"+i).clientWidth/2+") ")
  .attr("r", d=>{
    switch(i)
    {
      case 0:
      return 0;
      break;

      case 1:
      return 9;
      break;

      case 2:
      return 18;
      break;

      case 3:
      return 27;
      break;

    }
  });

  ep[i].append("text")
  .attr("x", document.getElementById("Ep"+i).clientWidth/2)
  .attr("y", 75)
  .style("text-anchor", "middle")
  .text(d=>
  {
    switch(i){
      case 0:
      return "0";
      break;

      case 1:
      return "1-6";
      break;

      case 2:
      return "7-13";
      break;

      case 3:
      return "14-21";
      break;
    }});

    ep[i].append("text")
    .attr("x", document.getElementById("Ep"+i).clientWidth/2)
    .attr("y", 87)
    .style("text-anchor", "middle")
    .text("mp");
}



let lez_lens = d3.select("#LensScale")
  .append("svg")
  .attr("width", document.getElementById("LensScale").clientWidth)
  .attr("height", 100)
  .attr("transform", "translate("+document.getElementById("LensScale").clientWidth/15+",0)")
  .attr("class", "legend_text");


  for(let i = 0; i<30; i++)
  {
    lez_lens
      .append("path")
      .attr("d", lensPath)
      .attr("transform", d=>{


         return "translate("+ (i*document.getElementById("LensScale").clientWidth/35)+", "+(30 - (i*1.5/3) )+") scale("+(0.25+(0.075*i/3))+")";

       })
      .attr("fill", "white")
      .attr("opacity", d=>{
        if(i==1 || i==29)
        {
          return 1;
        }
        else if(i==0)
        {
          return 0;
        }
        else{
          return 0.4
        }
      })
      .attr("stroke", "black")
      .attr("stroke-width", d=>{
        if(i==1 || i==29)
        {
          return 2;
        }
        else{
          return 1;
        }
      });


    lez_lens.append("text")
    .attr("x", d=>{
      if(i==1)
      {
        return 20;
      }
      else if(i==29)
      {
        return i*document.getElementById("LensScale").clientWidth/35
      }
    })
    .attr("y", 80)
    .text(d=>{
      if(i==1)
      {
        return "23mm"
      }
      else if(i==29)
      {
        return "518mm";
      }
    })
    .attr("text-anchor", "middle");
  }











//mainframe camera
let mainCamera = d3.select("#mainFrame")
  .append("svg")
  .attr("height", screen.height*0.4)
  .attr("width", document.getElementById("mainFrame").clientWidth-padding)
;


let scaleval= screen.height*0.3/55;
console.log(screen.height*0.35/50);

  mainCamera.append("path")
  .attr("x", 0)
  .attr("y", 0)
  .attr("d", cameraPathB)
  .attr("fill", "grey")
  .attr("fill-opacity", 0.3)
  .attr("stroke-width", 0.5)
  .attr("stroke", "black")
  .attr("transform"," translate(10,10) scale("+scaleval+")");




  var fillPattern = mainCamera
                  .append("defs")
                  .append("pattern")
                  .attr("id", "rectpattern1")
                  .attr("patternUnits", "userSpaceOnUse")
                  .attr("width", 14)
                  .attr("height", 14);


  let colors = ["white","yellow", "#FF4399", "#1B02A3","#39FF13", "#1B02A3" ];
      for(let i=0; i<5; i++){
        let cx, cy, r;
        switch(i)
        {
          case 0:
          cx= 4;
          cy = 4;
          r = 3;
          break;

          case 1:
          cx= 10;
          cy = 2;
          r = 2;
          break;

          case 2:
          cx= 10;
          cy = 6;
          r = 2;
          break;

          case 3:
          cx= 10;
          cy = 10;
          r = 2;
          break;

          case 4:
          cx= 2;
          cy = 10;
          r = 2;
          break;




        }



        fillPattern.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r)
        .attr("stroke-width", 1)
        .attr("fill", colors[i]);
      }




  //patternends


  mainCamera
  .append("image")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 45)
  .attr("height", 30)
  .attr('xlink:href', 'brands/Canon.png')
  .attr("transform", "translate("+10*scaleval+","+70*scaleval+") rotate(-90) scale("+scaleval+")")
  ;






  mainCamera
      .append("circle")
      .attr('cx', 57*scaleval)
      .attr('cy', 37*scaleval)
      .attr("fill", "#181818")
      .attr("stroke", "black")
      .attr('r', 22*scaleval)
      // .attr("transform", "translate("+10*scaleval+","+*scaleval+") ")
      ;

      mainCamera
      .append("circle")
      .attr('cx', 57*scaleval)
      .attr('cy', 37*scaleval)
      .attr("fill", "url(#rectpattern1)")
      .attr("stroke", "black")
      .attr('r', 22*scaleval)
    ;


    mainCamera
      .append("path")
      .attr("d", lensPath)
      .attr("transform", d=>{

        let zoomw= lenScale(35);

         return "translate("+(85+(1.1-zoomw)*10)*scaleval+","+((1-zoomw)*40)*scaleval+") scale("+zoomw*scaleval+")";

       })
      .attr("fill", "white")
      .attr("opacity", 0.7)
      .attr("stroke", "black")
      .attr("stroke-width", 1);


        mainCamera
      .append("path")
      .attr("d", lensPath)
      .attr("transform", d=>{
        let zoomt = lenScale(470);

        return "translate("+(120+(1.1-zoomt)*15)*scaleval+","+((1.1-zoomt)*75)*scaleval+") scale("+zoomt*scaleval+")";
      })
      .attr("fill", "white")
      .attr("opacity", 0.7)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      ;


let width_end = document.getElementById("mainFrame").clientWidth - padding*10;

mainCamera.append("text")
.attr("x", width_end+10)
.attr("y", 50)
.attr("class", "names")
.text("Effective pixel");

mainCamera.append("text")
.attr("x", width_end+10)
.attr("y", 67)
.attr("class", "units")
.text("(in mp)");


mainCamera.append("text")
.attr("x", width_end+10)
.attr("y", screen.height*0.4 /2)
.attr("class", "names")
.text("Zoom Tele");

mainCamera.append("text")
.attr("x", width_end+10)
.attr("y", screen.height*0.4 /2 +17)
.attr("class", "units")
.text("(in mm)");

mainCamera.append("text")
.attr("x", width_end+10)
.attr("y", screen.height*0.4 -50)
.attr("class", "names")
.text("Zoom wide");

mainCamera.append("text")
.attr("x", width_end+10)
.attr("y", screen.height*0.4 -33)
.attr("class", "units")
.text("(in mm)");



mainCamera.append("path")
.attr("d", "M "+57*scaleval+","+37*scaleval+" L "+(96)*scaleval+",50 "+width_end+", 50")
.attr("fill", "none")
.attr("stroke-width", 1)
.attr("stroke", "black")
.attr("opacity", 0.3);

mainCamera.append("path")
.attr("d", "M "+(96)*scaleval+","+screen.height*0.4 /2+" L "+(96)*scaleval+","+(screen.height*0.4 -50)+", "+width_end+","+(screen.height*0.4 -50))
.attr("fill", "none")
.attr("stroke-width", 1)
.attr("stroke", "black")
.attr("opacity", 0.3);

mainCamera.append("path")
.attr("d", "M "+((120+(1.1-lenScale(40))*15)*scaleval)+","+( screen.height*0.4 /2)+" L "+width_end+","+( screen.height*0.4 /2))
.attr("fill", "none")
.attr("stroke-width", 1)
.attr("stroke", "black")
.attr("opacity", 0.3);


//dataviz_starts

for(let i=0;i<cameradataperYear.length;i++)
{
  let year = "#year"+i;
  let yearname = "yearN"+i;
  let dataC = cameradataperYear[i].info;

  document.getElementById(yearname).innerHTML = cameradataperYear[i].year;

  svg[i]=d3.select(year)
    .append("svg")
    .attr("height", 150*Math.ceil(dataC.length/numcameras))
    .attr("width", total_width)
    .append("g")
  ;

//pattern
var fillPattern = svg[i]
                .append("defs")
                .append("pattern")
                .attr("id", "rectpattern")
                .attr("patternUnits", "userSpaceOnUse")
                .attr("width", 7)
                .attr("height", 7);


let colors = ["white","yellow", "#FF4399", "#1B02A3","#39FF13", "#1B02A3" ];
    for(let i=0; i<5; i++){
      let cx, cy, r;
      switch(i)
      {
        case 0:
        cx= 2;
        cy = 2;
        r = 1.5;
        break;

        case 1:
        cx= 5;
        cy = 1;
        r = 1;
        break;

        case 2:
        cx= 5;
        cy = 3;
        r = 1;
        break;

        case 3:
        cx= 5;
        cy = 5;
        r = 1;
        break;

        case 4:
        cx= 1;
        cy = 5;
        r = 1;
        break;




      }



      fillPattern.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .attr("stroke-width", 1)
      .attr("fill", colors[i]);
    }




//patternends

    cameras[i] = svg[i].selectAll("g")
    .append("g")
    .data(dataC)
    .enter()
    .append("g")
    .attr("transform", (d,i)=>{

      return 'translate('+(i%numcameras)*cameraIntervalx+', '+ (Math.floor(i/numcameras)*cameraIntervaly)+')';
    })
    ;




    cameras[i]
    .append("image")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 45)
    .attr("height", 30)
    .attr('xlink:href', function(d){ return 'brands/'+d.brand+'.png'})
    .attr("transform", "translate(5,70) rotate(-90)")
    ;

    cameras[i]
    .append("path")
    .attr("d", function(d){ return d.camerapath})
    .attr("fill", "grey")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 0.3)
    ;




    cameras[i]
    .append("circle")
    .attr('cx', 55)
    .attr('cy', 35)
    .attr("fill", "#181818")
    .attr("stroke", "black")
    .attr('r', d=>{
      if(d.epradius==0)
      return 0;
      else return EPixelScale(d.epradius);
    }
      )
    ;

    cameras[i]
    .append("circle")
    .attr('cx', 55)
    .attr('cy', 35)
    .attr("fill", "url(#rectpattern)")
    .attr("stroke", "black")
    // .attr("stroke", 0.5)
    .attr('r', d=>{
      if(d.epradius==0)
      return 0;
      else return EPixelScale(d.epradius);
    }
      )
  ;



    // .attr("transform", (d,i)=>'translate('+(i%4+1)*cameraInterval+', '+ (Math.floor(1+i/4)*cameraInterval)+')');


    //
    cameras[i]
      .append("path")
      .attr("d", lensPath)
      .attr("transform", d=>{

        let zoomw= d.zoomWsize;
        if(zoomw==0)
         {
          // zoomw = 0;
            // return "translate(42,"+((1-zoomw)*40)+") scale(0)";
         }
         else {
             zoomw = lenScale(d.zoomWsize);

         }
         if(zoomw>0.65)
         {
           return "translate(85,"+(zoomw/3)*40+") scale("+zoomt+")";
         }
         return "translate("+(85+(1.1-zoomw)*10)+","+((1-zoomw)*40)+") scale("+zoomw+")";

       })
      .attr("fill", "white")
      .attr("opacity", 0.7)
      .attr("stroke", "black")
      .attr("stroke-width", 2);


    cameras[i]
    .append("path")
    .attr("d", lensPath)
    .attr("transform", d=>{
      let zoomt = d.zoomTsize;
      if(zoomt==0)
       {
        // zoomt = 0;
       }

       else {
           zoomt = lenScale(d.zoomTsize);
       }
       if(zoomt>0.8)
       {
         return "translate(120,"+(zoomt/2)*35+") scale("+zoomt+")";
       }
      return "translate("+(120+(1.1-zoomt)*10)+","+((1.1-zoomt)*37)+") scale("+zoomt+")";
    })
    .attr("fill", "white")
    .attr("opacity", 0.7)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    ;



    cameras[i].append("text")
    .attr("x", 80)
    .attr("y", 87)
    .text(d=>d.name)
    .style('font-size', 10)
    .style("text-anchor", "middle")
    .style('word-wrap','break-word');



}
