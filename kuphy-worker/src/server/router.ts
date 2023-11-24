import express, { Request, Router } from "express"
import RootController from "./controller/RootController"
import SystemController from "./controller/SystemController"
import FleetController from "./controller/FleetController"
import routeCache from "route-cache"

const router: Router = Router()

router.use(express.json())

// Root
router.get("/", new RootController(router).all)

// System
router.get("/system", routeCache.cacheSeconds(60, "[GET]/system"), new SystemController(router).get)

// Fleet
router.get("/fleet", new FleetController(router).get)
router.post("/fleet", new FleetController(router).post)
router.delete("/fleet", new FleetController(router).delete)


export default router
