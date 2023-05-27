import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from "../Home/style.module.css"
import * as ai from "react-icons/ai"
import * as fa from "react-icons/fa"
import { useState } from 'react';
import { v4 as newGuid } from "uuid"

interface IProps {
    wss: WebSocket
}

interface IPort {
    UID: string
    Name: string
    Value: number
}

interface IRoom {
    UID: string
    ContainerImage: string
    ContainerParam: string
    ContainerPorts: IPort[]
    MatchTimeout: number
    MaxUser: number
    MinUser: number
    Mode: string
    ContainerRam: number
    ContainerCpu: number
}

export default function Root({ wss }: IProps) {

    function print(message: string, timeout = 5000) {
        setErrorMessage(message)
        setTimeout(() => {
            if (errorMessage == message || errorMessage == "") setErrorMessage("")
        }, timeout)
    }

    wss.onopen = _ => {
        print("Connected")
        wss.send(JSON.stringify({ sisma: "ROOM_GETALL" }))

        setTimeout(() => {
            setInterval(() => {
                // sync user
                wss.send(JSON.stringify({ sisma: "USER_GETALL" }))
                // sync matches
                wss.send(JSON.stringify({ sisma: "MATCH_GETALL" }))
            }, 5000 /*5s*/)
        })
    }

    wss.onclose = _ => {
        print("Disconnected")
        window.location.href = "/"
    }

    wss.onmessage = (e) => {
        const data = JSON.parse(e.data);

        const { sisma } = data;

        if (sisma == "AUTH_USER") {
            // connected as user, redirect to main page. only admin
            window.location.href = "/"
        }
        else if (sisma == "ROOM_GETALL.RESULT") {
            const { error, rooms } = data;

            if (rooms) {
                const myRooms: IRoom[] = rooms

                myRooms.map((room) => {
                    room.ContainerPorts.map((port) => {
                        port.UID = newGuid()
                        return port
                    })
                    return room
                })

                setRoomOrMode(myRooms)
                setStates({ Users: states.Users, Rooms: myRooms.length, Matches: states.Matches })
            }
            else if (error) {
                print(`ROOM_GETALL: ${error}`)
            }
        }
        else if (sisma == "ROOM_REGISTER.RESULT") {
            const { error, room } = data;

            if (room) {
                const myRoom: IRoom = room

                myRoom.ContainerPorts.map((p) => {
                    p.UID = newGuid()
                    return p
                })

                setRoomOrMode([...roomOrMode, myRoom])
                setStates({ Users: states.Users, Rooms: states.Rooms + 1, Matches: states.Matches })
            }
            else if (error) {
                print(`ROOM_REGISTER: ${error}`)
            }
        }
        else if (sisma == "ROOM_DESTROY.RESULT") {
            const { error, room } = data

            if (room) {
                const rooms: IRoom[] = roomOrMode.filter((e) => {
                    return (e.UID != (room as IRoom).UID)
                })

                setRoomOrMode(rooms)
            }
            else if (error) {
                print(`ROOM_DESTROY: ${error}`)
            }
        }
        else if (sisma == "USER_GETALL.RESULT") {
            const { error, length } = data

            if (length == 0 || length != undefined) {
                setStates({ Users: length, Matches: states.Matches, Rooms: states.Rooms })
            }
            else if (error) {
                print(`USER_GETALL: ${error}`)
            }
        }
        else if (sisma == "MATCH_GETALL.RESULT") {
            const { error, length } = data

            if (length == 0 || length != undefined) {
                setStates({ Users: states.Users, Matches: length, Rooms: states.Rooms })
            }
            else if (error) {
                print(`USER_GETALL: ${error}`)
            }
        }
    }

    const [uid, setGuid] = useState(``)
    const [modeName, setModeName] = useState(``)
    const [minUser, setMinUser] = useState(0)
    const [maxUser, setMaxUser] = useState(0)
    const [matchTimeout, setMatchTimeout] = useState(0)
    const [containerRam, setContainerRam] = useState(0)
    const [containerCpu, setContainerCpu] = useState(0)
    const [containerImage, setContainerImage] = useState(``)
    const [containerParam, setContainerParam] = useState(``)
    const [containerPort, setContainerPort] = useState([] as IPort[])

    const [errorMessage, setErrorMessage] = useState(``)

    const [roomOrMode, setRoomOrMode] = useState([] as IRoom[])

    const [states, setStates] = useState({
        Users: 0,
        Rooms: 0,
        Matches: 0,
    })

    function selectMode(uid: string) {
        roomOrMode.map((e) => {
            if (e.UID == uid) {
                setGuid(uid)
                setModeName(e.Mode);
                setMinUser(e.MinUser);
                setMaxUser(e.MaxUser);
                setMatchTimeout(e.MatchTimeout);
                setContainerImage(e.ContainerImage);
                setContainerParam(e.ContainerParam);
                setContainerPort(e.ContainerPorts)
                setContainerCpu(e.ContainerCpu)
                setContainerRam(e.ContainerRam)
            }
        })

    }

    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (uid) {
            // update mode
            roomOrMode.map((e) => {
                if (e.UID == uid) {
                    // update data
                    e.Mode = modeName;
                    e.MinUser = minUser;
                    e.MaxUser = maxUser;
                    e.MatchTimeout = matchTimeout;
                    e.ContainerImage = containerImage;
                    e.ContainerParam = containerParam;
                    e.ContainerPorts = containerPort
                    e.ContainerRam = containerRam
                    e.ContainerCpu = containerCpu

                    resetData()
                }
            })
        }
        else {
            // create new mode
            const data = {
                "sisma": "ROOM_REGISTER",
                "Mode": modeName,
                "ContainerImage": containerImage,
                "ContainerParam": containerParam,
                "ContainerPorts": containerPort,
                "MatchTimeout": matchTimeout,
                "ContainerRam": containerRam,
                "ContainerCpu": containerCpu,
                "MinUser": minUser,
                "MaxUser": maxUser
            }

            // use websocket to send new mode for server
            wss.send(JSON.stringify(data))

            // clear input
            resetData()
        }
    }

    function resetData() {
        // reset states
        setGuid("")
        setModeName("")
        setMinUser(0);
        setMaxUser(0);
        setMatchTimeout(0);
        setContainerImage("");
        setContainerParam("");
        setContainerCpu(0)
        setContainerRam(0)
        setContainerPort([])
    }

    function newPort(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setContainerPort([...containerPort, { UID: newGuid(), Name: "", Value: 0 }])
    }

    function removePort(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, guid: string) {
        e.preventDefault()

        const newArray = containerPort.filter((e) => {
            if (e.UID == guid) return false;
            return true;
        })

        setContainerPort(newArray)
    }

    function updatePort(guid: string, value: string, isValue: boolean) {

        const newArray = containerPort.map((e) => {
            if (e.UID == guid) {
                if (isValue) {
                    e.Value = Number.parseInt(value);
                }
                else {
                    e.Name = value;
                }
            }
            return e;
        })
        setContainerPort(newArray);
    }

    function deleteMode(uid: string) {
        if (uid) {
            wss.send(JSON.stringify({ sisma: "ROOM_DESTROY", UID: uid }))
        }
    }

    return (
        <>
            <Header />
            <main id={style.app} className={homeStyle.app}>
                {(errorMessage) ? <p className={style.error}>{errorMessage}</p> : <>/</>}
                <div className={style.main}>
                    <div className={style.area}>
                        <h2 className={style.title}>ROOM (Mode)</h2>
                        <ul className={style.mainGroup}>
                            {roomOrMode.map((e) =>
                                <li key={e.UID}>
                                    <article className={style.mainMode} onClick={() => selectMode(e.UID)}>
                                        <div className={style.mode}>

                                            <fa.FaDocker className={style.dockerIcon} />
                                            <div className={style.modeArea}>
                                                <span className={style.modeElement}>Image: <span>{e.ContainerImage}</span></span>
                                                <span className={style.modeElement}>Params: <span> {e.ContainerParam}</span></span>
                                            </div>
                                        </div>

                                        <span className={style.modeName}>{e.Mode}</span>
                                    </article>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={style.area}>
                        <h2 className={style.title}>States</h2>
                        <ul className={style.mainGroup}>
                            <li className={style.states}>Users: {states.Users}</li>
                            <li className={style.states}>Matches: {states.Matches}</li>
                            <li className={style.states}>Rooms (modes): {states.Rooms}</li>
                        </ul>
                    </div>

                    <div id={style.inspector} className={style.area}>
                        <h2 className={style.title}>Inspector</h2>
                        <ul className={style.mainGroup}>
                            <li>
                                <form className={style.form} action="" method="post" onSubmit={(e) => formSubmit(e)}>

                                    <input value={uid} onChange={(e) => setGuid(e.target.value)} type="text" name="guid" style={{ display: 'none' }} />
                                    <input value={modeName} onChange={(e) => setModeName(e.target.value)} className={style.formText} required placeholder="mode name" type="text" name="mode" />
                                    <input value={(minUser == 0) ? "" : minUser} onChange={(e) => setMinUser(Number.parseInt(e.target.value))} className={style.formText} required placeholder="min user" type="number" name="min_user" min={0} max={1000} />
                                    <input value={(maxUser == 0) ? "" : maxUser} onChange={(e) => setMaxUser(Number.parseInt(e.target.value))} className={style.formText} required placeholder="max user" type="number" name="max_user" min={0} max={1000} />
                                    <input value={(matchTimeout == 0) ? "" : matchTimeout} onChange={(e) => setMatchTimeout(Number.parseInt(e.target.value))} className={style.formText} required placeholder="match timeout (milliseconds)" type="number" name="match_timeout" min={5000/* 5s*/} maxLength={(1000 * 60) * 10 /*10 min*/} />
                                    <input value={(containerRam == 0) ? "" : containerRam} onChange={(e) => setContainerRam(Number.parseInt(e.target.value))} className={style.formText} required placeholder="container ram (Megabyte)" type="number" name="container_ram" min={0} />
                                    <input value={(containerCpu == 0) ? "" : containerCpu} onChange={(e) => setContainerCpu(Number.parseInt(e.target.value))} className={style.formText} required placeholder="container cpu (priority)" type="number" name="container_cpu" min={0} />
                                    <input value={containerImage} onChange={(e) => setContainerImage(e.target.value)} className={style.formText} required placeholder="container image" type="text" name="container_image" />
                                    <input value={containerParam} onChange={(e) => setContainerParam(e.target.value)} className={style.formText} required placeholder="container param" type="text" name="container_param" />

                                    <section id={style.portArea}>
                                        <section id={style.portHeader}>
                                            <h1>Port</h1>
                                            <button onClick={(e) => newPort(e)}><ai.AiFillPlusCircle /></button>
                                        </section>

                                        {containerPort.map((e) => (
                                            <article key={e.UID} className={style.port}>
                                                <input className={style.portText} onChange={(o) => updatePort(e.UID, o.target.value, false)} value={e.Name} placeholder='port name' required type="text" minLength={1} maxLength={16} />
                                                <input className={style.portText} onChange={(o) => updatePort(e.UID, o.target.value, true)} value={(e.Value == 0) ? "" : e.Value} placeholder='port value' required type="number" min={1} max={65535} />
                                                <button onClick={(o) => removePort(o, e.UID)}><ai.AiFillDelete /></button>

                                            </article>
                                        ))}
                                    </section>
                                    <div className={style.buttonArea}>
                                        {(uid) ? <>
                                            <span id={style.buttonDelete} className={style.button} onClick={_ => deleteMode(uid)}><ai.AiFillDelete />Delete {(modeName) ? `(${modeName})` : ``}</span>
                                            <span id={style.buttonRestore} className={style.button} onClick={_ => resetData()}><ai.AiFillPlusCircle />New room (mode)</span>
                                        </> : <></>
                                        }
                                    </div>
                                    <input type="submit" value={(uid) ? "Update" : "Register"} />
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}