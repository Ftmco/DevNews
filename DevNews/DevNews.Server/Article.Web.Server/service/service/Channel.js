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
class Channel {
    constructor() {
        this._channelBase = new Base_1.default(context_1.default, "Channel");
        this._channelUsersBase = new Base_1.default(context_1.default, "ChannelUsers");
        this._account = new Account_1.default();
        this._channelAvatarBase = new Base_1.default(context_1.default, "ChannelAvatar");
        this._file = new File_1.default();
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
                        channels.push(yield this.createChannelModel(channel));
                    }
                    return (0, api_1.success)('User Channels', '', channels);
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
            return {
                name: channel.name,
                id: channel.id,
                avatar: this._file.crateFileAddress(channel.avatar, "channel"),
                link: channel.link,
                token: channel.token,
                title: channel.title
            };
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
    createChannel(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let model = {
                    name: channel.name,
                    title: channel.title,
                    link: channel.link,
                    token: this.createToken(),
                    avatar: yield this._file.saveFile({
                        base64: channel.avatar,
                        path: "channel"
                    })
                };
                model = yield this._channelBase.upsert(model);
                model[0].avatar = this._file.crateFileAddress(model[0].avatar, "channel");
                return (0, api_1.success)('Success To Create Channel', '', model);
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
        return crypto.createHash("sha256").update(string, "binary").digest("base64");
    }
}
exports.default = Channel;
//# sourceMappingURL=Channel.js.map