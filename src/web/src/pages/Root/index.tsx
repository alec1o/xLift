import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from "../Home/style.module.css"
import { useState } from 'react';

export default function Root() {

    const [modes, setModes] = useState([{
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

    return (
        <>
            <Header />
            <main id={style.app} className={homeStyle.app}>
                <div className={style.main}>
                    <ul className={style.mainGroup}>
                        <li>
                            <h2 className={style.title}>Modes</h2>
                        </li>
                        {modes.map((e) =>
                            <li>
                                <article className={style.mode}>
                                    <span id={style.modeName} className={style.modeElement}>Mode: {e.MODE_NAME}</span>
                                    <div className={style.modeArea}>
                                        <span className={style.modeElement}>Image: {e.CONTAINER_IMAGE}</span>
                                        <span className={style.modeElement}>Params: {e.CONTAINER_PARAM}</span>
                                    </div>
                                </article>
                            </li>
                        )}
                    </ul>
                    <ul className={style.mainGroup}>
                        <li>
                            <h2 className={style.title}>Status</h2>
                        </li>
                        <li className={style.states}>Rooms: {states.ONLINE_ROOM}</li>
                        <li className={style.states}>Online user: {states.ONLINE_USER}</li>
                        <li className={style.states}>User on room: {states.USER_AT_MATCH}</li>
                        <li className={style.states}>rooms created: {states.ROOMS_CREATED}</li>
                    </ul>
                    <ul id={style.inspector} className={style.mainGroup}>
                        <li>
                            <h2 className={style.title}>Inspector</h2>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}