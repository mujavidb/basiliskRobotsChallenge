import pyvisgraph as vg
# from vg import


def run(polygons, robots, case_number):
    # print("Now Processing #case :" + str(case_number) +
    # Robots = " + str(len(robots)) + " #polygons = " + str(len(polygons)))
    polygon_objs = []
    for polygon in polygons:
        poly = []
        for p in polygon:
            poly.append(vg.Point(p[0], p[1]))
        polygon_objs.append(poly)
    graph = vg.VisGraph()
    # graph.load('case' + str(case_number) + '.pk1')
    graph.build(polygon_objs)

    path_map = [[None for i in range(len(robots))] for j in range(len(robots))]

    for i, s in enumerate(robots):
        for j, d in enumerate(robots):
            if i != j and j > i:
                source, dest = vg.Point(s[0], s[1]), vg.Point(d[0], d[1])
                path_map[i][j] = graph.shortest_path(source, dest)

    ret_map = []
    for i in range(len(robots)):
        new_array = []
        for j in range(len(robots)):
            pts = []
            if j == i:
                pass
            elif j < i:
                pts = list(reversed(ret_map[j][i]))
            else:
                for p in path_map[i][j]:
                    pts.append([p.x, p.y])
            new_array.append(pts)
        ret_map.append(new_array)

    # return ret_map

    robot_paths = make_decisions(ret_map)

    return robot_paths


def make_decisions(paths):
    awake = set([0])
    sleeping = set([i for i in range(1, len(paths))])

    # this saves paths for all the robots
    map_path = {i: [] for i in range(len(paths))}

    # give starting pos for everything
    for i in range(len(paths)):
        if paths[i][0]:
            map_path[i] = [paths[i][0][0]]
        else:
            map_path[i] = [paths[i][1][0]]

    # tagging the target to the source
    tag_map = {0: None}

    while sleeping:
        # tag who to wake up by whom
        for i in awake:
            ind_close = find_closest(i, sleeping, paths, tag_map)
            tag_map[i] = ind_close

        # move the robot to that position
        for k in tag_map:
            if tag_map[k]:
                #  add path to the array
                for p in paths[k][tag_map[k]][1:]:
                    map_path[k].append(p)
                paths[k] = paths[tag_map[k]]

                awake.add(tag_map[k])
                sleeping.remove(tag_map[k])

    return map_path


def find_closest(robot, sleeping, paths, tagged):
    closest = (None, float('inf'))
    for r in sleeping:
        sub_closest = min(closest, (r, distance_to(robot, r, paths)), key=lambda k: k[1])
        if sub_closest[0] not in tagged.values():
            closest = sub_closest
    return closest[0]


def distance_to(source, to, paths):
    total = 0
    array = paths[source][to]
    for i in range(1, len(array)):
        total += ((array[i][0] - array[i - 1][0])**2 + (array[i][1] - array[i - 1][1]))
    return total
