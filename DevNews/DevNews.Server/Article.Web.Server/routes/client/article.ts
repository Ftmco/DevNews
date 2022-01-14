import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import { UpsertArticle } from '../../model/article'
import IArticle from '../../service/rule/IArticle'
import Article from '../../service/service/Article'
const router = express.Router()
const _article: IArticle = new Article()

router.post("/Create", async (req: Request, res: Response) => {
    let body = req.body
    let article: UpsertArticle = {
        title: body.title,
        text: body.text,
        shortDescription: body.shortDescription,
        file: body.file,
        attachments: body.attachments,
        channelToken: body.channelToken,
        isActive: body.isActive,
        ownerType: body.ownerType,
        tags: body.tags
    }
    let create = await _article.createArticle(article, req.headers)
    res.json(create)
    res.end()
})

export default router