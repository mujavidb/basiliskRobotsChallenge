import pyvisgraph as vg
# from vg import


def run(polygons, robots, case_number):
    print("Now Processing #case :" + str(case_number) + " #Robots = " + str(len(robots)) + " #polygons = " + str(len(polygons)))
    # polygon_objs = []
    # for polygon in polygons:
    #     poly = []
    #     for p in polygon:
    #         poly.append(vg.Point(p[0], p[1]))
    #     polygon_objs.append(poly)

    graph = vg.VisGraph()
    graph.load('case' + str(case_number) + '.pk1')
    # graph.build(polygon_objs)

    path_map = [[None for i in range(len(robots))] for j in range(len(robots))]

    for i, s in enumerate(robots):
        for j, d in enumerate(robots):
            if  i != j and j > i:
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
                    pts.append([[p.x, p.y]])
            new_array.append(pts)
        ret_map.append(new_array)

    return ret_map


    # a = path_map[0]

    # ret_json = {
    #     "robots": [
    #     ],
    #     "obstacles": [
    #     ]
    # }
    #
    # paths = ret_json["robots"]
    #
    # for p in a:
    #     if not p: continue
    #     new_path = []
    #     for pnt in p:
    #         new_path.append([pnt.x, pnt.y])
    #     paths.append(new_path)
    #
    # ret_json["obstacles"] = polygons
    # import json
    # print(json.dumps(ret_json, indent=4))
