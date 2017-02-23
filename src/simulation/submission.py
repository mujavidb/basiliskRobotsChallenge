import json
import sys

def write_file():

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
    text_file.write(string)
    text_file.close()

array = ['sol_1.json', 'sol_2.json', 'sol_3.json', 'sol_4.json', 'sol_5.json', 'sol_6.json', 'sol_7.json', 'sol_8.json', 'sol_9.json', 'sol_10.json', 'sol_11.json', 'sol_12.json', 'sol_13.json', 'sol_14.json', 'sol_15.json', 'sol_16.json', 'sol_17.json', 'sol_18.json', 'sol_19.json', 'sol_20.json', 'sol_21.json', 'sol_22.json', 'sol_23.json', 'sol_24.json', 'sol_25.json', 'sol_26.json', 'sol_27.json', 'sol_28.json', 'sol_29.json', 'sol_30.json']
data = []
for i in range(0 , 30):
    with open(array[i]) as f:
        for line in f:
            data.append(json.dumps(line))
        string = str(data)
        write_file()
