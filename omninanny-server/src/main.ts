import express, { Express } from "express"
import env from "./env"
import router from "./routers"

const app: Express = express()

app.use(express.json())
app.use(router)

app.listen(env.PORT, env.HOST, () => {
    console.log(`Omninanny server started at: ${env.HOST}:${env.PORT}`)
});