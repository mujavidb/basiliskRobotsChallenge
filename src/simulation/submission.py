import json
import sys

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
for i in xrange(start, end + 1):
    filename = "sol_{}.json".format(i)
    try:
        currentFile = open(filename)
    except IOError:
        continue
    fileAsString = currentFile.read()
    structuredData = json.loads(fileAsString)
    robots = structuredData["robots"]
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