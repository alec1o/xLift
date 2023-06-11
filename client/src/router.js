const express = require("express")
const authMiddleware = require("./middleware/auth")
const router = express.Router()

const DOCKER_HOST = process.env.DOCKER_HOST
const DOCKER_PORT = process.env.DOCKER_PORT

if (!DOCKER_HOST) throw new Error("DOCKER_HOST Not founded")
if (!DOCKER_PORT) throw new Error("DOCKER_PORT Not founded")


const handler = (req, res) => {
    res.status(200).json({ "message": "hello world" })
}

router.get("*", authMiddleware, handler)
router.post("*", authMiddleware, handler)
router.delete("*", authMiddleware, handler)
router.put("*", authMiddleware, handler)
router.patch("*", authMiddleware, handler)

module.exports = router