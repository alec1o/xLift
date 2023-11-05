import styles from "./styles.module.css"
import Image from "next/image"

export default function AppHeader() {
    return (
        <>
            <header id={styles.main}>
                <Image id={styles.logo} src="/favicon.ico" alt="omninanny logo" width={0} height={0} />
                <h2 id={styles.title}>Omninanny</h2>
            </header>
        </>
    )
}