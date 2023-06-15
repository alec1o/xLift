import Link from "next/link";
import mainStyle from "./app/styles.module.css"
import style from "./styles.module.css"
import { SiGithub, SiGitbook } from "react-icons/si";

export default function Home() {
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
                <form className={style.Form}>
                    <input required type="text" minLength={3} maxLength={1024} placeholder="host (ipv4, ipv6, domain)" />
                    <input required type="number" min={1} maxLength={65535} placeholder="port" />
                    <input required type="text" minLength={3} maxLength={1024} placeholder="SISMA_KEY (environment variable)" />
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
