import '@/styles/globals.css'
import 'react-notifications/lib/notifications.css';
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
                <link href="https://fonts.cdnfonts.com/css/kiona-2" rel="stylesheet" />
                <link href="https://fonts.cdnfonts.com/css/rawson-alt" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
