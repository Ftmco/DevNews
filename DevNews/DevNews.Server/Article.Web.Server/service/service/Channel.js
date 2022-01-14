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
const Account_1 = require("./Account");
const File_1 = require("./File");
const crypto = require("crypto");
const sequelize_1 = require("sequelize");
const Post_1 = require("./Post");
class Channel {
    constructor() {
        this._channelBase = new Base_1.default(context_1.default, "Channel");
        this._channelUsersBase = new Base_1.default(context_1.default, "ChannelUsers");
        this._userBase = new Base_1.default(context_1.default, "User");
        this._account = new Account_1.default();
        this._file = new File_1.default();
        this._post = new Post_1.default();
    }
    getChannelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield this._channelBase.findOne({
                    where: {
                        id: id
                    }
                });
                if (channel != null) {
                    channel = channel.get();
                    channel.avatar = this._file.crateFileAddress(channel.avatar, "channel");
                    return channel;
                }
                return null;
            }
            catch (_a) {
                return null;
            }
        });
    }
    leaveChannel(token, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield this.getChannelByToken(token);
                if (channel != null) {
                    let user = yield this._account.getUserBySession(headers);
                    if (user != null) {
                        yield this._channelUsersBase.delete({
                            where: {
                                ChannelId: channel.id,
                                UserId: user.id
                            }
                        });
                        return (0, api_1.success)(`Success To Leave From ${channel.name}`, '', channel);
                    }
                    return (0, api_1.faild)(404, 'User Not Found', '');
                }
                return (0, api_1.faild)(404, 'Channel Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getChannelByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield this._channelBase.findOne({
                    where: {
                        token: token
                    }
                });
                return channel;
            }
            catch (_a) {
                throw new Error('Channel Not Found');
            }
        });
    }
    getChannelPosts(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield this.getChannelByToken(token);
                if (channel != null) {
                    let posts = yield this._post.getChannelPost(channel.id);
                    return (0, api_1.success)('', '', posts);
                }
                return (0, api_1.faild)(404, 'Channel Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    followChannel(token, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._account.getUserBySession(header);
                if (user != null) {
                    let channel = yield this.getChannelByToken(token);
                    if (channel != null) {
                        yield this._channelUsersBase.upsert({
                            ChannelId: channel.id,
                            UserId: user.id
                        });
                        return (0, api_1.success)(`Followed Channel ${channel.name}`, '', channel);
                    }
                    return (0, api_1.faild)(404, 'Channel Not Found', '');
                }
                return (0, api_1.faild)(403, 'User Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    addChannelUser(userId, channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channelUser = {
                    UserId: userId,
                    ChannelId: channelId
                };
                let join = yield this._channelUsersBase.upsert(channelUser);
                return join[1] ? (0, api_1.success)('Joined In Channel', '', join[0]) : (0, api_1.exception)('Plase Try Again');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getTemporaryChannelItems(header) {
        throw new Error("Method not implemented.");
    }
    getUserChannels(header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._account.getUserBySession(header);
                let channels = [];
                if (user != null) {
                    let userChannels = yield this._channelUsersBase.getAll({
                        where: {
                            userId: user.id
                        }
                    });
                    for (let i = 0; i < userChannels.length; i++) {
                        let channel = yield this._channelBase.findOne({ where: { id: userChannels[i].ChannelId } });
                        if (channel != null)
                            channels.push(yield this.createChannelModel(channel));
                    }
                    return (0, api_1.success)('', 'User Channels', channels);
                }
                return (0, api_1.faild)(403, 'Please Login To Your Account', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getChannels() {
        throw new Error("Method not implemented.");
    }
    createChannelModel(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (channel != null) {
                return {
                    name: channel.name,
                    id: channel.id,
                    avatar: this._file.crateFileAddress(channel.avatar, "channel"),
                    link: channel.link,
                    token: channel.token,
                    title: channel.title
                };
            }
            return null;
        });
    }
    createChannelModels(channels) {
        return __awaiter(this, void 0, void 0, function* () {
            let channelsModel;
            for (var i = 0; i < channels.length; i++) {
                channelsModel.push(yield this.createChannelModel(channels[i]));
            }
            return channelsModel;
        });
    }
    createChannel(channel, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._account.getUserBySession(header);
                if (user != null) {
                    let model = {
                        name: channel.name,
                        title: channel.title,
                        link: channel.link,
                        token: this.createToken(),
                        ownerId: user.id,
                        avatar: yield this._file.saveFile({
                            base64: channel.avatar,
                            path: "channel"
                        })
                    };
                    model = yield this._channelBase.upsert(model);
                    model[0].avatar = this._file.crateFileAddress(model[0].avatar, "channel");
                    yield this.addChannelUser(user.id, model[0].id);
                    return (0, api_1.success)('Success To Create Channel', '', model);
                }
                return (0, api_1.faild)(403, 'User Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getChannel(token, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield this._channelBase.findOne({
                    where: {
                        token: token
                    }
                });
                if (channel != null) {
                    let user = yield this._account.getUserBySession(header);
                    let isIn = yield this._channelUsersBase.findOne({
                        where: {
                            [sequelize_1.Op.and]: {
                                UserId: user.id,
                                ChannelId: channel.id
                            }
                        }
                    });
                    let owner = yield this._userBase.findOne({ where: { id: channel.ownerId } });
                    let response = {
                        channel: {
                            avatar: this._file.crateFileAddress(channel.avatar, "channel"),
                            id: channel.id,
                            link: channel.link,
                            name: channel.name,
                            title: channel.title,
                            token: channel.token,
                        },
                        owner: {
                            avatar: this._file.crateFileAddress(owner.image, "profile"),
                            email: owner.email,
                            userName: owner.userName,
                            token: ''
                        },
                        isAdmin: user.id == channel.ownerId,
                        mute: true,
                        isIn: isIn != null
                    };
                    return (0, api_1.success)('', `${channel.name} Info`, response);
                }
                return (0, api_1.faild)(404, 'Channel Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    sendPost(post, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield this.getChannelByToken(post.post.token);
                if (channel != null) {
                    let user = yield this._account.getUserBySession(headers);
                    if (user != null) {
                        channel = channel.get();
                        user = user.get();
                        if (channel.ownerId == user.id) {
                            post.post.channelId = channel.id;
                            let sendPost = yield this._post.sendPost(post);
                            return sendPost;
                        }
                        return (0, api_1.faild)(403, 'Access Denied', '');
                    }
                    return (0, api_1.faild)(404, 'User Not Found', '');
                }
                return (0, api_1.faild)(404, 'Channel Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    createToken() {
        let newId = crypto.randomUUID() + "-" + crypto.randomUUID();
        let hashSession = this.createHash(newId);
        return hashSession;
    }
    createHash(string) {
        return crypto.createHash("sha256").update(string, "binary").digest();
    }
}
exports.default = Channel;
//# sourceMappingURL=Channel.js.map