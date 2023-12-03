import Link from "next/link"
import styles from "./styles.module.css"
import Image from "next/image"
import env from "@/env"

export default function AppHeader() {
    return (
        <>
            <header id={styles.main}>
                <Link className={styles.container} href={"/"}>
                    <h2 id={styles.title}>{env.APP_NAME}</h2>
                </Link>
                <div className={styles.container}>
                    <Link id={styles.dashboard} className={styles.link} target="_self" href="/app">Dashboard</Link>
                    <Link className={styles.link} target="_blank" href="https://xlift.docs.kezero.com/">Docs</Link>
                    <Link className={styles.link} target="_blank" href="https://github.com/alec1o/xLift/">GitHub</Link>
                </div>
            </header>
        </>
    )
}