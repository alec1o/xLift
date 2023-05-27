import style from "./style.module.css"
import * as bs from "react-icons/bs"
import * as gi from "react-icons/gi"
import * as ri from "react-icons/ri"

export default function Header() {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <a id={style.logo} href="/">Sisma</a>
                <a id={style.actor} target="_blank" href="https://solo.to/alec1o"><span>by</span>Alecio</a>
            </nav>

            <nav className={style.nav}>
                <a className={style.link} target="_self" style={{ borderColor: "#ce2050", color: "#ce2050" }} href="/root"><ri.RiFolderLockFill color="#ce2050" />Root</a>
                <a className={style.link} target="_blank" href="https://github.com/alec1o/Sisma"><gi.GiWhiteBook color="white" />Docs</a>
                <a className={style.link} target="_blank" href="https://github.com/alec1o/Sisma"><bs.BsGithub color="white" />GitHub</a>
            </nav>
        </header>
    )
}