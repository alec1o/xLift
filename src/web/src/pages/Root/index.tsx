import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from "../Home/style.module.css"
import { useState } from 'react';

export default function Root() {

    const [guid, setGuid] = useState(``)
    const [modeName, setModeName] = useState(``)
    const [minUser, setMinUser] = useState(0)
    const [maxUser, setMaxUser] = useState(0)
    const [matchTimeout, setMatchTimeout] = useState(0)
    const [containerImage, setContainerImage] = useState(``)
    const [containerParam, setContainerParam] = useState(``)

    const [modes, setModes] = useState([{
        MODE_GUID: "@ALEC1O",
        MODE_NAME: "1v1",
        MIN_USER: 2,
        MAX_USER: 2,
        MATCH_TIMEOUT: 10000,
        CONTAINER_IMAGE: "game:latest",
        CONTAINER_PARAM: "--mode 1v1",
        CONTAINER_PORT: [
            { port: 2000, name: "TcpChat" },
            { port: 2000, name: "TcpGame" },
            { port: 2000, name: "UdpGame" }
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

                    // reset states
                    setGuid("")
                    setModeName("")
                    setMinUser(0);
                    setMaxUser(0);
                    setMatchTimeout(0);
                    setContainerImage("");
                    setContainerParam("");
                }
            })
        }
        else {
            // create new mode
            // use websocket to send new mode for server
        }
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
                                    <input value={(minUser == 0) ? "" : minUser} onChange={(e) => setMinUser(Number.parseInt(e.target.value))} className={style.formText} required placeholder="min user" type="number" name="min_user" />
                                    <input value={(maxUser == 0) ? "" : maxUser} onChange={(e) => setMaxUser(Number.parseInt(e.target.value))} className={style.formText} required placeholder="max user" type="number" name="max_user" />
                                    <input value={(matchTimeout == 0) ? "" : matchTimeout} onChange={(e) => setMatchTimeout(Number.parseInt(e.target.value))} className={style.formText} required placeholder="match timeout" type="text" name="match_timeout" />
                                    <input value={containerImage} onChange={(e) => setContainerImage(e.target.value)} className={style.formText} required placeholder="container image" type="text" name="container_image" />
                                    <input value={containerParam} onChange={(e) => setContainerParam(e.target.value)} className={style.formText} required placeholder="container param" type="text" name="container_param" />

                                    <section>
                                        <section>
                                            <h1>Port</h1>
                                            <button>ADD MORE</button>
                                        </section>

                                        <article>
                                            <input placeholder='port name' required type="text" />
                                            <input placeholder='port value' required type="number" />
                                            <button>REMOVE</button>
                                        </article>
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