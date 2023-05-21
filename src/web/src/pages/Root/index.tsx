import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from "../Home/style.module.css"
import { useState } from 'react';

export default function Root() {

    const [modes, setModes] = useState([{
        name: "1v1",
        minUser: 2,
        maxUser: 2,
        delay: 5000,
        timeout: 10000,
        container: "game:latest",
        containerParam: "--mode 1v1",
        containerPorts: [
            { port: 2000, name: "TcpChat" },
            { port: 2000, name: "TcpGame" },
            { port: 2000, name: "UdpGame" }
        ]
    }])

    const [states, setStates] = useState({ onlineUser: 0, userOnRoom: 0, rooms: 0 })

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
                                    <h1>Mode: {e.name}</h1>
                                    <p>Contaimer: {e.container}</p>
                                    <p>Param: {e.containerParam}</p>
                                </article>
                            </li>
                        )}
                    </ul>
                    <ul className={style.mainGroup}>
                        <li>
                            <h2 className={style.title}>Status</h2>
                        </li>
                        <li className={style.states}>Rooms: {states.rooms}</li>
                        <li className={style.states}>Online user: {states.onlineUser}</li>
                        <li className={style.states}>User on room: {states.userOnRoom}</li>
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