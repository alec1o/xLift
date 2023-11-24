import ENV from "../server/env"


class Validator {
    static IsValidApiKey(value: any) {
        if (ENV.API_KEY) return value == ENV.API_KEY
        // If api-key is empty, it will always all requests
        return true
    }

    static GB_NUMBER: number = 1073741824
}

export default Validator