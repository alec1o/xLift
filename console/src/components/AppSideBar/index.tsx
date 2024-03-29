import MenuOptions from "@/utils/MenuOptions";
import styles from "./styles.module.css";
import Link from "next/link";
import { FleetIcon, ServerIcon, StatusIcon, WorkerIcon } from "@/utils/icons";

interface IProps {
    page: MenuOptions,
    setProp: (page: MenuOptions) => unknown
}

export default function AppSideBar({ page, setProp }: IProps) {

    function buttonStyle(index: MenuOptions) {
        return `${styles.button} ${(page == index) ? styles.selected : ''}`
    }

    return (
        <>
            <aside id={styles.main}>
                <button className={buttonStyle(MenuOptions.Status)} onClick={_ => setProp(MenuOptions.Status)}><StatusIcon className={styles.icon}/> Status</button>
                <button className={buttonStyle(MenuOptions.Server)} onClick={_ => setProp(MenuOptions.Server)}><ServerIcon className={styles.icon}/> Servers</button>
                <button className={buttonStyle(MenuOptions.Worker)} onClick={_ => setProp(MenuOptions.Worker)}><WorkerIcon className={styles.icon}/> Workers</button>
                <button className={buttonStyle(MenuOptions.Fleet)} onClick={_ => setProp(MenuOptions.Fleet)}><FleetIcon    className={styles.icon}/> Fleets</button>
                <Link id={styles.copyright} target="_blank" href="https://www.alec1o.com/">@alec1o</Link>
            </aside >
        </>
    )
}