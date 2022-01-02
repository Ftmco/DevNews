import { IncomingHttpHeaders } from "http";
import sequelize from "../../data base/context";
import { exception, faild, success } from "../../model/api";
import { ChannelModel } from "../../model/channel";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IAccount from "../rule/IAccount";
import IChannel from "../rule/IChannel";
import IFile from "../rule/IFile";
import Account from "./Account";
import File from "./File";

export default class Channel implements IChannel {

    private readonly _channelBase: IBase;

    private readonly _channelUsersBase: IBase;

    private readonly _channelAvatarBase: IBase;

    private readonly _account: IAccount;

    private readonly _file: IFile;

    constructor() {
        this._channelBase = new Base(sequelize, "Channel")
        this._channelUsersBase = new Base(sequelize, "ChannelUsers")
        this._account = new Account()
        this._channelAvatarBase = new Base(sequelize, "ChannelAvatar")
        this._file = new File()
    }

    getTemporaryChannelItems(header: IncomingHttpHeaders) {
        throw new Error("Method not implemented.");
    }

    async getUserChannels(header: IncomingHttpHeaders) {
        try {
            let user = await this._account.getUserBySession(header)
            let channels = []
            if (user != null) {
                let userChannels = await this._channelUsersBase.getAll({
                    where: {
                        userId: user.id
                    }
                })
                for (let i = 0; i < userChannels.length; i++) {
                    let channel = await this._channelBase.findOne({ where: { id: userChannels[i].ChannelId } })
                    channels.push(await this.createChannelModel(channel))
                }
                return success('User Channels', '', channels)
            }
            return faild(403, 'Please Login To Your Account', '')
        } catch (e: any) {
            return exception(e.message)
        }
    }

    getChannels() {
        throw new Error("Method not implemented.");
    }

    async createChannelModel(channel: any) {
        let avatars = await this._channelAvatarBase.getAll({
            where: {
                ChannelId: channel.id
            }
        })
        let avatarLinks: string[]
        for (var i = 0; i < avatars.length; i++) {
            avatarLinks.push(this._file.crateFileAddress(avatars[i].image, "channel"))
        }
        return {
            name: channel.name,
            id: channel.id,
            avatar: avatarLinks,
            link: channel.link,
            token: channel.token
        }
    }

    async createChannelModels(channels: any) {
        let channelsModel: ChannelModel[];
        for (var i = 0; i < channels.length; i++) {
            channelsModel.push(await this.createChannelModel(channels[i]))
        }
        return channelsModel
    }

}