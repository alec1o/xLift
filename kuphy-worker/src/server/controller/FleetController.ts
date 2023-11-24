import { Request, Response, Router } from "express";
import StatusKey from "../../utils/StatusKey";

class FleetController {

    router: Router

    constructor(router: Router) {
        this.router = router
    }

    get(req: Request, res: Response) {
        res.status(501).send(StatusKey.toJson(false, "not impl.", 501))
    }

    post(req: Request, res: Response) {
        res.status(501).send(StatusKey.toJson(false, "not impl.", 501))
    }

    delete(req: Request, res: Response) {
        res.status(501).send(StatusKey.toJson(false, "not impl.", 501))
    }

}

export default FleetController