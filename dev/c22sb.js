/*!

C2v3 to StoryBoard vBeta - A JavaScript for convert Cytus II Chart to Cytoid StoryBoard

(c) 2021 Teages <teages [at] teages.xyz>
JavaScript File licenced under the GPLv3. See https://github.com/Teages/C2v3-to-StoryBoard/blob/javascript/LICENSE.

defDownClickIMG and defDownDragIMG is under CC BY NC 4.0 license.

*/

// CC BY NC 4.0
const defDownClickIMG = "iVBORw0KGgoAAAANSUhEUgAAAIYAAAATCAMAAABiDIVTAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGBQTFRFAAAA////////////S7H/Naf/////////////6fX/h8v/O6n/////ntX/PKr/////////1e3/RK3/////////////////////wOT/N6j/Ra7/ltH//f7/////tt//v+P/EOrXnwAAACB0Uk5TACvV////FaHt////av//Oez//4492nrz//////+Z//8F9w01AAAAuElEQVR4nM2WxxKFIAxFVYy99+7//6X6SNjKW5jJ3cGkHO7QHEeQXE+hfGCRT/0810AEYaTn4iTloQBIk1j3jMIAMTJCywsuCoAip66ZpigrHNcNHwVAU2PbqvxhtMYMTgoAY0f7UHQ9mcG0PUk+2dF3N8Yw4miabZKXdVMv2tbFptI8Yfw43Bg7ZR9WazjfIB6dVqUOCt//x7ChUOpzjK/cELI3hJwUIfeGlFtUyJsi5YUV8t8QoAtT1S3D/z5gZQAAAABJRU5ErkJggg=="
const defDownDragIMG = "iVBORw0KGgoAAAANSUhEUgAAAGUAAAATCAMAAAC+2TMhAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAMlQTFRFAAAA////////////T+ipOeWe////////////6fz0ivDFPuah////n/LQQOahO+WfPeWgQeai////////1vrrSOelWemucuy6kfHJlfHLf+7AWumu////ZOuzzvnn/f/+8v350Pnofe6/////////OuWeXOqv+P78kPDJ////////wvfhg+/C7P32w/fiSuem////uPbcTeiovPbe+/793/vvYeqxUeiqyvjl5PzyaOu1vfbfiO/FXeqw1/rslPHKde270/np1Pnq+2SKhQAAAEN0Uk5TACvV////FaHt////av//////Oez//////////47///////892v////968///////mf///////////////////////1RmsvEAAAD6SURBVHicvZXHFoJADEUVGRBREAF774AN7L38/0eJkmHhJmc8OtkN5yWXR5IhkeAXSSEFIZJfhEjLCcmYIcnp6JmSUX8CIUTNKFHJtCwBJUvJOQ1N1/Oaoeo4RsvRotkIUjDhbNlocr5YKleqNQPH2BZUNQtvSj22guc2mkor1e50cSWJzdRfkF6fWkE7PxjCC47G+EcTqZl+L6Q4Lpw8NNOYTEE7m6MU3QOt64SUBXXmo4nBcgXa9QYVE58WXrBRtjuq3R/+RwmOrW+9sPTl1AbtjrUvLDN2vsCMXVlnjGlfbvfXvjwquPJjXzjtPp97jNOdzOf/8v94ApSvLZQmDgWEAAAAAElFTkSuQmCC"
// CC BY NC 4.0


const defTempStoryBoard = {
    "templates": {
        "eventText": {
            "size": 20,
            "opacity": 1,
            "y": "noteY:-0.05",
            "x": 0,
            "layer": 2,
            "order": 100,
            "letter_spacing": 0,
            "states": [
                {
                    "add_time": 0,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1,
                    "commit": "end show text"
                },
                {
                    "add_time": 0.673,
                    "opacity": 1,
                    "commit": "start hide text"
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                },
                {
                    "add_time": 0.0001,
                    "opacity": 1
                },
                {
                    "add_time": 0.033,
                    "opacity": 1
                },
                {
                    "add_time": 0.0001,
                    "opacity": 0
                },
                {
                    "add_time": 0.033,
                    "opacity": 0
                }
            ]
        },
        "eventTextL": {
            "states": [
                {
                    "easing": "easeInQuint",
                    "add_time": 0,
                    "letter_spacing": 0
                },
                {
                    "add_time": 1.333,
                    "letter_spacing": 100
                }
            ]
        },
        "downStyleClick": {
            "path": "DownClick.png"
        },
        "downStyleDrag": {
            "path": "DownDrag.png"
        }
    },
    "texts": [],
    "sprites": [],
    "controllers": [],
    "note_controllers": []
}

console.log("C22SB: DEVELPOER VERSION")

function c22sb(inputChart, tempStoryBoard = defTempStoryBoard) {
    let orginalChart = deepcopy(inputChart)
    let cleanedChart = {
        format_version: 1,
        time_base: 480,
        start_offset_time: 0.0,
        page_list: [],
        tempo_list: [],
        event_order_list: [],
        note_list: []
    }
    let StoryBoard = deepcopy(tempStoryBoard)

    /* Chart preloader Start*/
    // tick to time pre load
    for (tempo_p in orginalChart.tempo_list) {
        if (tempo_p == 0) {
            orginalChart.tempo_list[tempo_p].time = 0
        } else {
            orginalChart.tempo_list[tempo_p].time =
                orginalChart.tempo_list[tempo_p - 1].time +
                (orginalChart.tempo_list[tempo_p].tick - orginalChart.tempo_list[tempo_p - 1].tick) *
                (orginalChart.tempo_list[tempo_p - 1].value / 1000000 / orginalChart.time_base)
        }
    }
    /* Chart preloader End*/

    // Text event
    let textEvents = [], textEventLs = []
    for (let events_p in orginalChart.event_order_list) {
        let time = tickToTime(orginalChart.event_order_list[events_p].tick)
        for (let event_p in orginalChart.event_order_list[events_p].event_list) {
            let event = orginalChart.event_order_list[events_p].event_list[event_p]
            if (event.type == 8) {
                let text = event.args.split(",")[0]
                let color = event.args.split(",")[1]
                let id = "eventText_" + String(events_p) + "_" + String(event_p)
                let newEvents = [Object.assign({
                    id: id,
                    time: time,
                    text: text,
                    color: color
                }, StoryBoard.templates.eventText),
                Object.assign({
                    time: time,
                    target_id: id
                }, StoryBoard.templates.eventTextL)]
                // translate add_time to time
                let tmptime = time
                for (let state_p in newEvents[0].states) {
                    tmptime += newEvents[0].states[state_p].add_time
                    newEvents[0].states[state_p].time = tmptime
                }
                newEvents[0] = deepcopy(newEvents[0])
                for (let state_p in newEvents[0].states) {
                    delete newEvents[0].states[state_p].add_time
                }
                // check last one
                let last = textEvents.pop()
                if (last != null) {
                    while (last.states[last.states.length - 1].time > time) {
                        last.states.pop()
                    }
                    last.states.push({
                        time: time - 0.00001,
                        opacity: last.states[last.states.length - 1].opacity
                    })
                    last.states.push({
                        time: time,
                        opacity: 0
                    })
                    textEvents.push(last)
                }
                // push
                textEvents.push(newEvents[0])
                textEventLs.push(newEvents[1])
            }
        }
    }
    StoryBoard.texts.push.apply(StoryBoard.texts, textEvents)
    StoryBoard.texts.push.apply(StoryBoard.texts, textEventLs)

    // UI event
    let UIEvents = [], ScanlineUIEvents = [], ScanlineColorEvents = []
    if (orginalChart.hasOwnProperty('is_start_without_ui') && orginalChart.is_start_without_ui) {
        UIEvents.push({
            time: 0,
            ui_opacity: 0
        })
        ScanlineUIEvents.push({
            time: 0,
            scanline_opacity: 0
        })
    } else {
        UIEvents.push({
            time: 0,
            ui_opacity: 1
        })
        ScanlineUIEvents.push({
            time: 0,
            scanline_opacity: 1
        })
    }
    for (let events_p in orginalChart.event_order_list) {
        let time = tickToTime(orginalChart.event_order_list[events_p].tick)
        for (let event_p in orginalChart.event_order_list[events_p].event_list) {
            let event = orginalChart.event_order_list[events_p].event_list[event_p]
            let UIStart = Math.max(time, UIEvents[UIEvents.length - 1].time)
            let ScanlineStart = Math.max(time, ScanlineUIEvents[ScanlineUIEvents.length - 1].time)
            switch (event.type) {
                case 0:
                    newScanlineColor(time,"#D25669",ScanlineColorEvents)
                    break;
                case 1:
                    newScanlineColor(time,"#A0C8Bf",ScanlineColorEvents)
                    break;
                case 2:
                    // show UI
                    // UI
                    if (event.args.indexOf(0) >= 0) {
                        UIEvents.push.apply(UIEvents, [
                            {
                                time: UIStart,
                                ui_opacity: UIEvents[UIEvents.length - 1].ui_opacity
                            },
                            {
                                time: UIStart,
                                ui_opacity: 1
                            }
                        ])
                    }
                    // Scanline
                    if (event.args.indexOf(4) >= 0) {
                        ScanlineUIEvents.push.apply(ScanlineUIEvents, [
                            {
                                time: ScanlineStart,
                                scanline_opacity: ScanlineUIEvents[ScanlineUIEvents.length - 1].scanline_opacity
                            },
                            {
                                time: ScanlineStart,
                                scanline_opacity: 1
                            }
                        ])
                    }
                    break
                case 3:
                    // hide UI
                    // UI
                    if (event.args.indexOf(0) >= 0) {
                        UIEvents.push.apply(UIEvents, [
                            {
                                time: UIStart,
                                ui_opacity: UIEvents[UIEvents.length - 1].ui_opacity
                            },
                            {
                                time: UIStart,
                                ui_opacity: 0
                            }
                        ])
                    }
                    // Scanline
                    if (event.args.indexOf(4) >= 0) {
                        ScanlineUIEvents.push.apply(ScanlineUIEvents, [
                            {
                                time: ScanlineStart,
                                scanline_opacity: ScanlineUIEvents[ScanlineUIEvents.length - 1].scanline_opacity
                            },
                            {
                                time: ScanlineStart,
                                scanline_opacity: 0
                            }
                        ])
                    }
                    break
                case 4:
                    // show UI gradually
                    // UI
                    if (event.args.indexOf(0) >= 0) {
                        UIEvents.push.apply(UIEvents, [
                            {
                                time: UIStart,
                                ui_opacity: UIEvents[UIEvents.length - 1].ui_opacity
                            },
                            {
                                time: UIStart + 1.333,
                                ui_opacity: 1
                            }
                        ])
                    }
                    // Scanline
                    if (event.args.indexOf(4) >= 0) {
                        ScanlineUIEvents.push.apply(ScanlineUIEvents, [
                            {
                                time: ScanlineStart,
                                scanline_opacity: ScanlineUIEvents[ScanlineUIEvents.length - 1].scanline_opacity
                            },
                            {
                                time: ScanlineStart + 1.333,
                                scanline_opacity: 1
                            }
                        ])
                    }
                    break
                case 5:
                    // hide UI gradually
                    // UI
                    if (event.args.indexOf(0) >= 0) {
                        UIEvents.push.apply(UIEvents, [
                            {
                                time: UIStart,
                                ui_opacity: UIEvents[UIEvents.length - 1].ui_opacity
                            },
                            {
                                time: UIStart + 1.333,
                                ui_opacity: 0
                            }
                        ])
                    }
                    // Scanline
                    if (event.args.indexOf(4) >= 0) {
                        ScanlineUIEvents.push.apply(ScanlineUIEvents, [
                            {
                                time: ScanlineStart,
                                scanline_opacity: ScanlineUIEvents[ScanlineUIEvents.length - 1].scanline_opacity
                            },
                            {
                                time: ScanlineStart + 1.333,
                                scanline_opacity: 0
                            }
                        ])
                    }
                    break
                case 6:
                    // not support for now
                    break
                case 7:
                    // not support for now
                    break
                case 8:
                    newScanlineColor(time,event.args.split(",")[1],ScanlineColorEvents)
                    break
                default:
                    break
            }
        }
    }
    StoryBoard.controllers.push({
        comment: "Scanline UI Events",
        states: deepcopy(ScanlineUIEvents)
    })
    StoryBoard.controllers.push({
        comment: "Scanline Color Events",
        states: deepcopy(ScanlineColorEvents)
    })
    StoryBoard.controllers.push({
        comment: "Other UI Events",
        states: deepcopy(UIEvents)
    })

    // Position Function
    let ScanlineController = []
    for (page_p in orginalChart.page_list) {
        let page = orginalChart.page_list[page_p]
        if (page.hasOwnProperty('PositionFunction') && page.PositionFunction.Type == 0 &&
            !(page.PositionFunction.Arguments[0] == 1 && page.PositionFunction.Arguments[1] == 0)) {
            if (page.PositionFunction.Arguments[0] == 0) {
                let start_time = tickToTime(page.start_tick)
                let end_time = tickToTime(page.end_tick)

                let stop_pos = (page.PositionFunction.Arguments[1] + 1) / 2
                if (stop_pos > 1) stop_pos = 1
                if (stop_pos < 0) stop_pos = 0

                ScanlineController.push({
                    time: start_time,
                    override_scanline_pos: true,
                    scanline_pos: stop_pos
                })
                ScanlineController.push({
                    time: end_time,
                    override_scanline_pos: false,
                    scanline_pos: stop_pos,
                    comment: "is_" + page_p + "_scanline-stop"
                })
            } else {
                // three parts
                let start_time = tickToTime(page.start_tick)
                let end_time = tickToTime(page.end_tick)
                let direction = page.scan_line_direction
                let page_length = page.end_tick - page.start_tick

                let scale = page.PositionFunction.Arguments[0]
                let offset = page.PositionFunction.Arguments[1]
                if (scale < 0) {
                    direction = -direction
                    scale = -scale
                }

                let start_pos = ((-1 * scale + offset) + 1) / 2
                let end_pos = ((1 * scale + offset) + 1) / 2

                let bottom_size = 0 - start_pos
                if (bottom_size < 0) bottom_size = 0
                let top_size = end_pos - 1
                if (top_size < 0) top_size = 0

                let before_size, after_size
                if (direction == 1) {
                    before_size = bottom_size
                    after_size = top_size
                } else if (direction == -1) {
                    before_size = top_size
                    after_size = bottom_size
                }

                // before
                if (before_size > 0) {
                    ScanlineController.push({
                        time: start_time,
                        override_scanline_pos: true,
                        scanline_pos: (direction > 0 ? 0 : 1)
                    })
                    ScanlineController.push({
                        time: tickToTime(page.start_tick + page_length * before_size),
                        override_scanline_pos: false,
                        scanline_pos: (direction > 0 ? 0 : 1),
                        comment: "is_" + page_p + "_before"
                    })
                }
                // in-page
                if (before_size + after_size < 1) {
                    let in_top_pos = (start_pos >= 0 ? (start_pos <= 1 ? start_pos : 1) : 0)
                    let in_bottom_pos = (end_pos >= 0 ? (end_pos <= 1 ? end_pos : 1) : 0)
                    ScanlineController.push({
                        time: tickToTime(page.start_tick + page_length * before_size),
                        override_scanline_pos: true,
                        scanline_pos: (direction > 0 ? in_top_pos : in_bottom_pos)
                    })
                    // IF TEMPO CHANGED
                    for (tempo_p in orginalChart.tempo_list) {
                        let tempo = orginalChart.tempo_list[tempo_p]
                        let start_tick = page.start_tick + page_length * before_size
                        let end_tick = page.end_tick - page_length * after_size
                        if (tempo.tick > page.start_tick && tempo.tick < page.end_tick) {
                            let start_pos = (direction > 0 ? in_top_pos : in_bottom_pos)
                            let end_pos = (direction > 0 ? in_bottom_pos : in_top_pos)
                            let tempo_pos = start_pos + direction * Math.abs(end_pos - start_pos) * ((tempo.tick - start_tick)/(end_tick - start_tick))
                            ScanlineController.push({
                                time: tickToTime(tempo.tick),
                                scanline_pos: tempo_pos
                            })
                        }
                    }
                    ScanlineController.push({
                        time: tickToTime(page.end_tick - page_length * after_size),
                        override_scanline_pos: false,
                        scanline_pos: (direction > 0 ? in_bottom_pos : in_top_pos),
                        comment: "is_" + page_p + "_in-page"
                    })
                }
                // after
                if (after_size > 0) {
                    ScanlineController.push({
                        time: tickToTime(page.end_tick - page_length * after_size),
                        override_scanline_pos: true,
                        scanline_pos: (direction > 0 ? 1 : 0)
                    })
                    ScanlineController.push({
                        time: end_time,
                        override_scanline_pos: false,
                        scanline_pos: (direction > 0 ? 1 : 0),
                        comment: "is_" + page_p + "_after"
                    })
                }
            }
        }
    }
    StoryBoard.controllers.push({
        comment: "Position Function",
        states: deepcopy(ScanlineController)
    })

    // Notes in Position Function 
    let noteControllers = []
    for (note_p in orginalChart.note_list) {
        let note = orginalChart.note_list[note_p]
        let page = orginalChart.page_list[note.page_index]
        if (page.hasOwnProperty('PositionFunction') && page.PositionFunction.Type == 0 &&
            !(page.PositionFunction.Arguments[0] == 1 && page.PositionFunction.Arguments[1] == 0)) {
            // if posfun used
            let direction = page.scan_line_direction
            
            let scale = page.PositionFunction.Arguments[0]
            let offset = page.PositionFunction.Arguments[1]
            if (scale < 0) {
                direction = -direction
                scale = -scale
            }

            let start_pos = ((-1 * scale + offset) + 1) / 2 // bottom pos
            let end_pos = ((1 * scale + offset) + 1) / 2 // top pos

            let y = start_pos + (end_pos - start_pos) * ((note.tick - page.start_tick) / (page.end_tick - page.start_tick))
            if (direction < 0) {
                y = (end_pos - y) + start_pos
            }
            orginalChart.note_list[note_p].y = Math.min(1, Math.max(0, y))

            noteControllers.push({
                'note': note.id,
                'time': 0,
                'override_y': true,
                'y': orginalChart.note_list[note_p].y
            })
        } else {
            let y = (note.tick - page.start_tick) / (page.end_tick - page.start_tick)
            if (page.scan_line_direction < 0) {
                y = 1 - y
            }
            orginalChart.note_list[note_p].y = y
        }
    }


    // Dropping notes
    let dropnotes = []
    for (note_p in orginalChart.note_list) {
        let note = orginalChart.note_list[note_p]
        let page = orginalChart.page_list[note.page_index]
        if (note.type == 8 || note.type == 9) {
            noteControllers.push({
                'id': "pos_down_" + String(note.id),
                'note': note.id,
                'time': 0,
                'opacity_multiplier': 0
            })
            let addtime = (page.end_tick - page.start_tick) / orginalChart.time_base / 3
            if (note.type == 8) {
                let start_y = ((note.hasOwnProperty('NoteDirection') && note.NoteDirection == 1) ? -420 : 420)
                dropnotes.push({
                    path: StoryBoard.templates.downStyleClick.path,
                    height: 17,
                    layer: 2,
                    x: "noteX:" + String(note.x),
                    y: start_y,
                    time: "start:" + String(note.id) + ":-" + String(addtime),
                    opacity: 1,
                    states: [
                        {
                            time: "start:" + String(note.id) + ":-" + String(addtime),
                            y: start_y
                        },
                        {
                            time: "start:" + String(note.id),
                            y: "noteY:" + String(note.y),
                            destroy: true
                        }
                    ]
                })
            } else if (note.type == 9) {
                let start_y = ((note.hasOwnProperty('NoteDirection') && note.NoteDirection == 1) ? -420 : 420)
                dropnotes.push({
                    path: StoryBoard.templates.downStyleDrag.path,
                    height: 17,
                    layer: 2,
                    x: "noteX:" + String(note.x),
                    y: start_y,
                    time: "start:" + String(note.id) + ":-" + String(addtime),
                    opacity: 1,
                    states: [
                        {
                            time: "start:" + String(note.id) + ":-" + String(addtime),
                            y: start_y
                        },
                        {
                            time: "start:" + String(note.id),
                            y: "noteY:" + String(note.y),
                            destroy: true
                        }
                    ]
                })
            }
        }
    }
    StoryBoard.sprites.push.apply(StoryBoard.sprites, deepcopy(dropnotes))

    StoryBoard.note_controllers.push.apply(StoryBoard.note_controllers, deepcopy(noteControllers))


    function newScanlineColor(time, color, cEvents) {
        let white = "#FFFFFF"
        if (cEvents.length === 0 || time >= cEvents[cEvents.length - 1].time) {
            cEvents.push.apply(cEvents, [
                { time: time, scanline_color: white },
                { time: time + 1, scanline_color: color },
                { time: time + 4, scanline_color: color },
                { time: time + 5, scanline_color: white }
            ])
            return;
        } else {
            for (let event_p = 0; event_p < cEvents.length; event_p++) {
                if (time >= cEvents[event_p].time && time < cEvents[event_p+1].time) {
                    let translateScale = (time - cEvents[event_p].time) / (cEvents[event_p + 1].time - cEvents[event_p].time)
                    let lastColorRGB = hexToRgb(cEvents[event_p].scanline_color);
                    let nextColorRGB = hexToRgb(cEvents[event_p+1].scanline_color);
                    let middleColor = rgbToHex(
                        Math.abs(Math.min(lastColorRGB.r, nextColorRGB.r) + Math.abs(lastColorRGB.r - nextColorRGB.r)*translateScale),
                        Math.abs(Math.min(lastColorRGB.g, nextColorRGB.g) + Math.abs(lastColorRGB.g - nextColorRGB.g)*translateScale),
                        Math.abs(Math.min(lastColorRGB.b, nextColorRGB.b) + Math.abs(lastColorRGB.b - nextColorRGB.b)*translateScale)
                    )
                    cEvents.splice(event_p+1)
                    cEvents.push.apply(cEvents, [
                        { time: time, scanline_color: middleColor },
                        { time: time + 1, scanline_color: color },
                        { time: time + 4, scanline_color: color },
                        { time: time + 5, scanline_color: white }
                    ])
                    return;
                }
            }
        }
        // thank https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function hexToRgb(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1,7);
        }

    }
    function cleanChart() {
        cleanedChart.time_base = inputChart.time_base
        cleanedChart.start_offset_time = inputChart.start_offset_time
        for (let tempo_p in inputChart.tempo_list) {
            cleanedChart.tempo_list.push({
                tick: inputChart.tempo_list[tempo_p].tick,
                value: inputChart.tempo_list[tempo_p].value
            })
        }
        for (let page_p in inputChart.page_list) {
            cleanedChart.page_list.push({
                start_tick: inputChart.page_list[page_p].start_tick,
                end_tick: inputChart.page_list[page_p].end_tick,
                scan_line_direction: inputChart.page_list[page_p].scan_line_direction,
            })
        }
        for (let note_p in inputChart.note_list) {
            let newNote = {
                page_index: inputChart.note_list[note_p].page_index,
                type: inputChart.note_list[note_p].type,
                id: inputChart.note_list[note_p].id,
                tick: inputChart.note_list[note_p].tick,
                x: inputChart.note_list[note_p].x,
                has_sibling: inputChart.note_list[note_p].has_sibling,
                hold_tick: inputChart.note_list[note_p].hold_tick,
                next_id: inputChart.note_list[note_p].next_id,
                is_forward: inputChart.note_list[note_p].is_forward,
                approach_rate: inputChart.note_list[note_p].approach_rate
            }
            if (newNote.type == 8) {
                newNote.type = 0
            } else if (newNote.type == 9) {
                newNote.type = 3
            }
            cleanedChart.note_list.push(newNote)
        }
        for (let events_p in inputChart.event_order_list) {
            let newEvents = deepcopy(inputChart.event_order_list[events_p])
            for (let event_p = 0; event_p < newEvents.event_list.length; event_p++) {
                let event = newEvents.event_list[event_p]
                if (event.type != 0 && event.type != 1) {
                    newEvents.event_list.splice(event_p, 1)
                    event_p--
                }
            }
            if (!(newEvents.event_list.length === 0)) {
                cleanedChart.event_order_list.push(newEvents)
            }
        }
        return cleanedChart
    }
    function tickToTime(tick) {
        let tempo = 0, time = 0, relativeTick = 0
        for (tempo_p in orginalChart.tempo_list) {
            if (tick < orginalChart.tempo_list[tempo_p].tick) {
                break
            }
            else {
                tempo = orginalChart.tempo_list[tempo_p].value
                time = orginalChart.tempo_list[tempo_p].time
                relativeTick = tick - orginalChart.tempo_list[tempo_p].tick
            }
        }
        return time + relativeTick * tempo / 1000000 / orginalChart.time_base
    }
    function deepcopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
    return {
        chart: cleanChart(),
        StoryBoard: StoryBoard
    }
}
