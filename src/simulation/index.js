const data = {
    //ARRAY of point locations for robot starting points
    "robots": [
        [
        	[160, 240],
            [120, 280],
            [100, 200]
        ]
    ],

    //ARRAY of obstacles
    "obstacles": [

        //ARRAY of points making up obstacle (polygon)
        [
            [5,	5],
            [20, 5],
            [20, 10],
            [5,	10]
        ]
    ]
}

const drawObstacle = (two, obstacle) => {
	let points = []
	for (let point of obstacle) {
		points.push(new Two.Anchor(point[0], point[1]))
	}
	two.makePolygon(points)
}

const drawRobotPath = (two, robot) => {
	console.log(robot)
	if (robot.length > 1){
		for (let i = 1; i < robot.locations.length; i++) {
			two.makeLine(robot[i-1], robot[i-1], robot[i], robot[i])
		}
	} else {

	}
}

const setup = () => {
	// Make an instance of two and place it on the page.
	const two = new Two({ width: 600, height: 600 }).appendTo(document.body)

	for (let robot of data.robots) {
		drawRobotPath(two, robot)
	}

	for (let obstacle of data.obstacles) {
		drawObstacle(two, obstacle)
	}

	two.update();
}

document.addEventListener("DOMContentLoaded", setup)

