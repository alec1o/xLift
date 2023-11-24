import express, { Request, Router } from "express"
import RootController from "./controller/RootController"
import SystemController from "./controller/SystemController"
import InstanceController from "./controller/InstanceController"
import routeCache from "route-cache"

const router: Router = Router()

router.use(express.json())

// Root
router.get("/", new RootController(router).all)

// System
router.get("/system", routeCache.cacheSeconds(60, "[GET]/system"), new SystemController(router).get)

// Instance
router.get("/instance", new InstanceController(router).get)
router.post("/instance", new InstanceController(router).post)
router.delete("/instance", new InstanceController(router).delete)


export default router
