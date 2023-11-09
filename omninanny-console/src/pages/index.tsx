import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import AppHeader from '@/components/AppHeader'

export default function Home() {
    return (
        <>
            <Head>
                <title>Omninanny - Home</title>
            </Head>
            <AppHeader />

            <main className={styles.main}>
                <div className={styles.info}>
                    <h1 className={styles.title}>Omninanny</h1>
                    <h2>Matchmaking, Game server manager with docker</h2>
                </div>

                <section className={styles.section}>
                    <article className={styles.article}>
                        <div>
                            <h1>Server orchestration</h1>
                            <h2>Runs server as docker container</h2>
                            <p>Description...</p>
                        </div>
                        <main>
                            <Image className={styles.image} src={"/www/image/server-instances-diagram.png"} alt="server instances diagram" width={850 / 1.5} height={540 / 1.5} />
                        </main>
                    </article>
                    <article className={styles.article}>
                        <main>
                            <Image className={styles.image} src={"/www/image/matchmaking-system-diagram.png"} alt="server instances diagram" width={850 / 1.5} height={540 / 1.5} />
                        </main>
                        <div>
                            <h1>Matchmaking</h1>
                            <h2>Matchmaking support and automatically create "Game Server" Instance</h2>
                            <p>Description...</p>
                        </div>
                    </article>
                    <article className={styles.article}>                       
                        <div>
                            <h1>Custom Worker Server</h1>
                            <h2>You can add custom server as worker</h2>
                            <p>Description...</p>
                        </div>
                        <main>
                            <Image className={styles.image} src={"/www/image/custom-workers-diagram.png"} alt="custom workers diagram" width={850 / 1.5} height={540 / 1.5} />
                        </main>
                    </article>
                </section>
            </main>
        </>
    )
}
