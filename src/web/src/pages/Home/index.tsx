import Header from '../../componets/Header';
import style from './style.module.css';

export default function Home() {
    return (
        <div className={style.app}>
            <Header />

            <main>
                <h1 className={style.title}>Home</h1>
            </main>
        </div>
    )
}