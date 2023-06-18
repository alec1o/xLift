import Link from "next/link";
import mainStyle from "./app/styles.module.css"
import style from "./styles.module.css"
import { SiGithub, SiGitbook, SiAbbott } from "react-icons/si";
import { GetServerSideProps } from "next/types";
import getRawBody from 'raw-body';
import EventEmitter from "events";
import { getCookie, setCookies } from "cookies-next";


export const getServerSideProps: GetServerSideProps = async (context) => {

    let error: string[] = []

    if (context.req.method && context.req.method.toLowerCase() == "POST".toLowerCase()) {

        const result: { host: string, port: number, key: string } = { host: "", port: 0, key: "" }

        try {
            const body = (await getRawBody(context.req)).toString("utf-8")
            // example: host=<value>&port=<value>&key=value

            const parser = body.split("&")

            let isFirst = true
            let json = "{"

            parser.forEach((e) => {
                const v = e.split("=")
                if (v) {
                    json += `${isFirst ? '' : ","}"${v[0]}":"${v[1]}"`
                    isFirst = false
                }
            })

            json += "}"

            const data = JSON.parse(json)

            if (data.host) result.host = data.host
            else error.push("host not found")

            if (data.port) {
                try {
                    const value = Number.parseInt(data.port)
                    result.port = value
                }
                catch { error.push("port is invalid") }
            }
            else error.push("port not found")

            if (data.key) result.key = data.key
            else error.push("key not found")

        } catch (e) {
            console.log(e)
        }

        console.log(result)

        // try connect
        if (error.length <= 0) {
            let success = false

            try {
                const ws = new WebSocket(`ws://${result.host}:${result.port}/${result.key}`)

                ws.onopen = (e) => {
                    console.log("on open")
                }

                ws.onclose = (e) => {
                    console.log("on close")
                    bus.emit('unlocked');
                }

                ws.onmessage = (e) => {
                    console.log("on message")
                    const { sisma } = JSON.parse(e.data)

                    if (sisma) {
                        if (sisma == "AUTH.ROOT") {
                            success = true
                        }
                        else {
                            error.push(`Invalid token ROOT_TOKEN_ONLY: you current token is: ${sisma}`)
                        }

                        ws.close()
                    }

                    bus.emit('unlocked');
                }

                ws.onerror = (e) => {
                    console.log("on error")
                    error.push("error on connect")
                    bus.emit('unlocked');
                }
            }
            catch (e) {
                error.push(`Error: ${e}`)
            }

            const bus = new EventEmitter();

            await new Promise(resolve => bus.once('unlocked', resolve));
            console.log("sucess" + success)

            if (success) {
                // save credentials on cookies
                setCookies('auth', JSON.stringify(result), { req: context.req, res: context.res, maxAge: (60 * 60) /* 1 hour */ * (24 /* 1day */ * 30 /* 30 days*/) });

                return {
                    redirect: {
                        destination: '/app',
                        permanent: false
                    },
                    props: {}
                }
            }

            return {
                props: {
                    error,
                    success
                }
            }
        }
    }

    return {
        props: {
            error,
            sucess: false
        }
    }
}



export default function Home({ sucess, error }: { sucess: boolean, error: string[] }) {
    return (
        <main id={style.main}>
            <header className={style.Header}>
                <div>
                    <span className={`${mainStyle.LED} ${style.Logo}`}>Sisma</span>
                </div>
                <div className={style.HeaderLinks}>
                    <Link className={`${style.HeaderLink} ${mainStyle.LED}`} target="_blank" href="https://solo.to/alec1o">Powered by @alec1o</Link>
                    <Link className={style.HeaderLink} target="_blank" href="https://github.com/alec1o/sisma"><SiGithub className={style.HeaderIcon} /> GitHub</Link>
                    <Link className={style.HeaderLink} target="_blank" href="https://sisma.docs.kezero.com"><SiGitbook className={style.HeaderIcon} /> Documentation</Link>
                </div>
            </header>

            <div className={style.Content}>
                <form className={style.Form} action="/" method="post">
                    {
                        error.map((e) => {
                            return <>
                                <p style={{ color: "#ce2050" }}>{e}</p>
                            </>
                        })
                    }

                    <input required name="host" type="text" minLength={3} maxLength={1024} placeholder="host (ipv4, ipv6, domain)" />
                    <input required name="port" type="number" min={1} maxLength={65535} placeholder="port" />
                    <input required name="key" type="text" minLength={3} maxLength={1024} placeholder="SISMA_KEY (environment variable)" />
                    <input type="submit" value="enter" />
                </form>
                <ul className={style.FAQ}>
                    <li>
                        <h2 className={mainStyle.LED}>what is the sisma?</h2>
                        <p>SISMA Is a Matchmaking, Game server manager with docker</p>
                    </li>
                    <li>
                        <h2 className={mainStyle.LED}>Is the sisma free?</h2>
                        <p>Sisma is free and open source, distributed under the MIT license</p>
                    </li>
                    <li>
                        <h2 className={mainStyle.LED}>The sisma supports clustered architecture?</h2>
                        <p>Yes, you can create instances of machines and link them to your sisma as a worker! it will be used to run instances of room</p>
                    </li>
                    <li>
                        <h2 className={mainStyle.LED}>do i need an SDK for my client to communicate with sisma?</h2>
                        <p>You don't need an SDK, the system communicates using websocket and with data in json format. see more in the documentation about!</p>
                    </li>
                    <li>
                        <h2 className={mainStyle.LED}>What are the main features of sisma?</h2>
                        <p>The sisma has 2 main features which are:</p>
                        <ul className={style.SubList}>
                            <li>Matchmaking server and server orchestration</li>
                            <li>Message-forward: you can have clients send message to each other, and your own server can send an event message for any connected user, using JWT.sub (ID) as key. </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </main>
    );
}