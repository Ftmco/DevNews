import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import Profile from '../../service/service/Profile'
const router = express.Router()
const _profile = new Profile();

router.get("/Get", async (req: Request, res: Response) => {
    let profile = await _profile.get(req.headers)
    res.json(profile)
    res.end()
})

export default router;