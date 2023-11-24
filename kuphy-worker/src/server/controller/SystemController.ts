import { Request, Response, Router } from "express";
import StatusKey from "../../utils/StatusKey";
import ENV from "../env";
import os from "os"
import Validator from "../../utils/Validator";
import * as checkDiskSpace from "check-disk-space"

class SystemController {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    async get(req: Request, res: Response) {

        const totalMemory = Number.parseFloat((os.totalmem() / Validator.GB_NUMBER).toFixed(2))
        const freeMemory = Number.parseFloat((os.freemem() / Validator.GB_NUMBER).toFixed(2))
        const usedMemory = Number.parseFloat((totalMemory - freeMemory).toFixed(2))

        const diskPath =
            os.platform().toLocaleLowerCase().trim() == "win32".toLocaleLowerCase().trim()
                ? "C:"
                : "/";

        const storageInfo = await checkDiskSpace.default(diskPath)
        const totalStorage = Number.parseFloat((storageInfo.size / Validator.GB_NUMBER).toFixed(2))
        const freeStorage = Number.parseFloat((storageInfo.free / Validator.GB_NUMBER).toFixed(2))
        const usedStorage = Number.parseFloat((totalStorage - freeStorage).toFixed(2))

        const data = {
            "metadata": {
                "name": "Kuphy",
                "version": ENV.APP_VERSION,
                "website": "https://kuphy.kezero.com",
                "companny": "https://www.kezero.com",
                "owner": "https://www.alec1o.com",
                "docs": "https://kuphy.docs.kezero.com",
            },
            "memory": {
                "used": usedMemory,
                "free": freeMemory,
                "total": totalMemory
            },
            "storage": {
                "used": usedStorage,
                "free": freeStorage,
                "total": totalStorage
            },
            "fleet": {
                "online": 0,
                "offline": 0,
                "total": 0,
            },
            "server":
            {
                "length": 0
            }
        }

        const status = 200

        res.status(status).send(StatusKey.toJson(true, data, status))
    }
}

export default SystemController
