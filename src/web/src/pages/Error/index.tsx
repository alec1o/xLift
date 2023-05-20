import Header from '../../componets/Header';
import style from './style.module.css';
import homeStyle from '../Home/style.module.css';

export default function Error() {
    return (
        <>
            <Header />
            <main className={`${homeStyle.app} ${homeStyle.main}`}>
                <h1 className={style.title}>404<span>page not found</span></h1>
            </main>
        </>
    )
}