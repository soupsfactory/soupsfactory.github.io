

var w, h,name,type;
var ImageFile;
var x, y;
var headr_f=0;

// var dis_f = 0;

var lists = [];
var displayAreaW;
var displayAreaH;


function displayparam(fileInput){
ImageFile = document.getElementById("myImage");
displayAreaW = document.getElementById("imagedisp").clientWidth-50;
displayAreaH = document.getElementById("imagedisp").clientHeight;

name = fileInput.files[0].name;
type = fileInput.files[0].type;
console.log(fileInput.files[0].name);
console.log(fileInput.files[0].type);
console.log(URL.createObjectURL(event.target.files[0]));
ImageFile = URL.createObjectURL(event.target.files[0]);

document.getElementById("fileName").innerHTML = "File Name: "+name;
document.getElementById("fileMime").innerHTML = "MIME type: "+type;
readImageFile(fileInput.files[0]);


console.log("imagewidth"+displayAreaW);
}

function readImageFile(file) {
               var reader = new FileReader(); // CREATE AN NEW INSTANCE.

               reader.onload = function (e) {
                   var img = new Image();
                   img.src = e.target.result;

                   img.onload = function () {
                       w = Number(this.width);
                       h = this.height;
                       document.getElementById("filedimensions").innerHTML="Dimensions: "+w+" x "+h;
                       console.log(w+" x "+h);
                       console.log(typeof w);
                       displayImage(w, h);

                   }
               };
               reader.readAsDataURL(file);


 }


function displayImage(widthT, heightT)
{
let widthI, heightI;
// widthT = widthT-20;
  if(widthT<=displayAreaW)
  {
    heightI= heightT;
    widthI= widthT;
  }
  else {
    widthI=displayAreaW;
    heightI= (displayAreaW *heightT)/widthT;
  }

  console.log("width: "+widthI);
  console.log("height: "+heightI);
  var svg = d3.select("#imagedisp")
    .append("svg")
    .attr("width", displayAreaW)
    .attr("height", displayAreaH)
  ;

// console.log(widthT);

    svg.append("g")
    .append("svg:image")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", widthI)
    .attr("height", heightI)
    .attr("xlink:href", ImageFile);

var heig=h;
// console.log(h);
    svg
       .append("rect")
       .attr("fill", "none")
       // .attr("opacity", 0.1)
       .attr("x", 0)
       .attr("y",0)
       .style("pointer-events", "all")
       .attr("width", widthI)
       .attr("height", heightI)
       .on('click', (event)=>{


         // r.attr("opacity",0.7);
         var x = d3.pointer(event)[0];
         var y = d3.pointer(event)[1];
         console.log(d3.pointer(event)[0]);
         console.log(d3.pointer(event)[1]);


         console.log(d3.pointer(event)[0]);

         var fo = svg.append("foreignObject")
         .attr("x", d3.pointer(event)[0])
         .attr("y", d3.pointer(event)[1])
         .attr("width", 200)
         .attr("height", 200)
         // .attr("class", "description_cl")
         .attr("id", "fo")

         ;

         var div_des = fo.append("xhtml:div")
            .append("div")
            .attr("id","desc_enter")
            .attr("class", "container description_cl")
            // .style("padding", 10)
            .style("background", "white")
            ;

          var div_label_row = div_des.append("div")
          .attr("class", "row")
          .attr("id","desc_enter1")
          ;

          (div_label_row.append("div")
          .attr("class", "col-sm-12")).append("text")
          .html("Description")
          .style("font-size",14)
          .style("font-weight", 500)
          .attr("id","desc_enter2");

            var div_input_row = div_des.append("div")
            .attr("class","row description_cl")
            .attr("id","desc_enter3");

            (div_input_row.append("div")
          .append("class", "col-sm-12")).append("input")
          .attr("type", "text")
          // .attr("class", "description_cl")
          .attr("id", "add_name")
          // .attr("id","desc_enter4")
          ;




          var div_button_row = div_des.append("div")
          .attr("class" , "btn-group")
          .attr("role","group");

          // (div_button_row.append("div")
          // .attr("class", "col-sm-6")).append("div")
          // // .attr("class", "btn-success")
          // ;

          div_button_row.append("button")
          .attr("class", "btn-success")
          .html("submit")
          .attr("id","desc_enter6")
          .on("click", (event)=>
        {
          var list = {
            "name": document.getElementById("add_name").value,
            "x": x,
            "y": y,
            "dist": (x*(y-1))+x
          }
          lists.push(list);
          console.log(d3.pointer(event)[1]);

          writeList();
          id_remove();

          let list_len = lists.length;


          var cir=   svg.append("circle")
             .attr("id", "point")
             .attr("cx", lists[list_len-1].x)
             .attr("cy", lists[list_len-1].y)
             .attr("r", 5)
             .attr("fill","#03bb85")
             .attr("stroke-width", 2)
             .attr("stroke", "#7fffd4")
             .on("mouseover", (event) =>
           {
//
            // d3.select(this)
            // .attr("fill", "white");

            var index_x= d3.pointer(event)[0];
            var index_y= d3.pointer(event)[1];
            var dist = index_x*(index_y-1) + index_x;
            // console.log("x value: "+lastx);
            var bisecting = d3.bisector(function(d){ return d.dist;}).right;
            var index= bisecting(lists, dist)-1;
             console.log("index:"+index);
             console.log(lists[index-1]);

             // if(dis_f!=0)
            svg.append("g")
                 .append("rect")
                 .attr("x", lists[index].x + 10)
                 .attr("y", lists[index].y+5)
                 .attr("height", 30)
                 .attr("width", 100)
                 .attr("stroke", "black")
                 .attr("id", "rect_hover")
                 .attr("fill","white")
                 .attr("opacity", 0.7)
                 ;

            svg.append("g")
                  .append("text")
                  .attr("id","text_hover")
                  .text("Name: "+lists[index].name)
                  .attr("x", lists[index].x + 20)
                  .attr("class","hover_text")
                  .attr("y", lists[index].y+25);
                 // dis_f=1;


           } )
           .on("mouseout", function()
         {
           // var r= d3.select(this);

           svg.select("#rect_hover").remove();
           svg.select("#text_hover").remove();

           console.log("mouseout");
         });

        });

          div_button_row.append("button")
          .attr("class", "btn-danger")
          .html("cancel")
          .attr("id","desc_enter7")
          .on("click", (event)=>
        {
          id_remove();
          // document.getElementById("point").remove();
        });

       })
       .on('mouseout', mouseout);


}






 // What happens when the mouse move -> show the annotations at the right positions.
 function mouseover() {
   // focus.style("opacity", 1)
   // focusText.style("opacity",1)
   console.log("mouseOver");
 }

 function mousemove() {
   // recover coordinate we need
   var x0 = d3.pointer(this)[0];

   console.log(x0);

   }


 function mouseout() {
  console.log("mouseout");
 }



function writeList()
{
  let table = document.getElementById("id_table");
let th=[];
let tr = document.createElement("tr");
let tr_r = document.createElement("tr");
let fragment_hr = document.createDocumentFragment();
let fragment = document.createDocumentFragment();
var node;

if(headr_f==0){
  th[0] = document.createElement("th");
  node = document.createTextNode("Name");
  th[0].appendChild(node);
  fragment_hr.appendChild(th[0]);

  th[0] = document.createElement("th");
  node = document.createTextNode("x");
  th[0].appendChild(node);
  fragment_hr.appendChild(th[0]);

  th[0] = document.createElement("th");
  // th[0].classList.add("bold500");
  node = document.createTextNode("y");
  th[0].appendChild(node);
  fragment_hr.appendChild(th[0]);

  tr_r.appendChild(fragment_hr);
  table.appendChild(tr_r);

  headr_f=1;
}



//   // let node;


let list_len = lists.length-1;

// let data1= [ "name", "xsdsd", "yyyyy"];
// for(i=0; i<3;i++)

  let td1= document.createElement("td");
  node = document.createTextNode(lists[list_len].name);

  td1.appendChild(node);
  fragment.appendChild(td1);

  let td2= document.createElement("td");
  node = document.createTextNode(Math.round(lists[list_len].x));

  td2.appendChild(node);
  fragment.appendChild(td2);

  let td3= document.createElement("td");
  node = document.createTextNode(Math.round(lists[list_len].y));

  td3.appendChild(node);
  fragment.appendChild(td3);
// }

tr.appendChild(fragment);
table.appendChild(tr);
}


function id_remove()
{
if(document.getElementById("fo"))
{
document.getElementById("fo").remove();
}


}
