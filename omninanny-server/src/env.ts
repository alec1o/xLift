import * as dotenv from "dotenv"
import { env } from "process";
dotenv.config()

const path = {
    HOST: process.env.HOST as string ?? "127.0.0.1",
    PORT: Number.parseInt(process.env.PORT as string ?? "10101"),
}

// @ts-ignore
if (!global.initEnv) {
    console.log("Env\n", path)

    // @ts-ignore
    global.initEnv = true;
}

export default path;