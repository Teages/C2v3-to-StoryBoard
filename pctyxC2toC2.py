#!/usr/bin/env python
import os
import json
import sys
import copy

programVersion = 1
cylVersion = '1.0+'
copyrightData = "作者 Teages, 程序处于技术测试阶段, 不允许未经授权传播"

print("Version:", programVersion)
print("Support Cylheim Version:", cylVersion)
print(copyrightData)

programPath = os.path.abspath(sys.argv[0])
workPath = os.path.abspath(os.path.dirname(programPath) + os.path.sep + ".")

outputPath = './'
outputStoryBoard = ''
outputChart = ''

os.chdir(workPath)

chartFile = "jaja"
templateFile = "template.json"

if len(sys.argv) > 1:
    chartFile = sys.argv[1]
else:
    chartFile = "Chart.json"


# Load Chart.json
if not os.path.exists(chartFile):
    input("Chart file NOT exist! Press ENTER to Contiune...")
    exit()

with open(chartFile, 'r', encoding="UTF-8") as f:
    chart = json.loads(f.read())
print("Succcessfully loaded chart from: "+chartFile)



def getTempotick(temple):
    return temple["tick"]

chart["tempo_list"].sort(key=getTempotick)

# 计算每个tempo的起始时间
def tempoTimer(i):
    if chart["tempo_list"][i]["tick"] == 0:
        chart["tempo_list"][i]["time"] = 0
    else:
        chart["tempo_list"][i]["time"] = (chart["tempo_list"][i-1]["time"] +
            (chart["tempo_list"][i]["tick"] - chart["tempo_list"][i-1]["tick"]) *
            chart["tempo_list"][i-1]["value"] / 1000000 / chart["time_base"])
    if chart["tempo_list"][i]["tick"] != chart["tempo_list"][-1]["tick"]:
        tempoTimer(i+1)

tempoTimer(0)


# print(chart["tempo_list"])

def gettempo(tick):
    lastTempo = chart["tempo_list"][0]
    for this in chart["tempo_list"]:
        if this["tick"] == tick:
            return this["time"], this["tick"], this["value"]
        elif this["tick"] > tick:
            return lastTempo["time"], lastTempo["tick"], lastTempo["value"]
        lastTempo = copy.deepcopy(this)
    return lastTempo["time"], lastTempo["tick"], lastTempo["value"]


def ticktotime(tick):
    startTime, startTick, tempo = gettempo(tick)
    return startTime + (tick - startTick) * tempo / 1000000 / chart["time_base"]

def tickTran(oldTick):
    newTick = oldTick * 2 - 960
    if newTick < 0:
        newTick = 0
    return newTick

if (120 / chart["music_offset"]) - (120000000 / chart["tempo_list"][0]["value"]) > 0.001:
    input("The Chart is not supported. Press ENTER to force contiune...")

cleanedChart = ({
    "format_version":1,
    "time_base": 480,
    "start_offset_time": 0.0,
    "page_list":[],
    "tempo_list":[],
    "event_order_list":[],
    "note_list":[]
})

for timer in chart["tempo_list"]:
    newTImer = ({
        "tick": tickTran(timer["tick"]),
        "value": int(timer["value"] / 2)
    })
    cleanedChart["tempo_list"] += copy.deepcopy([newTImer])

lastTick = 0
for page in chart["page_list"]:
    if page["start_tick"] == 0:
        continue
    newPage = ({
        "start_tick": tickTran(page["start_tick"]),
        "end_tick": tickTran(page["end_tick"]),
        "scan_line_direction": page["scan_line_direction"],
    })
    if page["start_tick"] < 0:
        newPage["start_tick"] = lastTick
        newPage["PositionFunction"] = ({
            "Type": 0,
            "Arguments": [
                0.0,
                1.0 * page["scan_line_direction"]
            ]
        })
    else:
        newPage["PositionFunction"] = ({
            "Type": 0,
            "Arguments": [
                1.0,
                0.0
            ]
        })
    lastTick = newPage["end_tick"]
    cleanedChart["page_list"] += copy.deepcopy([newPage])

for note in chart["note_list"]:
    newNote=({
        "page_index": note["page_index"] -1,
        "type": note["type"],
        "id": note["id"],
        "tick": tickTran(note["tick"]),
        "x": note["x"],
        "has_sibling": note["has_sibling"],
        "hold_tick": note["hold_tick"] * 2,
        "next_id": note["next_id"],
        "is_forward": False
    })
    if (note["tick"] + 1) % 480 == 0:
        newNote["tick"] = tickTran(note["tick"] + 1)
        # newNote["is_forward"] == True
    cleanedChart["note_list"] += copy.deepcopy([newNote])

for event in chart["event_order_list"]:
    newEvent=({
        "tick": tickTran(event["tick"]),
        "event_list": copy.deepcopy(event["event_list"])
    })
    cleanedChart["event_order_list"] += copy.deepcopy([newEvent])

outputChart = './C2v3Chart.json'

print("Will output files to the folder: "+outputPath)
if not os.path.exists(outputPath):
    os.makedirs(outputPath)

isOR = 'Y'
allowYN = ["Y", 'y', 'n', 'N', '']
if os.path.exists(outputChart):
    isOR = input("Chart File exists. Override?[y/N]: ")
    while not isOR in allowYN:
        isOR = input("Chart File exists. Override?[y/N]: ")

if isOR == 'y' or isOR == 'Y':
    with open(outputChart, 'wt') as f:
        print(json.dumps(cleanedChart), file=f)
        print("Succcessfully output Chart file to:", outputChart)
else:
    print("!!!DID NOTHING!!!")

input("Finished. Press enter to contiune...")
