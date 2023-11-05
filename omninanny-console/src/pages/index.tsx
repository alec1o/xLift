import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Head>
                <title>Omninanny - Home</title>
            </Head>
            <main>
                <h1>Omninanny</h1>
                <h2>
                    <Link href="/app">App</Link>
                </h2>
            </main>
        </>
    )
}
