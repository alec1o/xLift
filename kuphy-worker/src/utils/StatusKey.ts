class StatusKey {
    static Ok: string = "ok"
    static Data: string = "data"
    static Status: string = "status"

    static toJson(ok: boolean, data: any, status: number) {

        let m_data = JSON.stringify(data)

        const json = `
        {
            "${this.Ok}": ${ok},
            "${this.Data}": ${m_data},
            "${this.Status}": ${status}
        }`

        return json
    }
}

export default StatusKey