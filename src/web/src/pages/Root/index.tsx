import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from "../Home/style.module.css"
import * as ai from "react-icons/ai"
import * as fa from "react-icons/fa"
import { useEffect, useState } from 'react';
import { v4 as newGuid } from "uuid"

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

let url = localStorage.getItem("url") as string

export default function Root() {

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

    useEffect(() => {
        InitWebsocket()
    }, [])

    const [errorMessage, setErrorMessage] = useState(``)

    const [roomOrMode, setRoomOrMode] = useState([] as IRoom[])

    const [states, setStates] = useState({
        Users: 0,
        Rooms: 0,
        Matches: 0,
    })

    function InitWebsocket() {
        if (!url) {
            window.location.href = "/"
            return;
        }

        const ws = new WebSocket(url)

        ws.onopen = (_) => {
            setErrorMessage("CONNECTED")

            setTimeout(() => {
                setErrorMessage('')
                const data = { "sisma": "ROOM_GETALL" }
                ws.send(JSON.stringify(data))
            }, 1000)
        }

        ws.onmessage = (e) => {
            const json = JSON.parse(e.data as string);

            const { sisma } = json;

            if (sisma == "AUTH_USER") {
                window.location.href = "/root"
                return
            }

            if (sisma == "ROOM_GETALL.RESULT") {
                const { error, rooms } = json

                if (rooms) {

                    const r: IRoom[] = rooms

                    // generate uid for ports
                    r.map((e) => {
                        e.ContainerPorts.map((p) => {
                            p.UID = newGuid()
                            return p
                        })
                        return e
                    })

                    setRoomOrMode(r)
                    setStates({ Users: states.Users, Rooms: r.length, Matches: states.Matches })
                }
            }
        }

        ws.onclose = (_) => {
            window.location.href = "/"
            return
        }
    }

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
            const ws = new WebSocket(url)
            let sended = false;

            ws.onopen = (_) => {
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
                ws.send(JSON.stringify(data))
                sended = true;
            }

            ws.onmessage = (e) => {
                const json = JSON.parse(e.data as string);

                const { sisma } = json;

                if (sisma == "ROOM_REGISTER.RESULT") {
                    const { room, error } = json

                    if (room) {
                        const r: IRoom = room

                        // generate uid for ports
                        r.ContainerPorts.map((p) => {
                            p.UID = newGuid()
                            return p
                        })

                        setRoomOrMode([...roomOrMode, r])
                        setStates({ Users: states.Users, Rooms: states.Rooms + 1, Matches: states.Matches })
                    }
                    else if (error) {
                        setErrorMessage(error)
                        setTimeout(() => {
                            if (error == errorMessage) {
                                setErrorMessage(``);
                            }
                        }, 5000)
                    }

                    ws.close()
                }

                ws.onclose = (_) => {
                    if (!sended) {
                        setErrorMessage("CONNECTION CLOSED")

                        setTimeout(() => {
                            window.location.href = "/"
                            return
                        }, 5000)
                    }
                }
            }

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