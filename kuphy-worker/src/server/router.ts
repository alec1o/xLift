import express, { Router } from "express"
import RootController from "./controller/RootController"
import InstanceController from "./controller/InstanceController"

const router: Router = Router()

router.use(express.json())

router.get("/", new RootController(router).all)

router.get("/instance", new InstanceController(router).get)
router.post("/instance", new InstanceController(router).post)
router.delete("/instance", new InstanceController(router).delete)

export default router