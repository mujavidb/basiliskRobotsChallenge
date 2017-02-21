from logic.logic import run


def main():
    data = open("robots.mat.txt")

    a = data.readlines()

    for line in a[4:5]:
        _, cords = line.split(':')
        obstacles = []
        robot_pos = cords
        if '#' in cords:
            robot_pos, obstacles = cords.split('#')

        if obstacles:
            obstacles = obstacles.split(';')
            obstacles[-1].replace('\n', '')
            obstacles = list(map(lambda k: eval(k), obstacles))

        robot_pos = eval("[" + robot_pos.replace("\n", "") + "]")
        print(robot_pos)
        run(obstacles, robot_pos)


if __name__ == "__main__":
    main()
