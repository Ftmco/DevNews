import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import { UpsertArticle } from "../models/article.model";
import IArticleRule from "../rules/article.rule";

export default class ArticleService implements IArticleRule {
    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }

    async createArticle(article: UpsertArticle) {
        try {
            const request = await this._axios.post("Article/UpsertArticle", article)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}