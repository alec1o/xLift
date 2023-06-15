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
                        <h2 className={mainStyle.LED}>how to configure my worker server?</h2>
                        <ul className={style.SubList}>
                            <li>Install docker in your worker server.</li>
                            <li>You need to package your server in a docker image, using docker file, and expose the ports in your docker file.</li>
                            <li>install/clone your server image on your worker machine.</li>
                            <li>Install sisma_client and configure the environment variables that are the private keys so that your siama_client and sisma_core are validated!</li>
                            <li>Create a room in the sisma console and configure the port bridge, reference the exported ports in the docker file</li>
                        </ul>
                    </li>
                    <li>
                        <h2 className={mainStyle.LED}>What are the main features of sisma?</h2>
                        <p>The sisma has 2 main features which are:</p>
                        <ul className={style.SubList}>
                            <li>Matchmaking server and server orchestration</li>
                            <li>Message-forward: you can have clients send message to each other, and also have your own server mode send an event message which is to run example logic. "you can send a message to your client to relogin or update the level in the account or join the players in a personalized room. the limit is your imagination"</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </main>
    );
}
