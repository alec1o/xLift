import style from "./styles.module.css"
import { BiUserPin, BiJoystick, BiPackage } from "react-icons/bi"
import { FiCpu } from "react-icons/fi"
import { VscPulse, VscGlobe } from "react-icons/vsc"

export default function Dashboard() {
    return (
        <div id={style.init}>
            <menu id={style.menu}>
                <div className={style.MenuLogoParent}>
                    <h1 className={style.MenuLogo}>Sisma</h1>
                </div>
                <nav id={style.menuLink}>
                    <section className={style.MenuTab}>
                        <span className={style.MenuTabName}>Inspector</span>

                        <a className={style.MenuTabLink} href="#"><BiUserPin /> Users</a>
                        <a className={style.MenuTabLink} href="#"><BiJoystick /> Matches</a>
                        <a className={style.MenuTabLink} href="#"><VscPulse /> Dashboard</a>
                    </section>
                    <section className={style.MenuTab}>
                        <span className={style.MenuTabName}>Internal</span>

                        <a className={style.MenuTabLink} href="#">< BiPackage /> Prefab</a>
                        <a className={style.MenuTabLink} href="#"><VscGlobe /> Cluster</a>
                        <a className={style.MenuTabLink} href="#"><FiCpu /> Setting</a>
                    </section>
                </nav>
            </menu>
            <div id={style.container}>
                <header id={style.header}></header>
                <main id={style.main}></main>
                <footer id={style.footer}></footer>
            </div>
        </div>
    )
}