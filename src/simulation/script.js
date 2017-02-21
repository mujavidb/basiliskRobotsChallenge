// var dataArray1 = [{x:1,y:2},{x:1,y:4},{x:3,y:4},{x:3,y:2}];
var dataArray2;
var dataArray1;

coords1 = [[1,2],[1,4],[3,4],[3,2]];
coords2 = [[8,1],[4,1],[4,4],[5,2]];

for(i = 0; i <coords1.length; i++){
  dataArray1 = Object.keys(coords1).map(function(i){
    return {x: coords1[i][0], y: coords1[i][1]}
  });
}

for(j = 0; j <coords2.length; j++){
  dataArray2 = Object.keys(coords2).map(function(j){
    return {x: coords2[j][0], y: coords2[j][1]}
  });
}

// (1,2),(1,4),(3,4),(3,2);(8,1),(4,1),(4,4),(5,2)

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
