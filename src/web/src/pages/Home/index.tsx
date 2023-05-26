import { useState } from 'react';
import Header from '../../componets/Header';
import style from './style.module.css';
import { redirect } from 'react-router-dom';

export default function Home() {

    const [error, SetError] = useState('')
    const [loading, SetLoading] = useState(false)
    const [host, setHost] = useState('')
    const [port, setPort] = useState(0)
    const [token, setToken] = useState('')

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoading(true)

        const url = `ws://${host}:${port}/${token}/`
        const ws = new WebSocket(url)

        ws.onopen = (e: Event) => {
            SetError("Connection opened");
        }

        ws.onclose = (e: CloseEvent) => {
            SetError("Connection closed");
            SetLoading(false);
        }

        ws.onmessage = (e: MessageEvent<any>) => {
            SetError("Connection message");

            console.log(e);

            const json = JSON.parse(e.data as string);

            const { sisma } = json;

            if (sisma == "AUTH_ROOT") {
                SetError('')

                // save login on browser
                localStorage.setItem("url", url);

                window.location.href = "/root"
            }
            else {
                ws.close();

                SetLoading(false);
                alert(`YOU TOKEN ISN'T AUTH_ROOT, YOU TOKEN IS ${sisma}`)
            }
        }
    }

    return (
        <div className={style.app}>
            <Header />

            <main className={style.main}>
                <form className={style.form} onSubmit={(e) => onSubmit(e)} action="" method="post">
                    {(error) ? <p className={style.error}>{error}</p> : <></>}
                    <h1 className={style.title}>Sisma</h1>
                    <input className={style.input} required value={host} onChange={(e) => { setHost(e.target.value) }} placeholder='Host' type="text" name="host" minLength={4} maxLength={128} />
                    <input className={style.input} required value={(port > 0) ? port : ""} onChange={(e) => { setPort(Number.parseInt(e.target.value)) }} placeholder='Port' type="number" name="port" min={1} max={65535} />
                    <input className={style.input} required value={token} onChange={(e) => { setToken(e.target.value) }} placeholder='Token' type="text" name="token" minLength={1} maxLength={512} />
                    {(loading) ? <></> : <input className={style.input} id={style.button} type="submit" value="ENTER" />}
                </form>
            </main>
        </div>
    )
}