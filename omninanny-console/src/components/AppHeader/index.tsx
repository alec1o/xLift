import Link from "next/link"
import styles from "./styles.module.css"
import Image from "next/image"

export default function AppHeader() {
    return (
        <>
            <header id={styles.main}>
                <div className={styles.container}>
                    <Image id={styles.logo} src="/www/image/omninanny.png" alt="omninanny logo" width={128} height={128} />
                    <h2 id={styles.title}>Omninanny</h2>
                </div>
                <div className={styles.container}>
                    <Link className={styles.link} target="_blank" href="https://omninanny.docs.kezero.com/">Docs</Link>
                    <Link className={styles.link} target="_blank" href="https://github.com/alec1o/omninanny/">GitHub</Link>
                </div>
            </header>
        </>
    )
}