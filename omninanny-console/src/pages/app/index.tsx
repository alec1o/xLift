import AppHeader from "@/components/AppHeader"
import styles from "./styles.module.css"
import AppSideBar from "@/components/AppSideBar"
import { useState } from "react"
import MenuOptions from "@/utils/MenuOptions"
import WorkerPage from "./WorkerPage"
import FleetPage from "./FleetPage"
import StatusPage from "./StatusPage"
import ServerPage from "./ServerPage"

export default function Index() {
    const [page, setPage] = useState(MenuOptions.Status)

    function getCurrentPage() {
        switch (page) {
            case MenuOptions.Server: return <ServerPage />
            case MenuOptions.Status: return <StatusPage />
            case MenuOptions.Worker: return <WorkerPage />
            case MenuOptions.Fleet: return <FleetPage />
            default:
                return (
                    <>
                        <h1>"{page}" Not found.</h1>
                    </>
                )
        }
    }

    return (
        <>
            <AppHeader />

            <div id={styles.container}>

                <AppSideBar page={page} setProp={setPage} />

                <main id={styles.main}>

                    {getCurrentPage()}

                </main>
            </div>
        </>
    )
}