import styles from "./styles.module.css"
import Image from "next/image"

export default function AppHeader() {
    return (
        <>
            <header id={styles.main}>
                <Image id={styles.logo} src="/www/image/omninanny.png" alt="omninanny logo" width={128} height={128} />
                <h2 id={styles.title}>Omninanny</h2>
            </header>
        </>
    )
}