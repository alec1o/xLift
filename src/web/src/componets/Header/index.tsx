import style from "./style.module.css"
import * as bs from "react-icons/bs"
import * as gi from "react-icons/gi"

export default function Header() {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <a id={style.logo} href="/">SISMA</a>
            </nav>

            <nav className={style.nav}>
                <a className={style.link} target="_blank" href="https://github.com/alec1o/Sisma"><gi.GiWhiteBook color="white" />Docs</a>
                <a className={style.link} target="_blank" href="https://github.com/alec1o/Sisma"><bs.BsGithub color="white" />GitHub</a>
            </nav>
        </header>
    )
}