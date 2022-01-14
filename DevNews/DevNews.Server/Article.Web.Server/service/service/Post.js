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
const Base_1 = require("../base/Base");
const Article_1 = require("./Article");
const ChannelFile_1 = require("./ChannelFile");
class Post {
    constructor() {
        this._postBase = new Base_1.default(context_1.default, "Post");
        this._channelFile = new ChannelFile_1.default();
        this._article = new Article_1.default();
    }
    sendPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postModel = {
                    message: post.post.message,
                    ChannelId: post.post.channelId,
                };
                let insert = yield this._postBase.upsert(postModel);
                if (insert[1]) {
                    yield this._channelFile.saveFile({
                        objId: insert[0].id,
                        file: post.post.file
                    });
                    let data = yield this.getPost(insert[0].id);
                    return (0, api_1.success)('Post Sent', '', data);
                }
                return (0, api_1.exception)('Can Not Add New Post');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield this._postBase.findOne({
                where: {
                    id: id
                }
            });
            if (post != null) {
                post = post.get();
                let files = yield this._channelFile.getFiles(post.id);
                return Object.assign(Object.assign({}, post), { file: files });
            }
            return null;
        });
    }
    getChannelPost(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let posts = yield this._postBase.getAll({
                    where: {
                        ChannelId: channelId
                    },
                    order: [
                        ["createdAt", "ASC"]
                    ]
                });
                let postResult = [];
                posts.forEach((post) => __awaiter(this, void 0, void 0, function* () {
                    postResult.push(Object.assign(Object.assign({}, post.get()), { file: yield this._channelFile.getFiles(post.id) }));
                }));
                let articles = yield this._article.getChannelArticles(channelId);
                return { posts: postResult, articles };
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map