import { log } from "console";
import sequelize from "../../data base/context";
import { exception, faild, success } from "../../model/api";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IArticle from "../rule/IArticle";
import IChannelFile from "../rule/IChannelFile";
import IPost from "../rule/IPost";
import Article from "./Article";
import ChannelFile from "./ChannelFile";

export default class Post implements IPost {

    private readonly _postBase: IBase;
       
    private readonly _article: IArticle;

    private readonly _channelFile: IChannelFile;

    constructor() {
        this._postBase = new Base(sequelize, "Post")
        this._channelFile = new ChannelFile()
        this._article = new Article()
    }

    async sendPost(post: any) {
        try {
            let postModel = {
                message: post.post.message,
                ChannelId: post.post.channelId,
            }
            let insert = await this._postBase.upsert(postModel)
            if (insert[1]) {
                await this._channelFile.saveFile({
                    objId: insert[0].id,
                    file: post.post.file
                })
                let data = await this.getPost(insert[0].id)
                return success('Post Sent', '', data)
            }
            return exception('Can Not Add New Post')

        } catch (e) {
            return exception(e.message)
        }
    }

    async getPost(id: string) {
        let post = await this._postBase.findOne({
            where: {
                id: id
            }
        })
        if (post != null) {
            post = post.get()
            let files = await this._channelFile.getFiles(post.id)
            return { ...post, file: files }
        }
        return null
    }

    async getChannelPost(channelId: string) {
        try {
            let posts = await this._postBase.getAll({
                where: {
                    ChannelId: channelId
                },
                order: [
                    ["createdAt", "ASC"]
                ]
            })
            let postResult = []
            posts.forEach(async (post) => {
                postResult.push({ ...post.get(), file: await this._channelFile.getFiles(post.id) })
            })
            let articles = await this._article.getChannelArticles(channelId)
            return { posts: postResult, articles }
        } catch (e) {
            throw e
        }
    }
}