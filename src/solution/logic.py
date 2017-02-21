from pyvisgraph.graph import Point, Edge, Graph


def run(polygons, robots):
    polygon_objs = []
    for polygon in polygons:
        poly = []
        for p in polygon:
            poly.append(Point(p[0], p[1]))
        polygon_objs.append(poly)

    graph = Graph(polygon_objs)
