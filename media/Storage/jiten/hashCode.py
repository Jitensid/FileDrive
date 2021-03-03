from collections import defaultdict
from pprint import pprint
from math import ceil

graph = defaultdict(defaultdict)
streetMapping = defaultdict(tuple)
carsPath = defaultdict(list)

# initial input
duration, noOfIntersections, noStreets, noCars, carBonus = map(
    int, input().strip().split())

# streets
for _ in range(noStreets):
    start, end, name, timeLen = input().strip().split()

    start = int(start)
    end = int(end)
    timeLen = int(timeLen)

    graph[start][end] = (name, timeLen)
    # freq of use, queue count, isNextStop
    streetMapping[name] = [start, end, timeLen, 0, 0, 0]

# car paths
for _ in range(noCars):
    l = input().strip().split()
    streetMapping[l[1]][4] += 1
    if int(l[0]) == 2:
        streetMapping[l[1]][5] = 1

    carsPath[_] = l[1:]


for key, path in carsPath.items():
    for road in path:
        streetMapping[road][3] += 1


# pprint(graph)
# pprint(streetMapping)  # add que count
# pprint(carsPath)


ans = defaultdict(list)

for road, data in streetMapping.items():
    if data[3] > 0:  # freq weight
        # name, freq, initQue, isFirst
        ans[data[1]].append([road, data[3], data[4], data[5]])
    if data[3] > 0:
        ans[data[1]].sort(key=lambda x: (x[3], x[2]), reverse=True)

# pprint(ans)

###################################################################
FACTOR = 0.075

print(len(ans))
for key, data in ans.items():
    print(key)
    print(len(data))
    for schedule in data:
        print(
            f"{schedule[0]} {ceil(schedule[1]/streetMapping[schedule[0]][2] * FACTOR)}")
