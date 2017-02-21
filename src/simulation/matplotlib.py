import matplotlib.pyplot as plt
from matplotlib import pyplot as plt
from shapely.geometry.polygon import Polygon

coords = [(8,1),(4,1),(4,4),(5,2)]

poly = Polygon(coords)
x,y = poly.exterior.xy

high = 0
for i in range(len(coords)):
    if(high < max(coords[i])):
        high = max(coords[i])

fig = plt.figure(1, figsize=(5,5), dpi=90)
ax = fig.add_subplot(111)
ax.plot(x, y)
ax.set_title('Polygon')

xaxes = [-1*high, high]
yaxes = [-1*high, high]
ax.set_xlim(*xaxes)
# ax.set_xticks(range(*xaxes) + [xaxes[-1]])
ax.set_ylim(*yaxes)
# ax.set_yticks(range(*yaxes) + [yaxes[-1]])
ax.set_aspect(1)

# plt.plot([1,2,3],[5,7,4])
plt.show()
