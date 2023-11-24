import { Request, Response, Router } from "express";
import StatusKey from "../../utils/StatusKey";

class SystemController {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    get(req: Request, res: Response) {

        const data = {
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
