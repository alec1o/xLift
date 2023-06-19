import style from "../Rooms/styles.module.css";
import mainStyle from "../styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { TbCirclePlus } from "react-icons/tb";
import { RiCpuLine } from "react-icons/ri";
import { MdSignalWifi4Bar as WifiOn, MdSignalWifiBad as WifiOff } from "react-icons/md";

export default function Clusters(props: any) {
    const clusters = props.clusters as { id: string, ram: number, key: string, port: number, name: string, host: string, storage: number }[]

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
                        <li key={e.key}>
                            <button className={style.instance}>
                                <h1><span className={mainStyle.LED}>Cluster</span></h1>
                                <div className={style.info}>
                                    <p>{true ? <WifiOn className={style.createColor} /> : <WifiOff className={style.deleteColor} />} {e.host} : {e.port}</p>
                                    <p><RiCpuLine /> {e.ram} GB</p>
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
                            <button className={style.createColor}><TbCirclePlus /></button>
                            <button className={style.deleteColor}><AiFillDelete /></button>
                        </h2>
                        <input required type="text" placeholder="worker name" minLength={3} />
                        <input required type="text" placeholder="ip address (ipv4/ipv6/domain)" minLength={3} />
                        <input required type="number" placeholder="port" min={1} />
                        <input value="" type="number" placeholder="ram (mb)" />
                        <input value="" type="number" placeholder="storage (bg)" />
                        <input type="submit" value="Register" />
                    </div>
                </form >
            </div>
        </main >
    );
}