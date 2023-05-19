import Header from '../../componets/Header';
import style from './style.module.css';

export default function Home() {
    return (
        <div className={style.app}>
            <Header />

            <main className={style.main}>
                <form className={style.form} action="" method="post">
                    <h1 className={style.title}>Sisma</h1>
                    <input className={style.input} required placeholder='IP Address' type="text" name="ip" minLength={4} maxLength={128} />
                    <input className={style.input} required placeholder='Port' type="number" name="port" min={1} max={65535} />
                    <input className={style.input} required placeholder='Token' type="text" name="token" minLength={1} maxLength={512} />
                    <input className={style.input} id={style.button} type="submit" value="ENTER" />
                </form>
            </main>
        </div>
    )
}