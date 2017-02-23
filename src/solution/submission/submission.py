import json
import sys
import itertools
import math

# FORMAT:
# team name
# password
# <ProblemSolution> := <number>: <Solution>
# <Solution> := <path> | <Solution> ";" <path>
# <path> := <points>
# <points> := <point> | <points> "," <point>
# <point> := "(" <float> "," <float> ")"

text_file = open("basilisk.txt", "w")
text_file.write('basilisk\n')
text_file.write('4j5014cid8bhrefhbjv3lpqfsv\n')

start = 1
end = 30

sub_map = {}
data = open("robots.mat.txt")

a = data.readlines()

for i, line in enumerate(a, 1):
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
    sub_map[i] = {"robots": robot_pos, "obstacles": obstacles}


# print(sub_map[i])


def swap(paths, i):
    robots = sub_map[i]["robots"]
    obstacles = sub_map[i]["obstacles"]
    ret_path = []
    for robot in paths:
        if len(robot) == 1:
            continue
        new_partial = []
        for point in robot:
            # for every point in output, replace it with its exact counterpart in the input file
            for new_point in robots + list(itertools.chain.from_iterable(obstacles)):
                if math.isclose(point[0], new_point[0]) and math.isclose(point[1], new_point[1]):
                    new_partial.append(new_point)
                    break
        ret_path.append(new_partial)
    return ret_path


for i in range(start, end + 1):
    filename = "sol_{}.json".format(i)
    try:
        currentFile = open(filename)
    except IOError:
        continue
    fileAsString = currentFile.read()
    structuredData = json.loads(fileAsString)
    robots = structuredData["robots"]
    #
    a = list(filter(lambda k: len(k) != 1, robots))
    robots = swap(a, i)
    output = ""
    output += "{}: ".format(i)
    for i, robot in enumerate(robots):
        for j, point in enumerate(robot):
            output += "({}, {})".format(point[0], point[1])
            if j == len(robot) - 1:
                if i != len(robots) - 1:
                    output += "; "
                else:
                    output += ""
            else:
                output += ", "
    output += "\n"
    text_file.write(output)

text_file.close()
