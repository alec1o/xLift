import style from "../Users/styles.module.css";
import mainStyle from "../styles.module.css";
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight, TbSearch } from "react-icons/tb";

export default function Matches() {
    return (
        <>
            <main className={style.Main}>
                <section className={style.ResultSection}>
                    <section className={style.SearchSection}>
                        <h2 className={`${style.Title} ${mainStyle.LED}`}>Matches</h2>
                        <form className={style.FindUser}>
                            <input type="search" placeholder="Search" />
                            <button title="Enter JWT.sub" type="submit">
                                <TbSearch />
                            </button>
                        </form>
                    </section>
                    <section className={style.TableSection}>
                        <table className={style.Table}>
                            <tr className={style.MainTableLine}>
                                <th style={{ width: "calc(100%/5)" }}>ID</th>
                                <th style={{ width: "calc(100%/2)" }}>Host</th>
                                <th style={{ width: "calc(100%/8)" }}>Room</th>
                                <th style={{ width: "calc(100%/10)" }}>User</th>
                                <th style={{ width: "calc(100%/10)" }}>Time</th>
                            </tr>
                            <tr>
                                <th>123</th>
                                <th className={style.NormalFont}>{JSON.stringify([{ "udp": "127.0.0.1:2201" }, { "tcp": "127.0.0.1:2202" }, { "chat-tcp": "127.0.0.1:2203" }])}</th>
                                <th>1v1</th>
                                <th>2</th>
                                <th>1h</th>
                            </tr>
                        </table>

                        <form className={style.LocateArea}>
                            <select className={style.LocateRow}>
                                <option value="00">All</option>
                                <option value="05">05 row</option>
                                <option value="10">10 row</option>
                                <option value="15" selected={true}>15 row</option>
                                <option value="20">20 row</option>
                                <option value="30">30 row</option>
                                <option value="50">50 row</option>
                            </select>
                            <section className={style.LocateButton}>
                                <button><TbChevronsLeft /></button>
                                <button><TbChevronLeft /></button>
                                <span>1/10</span>
                                <button><TbChevronRight /></button>
                                <button><TbChevronsRight /></button>
                            </section>
                        </form>
                    </section>
                </section>
            </main>
        </>
    );
}