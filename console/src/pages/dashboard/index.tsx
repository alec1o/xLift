import { useState } from "react"
import style from "./styles.module.css"
import { BiUserPin, BiJoystick, BiPackage } from "react-icons/bi"
import { FiCpu } from "react-icons/fi"
import { SiGitbook } from "react-icons/si"
import { VscPulse, VscGlobe, VscGithubInverted } from "react-icons/vsc"
import Link from "next/link"
import Users from "./Users"
import Rooms from "./Rooms"
import Clusters from "./Clusters"

export default function Dashboard() {

    const [users, setUsers] = useState(false)
    const [matches, setMatches] = useState(false)
    const [dashboard, setDashboard] = useState(false)
    const [rooms, setPrefabs] = useState(false)
    const [cluster, setCluster] = useState(false)
    const [setting, setSetting] = useState(false)

    function activeUsers() {
        setUsers(true)
        setMatches(false)
        setDashboard(false)
        setPrefabs(false)
        setCluster(false)
        setSetting(false)
    }

    function activeMatches() {
        setUsers(false)
        setMatches(true)
        setDashboard(false)
        setPrefabs(false)
        setCluster(false)
        setSetting(false)
    }

    function activeDashboard() {
        setUsers(false)
        setMatches(false)
        setDashboard(true)
        setPrefabs(false)
        setCluster(false)
        setSetting(false)
    }

    function activeRooms() {
        setUsers(false)
        setMatches(false)
        setDashboard(false)
        setPrefabs(true)
        setCluster(false)
        setSetting(false)
    }

    function activeCluster() {
        setUsers(false)
        setMatches(false)
        setDashboard(false)
        setPrefabs(false)
        setCluster(true)
        setSetting(false)
    }

    function activeSetting() {
        setUsers(false)
        setMatches(false)
        setDashboard(false)
        setPrefabs(false)
        setCluster(false)
        setSetting(true)
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

                        <button className={`${style.MenuTabLink} ${users ? style.LEDText : ''}`} onClick={() => activeUsers()}><BiUserPin /> Users</button>
                        <button className={`${style.MenuTabLink} ${matches ? style.LEDText : ''}`} onClick={() => activeMatches()}><BiJoystick /> Matches</button>
                        <button className={`${style.MenuTabLink} ${dashboard ? style.LEDText : ''}`} onClick={() => activeDashboard()}><VscPulse /> Dashboard</button>
                    </section>
                    <section className={style.MenuTab}>
                        <span className={style.MenuTabName}>Internal</span>

                        <button className={`${style.MenuTabLink} ${rooms ? style.LEDText : ''}`} onClick={() => activeRooms()}>< BiPackage /> Rooms</button>
                        <button className={`${style.MenuTabLink} ${cluster ? style.LEDText : ''}`} onClick={() => activeCluster()}><VscGlobe /> Clusters</button>
                        <button className={`${style.MenuTabLink} ${setting ? style.LEDText : ''}`} onClick={() => activeSetting()}><FiCpu /> Settings</button>
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
                            matches ? <>matches</> :
                                dashboard ? <>dashboard</> :
                                    rooms ? <Rooms /> :
                                        cluster ? <Clusters /> :
                                            setting ? <>setting</> :
                                                <>{activeDashboard()}</>
                    }
                </main>
                <footer id={style.footer}></footer>
            </div>
        </div >
    )
}