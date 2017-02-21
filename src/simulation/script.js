//list of coordinates of all obstacles
var obstacles = [
        [
            [1, 6],
            [1, 1],
            [5, 1],
            [5, 5],
            [3, 5],
            [3, 3],
            [4, 3],
            [4, 2],
            [2, 2],
            [2, 6],
            [6, 6],
            [6, 0],
            [0, 0],
            [0, 6]
        ]
    ];

for( a = 0; a < obstacles.length; a++){
  var coords;
  var block = obstacles[a];
  //console.log(block.length);
  //console.log(obstacles.length);
  for(i = 0; i <block.length; i++){
    coords = Object.keys(block).map(function(i){
      return {x: block[i][0], y: block[i][1]}
    });
  }

  var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

  var line = d3.line()
                  .x(function(d,i){ return d.x*60; })
                  .y(function(d,i){ return d.y*40; })

  svg.append("path")
        .attr("stroke","blue")
        .attr("d",line(coords));
}
