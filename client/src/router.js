const express = require("express")
const authMiddleware = require("./middleware/auth")
const { default: axios } = require("axios")
const router = express.Router()
const osu = require('node-os-utils')
const checkDiskSpace = require('check-disk-space').default
const opsys = process.platform;

let data = {}


const DOCKER_HOST = process.env.SISMA_DOCKER_HOST
const DOCKER_PORT = process.env.SISMA_DOCKER_PORT

if (!DOCKER_HOST) throw new Error("SISMA_DOCKER_HOST Not founded")
if (!DOCKER_PORT) throw new Error("SISMA_DOCKER_PORT Not founded")


const handler = async (req, res, method) => {
    const path = req.path
    const payload = req.body
    const param = req.query
    const url = `${DOCKER_HOST}:${DOCKER_PORT}${path}`

    const data = {
        status: 0,
        data: {}
    }

    try {
        const result = await axios({
            url: url,
            params: param,
            method: method,
            data: payload
        })
        data.status = result.status
        data.data = result.data
    } catch (e) {
        data.status = e.response.status
        data.data = e.response.data
    }
    finally {
        if (data.status <= 0) {
            data.status = 500
            data.data = {
                "code": 0,
                "message": "docker connection isn't active"
            }
        }
        res.status(data.status).send(data.data)
    }
}

router.get("/sisma", authMiddleware, async (req, res) => {
    res.status(200).json(data)
});


router.get("*", authMiddleware, async (req, res) => handler(req, res, "GET"))
router.post("*", authMiddleware, async (req, res) => handler(req, res, "POST"))
router.delete("*", authMiddleware, async (req, res) => handler(req, res, "DELETE"))
router.put("*", authMiddleware, async (req, res) => handler(req, res, "PUT"))
router.patch("*", authMiddleware, async (req, res) => handler(req, res, "PATCH"))
router.head("*", authMiddleware, async (req, res) => handler(req, res, "HEAD"))


async function info() {
    const memory = await osu.mem.info();
    const cpu = await osu.cpu.free();

    let path = "/"

    if ((opsys.toLowerCase()).includes("win")) {
        path = "C:\\"
    }

    const storage = await checkDiskSpace(path)

    data = {
        "ram": mbToGb(memory.totalMemMb),
        "ram_free": mbToGb(memory.freeMemMb),
        "ram_used": mbToGb(memory.usedMemMb),

        "storage": bytesToGb(storage.size),
        "storage_free": bytesToGb(storage.free),
        "storage_used": bytesToGb(storage.size - storage.free),

        "cpu": cpu ? ((100 - cpu) / 100).toFixed(2) : 0,
    }

    console.log(data)
    return data
}

function mbToGb(mbs) {
    return (mbs / 1024).toFixed(2)
}

function bytesToGb(bytes) {
    return (((bytes / 1024 /*byte -> kb*/) / 1024 /* kb -> mb */) / 1024 /* mb -> gb */).toFixed(2)
}

info();

setInterval(() => {
    info();
}, 1000 * 60)

module.exports = router