import { UpsertArticle } from "../models/article.model";

export default interface IArticleRule {
    createArticle(article: UpsertArticle): any
}