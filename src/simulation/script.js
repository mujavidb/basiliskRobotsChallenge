var dataArray1 = [{x:1,y:2},{x:1,y:4},{x:3,y:4},{x:3,y:2}];
var dataArray2 = [{x:8,y:1},{x:4,y:1},{x:4,y:4},{x:5,y:2}];

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

var line = d3.line()
                .x(function(d,i){ return d.x*6; })
                .y(function(d,i){ return d.y*4; })

svg.append("path")
      .attr("stroke","blue")
      .attr("d",line(dataArray1));
svg.append("path")
      .attr("stroke","blue")
      .attr("d",line(dataArray2));
