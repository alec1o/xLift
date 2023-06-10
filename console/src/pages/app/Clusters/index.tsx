import style from "../Rooms/styles.module.css";
import mainStyle from "../styles.module.css";
import { AiFillDelete } from "react-icons/ai";
import { TbCirclePlus } from "react-icons/tb";
import { RiCpuLine } from "react-icons/ri";
import { MdSignalWifi4Bar as WifiOn, MdSignalWifiBad as WifiOff } from "react-icons/md";

export default function Clusters() {

    return (
        <main className={style.main}>
            <div className={style.content}>
                <ul className={style.output}>
                    <li>
                        <h2 className={`${style.subTitle} ${mainStyle.LED}`}>Workers</h2>
                    </li>
                    <li>
                        <button className={style.instance}>
                            <h1><span className={mainStyle.LED}>VPS1 UK Digitalocean</span></h1>
                            <div className={style.info}>
                                <p>{true ? <WifiOn className={style.createColor} /> : <WifiOff className={style.deleteColor} />} 127.0.0.1 : 10101</p>
                                <p><RiCpuLine /> 4 GB</p>
                            </div>
                        </button>
                    </li>
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
                        <input required type="number" placeholder="ram (mb)" min={512} />
                        <input type="submit" value="Register" />
                    </div>
                </form >
            </div>
        </main >
    );
}