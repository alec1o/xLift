import { useState } from "react"
import style from "./styles.module.css"
import { BiUserPin, BiJoystick, BiPackage } from "react-icons/bi"
import { FiCpu } from "react-icons/fi"
import { SiGitbook } from "react-icons/si"
import { VscPulse, VscGlobe, VscGithubInverted } from "react-icons/vsc"

export default function Dashboard() {

    const [users, setUsers] = useState(false)
    const [matches, setMatches] = useState(false)
    const [dashboard, setDashboard] = useState(false)
    const [prefabs, setPrefabs] = useState(false)
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

    function activePrefabs() {
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

                        <a className={`${style.MenuTabLink} ${users ? style.LEDText : ''}`} onClick={() => activeUsers()}><BiUserPin /> Users</a>
                        <a className={`${style.MenuTabLink} ${matches ? style.LEDText : ''}`} onClick={() => activeMatches()}><BiJoystick /> Matches</a>
                        <a className={`${style.MenuTabLink} ${dashboard ? style.LEDText : ''}`} onClick={() => activeDashboard()}><VscPulse /> Dashboard</a>
                    </section>
                    <section className={style.MenuTab}>
                        <span className={style.MenuTabName}>Internal</span>

                        <a className={`${style.MenuTabLink} ${prefabs ? style.LEDText : ''}`} onClick={() => activePrefabs()}>< BiPackage /> Prefabs</a>
                        <a className={`${style.MenuTabLink} ${cluster ? style.LEDText : ''}`} onClick={() => activeCluster()}><VscGlobe /> Cluster</a>
                        <a className={`${style.MenuTabLink} ${setting ? style.LEDText : ''}`} onClick={() => activeSetting()}><FiCpu /> Setting</a>
                    </section>
                    <section id={style.poweredby} className={style.MenuTab}>
                        <section className={style.MenuTab}>
                            <span className={style.MenuTabName}>More</span>
                            <a className={style.MenuTabLink} href="#">< VscGithubInverted /> GitHub</a>
                            <a className={style.MenuTabLink} href="#">< SiGitbook /> Documentation</a>
                        </section>

                        <a className={`${style.MenuTabLink} ${style.LED}`} href="#">Powered by @alec1o</a>
                    </section>
                </nav>
            </menu>
            <div id={style.container}>
                <header id={style.header}></header>
                <main id={style.main}>
                    {
                        users ? <>users</> :
                            matches ? <>matches</> :
                                dashboard ? <>dashboard</> :
                                    prefabs ? <>prefabs</> :
                                        cluster ? <>cluster</> :
                                            setting ? <>setting</> :
                                                <>{activeDashboard()}</>
                    }
                </main>
                <footer id={style.footer}></footer>
            </div>
        </div >
    )
}