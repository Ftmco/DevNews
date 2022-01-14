import { IncomingHttpHeaders } from "http2";
import { UpsertArticle } from "../../model/article";
import { FileModel } from "../../model/channel";
import ChannelFile from "../service/ChannelFile";


export default interface IArticle {
    createArticle(article: UpsertArticle, headers: IncomingHttpHeaders): any

    getArticlePerview(id: string): any

    getArticle(id: string): any

    saveArticleFiles(file: FileModel, objId: string): any

    saveArticleFiles(files: Array<FileModel>, objId: string): any

    getChannelArticles(channelId: string): any
}