require("dotenv").config()
const express = require("express")
const router = require("./router")
const bodyParser = require("body-parser")

const app = express()

const PORT = process.env.SISMA_PORT || 8080
const HOST = process.env.SISMA_HOST || "0.0.0.0"

app.use(bodyParser.json({ limit: "10mb" }))
app.use(router)

app.listen(PORT, HOST, () => {
    console.log(`server listening on http://${HOST}:${PORT}/}`)
})