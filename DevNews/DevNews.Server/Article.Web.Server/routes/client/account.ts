import * as express from 'express'
import { Request, Response } from 'express-serve-static-core';
import { Activation, Login, SignUp } from '../../model/account';
import Account from '../../service/service/Account';
const router = express.Router();
const _account = new Account()


router.post("/Login", async (req: Request, res: Response) => {
    let body = req.body
    let model: Login = { userName: body.userName, password: body.password }
    let login = await _account.login(model)
    res.json(login)
    res.end()
})

router.post("/SignUp", async (req: Request, res: Response) => {
    let body = req.body
    let model: SignUp = { userName: body.userName, password: body.password, email: body.email, fullName: body.fullName, phoneNumber: body.phoneNumber }
    let signup = await _account.signUp(model)
    res.json(signup)
    res.end()
})

router.post("/Activation", async (req: Request, res: Response) => {
    let body = req.body
    let model: Activation = { userName: body.userName, activeCode: body.activeCode }
    let activation = await _account.activation(model)
    res.json(activation)
    res.end()
})

export default router