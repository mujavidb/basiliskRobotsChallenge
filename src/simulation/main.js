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
            [100, 5],
            [100, 50],
            [5,	50]
        ]
    ]
}


const drawObstacle = (graphics, obstacle) => {
	graphics.beginFill(0xFF8000)
	graphics.lineStyle(2, 0x00AA00)

	graphics.moveTo(obstacle[0][0],obstacle[0][1])
	for (let i = 1; i < obstacle.length; i++) {
		graphics.lineTo(obstacle[i][0], obstacle[i][1])
	}
	graphics.closePath()
	graphics.endFill()
}

const drawRobotPath = (graphics, robot) => {
	if (robot.length > 1){
		graphics.lineStyle(2, 0x00AAFF)

		graphics.moveTo(robot[0][0],robot[0][1])
		for (let i = 1; i < robot.length; i++) {
			graphics.lineTo(robot[i][0], robot[i][1])
		}
	} else {

	}
}

const setup = () => {
	// Make an instance of two and place it on the page.
	const app = new PIXI.Application(800, 600, { antialias: true })
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

