import * as express from 'express'
import { NextFunction, Request, Response } from 'express-serve-static-core'
const router = express.Router()


router.get("/Get", async (req: Request, res: Response, next: NextFunction) => {
    next()
})