import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import { ChannelModel } from '../../model/channel'
import { PostModel, PostType } from '../../model/post'
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

router.get("/Posts", async (req: Request, res: Response) => {
    let token = req.query.token.toString()
    let posts = await _channel.getChannelPosts(token)
    res.json(posts)
    res.end()
})

router.post("/SendMessage", async (req: Request, res: Response) => {
    let body = req.body
    let message: PostModel = {
        type: PostType.Message,
        post: {
            message: body.message,
            token: body.token,
            file: body.file,
        }
    }
    let sendMessage = await _channel.sendPost(message, req.headers)
    res.json(sendMessage)
    res.end()
})

router.get("/Leave", async (req: Request, res: Response) => {
    let token = req.query.token.toString()
    let leave = await _channel.leaveChannel(token, req.headers)
    res.json(leave)
    res.end()
})

export default router