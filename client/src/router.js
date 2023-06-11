const express = require("express")
const authMiddleware = require("./middleware/auth")
const router = express.Router()

const handler = (req, res) => {
    res.status(200).json({ "message": "hello world" })
}

router.get("*", authMiddleware, handler)
router.post("*", authMiddleware, handler)
router.delete("*", authMiddleware, handler)
router.put("*", authMiddleware, handler)
router.patch("*", authMiddleware, handler)

module.exports = router