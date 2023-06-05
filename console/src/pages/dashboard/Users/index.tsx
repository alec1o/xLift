import style from "./styles.module.css"

export default function Users() {
    return (
        <>
            <main className={style.Main}>
                <section className={style.FilterSection}>
                    <form>
                        <div className={style.FilterFormJoiner}>
                            <label htmlFor="start">Start At</label>
                            <input type="datetime-local" name="start" />
                        </div>
                        <div className={style.FilterFormJoiner}>
                            <label htmlFor="end">End At</label>
                            <input type="datetime-local" name="end" />
                        </div>
                        <input type="submit" value="Search" />
                    </form>
                </section>
                <section className={style.ResultSection}>
                    <section className={style.SearchSection}>
                        <h2>Users</h2>
                        <form>
                            <input type="search" />
                            <input type="submit" value="Search" />
                        </form>
                    </section>
                    <section className={style.TableSection}>
                        <table className={style.Table}>
                            <tr>
                                <th>Sub</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                            <tr>
                                <th>123</th>
                                <th><input type="datetime-local" name="" /></th>
                                <th>Online</th>
                            </tr>
                        </table>

                        <form>
                            <select>
                                <option value="00">All</option>
                                <option value="05">05 row</option>
                                <option value="10">10 row</option>
                                <option value="15" selected={true}>15 row</option>
                                <option value="20">20 row</option>
                                <option value="30">30 row</option>
                                <option value="50">50 row</option>
                            </select>
                            <section>
                                <button>--:</button>
                                <button>-:</button>
                                <span>1/10</span>
                                <button>:-</button>
                                <button>:--</button>
                            </section>
                            <input type="submit" value="Apply" />
                        </form>
                    </section>
                </section>
            </main>
        </>
    )
}