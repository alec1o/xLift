import { FormEvent, FormEventHandler, useState } from "react"

export interface IStatus {
    memory: number,
    storage: number,
    cpu: number
}

export interface IWorker {
    workerName: string,
    ip: string,
    port: number,
    status: IStatus
}

export default function WorkerPage() {

    const [worker, setWorker] = useState([] as unknown as IWorker[])
    const [ip, setIp] = useState("")
    const [port, setPort] = useState(0)
    const [name, setName] = useState("");

    function Submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const m_worker = { workerName: name, port: port, ip: ip, status: { memory: 0, storage: 0, cpu: 0 } } as IWorker

        setWorker([...worker, m_worker])
    }

    return (
        <>
            <h1>Workers</h1>
            <p>Descriptions...</p>
            <nav>
                <form onSubmit={Submit}>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="ip">IP</label>
                    <input name="ip" type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
                    <label htmlFor="port">Port</label>
                    <input name="port" type="number" value={(port <= 0 ? '' : port)} onChange={(e) => setPort(Number.parseInt(e.target.value))} />
                    <input type="submit" value="Add" />
                </form>
            </nav>
            {worker.map((e) => {
                return (
                    <section>
                        <h1>{e.workerName}</h1>
                    </section>
                )
            })}

        </>
    )
}