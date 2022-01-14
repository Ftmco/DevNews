import { log } from "console";
import { IncomingHttpHeaders } from "http2";
import sequelize from "../../data base/context";
import { exception, faild, success } from "../../model/api";
import { ArticleFileType, ArticleOwnerType, UpsertArticle } from "../../model/article";
import { FileModel } from "../../model/channel";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IAccount from "../rule/IAccount";
import IArticle from "../rule/IArticle";
import IChannel from "../rule/IChannel";
import IFile from "../rule/IFile";
import Account from "./Account";
import Channel from "./Channel";
import ChannelFile from "./ChannelFile";
import File from "./File";


export default class Article implements IArticle {

    private readonly _article: IBase;

    private readonly _channelfile: IBase;

    private readonly _channel: IChannel;

    private readonly _account: IAccount;

    private readonly _file: IFile;

    constructor() {
        this._article = new Base(sequelize, "Article")
        this._channelfile = new Base(sequelize, "ApFile")
        this._channel = new Channel()
        this._account = new Account()
        this._file = new File()
    }

    async getChannelArticles(channelId: string) {
        try {

            let articles = await this._article.getAll({
                where: {
                    ownerId: channelId
                },
                order: [
                    ["createdAt", "ASC"]
                ]
            })
            let articleResult = []
            articles.forEach(async (article) => {
                articleResult.push(await this.getArticlePerview(article.id))
            })
            return articleResult
        } catch (e) {
            throw e
        }
    }

    saveArticleFiles(file: FileModel, objId: string);
    saveArticleFiles(files: FileModel[], objId: string);
    async saveArticleFiles(files: any, objId: any) {
        if (files.length > 0)
            files.forEach(async (file) => {
                await this.saveFile(file, objId, ArticleFileType.Attachment)
            })
        else
            await this.saveFile(files, objId, ArticleFileType.Main)
        return true
    }

    async saveFile(file: FileModel, objId: string, type: number) {
        let apFile = {
            objId: objId,
            orginalName: file.ogName,
            type: file.type,
            fileType: type,
            name: await this._file.saveFile({
                base64: file.base64,
                path: "article"
            })
        }
        await this._channelfile.upsert(apFile)
    }

    async getArticlePerview(id: string) {
        try {
            let article = await this._article.findOne({
                where: {
                    id: id
                }
            })
            if (article != null) {
                article = article.get()
                let mainFile = await this._channelfile.findOne({
                    where: {
                        objId: article.id,
                        fileType: ArticleFileType.Main
                    }
                })
                let owner;
                switch (article.ownerType) {
                    case ArticleOwnerType.Channel:
                        owner = await this._channel.getChannelById(article.ownerId)
                    case ArticleOwnerType.User:
                        owner = {}
                }
                return {
                    ...article,
                    owner: owner,
                    file: {
                        ...mainFile,
                        name: this._file.crateFileAddress(mainFile.name, "article")
                    },
                }
            }
        } catch (e) {
            return null
        }
    }

    getArticle(id: string) {
        throw new Error("Method not implemented.");
    }

    async createArticle(article: UpsertArticle, headers: IncomingHttpHeaders) {
        try {
            let user = await this._account.getUserBySession(headers)
            if (user != null) {
                if (article.ownerType == ArticleOwnerType.Channel) {
                    let channel = await this._channel.getChannelByToken(article.channelToken)
                    if (channel != null) {
                        channel = channel.get()
                        if (channel.ownerId == user.id) {
                            let articleModel = {
                                ...article,
                                ownerId: channel.id,
                                ownerType: ArticleOwnerType.Channel
                            }
                            let insert = await this._article.upsert(articleModel)
                            let data = insert[0]
                            this.saveArticleFiles(article.file, channel.id)
                            this.saveArticleFiles(article.attachments, channel.id)
                            return insert[1] ? success('Success To Create Article', '', await this.getArticlePerview(data.id))
                                : exception('Faild To Create Artilce')
                        }
                        return faild(403, 'your not access to this channel', '')
                    }
                    return faild(404, 'Channel Not Found', '')
                }
            }
            return faild(403, 'User Not Found', '')

        } catch (e) {
            return exception(e.message)
        }
    }

}