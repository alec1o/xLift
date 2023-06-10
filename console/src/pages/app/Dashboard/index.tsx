import style from "./styles.module.css"
import mainStyle from "../styles.module.css"

export default function Dashboard() {
    return (
        <main id={style.main}>
            <h1 className={`${mainStyle.LED} ${style.Title}`}>Dashboard</h1>

            <section className={style.dashCircle}>
                <article className={style.circle}>
                    <svg className={style.volume}>
                        <circle cx="100" cy="100" r="80" />
                        <circle cx="100" cy="100" r="80" />
                    </svg>
                    <p>
                        <span>45%</span>
                    </p>
                </article>
                <article className={style.values}>
                    <p>RAM total: {Math.floor(32)}GB</p>
                    <p>RAM used: {(32 * .451).toFixed(2)}GB</p>
                </article>
            </section>

            <section className={style.dashCircle}>
                <article className={style.circle}>
                    <svg className={style.volume}>
                        <circle cx="100" cy="100" r="80" />
                        <circle cx="100" cy="100" r="80" />
                    </svg>
                    <p>
                        <span>45%</span>
                    </p>
                </article>
                <article className={style.values}>
                    <p>live matches: {132}</p>
                    <p>RAM per match: ~{(0.256).toFixed(2)}GB</p>
                </article>
            </section>

            <section className={style.dashCircle}>
                <article className={style.circle}>
                    <svg className={style.volume}>
                        <circle cx="100" cy="100" r="80" />
                        <circle cx="100" cy="100" r="80" />
                    </svg>
                    <p>
                        <span>45%</span>
                    </p>
                </article>
                <article className={style.values}>
                    <p>total users: {426}</p>
                    <p>users in matches: {267}</p>
                </article>
            </section>
        </main>
    )
}