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
            let avatars = yield this._channelAvatarBase.getAll({
                where: {
                    ChannelId: channel.id
                }
            });
            let avatarLinks;
            for (var i = 0; i < avatars.length; i++) {
                avatarLinks.push(this._file.crateFileAddress(avatars[i].image, "channel"));
            }
            return {
                name: channel.name,
                id: channel.id,
                avatar: avatarLinks,
                link: channel.link,
                token: channel.token
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
}
exports.default = Channel;
//# sourceMappingURL=Channel.js.map