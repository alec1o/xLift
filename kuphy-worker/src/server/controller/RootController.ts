import { Request, Response, Router } from "express";
import ENV from "../env";

class RootController {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    all(req: Request, res: Response) {
        const status = 200
        console.log("req: /")

        return res.status(status).json({
            "appname": ENV.APP_NAME,
            "message": `Welcome to ${ENV.APP_NAME} API`,
            "status": status,
            "homepage": "https://kuphy.kezero.com",
            "docs": "https://kuphy.docs.kezero.com",
            "repository": "https://github.com/alec1o/kuphy",
            "license": "MIT",
            "poweredby": [
                { "name": "KeZero", "type": "Companny" },
                { "name": "Alecio Furanze", "type": "Maintener" }
            ]
        })
    }
}

export default RootController