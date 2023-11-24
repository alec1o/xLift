class StatusKey {
    static Ok: string = "ok"
    static Message: string = "error"
    static Status: string = "status"

    static toJson(ok: boolean, message: any, status: number) {
        const json = 
        `
        {
            "${this.Ok}": ${ok},
            "${this.Message}": ${message},
            "${this.Status}": ${status}
        }
        `

        return json
    }
}

export default StatusKey