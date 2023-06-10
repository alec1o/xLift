import style from "../Rooms/styles.module.css"
import mainStyle from "../styles.module.css"

export default function Settings() {

    return (
        <main className={style.main}>
            <div className={style.content}>
                <form className={style.form}>
                    <div className={style.inputArea}>
                        <h2 className={`${style.subTitle} ${mainStyle.LED}`}>Setting</h2>
                        <input required type="text" placeholder="ip address (ipv4/ipv6/domain) - SISMA CORE" minLength={3} />
                        <input required type="number" placeholder="port - SISMA CORE" min={1} />
                        <input type="submit" value="Update" />
                    </div>
                </form >
            </div>
        </main >
    )
}