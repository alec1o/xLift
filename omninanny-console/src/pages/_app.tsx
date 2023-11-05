import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Omninanny</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Omninanny - Matchmaking, Game server manager with docker" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
