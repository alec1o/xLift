import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from "../Home/style.module.css"
import * as ai from "react-icons/ai"
import { useState } from 'react';
import { v4 as newGuid } from "uuid"

export default function Root() {

    const [guid, setGuid] = useState(``)
    const [modeName, setModeName] = useState(``)
    const [minUser, setMinUser] = useState(0)
    const [maxUser, setMaxUser] = useState(0)
    const [matchTimeout, setMatchTimeout] = useState(0)
    const [containerImage, setContainerImage] = useState(``)
    const [containerParam, setContainerParam] = useState(``)
    const [containerPort, setContainerPort] = useState([] as { guid: string; name: string; value: number; }[])

    const [modes, setModes] = useState([{
        MODE_GUID: "@ALEC1O",
        MODE_NAME: "1v1",
        MIN_USER: 2,
        MAX_USER: 2,
        MATCH_TIMEOUT: 10000,
        CONTAINER_IMAGE: "game:latest",
        CONTAINER_PARAM: "--mode 1v1",
        CONTAINER_PORT: [
            { guid: newGuid(), name: "TcpChat", value: 2000 },
            { guid: newGuid(), name: "TcpGame", value: 3000 },
            { guid: newGuid(), name: "UdpGame", value: 4000 }
        ]
    }])

    const [states, setStates] = useState({
        ONLINE_USER: 0,
        ONLINE_ROOM: 0,
        ROOMS_CREATED: 0,
        USER_AT_MATCH: 0,
    })

    function selectMode(guid: string) {
        modes.map((e) => {
            if (e.MODE_GUID == guid) {
                setGuid(guid)
                setModeName(e.MODE_NAME);
                setMinUser(e.MIN_USER);
                setMaxUser(e.MAX_USER);
                setMatchTimeout(e.MATCH_TIMEOUT);
                setContainerImage(e.CONTAINER_IMAGE);
                setContainerParam(e.CONTAINER_PARAM);
                setContainerPort(e.CONTAINER_PORT)
            }
        })

    }

    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (guid) {
            // update mode
            modes.map((e) => {
                if (e.MODE_GUID == guid) {
                    // update data
                    e.MODE_NAME = modeName;
                    e.MIN_USER = minUser;
                    e.MAX_USER = maxUser;
                    e.MATCH_TIMEOUT = matchTimeout;
                    e.CONTAINER_IMAGE = containerImage;
                    e.CONTAINER_PARAM = containerParam;
                    e.CONTAINER_PORT = containerPort

                    // reset states
                    setGuid("")
                    setModeName("")
                    setMinUser(0);
                    setMaxUser(0);
                    setMatchTimeout(0);
                    setContainerImage("");
                    setContainerParam("");
                    setContainerPort([])
                }
            })
        }
        else {
            // create new mode
            // use websocket to send new mode for server
        }
    }

    function newPort(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setContainerPort([...containerPort, { guid: newGuid(), name: "", value: 0 }])
    }

    function removePort(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, guid: string) {
        e.preventDefault()

        const newArray = containerPort.filter((e) => {
            if (e.guid == guid) return false;
            return true;
        })

        setContainerPort(newArray)
    }

    function updatePort(guid: string, value: string, isValue: boolean) {

        const newArray = containerPort.map((e) => {
            if (e.guid == guid) {
                if (isValue) {
                    e.value = Number.parseInt(value);
                }
                else {
                    e.name = value;
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
                <div className={style.main}>

                    <div className={style.area}>
                        <h2 className={style.title}>Modes</h2>
                        <ul className={style.mainGroup}>
                            {modes.map((e) =>
                                <li key={e.MODE_GUID}>
                                    <article className={style.mode} onClick={() => selectMode(e.MODE_GUID)}>
                                        <span id={style.modeName} className={style.modeElement}>Mode: {e.MODE_NAME}</span>
                                        <div className={style.modeArea}>
                                            <span className={style.modeElement}>Image: {e.CONTAINER_IMAGE}</span>
                                            <span className={style.modeElement}>Params: {e.CONTAINER_PARAM}</span>
                                        </div>
                                    </article>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={style.area}>
                        <h2 className={style.title}>Status</h2>
                        <ul className={style.mainGroup}>
                            <li className={style.states}>Rooms: {states.ONLINE_ROOM}</li>
                            <li className={style.states}>Online user: {states.ONLINE_USER}</li>
                            <li className={style.states}>User on room: {states.USER_AT_MATCH}</li>
                            <li className={style.states}>rooms created: {states.ROOMS_CREATED}</li>
                        </ul>
                    </div>

                    <div id={style.inspector} className={style.area}>
                        <h2 className={style.title}>Inspector</h2>
                        <ul className={style.mainGroup}>
                            <li>
                                <form className={style.form} action="" method="post" onSubmit={(e) => formSubmit(e)}>
                                    <input value={guid} onChange={(e) => setGuid(e.target.value)} type="text" name="guid" style={{ display: 'none' }} />
                                    <input value={modeName} onChange={(e) => setModeName(e.target.value)} className={style.formText} required placeholder="mode name" type="text" name="mode" />
                                    <input value={(minUser == 0) ? "" : minUser} onChange={(e) => setMinUser(Number.parseInt(e.target.value))} className={style.formText} required placeholder="min user" type="number" name="min_user" min={0} max={1000} />
                                    <input value={(maxUser == 0) ? "" : maxUser} onChange={(e) => setMaxUser(Number.parseInt(e.target.value))} className={style.formText} required placeholder="max user" type="number" name="max_user" min={0} max={1000} />
                                    <input value={(matchTimeout == 0) ? "" : matchTimeout} onChange={(e) => setMatchTimeout(Number.parseInt(e.target.value))} className={style.formText} required placeholder="match timeout (milliseconds)" type="number" name="match_timeout" min={5000/* 5s*/} maxLength={(1000 * 60) * 10 /*10 min*/} />
                                    <input value={containerImage} onChange={(e) => setContainerImage(e.target.value)} className={style.formText} required placeholder="container image" type="text" name="container_image" />
                                    <input value={containerParam} onChange={(e) => setContainerParam(e.target.value)} className={style.formText} required placeholder="container param" type="text" name="container_param" />

                                    <section id={style.portArea}>
                                        <section id={style.portHeader}>
                                            <h1>Port</h1>
                                            <button onClick={(e) => newPort(e)}><ai.AiFillPlusCircle /></button>
                                        </section>

                                        {containerPort.map((e) => (
                                            <article key={e.guid} className={style.port}>
                                                <input className={style.portText} onChange={(o) => updatePort(e.guid, o.target.value, false)} value={e.name} placeholder='port name' required type="text" minLength={1} maxLength={16} />
                                                <input className={style.portText} onChange={(o) => updatePort(e.guid, o.target.value, true)} value={(e.value == 0) ? "" : e.value} placeholder='port value' required type="number" min={1} max={65535} />
                                                <button onClick={(o) => removePort(o, e.guid)}><ai.AiFillDelete /></button>
                                            </article>
                                        ))}
                                    </section>

                                    <input type="submit" value={(guid) ? "Update" : "Register"} />
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}