#!/usr/bin/env python
import os
import json
import sys
import copy

sys.setrecursionlimit(10000000)

programVersion = 3
cytoidVersion = '2.0.2'
copyrightData = "Author Teages"

print("Version:", programVersion)
print("Support Cytoid Version:", cytoidVersion)
print(copyrightData)

programPath = os.path.abspath(sys.argv[0])
workPath = os.path.abspath(os.path.dirname(programPath) + os.path.sep + ".")

outputPath = ''
outputStoryBoard = ''
outputChart = ''

os.chdir(workPath)

chartFile = "jaja"
templateFile = "template.json"

if len(sys.argv) > 1:
    chartFile = sys.argv[1]
else:
    chartFile = "Chart.json"


# Load template.json
if not os.path.exists(templateFile):
    input("template.json NOT exist! Press ENTER to Contiune...")
    exit()

with open(templateFile, 'r', encoding="UTF-8") as f:
    print("Loading template.json from:", templateFile)
    print("If the program stoped, please check your json file is no commnt in it")
    template = json.loads(f.read())
print("Succcessfully loaded template.json from:", templateFile)

# Load Chart.json
if not os.path.exists(chartFile):
    input("Chart file NOT exist! Press ENTER to Contiune...")
    exit()

with open(chartFile, 'r', encoding="UTF-8") as f:
    chart = json.loads(f.read())
print("Succcessfully loaded chart from: "+chartFile)

# Load Settings.json
settingsFile = "Settings.json"
if not os.path.exists(settingsFile):
    input("Settings file NOT exist! Using default settings.")
else: 
    with open(settingsFile, 'r', encoding="UTF-8") as f:
        settings = json.loads(f.read())
    print("Succcessfully loaded settings from: "+settingsFile)



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
    if (i > 1000):
        print("Too many tempo changed, IT IS ABUSE.")
        input("Program STOP!")
        exit()
    if chart["tempo_list"][i]["tick"] != chart["tempo_list"][-1]["tick"]:
        tempoTimer(i+1)


tempoTimer(0)


# print(chart["tempo_list"])

storyboard = template


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


def newTextEvent(time, text, color, eventid, times, easings):
    if times != []:
        tmptip = 0
        while times[-1]["states"] != [] and times[-1]["states"][-1]["time"] > time:
            del times[-1]["states"][-1]
            tmptip = 1
        if tmptip == 1:
            times[-1]["states"] += [{'time': time -
                                     0.00000000002, 'opacity': 1}]
            times[-1]["states"] += [{'time': time -
                                     0.00000000001, 'opacity': 0, 'destory': True}]
    newTextValue = {'time': time, 'text': text, 'color': color, 'id': eventid}
    textEventBasic = storyboard["templates"]["eventText"]
    newText = dict(list(newTextValue.items()) +
                   copy.deepcopy(list(textEventBasic.items())))
    timep = time
    for state in newText["states"]:
        timep += state["add_time"]
        state["time"] = timep
        del state["add_time"]
    newTextL = {'time': time, 'target_id': eventid, 'template': "eventTextL"}
    times.append(newText)
    easings.append(newTextL)


def newSacnerColorEvent(time, color, events):
    # print("start",json.dumps(events))
    orgColor = "#FFFFFF"
    if events == []:
        events += [{'time': time, 'scanline_color': orgColor},
                   {'time': time+1, 'scanline_color': color},
                   {'time': time+4, 'scanline_color': color},
                   {'time': time+5, 'scanline_color': orgColor}]
    elif time > events[-1]['time']:
        events += [{'time': time, 'scanline_color': orgColor},
                   {'time': time+1, 'scanline_color': color},
                   {'time': time+4, 'scanline_color': color},
                   {'time': time+5, 'scanline_color': orgColor}]
    elif time > events[-2]['time']:  # 渐变时有新的变色
        del events[-1]
        events += [{'time': time+1, 'scanline_color': color},
                   {'time': time+4, 'scanline_color': color},
                   {'time': time+5, 'scanline_color': orgColor}]
    elif time > events[-3]['time']:
        del events[-1]
        del events[-1]
        events += [{'time': time, 'scanline_color': events[-1]['scanline_color']},
                   {'time': time+1, 'scanline_color': color},
                   {'time': time+4, 'scanline_color': color},
                   {'time': time+5, 'scanline_color': orgColor}]
    elif time > events[-4]['time']:
        # time > events[-4]['time']
        # print(events[-4]['time'])
        del events[-1]
        del events[-1]
        del events[-1]
        events += [{'time': time, 'scanline_color': events[-1]['scanline_color']},
                   {'time': time+1, 'scanline_color': color},
                   {'time': time+4, 'scanline_color': color},
                   {'time': time+5, 'scanline_color': None}]

    # print(json.dumps(events))


def hasstate(tstEvent, tststate):
    try:
        tstEvent[tststate]
    except:
        return False
    return True


def geteventlength(e):
    len = 0
    try:
        for s in e["states"]:
            try:
                len += s["add_time"]
            except:
                return len
    except:
        return 0
    return len


def edgelimiter(x):
    if x > 1.0:
        return 1.0
    elif x < 0.0:
        return 0.0
    else:
        return x


def newNoteController(noteEvents, id, y):
    newNoteCtrl = [{'note': id, 'time': 0,
                    'override_y': True, 'y': edgelimiter(y)}]
    noteEvents += newNoteCtrl


def newScannerPositionEvent(events, noteEvents, page, pageID, startTime, endTime, startTick, endTick, direction, scale, offset):
    pagelen = endTick - startTick
    pagetimelen = endTime - startTime
    if scale < 0:
        direction = -direction
        scale = -scale
    if scale == 0.0:
        center = 0.5 + offset / 2
        startPos = center
        endPos = center
    else:
        center = 0.5 + offset / 2
        startPos = center - direction * (scale / 2)
        endPos = center + direction * (scale / 2)
    endOut = endPos - edgelimiter(endPos)
    startOut = startPos - edgelimiter(startPos)
    if startPos != edgelimiter(startPos):
        events += [{'time': startTime + 1e-10, 'override_scanline_pos': True,
                    'scanline_pos': edgelimiter(startPos), 'page': page}]
        startOut = startPos - edgelimiter(startPos)
        startOutTick = startTick + abs(startOut) / scale * pagelen  # 结束出界的Tick
        startTime = ticktotime(startOutTick)
    events += [{'time': startTime + 1e-11, 'override_scanline_pos': True,
                'scanline_pos': edgelimiter(startPos), 'page': page}]
    # 检查页间变速
    # lastTempo = chart["tempo_list"][0]
    for thisTempo in chart["tempo_list"]:
        if thisTempo["tick"] == startTick:
            lastTempo = thisTempo
        elif thisTempo["tick"] > startTick and thisTempo["tick"] < endTick:
            tmpPos = ((thisTempo["tick"] - startTick) /
                pagelen * scale * direction + startPos)
            events += [{'time': thisTempo["time"], 'override_scanline_pos': True,
                        'scanline_pos':tmpPos, 'tempo':thisTempo}]
        elif thisTempo["tick"] > endTick:
            break
    if endPos != edgelimiter(endPos):
        # 算出出界时间
        endOutTick = endTick - abs(endOut) / scale * pagelen
        endOutTime = ticktotime(endOutTick)
        # 向上追溯
        while events[-1]["time"] > endOutTime:
            del event[-1]
        events += [{'time': endOutTime, 'override_scanline_pos': True,
                    'scanline_pos': edgelimiter(endPos)}]
    events += [{'time': endTime, 'override_scanline_pos': False,
                'scanline_pos': edgelimiter(endPos)}]
    for note in chart["note_list"]:
        if note["page_index"] == pageID:
            oy = (endTick - note["tick"])/pagelen
            if direction == -1:
                oy = 1 - oy
            y = edgelimiter((0.5 - oy) * scale + center)
            note['y'] = y
            newNoteController(noteEvents, note["id"], y)


def newscaleEvent(events, noteEvents, pageID, page):
    startTime = ticktotime(page["start_tick"])
    endTime = ticktotime(page["end_tick"])
    scale = page["PositionFunction"]["Arguments"][0]
    offset = page["PositionFunction"]["Arguments"][1]
    direction = page["scan_line_direction"]
    newScannerPositionEvent(events, noteEvents, page, pageID, startTime,
                            endTime, page["start_tick"], page["end_tick"], direction, scale, offset)


def newDownNoteClick(note, posevents, sprites):
    noteID = note["id"]
    noteX = note["x"]
    page = chart["page_list"][note["page_index"]]
    pagelen = page["end_tick"] - page["start_tick"]
    addtime = pagelen / chart["time_base"] / 3
    y2 = note["y"]
    if note["NoteDirection"] == 0:
        y1 = 420
    elif note["NoteDirection"] == 1:
        y1 = -420
    posevents += [{'id': "pos_down_" +
                   str(noteID), 'note': noteID, 'time': 0, 'opacity_multiplier': 0}]
    sprite = [{'path': storyboard["templates"]["downStyleClick"]["path"],
               'height': 17, 'layer': 2,
               'x':"noteX:"+str(noteX), 'y':y1, 'time':"start:"+str(noteID)+":-"+str(addtime), 'opacity':1,
               'states':[{'time': "start:"+str(noteID)+":-"+str(addtime), 'y': y1}, {'time': "start:"+str(noteID), 'y': "noteY:"+str(y2), 'destroy': True}]}]
    sprites += sprite


def newDownNoteDrag(note, posevents, sprites):
    noteID = note["id"]
    noteX = note["x"]
    page = chart["page_list"][note["page_index"]]
    pagelen = page["end_tick"] - page["start_tick"]
    addtime = pagelen / chart["time_base"] / 3
    y2 = note["y"]
    if note["NoteDirection"] == 0:
        y1 = 420
    elif note["NoteDirection"] == 1:
        y1 = -420
    posevents += [{'id': "pos_down_" +
                   str(noteID), 'note': noteID, 'time': 0, 'opacity_multiplier': 0}]
    sprite = [{'path': storyboard["templates"]["downStyleDrag"]["path"],
               'height': 17, 'layer': 2,
               'x':"noteX:"+str(noteX), 'y':y1, 'time':"start:"+str(noteID)+":-"+str(addtime), 'opacity':1,
               'states':[{'time': "start:"+str(noteID)+":-"+str(addtime), 'y': y1}, {'time': "start:"+str(noteID), 'y': "noteY:"+str(y2), 'destroy': True}]}]
    sprites += sprite

# 直接变化


def showScanline(events, tick):
    time = ticktotime(tick)
    events += [{'time': time + 1e-10,
                'scanline_opacity': events[-1]['scanline_opacity']}]
    events += [{'time': time + 1e-9, 'scanline_opacity': 1}]


def hideScanline(events, tick):
    time = ticktotime(tick)
    events += [{'time': time + 1e-10,
                'scanline_opacity': events[-1]['scanline_opacity']}]
    events += [{'time': time + 1e-9, 'scanline_opacity': 0}]


def showUI(events, tick):
    time = ticktotime(tick)
    events += [{'time': time + 1e-10, 'ui_opacity': events[-1]['ui_opacity']}]
    events += [{'time': time + 1e-9, 'ui_opacity': 1}]


def hideUI(events, tick):
    time = ticktotime(tick)
    events += [{'time': time + 1e-10, 'ui_opacity': events[-1]['ui_opacity']}]
    events += [{'time': time + 1e-9, 'ui_opacity': 0}]

# 缓入


def showScanlineE(events, tick):
    time = ticktotime(tick)
    addtime = 1.333
    if time <= events[-1]["time"]:
        time = events[-1]["time"] + 1e-10
    events += [{'time': time, 'scanline_opacity': events[-1]['scanline_opacity']}]
    events += [{'time': time + addtime, 'scanline_opacity': 1}]


def hideScanlineE(events, tick):
    time = ticktotime(tick)
    addtime = 1.333
    if time <= events[-1]["time"]:
        time = events[-1]["time"] + 1e-10
    events += [{'time': time, 'scanline_opacity': events[-1]['scanline_opacity']}]
    events += [{'time': time + addtime, 'scanline_opacity': 0}]


def showUIE(events, tick):
    time = ticktotime(tick)
    addtime = 1.333
    if time <= events[-1]["time"]:
        time = events[-1]["time"] + 1e-10
    events += [{'time': time, 'ui_opacity': events[-1]['ui_opacity']}]
    events += [{'time': time + addtime, 'ui_opacity': 1}]


def hideUIE(events, tick):
    time = ticktotime(tick)
    addtime = 1.333
    if time <= events[-1]["time"]:
        time = events[-1]["time"] + 1e-10
    events += [{'time': time, 'ui_opacity': events[-1]['ui_opacity']}]
    events += [{'time': time + addtime, 'ui_opacity': 0}]

# # 动画(Cytoid 更新前过渡)
# def showScanlineA(events,tick):

# def hideScanlineA(events,tick):

# def showUIA(events,tick):

# def hideUIA(events,tick):


print("Working... Please wait...")

# 生成 Text Event
scannerColorEvents = []
scannerPositionEvents = []
notePositionEvents = []
textEventTimes = []
textEventEasings = []
downSprites = []
uiEvents = []
uiEventsA = []
scannerHideEvents = []
for events in chart["event_order_list"]:
    time = ticktotime(events["tick"])
    for event in events["event_list"]:
        if event["type"] == 8:
            text = event["args"].split(",")[0]
            color = event["args"].split(",")[1]
            newTextEvent(time, text, color, "textEvent_" +
                         str(events["tick"]), textEventTimes, textEventEasings)
            # print("textEvent",time,"|",text,"|",color,"|")
            newSacnerColorEvent(time, color, scannerColorEvents)
        elif event["type"] == 0:
            color = "#D25669"
            newSacnerColorEvent(time, color, scannerColorEvents)
        elif event["type"] == 1:
            color = "#A0C8BF"
            newSacnerColorEvent(time, color, scannerColorEvents)

# 预处理note位置

for note in chart["note_list"]:
    pageStartTick = chart["page_list"][note["page_index"]]["start_tick"]
    pageEndTick = chart["page_list"][note["page_index"]]["end_tick"]
    pagelen = pageEndTick - pageStartTick
    note["y"] = (note["tick"] - pageStartTick) / pagelen


# 生成 Page Scale 及对应note变化

for pageID in range(0, len(chart["page_list"])):
    # print(chart["page_list"][pageID])
    if hasstate(chart["page_list"][pageID], "PositionFunction"):
        if (chart["page_list"][pageID]["PositionFunction"]["Type"] == 0 and
                chart["page_list"][pageID]["PositionFunction"]["Arguments"] != [1.0, 0.0]):
            newscaleEvent(scannerPositionEvents, notePositionEvents,
                          pageID, chart["page_list"][pageID])

# 生成下落式玩法

for note in chart["note_list"]:
    if note["type"] == 8:
        newDownNoteClick(note, notePositionEvents, downSprites)
    elif note["type"] == 9:
        newDownNoteDrag(note, notePositionEvents, downSprites)

### 生成UI变化: 以combo为全体ui
try:
    if chart["is_start_without_ui"] == True:
        uiEvents = [{'time': 0, 'ui_opacity': 0}]
        scannerHideEvents = [{'time': 0, 'scanline_opacity': 0}]
    else:
        uiEvents = [{'time': 0, 'ui_opacity': 1}]
        scannerHideEvents = [{'time': 0, 'scanline_opacity': 1}]
except:
    print("Start with UI.")

for events in chart["event_order_list"]:
    for event in events["event_list"]:
        if event["type"] == 2:  # 显示
            if '4' in event["args"]:  # Scanline
                showScanline(scannerHideEvents, events["tick"])
            if '0' in event["args"]:  # combo, 整个UI
                showUI(uiEvents, events["tick"])
        elif event["type"] == 3:  # 隐藏
            if '4' in event["args"]:  # Scanline
                hideScanline(scannerHideEvents, events["tick"])
            if '0' in event["args"]:  # combo, 整个UI
                hideUI(uiEvents, events["tick"])
        elif event["type"] == 4:  # 显示(缓入)
            if '4' in event["args"]:  # Scanline
                showScanlineE(scannerHideEvents, events["tick"])
            if '0' in event["args"]:  # combo, 整个UI
                showUIE(uiEvents, events["tick"])
        elif event["type"] == 5:  # 隐藏(缓出)
            if '4' in event["args"]:  # Scanline
                hideScanlineE(scannerHideEvents, events["tick"])
            if '0' in event["args"]:  # combo, 整个UI
                hideUIE(uiEvents, events["tick"])


# print(scannerPositionEvents)
# print(notePositionEvents)

# for page in chart["page_list"] //NO
print("--Finishing--")

print("Storyboarding...")

storyboard["texts"] += textEventTimes + textEventEasings
print("StoryBoard.Text Finished")

if scannerColorEvents != []:
    storyboard["controllers"] += [{'states': scannerColorEvents+[
        {'time': 0.0000000001+scannerColorEvents[-1]['time'], "scanline_color":None}]}]
print("StoryBoard.controllers Scanner Color Part.1 Finished")

if scannerPositionEvents != []:
    storyboard["controllers"] += [{'states': scannerPositionEvents}]
print("StoryBoard.controllers Part.2 PosFun Finished")

storyboard["note_controllers"] = notePositionEvents
print("StoryBoard.note_controllers Finished")

storyboard["sprites"] = downSprites
print("StoryBoard.sprites Finished")

if scannerHideEvents != []:
    storyboard["controllers"] += [{'states': scannerHideEvents}]
print("StoryBoard.controllers Part.3 Scanner Hide/Show Finished")

if uiEvents != []:
    storyboard["controllers"] += [{'states': uiEvents}]
print("StoryBoard.controllers Part.4 UI Finished")


# eventchecker()

print("Chart Cleaning...")
cleanedChart = copy.deepcopy(chart)

for page in cleanedChart["page_list"]:
    if hasstate(page, "PositionFunction"):
        del page["PositionFunction"]
for page in cleanedChart["tempo_list"]:
    del page["time"]
for note in cleanedChart["note_list"]:
    if note["type"] == 8:
        note["type"] = 0
    elif note["type"] == 9:
        note["type"] = 3
# for events in cleanedChart["event_order_list"]:
#     for event in events["event_list"]:
#         if not (event["type"] == 0 or event["type"] == 1):
#             del event
#     if events["event_list"] == []:
#         del events
# for events in range(0, len(cleanedChart["event_order_list"]) -1):
#     for event in range(0, len(cleanedChart["event_order_list"][events]["event_list"]) -1):
#         if not (cleanedChart["event_order_list"][events]["event_list"][event]["type"] == 0
#                 or cleanedChart["event_order_list"][events]["event_list"][event]["type"] == 1):
#             del cleanedChart["event_order_list"][events]["event_list"][event]
#     if cleanedChart["event_order_list"][events]["event_list"] == []:
#         del cleanedChart["event_order_list"][events]

cleanedChart["event_order_list"] = []
for events in chart["event_order_list"]:
    cleanedEvent = {'tick':-1, 'event_list':[]}
    for event in events["event_list"]:
        if event["type"] == 1 or event["type"] == 0:
            cleanedEvent["tick"] = events["tick"]
            cleanedEvent["event_list"] += [event]
    if cleanedEvent["tick"] != -1:
        cleanedChart["event_order_list"] += copy.deepcopy([cleanedEvent])

# print(json.dumps(storyboard))

try:
    outputPath = settings["Output"]["path"]
    try:
        outputChart = "./" + outputPath + "/" + settings["Output"]["Chart"]
    except:
        outputChart = './out/Chart.json'
    try:
        outputStoryBoard = "./" + outputPath + "/" + settings["Output"]["StoryBoard"]
    except:
        outputStoryBoard = './out/Storyboard.json'
except:
    outputPath = 'out'
    outputChart = './out/Chart.json'
    outputStoryBoard = './out/Storyboard.json'
    


if outputPath == '':
    outputPath = 'out'
if outputChart == '':
    outputChart = './out/Chart.json'
if outputStoryBoard == '':
    outputStoryBoard = './out/Storyboard.json'

print("Will output files to the folder: "+outputPath)
if not os.path.exists(outputPath):
    os.makedirs(outputPath)

isOR = 'Y'
allowYN = ["Y", 'y', 'n', 'N', '']
if os.path.exists(outputChart) or os.path.exists(outputStoryBoard):
    isOR = input("Chart or StoryBoard File exists. Override?[y/N]: ")
    while not isOR in allowYN:
        isOR = input("Chart or StoryBoard File exists. Override?[y/N]: ")

if isOR == 'y' or isOR == 'Y':
    with open(outputStoryBoard, 'wt') as f:
        print(json.dumps(storyboard), file=f)
        print("Succcessfully output StoryBoard file to:", outputStoryBoard)
    with open(outputChart, 'wt') as f:
        print(json.dumps(cleanedChart), file=f)
        print("Succcessfully output Chart file to:", outputChart)
else:
    print("!!!DID NOTHING!!!")

input("Finished. Press enter to contiune...")
