import * as express from 'express'
import { NextFunction, Request, Response } from 'express-serve-static-core'
import sequelize from '../../data base/context'
import Base from '../../service/base/Base'
const router = express.Router()
const _base = new Base(sequelize, 'Group')


router.use(async (req: Request, res: Response, next: NextFunction) => {
    next()
})


router.get("/Get", async (req: Request, res: Response) => {
    let page = parseInt(req.query.page.toString())
    let count = parseInt(req.query.count.toString())
    let objects = await _base.getAll({
        offset: page,
        limit: count
    });
    res.json({
        Status: true,
        Code: 200,
        Title: '',
        Result: objects
    })
    res.end();
})

router.post("/Create", (req: Request, res: Response) => {
    let body = req.body
})


export default router