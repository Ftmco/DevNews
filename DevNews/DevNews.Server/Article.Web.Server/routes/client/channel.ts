import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import { ChannelModel } from '../../model/channel'
import IChannel from '../../service/rule/IChannel'
import Channel from '../../service/service/Channel'
const router = express.Router()
const _channel: IChannel = new Channel()

router.get("/Get", async (req: Request, res: Response) => {
    let channels = await _channel.getUserChannels(req.headers)
    res.json(channels)
    res.end()
})

router.get("/GetTemproryChannels", async (req: Request, res: Response) => {
    let temproryItems = await _channel.getTemporaryChannelItems(req.headers)
    res.json(temproryItems)
    res.end()
})

router.post("/Create", async (req: Request, res: Response) => {
    let body = req.body
    let model: ChannelModel = {
        avatar: body.avatar,
        title: body.title,
        link: body.link,
        name: body.name,
        token: '',
        id: ''
    }
    let channel = await _channel.createChannel(model, req.headers)
    res.json(channel)
    res.end()
})

router.get("/Channel", async (req: Request, res: Response) => {
    let token = req.query.token.toString()
    let channel = await _channel.getChannel(token, req.headers)
    res.json(channel)
    res.end()
})

router.post("/Follow", async (req: Request, res: Response) => {
    let token = req.body.token
    let follow = await _channel.followChannel(token, req.headers)
    res.json(follow)
    res.end()
})

export default router