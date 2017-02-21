import pyvisgraph

import pyvisgraph as vg

poly = [(1, 6), (1, 1), (5, 1), (5, 5), (3, 5), (3, 3), (4, 3), (4, 2), (2, 2), (2, 6), (6, 6), (6, 0), (0, 0), (0, 6)]

polys = [[vg.Point(p[0], p[1]) for p in poly]]

g = vg.VisGraph()

g.build(polys)

shortest = g.shortest_path(vg.Point(-1, -1), vg.Point(4, 4))

print(shortest)

# g.save('graph.img')
# g2 = vg.VisGraph()
# g2.load('graph.pk1')
