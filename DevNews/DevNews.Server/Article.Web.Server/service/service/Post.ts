import { log } from "console";
import sequelize from "../../data base/context";
import { exception, faild, success } from "../../model/api";
import { PostModel } from "../../model/post";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IFile from "../rule/IFile";
import IPost from "../rule/IPost";
import File from "./File";

export default class Post implements IPost {

    private readonly _postBase: IBase;

    private readonly _articleBase: IBase;

    private readonly _file: IFile;

    constructor() {
        this._postBase = new Base(sequelize, "Post")
        this._articleBase = new Base(sequelize, "Article")
        this._file = new File()
    }

    async sendPost(post: any) {
        try {
            let postModel = {
                message: post.post.message,
                ChannelId: post.post.channelId,
                file: post.post.file != null ? await this._file.saveFile({
                    base64: post.post.file,
                    path: 'channelPost'
                }) : null
            }
            let insert = await this._postBase.upsert(postModel)
            let data = insert[0]
            data.file = data.file != null ? this._file.crateFileAddress(data.file, "channelPost") : null
            return success('Post Sent', '', data)
        } catch (e) {
            return exception(e.message)
        }
    }

    async getChannelPost(channelId: string) {
        try {
            let posts = await this._postBase.getAll({
                where: {
                    ChannelId: channelId
                }
            })
            posts.forEach((post) => {
                post.file = this._file.crateFileAddress(post.file, "channelPost")
            })
            let articles = await this._articleBase.getAll({
                where: {
                    ChannelId: channelId
                }
            })
            return { posts, articles }
        } catch (e) {
            throw e
        }
    }


}