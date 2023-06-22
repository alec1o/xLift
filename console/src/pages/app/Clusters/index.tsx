import style from "../Rooms/styles.module.css";
import mainStyle from "../styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { TbCirclePlus } from "react-icons/tb";
import { FaMemory } from "react-icons/fa";
import { BsCloudFill } from "react-icons/bs";
import { MdSignalWifi4Bar as WifiOn, MdSignalWifiBad as WifiOff } from "react-icons/md";
import { useState } from "react";

export default function Clusters(props: any) {
    const clusters = props.clusters as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number }[]
    const [selectedCluster, setSelectedCluster] = useState('')
    const [clusterData, setClusterData] = useState({} as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number })
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [port, setPort] = useState(0)
    const [key, setKey] = useState('')

    function select(id: string) {
        let data = {} as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number }

        clusters.forEach((e) => {
            if (e.id == id) {
                data = e
            }
        })

        setClusterData(data)
        setSelectedCluster(id)
    }

    console.log(clusters)

    return (
        <main className={style.main}>
            <div className={style.content}>
                <ul className={style.output}>
                    <li>
                        <h2 className={`${style.subTitle} ${mainStyle.LED}`}>Workers</h2>
                    </li>
                    {clusters.map((e) =>
                    (
                        <li key={`${e.host}:${e.port}`}>
                            <button className={style.instance} onClick={_ => select(e.id)}>
                                <h1 style={{ fontSize: "14px" }}><span className={mainStyle.LED}>{e.name || "Cluster"}</span></h1>
                                <div className={style.info}>
                                    <p>{true ? <WifiOn className={style.createColor} /> : <WifiOff className={style.deleteColor} />} {e.host} : {e.port}</p>
                                    <p><FaMemory /> {e.ram} GB</p>
                                    <p><BsCloudFill /> {e.storage} GB</p>
                                </div>
                            </button>
                        </li>
                    )
                    )}
                </ul>
                <form className={style.form}>
                    <div className={style.inputArea}>
                        <h2 className={`${style.subTitle} ${mainStyle.LED}`}>
                            Worker
                            <button className={style.createColor} onClick={e => {
                                e.preventDefault()
                                setSelectedCluster('')
                            }}><TbCirclePlus /></button>
                            {(selectedCluster) ?
                                <button className={style.deleteColor} onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedCluster('')
                                    // @ts-ignore
                                    // destroy 
                                    const ws = global.ws as WebSocket

                                    ws.send(JSON.stringify({
                                        sisma: "CLUSTER.REMOVE",
                                        id: clusterData.id
                                    }))

                                    setTimeout(() => {
                                        ws.send(JSON.stringify({
                                            sisma: "CLUSTER.SHOWALL"
                                        }))
                                    }, 100)

                                }}><AiFillDelete /></button>
                                : <></>
                            }
                        </h2>
                        {(selectedCluster) ?
                            <>
                                <input type="text" value={clusterData.name} placeholder="worker name" />
                                <input type="text" value={clusterData.host} placeholder="ip address (ipv4/ipv6/domain)" />
                                <input type="text" value={clusterData.port} placeholder="port" />
                                <input type="text" value={clusterData.ram} placeholder="ram (gb)" />
                                <input type="text" value={clusterData.storage} placeholder="storage (gb)" />
                            </> : <>
                                <input required onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="worker name" minLength={3} />
                                <input required onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="ip address (ipv4/ipv6/domain)" minLength={3} />
                                <input required onChange={(e) => setPort(Number.parseInt(e.target.value))} value={port > 0 ? port : ''} type="number" placeholder="port" min={1} />
                                <input required onChange={(e) => setKey(e.target.value)} value={key} type="text" placeholder="sisma key" minLength={3} />
                                <input type="submit" value="Register" onClick={_ => {
                                    _.preventDefault()

                                    // @ts-ignore
                                    // destroy 
                                    const ws = global.ws as WebSocket

                                    ws.send(JSON.stringify({
                                        sisma: "CLUSTER.ADD",
                                        host: address,
                                        name: name,
                                        port: port,
                                        key: key,
                                    }))

                                    setTimeout(() => {
                                        ws.send(JSON.stringify({
                                            sisma: "CLUSTER.SHOWALL"
                                        }))
                                    }, 3000)

                                    setAddress('')
                                    setKey('')
                                    setName('')
                                    setPort(0)
                                    setSelectedCluster('')
                                }} />
                            </>
                        }
                    </div>
                </form >
            </div>
        </main >
    );
}