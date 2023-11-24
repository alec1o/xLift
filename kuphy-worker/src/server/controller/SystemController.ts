import { Request, Response, Router } from "express";
import StatusKey from "../../utils/StatusKey";

class SystemController {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    get(req: Request, res: Response) {
        res.status(501).send(StatusKey.toJson(false, "not impl.", 501))
    }
}

export default SystemController
