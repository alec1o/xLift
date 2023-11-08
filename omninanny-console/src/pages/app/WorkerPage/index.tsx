import { AddIcon, DeleteIcon, OfflineIcon, OnlineIcon, IpIcon, PortIcon, PasswordIcon, HiddenPasswordIcon, ShowPasswordIcon, CopyIcon } from "@/utils/icons"
import styles from "./styles.module.css"
import { FormEvent, FormEventHandler, useState } from "react"
import { v1 as uuid } from 'uuid';
import { ShowNotification } from "@/utils/notifications";


export interface IStatus {
    memory: number,
    storage: number,
    cpu: number,
    online: boolean
    show_password: boolean
}

export interface IWorker {
    id: string,
    name: string,
    ip: string,
    port: number,
    password: string,
    status: IStatus,
}

export default function WorkerPage() {

    const [worker, setWorker] = useState([] as unknown as IWorker[])
    const [ip, setIp] = useState("")
    const [port, setPort] = useState(0)
    const [name, setName] = useState("");
    const [password, setPassword] = useState(uuid().toString());
    const [_freshCount, _setRefreshCount] = useState(0)
    const [registerWindow, setRegisterWindow] = useState(false)

    function forceRefreshComponents() {
        _setRefreshCount(_freshCount + 1)
    }

    function createWorker() {
        const m_worker = { id: uuid().toString(), password: password, name: name, port: port, ip: ip, status: { memory: 0, storage: 0, cpu: 0, online: true } } as IWorker

        setWorker([...worker, m_worker])
        setPassword(uuid().toString());
    }

    function hiddenPasswordClick(e: IWorker) {
        e.status.show_password = false;
        forceRefreshComponents()
    }

    function showPasswordClick(e: IWorker) {
        e.status.show_password = true;
        forceRefreshComponents()
    }

    function copy(e: string) {
        ShowNotification.success('Copy successfull');
        if (e) {
            navigator.clipboard.writeText(e);
        }
    }

    return (
        <>
            <h1>Workers <AddIcon className={styles.addIcon} onClick={() => setRegisterWindow(true)} /></h1>
            <p>Workers that will be used to run the server instances<br /></p>
            <nav style={{ display: registerWindow ? "initial" : "none" }}>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault() }}>
                    <button className={styles.closeRegisterButton} onClick={() => setRegisterWindow(false)}>x</button>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="ip">IP</label>
                    <input name="ip" type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
                    <label htmlFor="port">Port</label>
                    <input name="port" type="number" value={(port <= 0 ? '' : port)} onChange={(e) => setPort(Number.parseInt(e.target.value))} />
                    <label htmlFor="key">Key</label>
                    <input type="text" name="key" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" value="Add" onClick={createWorker} />
                </form>
            </nav>

            {worker.map((e) => {
                return (
                    <section className={styles.worker} key={e.id} >
                        <div className={styles.name}>
                            <span>{name ? name : '-'}</span>
                        </div>
                        <div className={styles.container}>
                            <span className={styles.label}>
                                <IpIcon />
                                {e.ip}
                                <CopyIcon className={styles.copy} onClick={() => copy(e.ip)} />
                            </span>

                            <span className={styles.label}>
                                <PortIcon />
                                {e.port}
                                <CopyIcon className={styles.copy} onClick={() => copy(e.port.toString())} />
                            </span>

                            <span className={`${styles.label}`}><PasswordIcon />
                                <span className={`${styles.password} ${styles.scroll}`}>{(e.status.show_password ? e.password : '************')}</span>
                                {(e.status.show_password ? <HiddenPasswordIcon onClick={() => hiddenPasswordClick(e)} /> : <ShowPasswordIcon onClick={() => showPasswordClick(e)} />)}
                                <CopyIcon className={styles.copy} onClick={() => copy(e.password)} />
                            </span>

                        </div>
                        <DeleteIcon className={styles.deleteIcon} />
                        {e.status.online ? <OnlineIcon className={styles.onlineIcon} /> : <OfflineIcon className={styles.offlineIcon} />}
                    </section>
                )
            })}
        </>
    )
}