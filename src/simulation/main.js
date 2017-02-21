const data = {
    "robots": [
        [
         	[-1, -1],
            [0, 6],
            [1, 6],
            [2, 2],
            [4, 2],
            [4, 3],
            [4, 4]
        ]
    ],

    //ARRAY of obstacles
    "obstacles": [
        //ARRAY of points making up obstacle (polygon)
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
    ]
}

const getDimensions = () => {
	let maxHeight = 0
	let minHeight = 0
	let maxWidth = 0
	let minWidth = 0

	for (let object of [data.robots, data.obstacles]) {
		for (let points of object) {
			for (let point of points) {
				if (point[0] > maxWidth) {
					maxWidth = point[0]
				}
				if (point[1] > maxHeight) {
					maxHeight = point[1]
				}
				if (point[0] < minWidth) {
					minWidth = point[0]
				}
				if (point[1] < minHeight) {
					minHeight = point[1]
				}
			}
		}
	}

	return  {
				height: {
					min: minHeight,
					max: maxHeight
				},
				width: {
					min: minWidth,
					max: maxWidth
				}
			}
}


const drawObstacle = (app, obstacle) => {
	// app.append("circle")
	//    .attr("cx", obstacle[0][0])
	//    .attr("cy", obstacle[0][1])
	//    .attr("r", 2)
	//    .attr("stroke-width", 2)
	//    .attr("stroke", "#f00")
	//    .attr("fill", "none")

	const lineGenerator = d3.line()
				              .x(d => d[0])
				              .y(d => d[1])
				              // .interpolate("linear")
	app.append("path")
	   .attr("d", lineGenerator(obstacle))
	   .attr("stroke-width", 1)
	   .attr("stroke", "#f00")
	   .attr("fill", "none")
}

const drawRobotPath = (app, robot) => {
	if (robot.length > 1){
		const lineGenerator = d3.line()
				              .x(d => d[0])
				              .y(d => d[1])
				              // .interpolate("linear")
		app.append("path")
		   .attr("d", lineGenerator(robot))
		   .attr("stroke", "#FF8000")
		   .attr("stroke-width", 1)
		   .attr("fill", "none")
	} else {
		app.append("circle")
		   .attr("cx", robot[0][0])
		   .attr("cy", robot[0][1])
		   .attr("r", 2)
		   .attr("stroke-width", 1)
		   .attr("stroke", "#FF8000")
		   .attr("fill", "none")
	}
}

const setup = () => {
	// Make an instance of two and place it on the page.
	const dimensions = getDimensions()
	const padding = 10
	const app = d3.select("#container")
	app.attr("width", 600)
	   .attr("height", 600)
	   .attr("preserveAspectRatio", "xMidYMid meet")
	   .attr("viewBox", `${dimensions.width.min - padding} ${dimensions.height.min - padding} ${dimensions.width.max - dimensions.width.min + 2*padding} ${dimensions.height.max - dimensions.height.min + 2*padding}`)
	
	for (let obstacle of data.obstacles) {
		drawObstacle(app, obstacle)
	}

	for (let robot of data.robots) {
		drawRobotPath(app, robot)
	}

}

document.addEventListener("DOMContentLoaded", setup)

