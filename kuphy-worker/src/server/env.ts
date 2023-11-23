import * as dotenv from "dotenv"

//@ts-ignore
if (!global.INIT_DOTENV) {

    // Load Env
    dotenv.config()

    //@ts-ignore
    global.INIT_DOTENV = true
}

const ENV = {
    APP_NAME: process.env.APP_NAME ?? "Kuphy Worker",
    API_KEY: process.env.API_KEY ?? "",
    PORT: Number.parseInt(process.env.PORT ?? "10101"),
    HOST: process.env.HOST ?? "127.0.0.1"
}

export default ENV