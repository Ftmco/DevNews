import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import { ProfileModel } from '../../model/account';
import Profile from '../../service/service/Profile'
const router = express.Router()
const _profile = new Profile();

router.get("/Get", async (req: Request, res: Response) => {
    let profile = await _profile.get(req.headers)
    res.json(profile)
    res.end()
})

router.post("/Update", async (req: Request, res: Response) => {
    let body = req.body
    let profile: ProfileModel = {
        image: body.image,
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        userName: body.userName
    }
    let updateProfile = await _profile.update(req.headers, profile)
    res.json(updateProfile)
    res.end()
})

export default router;