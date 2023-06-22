import style from "../Rooms/styles.module.css";
import mainStyle from "../styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { TbCirclePlus } from "react-icons/tb";
import { FaMemory } from "react-icons/fa";
import { BsCloudFill } from "react-icons/bs";
import { MdSignalWifi4Bar as WifiOn, MdSignalWifiBad as WifiOff } from "react-icons/md";
import { useState } from "react";
import { globalAgent } from "http";

export default function Clusters(props: any) {
    const clusters = props.clusters as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number }[]
    const [selected, setSelected] = useState('')
    const [selectData, setSelectData] = useState({} as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number })
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [port, setPort] = useState(0)

    function select(id: string) {
        let data = {} as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number }

        clusters.forEach((e) => {
            if (e.id == id) {
                data = e
            }
        })

        setSelectData(data)
        setSelected(id)
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
                                setSelected('')
                            }}><TbCirclePlus /></button>
                            {(selected) ?
                                <button className={style.deleteColor} onClick={(e) => {
                                    e.preventDefault()
                                    setSelected('')
                                    // @ts-ignore
                                    // destroy 
                                    const ws = global.ws as WebSocket

                                    ws.send(JSON.stringify({
                                        sisma: "CLUSTER.REMOVE",
                                        id: selectData.id
                                    }))

                                    setTimeout(() => {
                                        ws.send(JSON.stringify({
                                            sisma: "CLUSTER.SHOWALL"
                                        }))
                                    }, 1000)

                                }}><AiFillDelete /></button>
                                : <></>
                            }
                        </h2>
                        {(selected) ?
                            <>
                                <input type="text" value={selectData.name} placeholder="worker name" />
                                <input type="text" value={selectData.host} placeholder="ip address (ipv4/ipv6/domain)" />
                                <input type="text" value={selectData.port} placeholder="port" />
                                <input type="text" value={selectData.ram} placeholder="ram (gb)" />
                                <input type="text" value={selectData.storage} placeholder="storage (gb)" />
                            </> : <>
                                <input required onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="worker name" minLength={3} />
                                <input required onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="ip address (ipv4/ipv6/domain)" minLength={3} />
                                <input required onChange={(e) => setPort(Number.parseInt(e.target.value))} value={port > 0 ? port : ''} type="number" placeholder="port" min={1} />
                                <input type="submit" value="Register" />
                            </>
                        }
                    </div>
                </form >
            </div>
        </main >
    );
}