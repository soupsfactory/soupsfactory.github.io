var family= d3.select("#family")
			.append("svg");
var family_timeperiod=d3.select("#family_timeperiod")
			.append("svg");

var height= document.getElementById("family").clientHeight;
var width=document.getElementById("family").clientWidth;
var interim_col="#86a6c5";
var blue_col="#294056";
var orange_col="#f4a029";
var body_white="rgb(250,250,250)";
var family_timeperiod_width=document.getElementById("family_timeperiod").clientWidth;
var family_timeperiod_height=document.getElementById("family_timeperiod").clientHeight;

var family_padding_x=width/100;
var family_padding_y=height/20;


var intro_fam=d3.select("#fam_lezend").append("svg");

var intro_fam_height=document.getElementById("fam_lezend").clientHeight;
var intro_fam_width=document.getElementById("fam_lezend").clientWidth;

var intro_fam_padding_x=intro_fam_width/10;
var intro_fam_padding_y=intro_fam_height/5;

	family.attr("height","100%")
		.attr("width", "100%")
		.attr("preserveAspectRatio", "xMidYMid")
		.attr("viewBox","0 0 "+(width)+" "+(height-family_padding_y/2)+"");

	family_timeperiod.attr("height", "100%")
			.attr("width", "100%")
			.attr("preserveAspectRatio", "xMidYMid")
			.attr("viewBox","0 0 "+(family_timeperiod_width)+" "+family_timeperiod_height);

	intro_fam.attr("height","100%")
		.attr("width", "100%")
		.attr("preserveAspectRatio", "xMidYMid")
		.attr("viewBox","0 0 "+(intro_fam_width)+" "+(intro_fam_height)+"");

	const treelayout=d3.tree()
		.size([ width/4*3,height-family_padding_y/2])
		.separation(function separation(a, b) {
        return (a.parent == b.parent ? 1:1);
    });

	var family_yScale=d3.scaleLinear()
								.domain([1220,1860])
								.range([0,height]);

	var rScale = d3.scaleSqrt() // <--New!
	    .domain([0, 20])
	    .range([0, height/70]);

	const root=d3.hierarchy(treeData);
	const links= treelayout(root).links();





	// var symboldiamond = d3.symbol()
  // 							.type(d3.symbolDiamond)
 	// 						.size(100);
	//
	// var pathDiamond = symboldiamond();

	function make_y_gridlines() {
	      return d3.axisLeft(family_yScale)
	                .ticks(10)
	      }




	// family.append("g")
	//       .attr("class", "grid")
	//       .attr("transform", "translate("+(width-family_padding_x)+",0)")
	//       .call(make_y_gridlines()
	//       .tickSize(-(height-family_padding_y*2))
	//       .tickFormat("")
	//     );






	const linkPathGenerator=d3.linkVertical()
			.y(function(d){
								return family_yScale(d.data.year);})
			.x(function(d){ return d.x+family_padding_x*5;});


	var link_hori=family.selectAll("path")
		.data(links)
		.enter()
		.append("g")
		.append("path")
		.attr("d",linkPathGenerator);




var symbolDiamondGen = d3.symbol()
	.type(d3.symbolDiamond)
	.size(60)
	// .attr("class", "shapeDiamond")
	;

var symbolCircleGen = d3.symbol()
	.type(d3.symbolCircle)
	.size(10)
	;

	var interim1=family
		.append("rect")
		.attr("y", family_yScale("1376"))
		.attr("x",0)
		.attr("width",(width-family_padding_x*2))
		.attr("height",family_yScale(1380)-family_yScale(1376))
		// .attr("class", "interim")
		.attr("fill",interim_col)
		.on("mouseover",function()
	{
		family.append("rect")
					.attr("id","mouseover_rect")
					.attr("x",width-family_padding_x*155-10	)
					.attr("y",function(){
						// console.log((d.data.year));
						return family_yScale(1355)-15;})
					.attr("width",function()
				{
					var strlen=20;
				//	console.log(strlen);
					// if(strlen>10)
					return strlen*10;
					// else return 11*strlenMultiplier;
				})
					.attr("height",30)
					.attr("class","hover_rect")
					.attr("rx",3)
					.attr("ry",3);

		family.append("text")
				.attr("id","mouseover_name")
				.attr("x",width-family_padding_x*155	)
					.attr("y",family_yScale(1376)-20)
					.attr("class","hover_text")
					.text(function(){
						// console.log(name);
						return "Interim period: 1376-1380";});
	})
	.on("mouseout",function()
{
	d3.select("#mouseover_rect").remove();
	d3.select("#mouseover_name").remove();
});

var interim2=family
	.append("rect")
	.attr("y", family_yScale("1389"))
	.attr("x",0)
	.attr("width",(width-family_padding_x*2))
	.attr("height",family_yScale(1397)-family_yScale(1389))
	.attr("fill",interim_col)
	// .attr("class", "interim")
	.on("mouseover",function()
{
	family.append("rect")
				.attr("id","mouseover_rect")
				.attr("x",width-family_padding_x*155-10	)
				.attr("y",function(){
					// console.log((d.data.year));
					return family_yScale(1368)-15;})
				.attr("width",function()
			{
				var strlen=20;
			//	console.log(strlen);
				// if(strlen>10)
				return strlen*10;
				// else return 11*strlenMultiplier;
			})
				.attr("height",30)
				.attr("fill","white")
				.attr("stroke-opacity",0.2)
				.attr("stroke","blue")
				.attr("rx", 3)
				.attr("ry",3);

	family.append("text")
			.attr("id","mouseover_name")
			.attr("x",width-family_padding_x*155	)
				.attr("y",family_yScale(1389)-20)
				.attr("class","hover_text")
				.text(function(){
					// console.log(name);
					return "Interim period: 1389-1397";});
})
.on("mouseout",function()
{
d3.select("#mouseover_rect").remove();
d3.select("#mouseover_name").remove();
});

var strlenMultiplier=10;
var index_chosen;
var family_tree=family.append('g')
	.selectAll('circle')
	.data(root.descendants())
	.enter()
	.append('circle')
	.attr("cx",function(d){
		return d.x;
	})
	.attr("cy", function(d){
		return family_yScale(d.data.year);
	})
	.attr("transform","translate("+(family_padding_x*5)+",0)")
	.attr("stroke","#da850b")
	.attr('r', function(d)
		{
			if(d.data.value==1)
				{
				return rScale(6);}
			else
				{
				return rScale(1);}
		})
	.attr("fill",function(d){
		if(d.data.value==1)
			{
			  return orange_col;}
		else
			{
			return "#f9c986";}}
	)
	.on("mouseover", function(d)
{
	//console.log(d.data.name);



	family.append("rect")
				.attr("id","mouseover_rect")
				.attr("x",function(){

						// var strlen=d.data.name.length;
						var x=d.x+family_padding_x*7;
						if(d.data.name=="Sudinpha or Chandrakanta Singh")
						x=d.x-(d.data.name.length*strlenMultiplier);
						// console.log(x);
						return x;
					}

			)
				.attr("y",function(){
					console.log((d.data.year));
					return family_yScale(d.data.year)-25;})
				.attr("width",function()
			{
				var strlen=d.data.name.length;
			//	console.log(strlen);
				if(strlen>10)
				return strlen*strlenMultiplier;
				else return 11*strlenMultiplier;
			})
				.attr("height",function(){
					if(d.data.value==1)
					return 60;
					else return 40;
				})
				.attr("fill","white")
				.attr("stroke-opacity",0.2)
				.attr("stroke","blue")
				.attr("rx", 3)
				.attr("ry",3);

	family.append("text")
			.attr("id","mouseover_name")
				.attr("x",function(){
					if(d.data.name=="Sudinpha or Chandrakanta Singh")
					return d.x-(d.data.name.length*strlenMultiplier)+10;
				return d.x+family_padding_x*7+10;
				})
				.attr("y",family_yScale(d.data.year))
				.attr("class","hover_text")
				.text(function(){
					// console.log(name);
					return d.data.name;});

if(d.data.value==0)
return;
	family.append("text")
			.attr("id","mouseover_year")
			.attr("x",function(){
				if(d.data.name=="Sudinpha or Chandrakanta Singh")
				return d.x-(d.data.name.length*strlenMultiplier)+10;
			return d.x+family_padding_x*7+10;
			})
			.attr("y",family_yScale(d.data.year)+20)
			.attr("class","clickmore hover_text ")
			.text(function(){
				// console.log(d.data.year);
				return "CLICK TO KNOW MORE";});

})
.on("mouseout", function(d)
{
	// console.log("end");
	family.selectAll("#mouseover_name")
			.remove();
	family.selectAll("#mouseover_year")
		.remove();
	family.selectAll("#mouseover_rect")
		.remove();
})
.on("click",function(d)
{
	// d3.select(this).attr()
	if(d.data.value==0)
	return;
	console.log(d);
	document.getElementById("fam_intro").innerHTML=d.data.description;
});






					// ;

//timeline
var family_xScale=d3.scaleLinear()
					.domain([1228,1860])
					.range([0,family_timeperiod_width]);



// family//.selectAll("#timeline_hover")
// .append("g")
// .append("text")
// .attr("id", "timeline_hover")
// .attr("y",function(){
// 	return family_yScale(1268);
// })
// .attr("height",family_yScale(1268)-family_yScale(1228)+rScale(10))
// .text(function(){
// 	return "1228-1268";
// })
// .attr("x", 0);
// .attr("class","fonct")





// transition(1);
// family_timeperiod.append("g")
// 		.append("rect")
// 		.attr("y",0)
// 		.attr("x",0)
// 		.attr("height",family_timeperiod_height/2)
// 		.attr("width","100%")
// 		.attr("fill","#294056");
		// .attr("transform", "translate(0,0)");


//timeline

var timeline_rects=family_timeperiod.append("g")
			.selectAll("rect")
			.data(map_timeline)
			.enter()
			.append("rect")
			.attr("x",function(d)
			{console.log(d.timeline1);
			if(d.timeline1==1228)
			{	console.log(family_xScale(1228)-rScale(6));
			return family_xScale(1228);}
			else {
			return family_xScale(d.timeline1);
			}
			})
		.attr("y",0)
		.style("cursor","pointer")
		.attr("height", 5)
		.attr("width",function(d){
			if(d.timeline1==1228)
			return family_xScale(d.timeline2)-family_xScale(d.timeline1);
			return family_xScale(d.timeline2)-family_xScale(d.timeline1);
		})
		.attr("stroke",blue_col)
		.attr("stroke-width",2)
		.attr("transform", "translate("+(family_padding_x*5)+","+family_padding_y*1.5+")")
		.attr("fill",orange_col)
		.on("mouseover", function(d){
				d3.select(this)
				.attr("fill",body_white);


				// family.select("#timeline_hover").remove();


			family.select("#timeline_hover")
				.attr("opacity",1)
				.transition()
				.attr("y",function(){

				return family_yScale(d.timeline2)-rScale(5);
				})

				.text(function(){
				return d.timeline1+"-"+d.timeline2;
				});




				family_timeperiod.append("g")
				.attr("id","hover_text_family_timeperiod")
				.append("text")
				.attr("x",family_xScale(d.timeline1)+(family_xScale(d.timeline2)-family_xScale(d.timeline1))/2)
				// .attr("x",function(){
				// 	return family_xScale(d.timeline1)+(family_xScale(d.timeline2)-family_xScale(d.timeline1))/2;
				// })
				.attr("y",family_padding_y*1.50)
				// .attr("transform", "translate("+(family_padding_x*5)+","+family_padding_y*1.40+")")
				.style("text-anchor","middle")
				.text(d.timeline1+"-"+d.timeline2)
				.attr("class", "hover_timeline_text")

				.attr("transform", "translate("+(family_padding_x*5)+","+family_padding_y/1.3+")");
// .attr("class","fonct")
		})
		.on("mouseout",function(){
			// family.select("#timeline_hover").remove();
			family_timeperiod.select("#hover_text_family_timeperiod").remove();
			family_timeperiod.select("#hover_rect_family_timeperiod").remove();
			d3.select(this)
			.attr("fill",orange_col);
		})
		.on("click",function(d){
			// d3.select(this)
			// .attr("fill","black");
			family.select("#timeline_hover")
			.attr("opacity",0);

			family_timeperiod.select("#slider_family_timeperiod")
			.transition()
			.attr("x",family_xScale(d.timeline1))
			.attr("width",family_xScale(d.timeline2)-family_xScale(d.timeline1))
						;

			family_timeperiod.select("#slider_family_timeperiod_rect")
			.transition()
			.attr("x",family_xScale(d.timeline1)+(family_xScale(d.timeline2)-family_xScale(d.timeline1))/2-45)
			// .attr("width",family_xScale(d.timeline2)-family_xScale(d.timeline1))
						;
			family_timeperiod.select("#slider_family_timeperiod_text")
			.transition()
			.attr("x",family_xScale(d.timeline1)+(family_xScale(d.timeline2)-family_xScale(d.timeline1))/2)
			.text(""+d.timeline1+"-"+d.timeline2)
						;
			// family.select("#timeline_rect").remove();
			// family.select("#timeline_click").remove();
			mapTransition_fam(d.map_number)

			family.select("#timeline_rect")
			.transition()
			.attr("y",function()
			{console.log(d.timeline1);
				if(d.timeline1==1228)
			{	console.log(family_yScale(1228)-rScale(10));
				return family_yScale(1228)-rScale(10);}
			else {
				return family_yScale(d.timeline1);
			}
			})

			.attr("height",function(){
				if(d.timeline1==1228)
				return family_yScale(d.timeline2)-family_yScale(d.timeline1)+rScale(10);
				return family_yScale(d.timeline2)-family_yScale(d.timeline1);
			})
			// .attr("transform","translate("+",0)")
		;

			family.select("#timeline_click")//.selectAll("#timeline_hover")
			// .append("g")
			// .append("text")
			// .attr("id", "timeline_click")
			.transition()
			.attr("y",function(){

			return family_yScale(d.timeline2)-rScale(6);
			})

			.text(function(){
			return d.timeline1+"-"+d.timeline2;
			})
			;



			// family.select("#timeline_hover").remove();
		});

		family.append("g")
		.append("rect")
		.attr("id","timeline_rect")
		.attr("x",0)
		.attr("y",function()
		{return family_yScale(1228)-rScale(10);
		})
		.attr("height", function(){
		return family_yScale(1268)-family_yScale(1228)+rScale(10);
		})
		.attr("width",width-family_padding_x)
		.attr("transform","translate("+(family_padding_x/2)+",0)")
		.attr("stroke-width",3)
		.attr("fill","none")
		.attr("stroke",blue_col);






//slider_rect

		var slider_family_timeperiod=family_timeperiod.append("g")
					.append("rect")
					.attr("id","slider_family_timeperiod")
					.attr("height",10)
					.attr("x",0)
					.attr("y",0)
					.attr("stroke",blue_col)
					.attr("stroke-width",2)
					// .attr("stroke-width",3)
					.attr("fill",body_white)
					.attr("transform", "translate("+(family_padding_x*5)+","+family_padding_y*1.40+")")
					;
		slider_family_timeperiod.attr("x",family_xScale(1228))
					.attr("width",family_xScale(1268)-family_xScale(1228))
					;

		var slider_family_timeperiod_rect=family_timeperiod.append("g")
					.append("rect")
					.attr("id","slider_family_timeperiod_rect")
					.attr("height",20)
					.attr("width",90)
					.attr("y",0)
					.attr("stroke",blue_col)
					.attr("stroke-width",2)
					// .attr("stroke-width",3)
					.attr("fill",body_white)
					.attr("transform", "translate("+(family_padding_x*5)+","+family_padding_y/2+")")
					;
		slider_family_timeperiod_rect.attr("x",family_xScale(1228))
					.attr("x",family_xScale(1228)+(family_xScale(1268)-family_xScale(1228))/2-45)
					;

		var slider_family_timeperiod_text=family_timeperiod.append("g")
					.append("text")
					.attr("id","slider_family_timeperiod_text")
					// .attr("height",20)
					// .attr("width",90)
					.attr("y",0)
					// .attr("fill",blue_col)
					.attr("class","timeline_text_click")
					// .attr("stroke-width",2)
					// .attr("stroke-width",3)
					// .attr("fill","rgb(250,250,250)")
					.attr("transform", "translate("+(family_padding_x*5)+","+family_padding_y+")")
					.style("text-anchor","middle")
					.text("1228-1268")
					;
		slider_family_timeperiod_text.attr("x",family_xScale(1228))
					.attr("x",family_xScale(1228)+(family_xScale(1268)-family_xScale(1228))/2)
					;

		family//.selectAll("#timeline_hover")
		.append("g")
		.append("text")
		.attr("id", "timeline_hover")
		.attr("y",family_yScale(1268))
		.style("text-anchor","end")
		.attr("x",width-family_padding_x )
		.attr("class","fam_timeline_text_hover")
		.attr("opacity",0)
		.text("1228-1268");

		family//.selectAll("#timeline_hover")
		.append("g")
		.append("text")
		.attr("id", "timeline_click")
		.attr("x",width-family_padding_x)
		.attr("y", function(){

		return family_yScale(1268)-rScale(6);
		})
			.style("text-anchor","end")
		.attr("class","fam_timeline_text")
		.text(function(){
		return "1228-1268";
		});



intro_fam
// .selectAll('circle')
.append("g")
.append('circle')
.attr("cx",intro_fam_padding_x)
.attr("cy", intro_fam_padding_y*2)
// .attr("transform","translate("+(family_padding_x*5)+",0)")
.attr("stroke","#da850b")
.attr('r',rScale(20))
.attr("fill",orange_col);


intro_fam
// .selectAll('circle')
.append("g")
.append('circle')
.attr("cx",intro_fam_padding_x*5)
.attr("cy", intro_fam_padding_y*2)
// .attr("transform","translate("+(family_padding_x*5)+",0)")
.attr("stroke","#da850b")
.attr('r',rScale(6))
.attr("fill","#f9c986");

intro_fam
// .selectAll('circle')
.append("g")
.append('text')
.attr("x",intro_fam_padding_x*1.25)
.attr("y", intro_fam_padding_y*2.5)
.attr("class","lezends_small")
.text("Kings")
// .attr("transform","translate("+(family_padding_x*5)+",0)")
// .attr("stroke","#da850b")
// .attr('r',rScale(6))
// .attr("fill","#f9c986")
;

intro_fam
// .selectAll('circle')
.append("g")
.append('text')
.attr("x",intro_fam_padding_x*5.25)
.attr("y", intro_fam_padding_y*2.5)
.attr("class","lezends_small")
.text("Princes")
// .attr("transform","translate("+(family_padding_x*5)+",0)")
// .attr("stroke","#da850b")
// .attr('r',rScale(6))
// .attr("fill","#f9c986")
;
