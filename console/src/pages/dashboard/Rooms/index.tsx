import style from "./styles.module.css"
import mainStyle from "../styles.module.css"
import { AiOutlineSisternode, AiFillDelete } from "react-icons/ai"
import { TbCirclePlus } from "react-icons/tb"
import { SiDocker } from "react-icons/si"
import { DiTerminal } from "react-icons/di"

export default function Rooms() {
    return (
        <main className={style.main}>
            <div className={style.content}>
                <ul className={style.output}>
                    <li>
                        <h2 className={`${style.subTitle} ${mainStyle.LED}`}>Rooms</h2>
                    </li>
                    <li>
                        <button className={style.instance}>
                            <h1><span className={mainStyle.LED}>1v1</span></h1>
                            <div className={style.info}>
                                <p><SiDocker /> container:latest</p>
                                <p><DiTerminal /> --init-server --1v1</p>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button className={style.instance}>
                            <h1><span className={mainStyle.LED}>2v2</span></h1>
                            <div className={style.info}>
                                <p><SiDocker /> container:latest</p>
                                <p><DiTerminal /> --init-server --2v2</p>
                            </div>
                        </button>
                    </li>
                </ul>
                <form className={style.form}>
                    <div className={style.inputArea}>
                        <h2 className={`${style.subTitle} ${mainStyle.LED}`}>
                            Room
                            <button className={style.createColor}><TbCirclePlus /></button>
                            <button className={style.deleteColor}><AiFillDelete /></button>
                        </h2>
                        <input required type="text" placeholder="room name" minLength={3} />
                        <input required type="number" placeholder="min users" min={1} />
                        <input required type="number" placeholder="max users" min={1} />
                        <input required type="number" placeholder="matchmaking timeout (ms)" min={1} />
                        <input required type="text" placeholder="container image" minLength={3} />
                        <input required type="text" placeholder="container params" minLength={3} />
                        <input required type="number" placeholder="max container cpu (priority)" min={1} />
                        <input required type="number" placeholder="max container ram (mb)" min={1} />
                        <input type="submit" value="Register" />
                    </div>
                    <ul className={style.portArea}>
                        <li>
                            <h2 className={`${style.subTitle} ${mainStyle.LED}`}>Ports <button className={style.createColor}><AiOutlineSisternode /></button></h2>
                        </li>
                        <li>
                            <input required type="text" placeholder="name" minLength={5} maxLength={32} />
                            <input required type="number" placeholder="value" min={1} max={65535} />
                            <button className={style.deleteColor}><AiFillDelete /></button>
                        </li>
                    </ul>
                </form >
            </div>
        </main >
    )
}