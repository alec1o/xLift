import { Request, Response, Router } from "express";
import StatusKey from "../../utils/StatusKey";
import ENV from "../env";

class SystemController {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    get(req: Request, res: Response) {

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
                "used": 0,
                "free": 0,
                "total": 0
            },
            "storage": {
                "used": 0,
                "free": 0,
                "total": 0
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
