from logic.logic import run
import json


def main():
    data = open("robots.mat.txt")

    a = data.readlines()
    path_map = {}
    for i, line in enumerate(a[k:t], k):
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
        print("Doing #" + str(i + 1) + " Number of robots = " + str(len(robot_pos)))
        map_i = run(obstacles, robot_pos, i)
        path_map[i] = map_i
    # print(json.dumps(path_map))
        eleventh = path_map[i]

        # paths = []
        #
        # for path in eleventh:
        #     paths.extend(path)

        a = {
            "obstacles": [],
            "robots": []
        }

        a["obstacles"] = obstacles
        a["robots"] = map_i.values()

        # import json
        with open('sol_' + str(i + 1) + '.json', 'w') as outfile:
            json.dump(a, outfile)



if __name__ == "__main__":
    main()
