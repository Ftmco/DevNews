import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import IGroup from '../../service/rule/IGroup';
import Group from '../../service/service/Group';
const router = express.Router()
let _group: IGroup = new Group()

router.get("/Get", async (req: Request, res: Response) => {
    let groups = await _group.getGroups()
    res.json(groups)
    res.end()
})

export default router