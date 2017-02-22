import json


def main():
    data = open("robots.mat.txt")

    a = data.readlines()
    path_map = {}

    for i, line in enumerate(a[29:], 29):
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
        print(len(obstacles), len(robot_pos))
        return (obstacles)


a = open("twenty_nine.json")

content = json.loads(a.read())

eleventh = content["29"]

paths = []

for path in eleventh:
    paths.extend(path)

a = {
    "obstacles": [],
    "robots": []
}

a["obstacles"] = main()
a["robots"] = paths

import json

print(json.dumps(a))
