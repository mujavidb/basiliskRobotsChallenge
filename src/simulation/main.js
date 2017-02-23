let LENGTH
let ASPECT_RATIO
let PADDING
let DIMENSIONS
let STROKE_WIDTH
let APP

const getSolutionNumber = () => {
	const name = "q"
    const regex = new RegExp("[?&]" + name.replace(/[\[\]]/g,"\\$&") + "(=([^&#]*)|&|#|$)")
    const results = regex.exec(window.location.href)[2].replace(/\+/g, " ")
    return decodeURIComponent(results)
}

const goNext = forwards => {
	let page = parseInt(getSolutionNumber("q"))
	page = forwards ? page+1 : page - 1
	page = page > 30 ? 1 : page
	page = page < 1 ? 30 : page
	location.replace(`http://localhost:8080/?q=${page}`)
}

const generateLightColor = () => {
	const g = () => Math.floor(100 + Math.random()*155)
	return `rgb(${g()},${g()},${g()})`
}

const generateDarkColor = () => {
	const g = () => Math.floor(Math.random()*150)
	return `rgb(${g()},${g()},${g()})`
}

const getDimensions = data => {
	let maxHeight = 0
	let minHeight = 0
	let maxWidth = 0
	let minWidth = 0

	for (let objectCollection of [data.robots, data.obstacles]) {
		for (let points of objectCollection) {
			// points = points[0] //make up for json creation mistake on solution-end
			if (points != []){
				for (let point of points) {
					if (point) {
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


const drawObstacle = obstacle => {
	if (obstacle != []){
		const lineGenerator = d3.line()
					            .x(d => parseFloat(d[0]))
					            .y(d => parseFloat(d[1]))
		APP.append("path")
		   .attr("d", lineGenerator(obstacle))
		   .attr("stroke-width", 0)
		   .attr("fill", generateDarkColor())
	}
}
let fun = 0

const drawRobotPath = (robot, printCoords = false) => {
	if (robot.toString() != "") {
		let pathColor = generateLightColor()


		if (robot.length > 1){
			const lineGenerator = d3.line()
					                .x(d => d[0] ? parseFloat(d[0]): "")
					                .y(d => d[1] ? parseFloat(d[1]): "")
			let coords = robot.filter(x=>x.toString() != "")
			APP.append("path")
			   .attr("d", lineGenerator(coords))
			   .attr("stroke", pathColor)
			   .attr("stroke-width", STROKE_WIDTH)
			   .attr("fill", "none")
		}

		APP.append("circle")
		   .attr("cx", robot[0][0])
		   .attr("cy", robot[0][1])
		   .attr("r", STROKE_WIDTH * 1.5)
		   .attr("stroke-width", 0)
		   .attr("fill", "black")
		
		if (printCoords) {
			let robotLocation = APP.append("text")
			   .attr("x", robot[0][0])
			   .attr("y", robot[0][1])
			   .attr("fill", "red")
			   .attr("background-color", "none")
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "8px")
			   .text(`(${robot[0][0]}, ${robot[0][1]})`)
		}
	}
}

const simulateSolution = data => {
	// Make an instance of two and place it on the page.
	LENGTH = 600
	ASPECT_RATIO = 1
	DIMENSIONS = getDimensions(data)
	STROKE_WIDTH = ((DIMENSIONS.width.max - DIMENSIONS.width.min) / LENGTH) * 1.5
	PADDING = ((DIMENSIONS.width.max - DIMENSIONS.width.min) / LENGTH) * 100

	const viewSizes = {
		minX: DIMENSIONS.width.min - PADDING,
		minY: DIMENSIONS.height.min - PADDING,
		width: DIMENSIONS.width.max - DIMENSIONS.width.min + 2*PADDING,
		height: DIMENSIONS.height.max - DIMENSIONS.height.min + 2*PADDING
	}

	APP = d3.select("#container")
	APP.attr("width", LENGTH * ASPECT_RATIO)
	   .attr("height", LENGTH)
	   .attr("preserveAspectRatio", "xMidYMid meet")
	   .attr("viewBox", `${viewSizes.minX} ${viewSizes.minY} ${viewSizes.width} ${viewSizes.height}`)

	for (let obstacle of data.obstacles) {
		drawObstacle(obstacle)
	}

	for (let i = 0; i < data.robots.length; i++ ) {

		//change logic to pass true flag to print robot location
		drawRobotPath(data.robots[i], i < 10 ? true : false)
	}
}

const setup = () => {

	//get latest data from server
	const questionNumber = getSolutionNumber()
	const req = new XMLHttpRequest()
	req.open('GET', `/sol_${questionNumber}.json`, true)
	req.onreadystatechange = function (data) {
		if (req.readyState == req.DONE){
			// console.log(JSON.parse(req.response))
			// console.log(getDimensions(JSON.parse(req.response)))
			simulateSolution(JSON.parse(req.response))
		}
	}
	req.send()

}

document.addEventListener("DOMContentLoaded", setup)

