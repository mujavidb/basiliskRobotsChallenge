from logic.logic import run


def main():
    data = open("robots.mat.txt")

    a = data.readlines()
    path_map = {}
    for i, line in enumerate(a[0:10], 0):
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
        # print(robot_pos)
        map_i = run(obstacles, robot_pos, i)

        path_map[i] = map_i
    import json
    print(json.dumps(path_map))



if __name__ == "__main__":
    main()
