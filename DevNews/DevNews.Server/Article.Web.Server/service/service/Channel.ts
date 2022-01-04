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
import * as crypto from 'crypto'

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

        return {
            name: channel.name,
            id: channel.id,
            avatar: this._file.crateFileAddress(channel.avatar, "channel"),
            link: channel.link,
            token: channel.token,
            title: channel.title
        }
    }

    async createChannelModels(channels: any) {
        let channelsModel: ChannelModel[];
        for (var i = 0; i < channels.length; i++) {
            channelsModel.push(await this.createChannelModel(channels[i]))
        }
        return channelsModel
    }

    async createChannel(channel: ChannelModel) {
        try {
            let model = {
                name: channel.name,
                title: channel.title,
                link: channel.link,
                token: this.createToken(),
                avatar: await this._file.saveFile({
                    base64: channel.avatar,
                    path: "channel"
                })
            };
            model = await this._channelBase.upsert(model)
            model[0].avatar = this._file.crateFileAddress(model[0].avatar,"channel")
            return success('Success To Create Channel', '', model)

        } catch (e) {
            return exception(e.message)
        }
    }


    createToken() {
        let newId = crypto.randomUUID() + "-" + crypto.randomUUID();
        let hashSession = this.createHash(newId);
        return hashSession;
    }

    createHash(string: string) {
        return crypto.createHash("sha256").update(string, "binary").digest("base64");
    }
}