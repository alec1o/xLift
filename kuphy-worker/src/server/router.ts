import express, { Router } from "express"
import RootController from "./controller/RootController"

const router: Router = Router()

router.use(express.json())

router.get("/", new RootController(router).all)

export default router