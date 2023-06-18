import { useState } from "react";
import style from "./styles.module.css";
import { BiUserPin, BiJoystick, BiPackage } from "react-icons/bi";
import { FiCpu } from "react-icons/fi";
import { SiGitbook } from "react-icons/si";
import { VscPulse, VscGlobe, VscGithubInverted } from "react-icons/vsc";
import Link from "next/link";
import Users from "./Users";
import Rooms from "./Rooms";
import Clusters from "./Clusters";
import Matches from "./Matches";
import Settings from "./Settings";
import Dashboard from "./Dashboard";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getCookie, getCookies } from "cookies-next";
import EventEmitter from "events";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = getCookie("auth", { req: context.req, res: context.res }) as string
    console.log("auth: ", cookies)

    // check exist auth on cookie
    if (!cookies) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            },
            props: {}
        }
    }

    let result = {} as { host: string, port: number, key: string }

    try {
        result = JSON.parse(cookies) as { host: string, port: number, key: string }

        if (!(result.host && result.key && result.port && result.port > 0 && result.port <= 65535)) {
            throw new Error("invalid auth")
        }
    }
    catch (e) {
        console.log("json parser error:  ", e)

        return {
            redirect: {
                permanent: false,
                destination: "/"
            },
            props: {}
        }
    }

    console.log("result: ", result)

    // try connect with server
    try {
        let success = false;

        const ws = new WebSocket(`ws://${result.host}:${result.port}/${result.key}`)

        ws.onopen = (e) => {
            console.log("on open")
        }

        ws.onclose = (e) => {
            console.log("on close")
            bus.emit('unlocked');
        }

        ws.onmessage = (e) => {
            console.log("on message")
            const { sisma } = JSON.parse(e.data as string)

            if (sisma) {
                if (sisma == "AUTH.ROOT") {
                    success = true
                }
                ws.close()
            }

            bus.emit('unlocked');
        }

        ws.onerror = (e) => {
            console.log("on error")
            bus.emit('unlocked');
        }

        const bus = new EventEmitter();

        await new Promise(resolve => bus.once('unlocked', resolve));

        if (success) {
            return {
                props: {
                    host: result.host,
                    port: result.port,
                    sisma_key: result.key,
                }
            }
        }
        else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/"
                },
                props: {}
            }
        }
    }
    catch (e) {
        console.log("error: ", e)
        return {
            redirect: {
                permanent: false,
                destination: "/"
            },
            props: {}
        }
    }
}

export default function App({ host, port, sisma_key }: { host: string, port: number, sisma_key: string }) {

    // @ts-ignore
    if (!global.ws) {

        // @ts-ignore
        global.ws = new WebSocket(`ws://${host}:${port}/${sisma_key}`)

        // @ts-ignore
        ws.onerror = (e) => {
            alert(`$connection error: ${e}`)
            window.location.href = "/"
        }

        // @ts-ignore
        ws.onclose = (e) => {
            alert(`"connection closed!"`)
            window.location.href = "/"
        }

        // @ts-ignore
        ws.onopen = (e) => {
            console.log("connection open")
        }

        // @ts-ignore
        ws.onmessage = (e) => {

        }
    }

    const [users, setUsers] = useState(false);
    const [matches, setMatches] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [rooms, setPrefabs] = useState(false);
    const [cluster, setCluster] = useState(false);
    const [setting, setSetting] = useState(false);

    function activeUsers() {
        setUsers(true);
        setMatches(false);
        setDashboard(false);
        setPrefabs(false);
        setCluster(false);
        setSetting(false);
    }

    function activeMatches() {
        setUsers(false);
        setMatches(true);
        setDashboard(false);
        setPrefabs(false);
        setCluster(false);
        setSetting(false);
    }

    function activeDashboard() {
        setUsers(false);
        setMatches(false);
        setDashboard(true);
        setPrefabs(false);
        setCluster(false);
        setSetting(false);
    }

    function activeRooms() {
        setUsers(false);
        setMatches(false);
        setDashboard(false);
        setPrefabs(true);
        setCluster(false);
        setSetting(false);
    }

    function activeCluster() {
        setUsers(false);
        setMatches(false);
        setDashboard(false);
        setPrefabs(false);
        setCluster(true);
        setSetting(false);
    }

    function activeSetting() {
        setUsers(false);
        setMatches(false);
        setDashboard(false);
        setPrefabs(false);
        setCluster(false);
        setSetting(true);
    }

    return (
        <div id={style.init}>
            <menu id={style.menu}>
                <div className={style.MenuLogoParent}>
                    <h1 className={style.MenuLogo}>Sisma</h1>
                </div>
                <nav id={style.menuLink}>
                    <section className={style.MenuTab}>
                        <span className={style.MenuTabName}>Inspector</span>

                        <button className={`${style.MenuTabLink} ${users ? style.LEDText : ""}`} onClick={() => activeUsers()}><BiUserPin /> Users</button>
                        <button className={`${style.MenuTabLink} ${matches ? style.LEDText : ""}`} onClick={() => activeMatches()}><BiJoystick /> Matches</button>
                        <button className={`${style.MenuTabLink} ${dashboard ? style.LEDText : ""}`} onClick={() => activeDashboard()}><VscPulse /> Dashboard</button>
                    </section>
                    <section className={style.MenuTab}>
                        <span className={style.MenuTabName}>Internal</span>

                        <button className={`${style.MenuTabLink} ${rooms ? style.LEDText : ""}`} onClick={() => activeRooms()}>< BiPackage /> Rooms</button>
                        <button className={`${style.MenuTabLink} ${cluster ? style.LEDText : ""}`} onClick={() => activeCluster()}><VscGlobe /> Clusters</button>
                        <button className={`${style.MenuTabLink} ${setting ? style.LEDText : ""}`} onClick={() => activeSetting()}><FiCpu /> Settings</button>
                    </section>
                    <section id={style.poweredby} className={style.MenuTab}>
                        <section className={style.MenuTab}>
                            <span className={style.MenuTabName}>More</span>
                            <Link className={style.MenuTabLink} href="https://github.com/alec1o/Sisma/" target="_blank">< VscGithubInverted /> GitHub</Link>
                            <Link className={style.MenuTabLink} href="https://sisma.docs.kezero.com/" target="_blank">< SiGitbook /> Documentation</Link>
                        </section>

                        <Link className={`${style.MenuTabLink} ${style.LED}`} href="https://solo.to/alec1o/" target="_blank">Powered by @alec1o</Link>
                    </section>
                </nav>
            </menu>
            <div id={style.container}>
                <header id={style.header}></header>
                <main id={style.main}>
                    {
                        users ? <Users /> :
                            matches ? <Matches /> :
                                dashboard ? <Dashboard /> :
                                    rooms ? <Rooms /> :
                                        cluster ? <Clusters /> :
                                            setting ? <Settings /> :
                                                <>{activeDashboard()}</>
                    }
                </main>
                <footer id={style.footer}></footer>
            </div>
        </div >
    );
}