"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../../data base/context");
const api_1 = require("../../model/api");
const article_1 = require("../../model/article");
const Base_1 = require("../base/Base");
const Account_1 = require("./Account");
const Channel_1 = require("./Channel");
const File_1 = require("./File");
class Article {
    constructor() {
        this._article = new Base_1.default(context_1.default, "Article");
        this._channelfile = new Base_1.default(context_1.default, "ApFile");
        this._channel = new Channel_1.default();
        this._account = new Account_1.default();
        this._file = new File_1.default();
    }
    getChannelArticles(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let articles = yield this._article.getAll({
                    where: {
                        ownerId: channelId
                    },
                    order: [
                        ["createdAt", "ASC"]
                    ]
                });
                let articleResult = [];
                articles.forEach((article) => __awaiter(this, void 0, void 0, function* () {
                    articleResult.push(yield this.getArticlePerview(article.id));
                }));
                return articleResult;
            }
            catch (e) {
                throw e;
            }
        });
    }
    saveArticleFiles(files, objId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (files.length > 0)
                files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                    yield this.saveFile(file, objId, article_1.ArticleFileType.Attachment);
                }));
            else
                yield this.saveFile(files, objId, article_1.ArticleFileType.Main);
            return true;
        });
    }
    saveFile(file, objId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let apFile = {
                objId: objId,
                orginalName: file.ogName,
                type: file.type,
                fileType: type,
                name: yield this._file.saveFile({
                    base64: file.base64,
                    path: "article"
                })
            };
            yield this._channelfile.upsert(apFile);
        });
    }
    getArticlePerview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let article = yield this._article.findOne({
                    where: {
                        id: id
                    }
                });
                if (article != null) {
                    article = article.get();
                    let mainFile = yield this._channelfile.findOne({
                        where: {
                            objId: article.id,
                            fileType: article_1.ArticleFileType.Main
                        }
                    });
                    let owner;
                    switch (article.ownerType) {
                        case article_1.ArticleOwnerType.Channel:
                            owner = yield this._channel.getChannelById(article.ownerId);
                        case article_1.ArticleOwnerType.User:
                            owner = {};
                    }
                    return Object.assign(Object.assign({}, article), { owner: owner, file: Object.assign(Object.assign({}, mainFile), { name: this._file.crateFileAddress(mainFile.name, "article") }) });
                }
            }
            catch (e) {
                return null;
            }
        });
    }
    getArticle(id) {
        throw new Error("Method not implemented.");
    }
    createArticle(article, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._account.getUserBySession(headers);
                if (user != null) {
                    if (article.ownerType == article_1.ArticleOwnerType.Channel) {
                        let channel = yield this._channel.getChannelByToken(article.channelToken);
                        if (channel != null) {
                            channel = channel.get();
                            if (channel.ownerId == user.id) {
                                let articleModel = Object.assign(Object.assign({}, article), { ownerId: channel.id, ownerType: article_1.ArticleOwnerType.Channel });
                                let insert = yield this._article.upsert(articleModel);
                                let data = insert[0];
                                this.saveArticleFiles(article.file, channel.id);
                                this.saveArticleFiles(article.attachments, channel.id);
                                return insert[1] ? (0, api_1.success)('Success To Create Article', '', yield this.getArticlePerview(data.id))
                                    : (0, api_1.exception)('Faild To Create Artilce');
                            }
                            return (0, api_1.faild)(403, 'your not access to this channel', '');
                        }
                        return (0, api_1.faild)(404, 'Channel Not Found', '');
                    }
                }
                return (0, api_1.faild)(403, 'User Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
}
exports.default = Article;
//# sourceMappingURL=Article.js.map