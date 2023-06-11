const express = require("express")
const authMiddleware = require("./middleware/auth")
const { default: axios } = require("axios")
const router = express.Router()

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
        res.status(data.status).send(data.data)
    }
}

router.get("*", authMiddleware, async (req, res) => handler(req, res, "GET"))
router.post("*", authMiddleware, async (req, res) => handler(req, res, "POST"))
router.delete("*", authMiddleware, async (req, res) => handler(req, res, "DELETE"))
router.put("*", authMiddleware, async (req, res) => handler(req, res, "PUT"))
router.patch("*", authMiddleware, async (req, res) => handler(req, res, "PATCH"))
router.head("*", authMiddleware, async (req, res) => handler(req, res, "HEAD"))

module.exports = router