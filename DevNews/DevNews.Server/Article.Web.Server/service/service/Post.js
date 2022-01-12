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
const File_1 = require("./File");
class Post {
    constructor() {
        this._postBase = new Base_1.default(context_1.default, "Post");
        this._articleBase = new Base_1.default(context_1.default, "Article");
        this._file = new File_1.default();
    }
    sendPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postModel = {
                    message: post.post.message,
                    ChannelId: post.post.channelId,
                    file: post.post.file != null ? yield this._file.saveFile({
                        base64: post.post.file,
                        path: 'channelPost'
                    }) : null
                };
                let insert = yield this._postBase.upsert(postModel);
                let data = insert[0];
                data.file = data.file != null ? this._file.crateFileAddress(data.file, "channelPost") : null;
                return (0, api_1.success)('Post Sent', '', data);
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getChannelPost(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let posts = yield this._postBase.getAll({
                    where: {
                        ChannelId: channelId
                    }
                });
                posts.forEach((post) => {
                    post.file = this._file.crateFileAddress(post.file, "channelPost");
                });
                let articles = yield this._articleBase.getAll({
                    where: {
                        ChannelId: channelId
                    }
                });
                return { posts, articles };
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map