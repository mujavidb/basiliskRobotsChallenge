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


const drawObstacle = (graphics, obstacle) => {
	graphics.beginFill(0xFF8000)
	graphics.lineStyle(1, 0x00AA00)

	graphics.moveTo(obstacle[0][0],obstacle[0][1])
	for (let i = 1; i < obstacle.length; i++) {
		graphics.lineTo(obstacle[i][0], obstacle[i][1])
	}
	graphics.closePath()
	graphics.endFill()
}

const drawRobotPath = (graphics, robot) => {
	if (robot.length > 1){
		graphics.lineStyle(1, 0x00AAFF)

		graphics.moveTo(robot[0][0],robot[0][1])
		for (let i = 1; i < robot.length; i++) {
			graphics.lineTo(robot[i][0], robot[i][1])
		}
	} else {

	}
}

const setup = () => {
	// Make an instance of two and place it on the page.
	const dimensions = getDimensions()
	const app = new PIXI.Application(
		dimensions.width.max - dimensions.width.min,
		dimensions.height.max - dimensions.height.min,
		{ antialias: true })
	document.body.appendChild(app.view)
	const graphics = new PIXI.Graphics()

	for (let robot of data.robots) {
		drawRobotPath(graphics, robot)
	}

	for (let obstacle of data.obstacles) {
		drawObstacle(graphics, obstacle)
	}

	app.stage.addChild(graphics);
}

document.addEventListener("DOMContentLoaded", setup)

