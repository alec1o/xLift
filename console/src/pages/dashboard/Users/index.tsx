export default function Users() {
    return (
        <>
            <main>
                <section>
                    <form>
                        <label htmlFor="start"></label>
                        <input type="datetime-local" name="start" />
                        <label htmlFor="end"></label>
                        <input type="datetime-local" name="end" />
                        <input type="submit" value="Search" />
                    </form>
                </section>
                <div>
                    <section>
                        <h2>Users</h2>
                        <form>
                            <input type="search" />
                            <input type="submit" value="Search" />
                        </form>
                    </section>
                    <section>
                        <table>
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
                            <select name="" id="">
                                <option value="00">All</option>
                                <option value="05">05 row</option>
                                <option value="10">10 row</option>
                                <option value="15" selected>15 row</option>
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
                            <input type="submit" value="" />
                        </form>
                    </section>
                </div>
            </main>
        </>
    )
}