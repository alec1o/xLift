const KEY = process.env.SISMA_KEY

if (KEY) console.log(`SISMA_KEY: ${KEY}`)
else throw new Error("SISMA_KEY, Not founded")

function authMiddleware(req, res, next) {
    const { SISMA_KEY } = req.headers

    if (SISMA_KEY == KEY) {
        return next()
    }
    else {
        res.status(401).json({ code: 401, message: "Unauthorized" })
    }
}

module.exports = authMiddleware 