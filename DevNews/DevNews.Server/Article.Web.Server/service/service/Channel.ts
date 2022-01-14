import { IncomingHttpHeaders } from "http";
import sequelize from "../../data base/context";
import { exception, faild, success } from "../../model/api";
import { ChannelInfo, ChannelModel } from "../../model/channel";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IAccount from "../rule/IAccount";
import IChannel from "../rule/IChannel";
import IFile from "../rule/IFile";
import Account from "./Account";
import File from "./File";
import * as crypto from 'crypto'
import { Op } from "sequelize";
import IPost from "../rule/IPost";
import Post from "./Post";
import { PostModel } from "../../model/post";

export default class Channel implements IChannel {

    private readonly _channelBase: IBase;

    private readonly _channelUsersBase: IBase;

    private readonly _userBase: IBase;

    private readonly _account: IAccount;

    private readonly _file: IFile;

    private readonly _post: IPost;

    constructor() {
        this._channelBase = new Base(sequelize, "Channel")
        this._channelUsersBase = new Base(sequelize, "ChannelUsers")
        this._userBase = new Base(sequelize, "User")
        this._account = new Account()
        this._file = new File()
        this._post = new Post()
    }

    async getChannelById(id: string) {
        try {
            let channel = await this._channelBase.findOne({
                where: {
                    id: id
                }
            })
            if (channel != null) {
                channel = channel.get()
                channel.avatar = this._file.crateFileAddress(channel.avatar, "channel")
                return channel
            }
            return null
        }
        catch {
            return null
        }
    }

    async leaveChannel(token: string, headers: IncomingHttpHeaders) {
        try {
            let channel = await this.getChannelByToken(token)
            if (channel != null) {
                let user = await this._account.getUserBySession(headers)
                if (user != null) {
                    await this._channelUsersBase.delete({
                        where: {
                            ChannelId: channel.id,
                            UserId: user.id
                        }
                    })
                    return success(`Success To Leave From ${channel.name}`, '', channel)
                }
                return faild(404, 'User Not Found', '')
            }
            return faild(404, 'Channel Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    async getChannelByToken(token: string) {
        try {
            let channel = await this._channelBase.findOne({
                where: {
                    token: token
                }
            })
            return channel
        } catch {
            throw new Error('Channel Not Found')
        }
    }

    async getChannelPosts(token: string) {
        try {
            let channel = await this.getChannelByToken(token)
            if (channel != null) {
                let posts = await this._post.getChannelPost(channel.id)
                return success('', '', posts)
            }
            return faild(404, 'Channel Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    async followChannel(token: string, header: IncomingHttpHeaders) {
        try {
            let user = await this._account.getUserBySession(header)
            if (user != null) {
                let channel = await this.getChannelByToken(token)
                if (channel != null) {
                    await this._channelUsersBase.upsert({
                        ChannelId: channel.id,
                        UserId: user.id
                    })
                    return success(`Followed Channel ${channel.name}`, '', channel)
                }
                return faild(404, 'Channel Not Found', '')
            }
            return faild(403, 'User Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }


    async addChannelUser(userId: string, channelId: string) {
        try {
            let channelUser = {
                UserId: userId,
                ChannelId: channelId
            }
            let join = await this._channelUsersBase.upsert(channelUser)
            return join[1] ? success('Joined In Channel', '', join[0]) : exception('Plase Try Again')
        } catch (e) {
            return exception(e.message)
        }
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
                    if (channel != null)
                        channels.push(await this.createChannelModel(channel))
                }

                return success('', 'User Channels', channels)
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
        if (channel != null) {
            return {
                name: channel.name,
                id: channel.id,
                avatar: this._file.crateFileAddress(channel.avatar, "channel"),
                link: channel.link,
                token: channel.token,
                title: channel.title
            }
        }
        return null
    }

    async createChannelModels(channels: any) {
        let channelsModel: ChannelModel[];
        for (var i = 0; i < channels.length; i++) {
            channelsModel.push(await this.createChannelModel(channels[i]))
        }
        return channelsModel
    }

    async createChannel(channel: ChannelModel, header: IncomingHttpHeaders) {
        try {
            let user = await this._account.getUserBySession(header)
            if (user != null) {
                let model = {
                    name: channel.name,
                    title: channel.title,
                    link: channel.link,
                    token: this.createToken(),
                    ownerId: user.id,
                    avatar: await this._file.saveFile({
                        base64: channel.avatar,
                        path: "channel"
                    })
                };
                model = await this._channelBase.upsert(model)
                model[0].avatar = this._file.crateFileAddress(model[0].avatar, "channel")
                await this.addChannelUser(user.id, model[0].id)
                return success('Success To Create Channel', '', model)
            }
            return faild(403, 'User Not Found', '')

        } catch (e) {
            return exception(e.message)
        }
    }

    async getChannel(token: string, header: IncomingHttpHeaders) {
        try {
            let channel = await this._channelBase.findOne({
                where: {
                    token: token
                }
            })
            if (channel != null) {
                let user = await this._account.getUserBySession(header);
                let isIn = await this._channelUsersBase.findOne({
                    where: {
                        [Op.and]: {
                            UserId: user.id,
                            ChannelId: channel.id
                        }
                    }
                })
                let owner = await this._userBase.findOne({ where: { id: channel.ownerId } })
                let response: ChannelInfo = {
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
                }
                return success('', `${channel.name} Info`, response)
            }

            return faild(404, 'Channel Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    async sendPost(post: PostModel, headers: IncomingHttpHeaders) {
        try {
            let channel = await this.getChannelByToken(post.post.token)
            if (channel != null) {
                let user = await this._account.getUserBySession(headers)
                if (user != null) {
                    channel = channel.get()
                    user = user.get()
                    if (channel.ownerId == user.id) {
                        post.post.channelId = channel.id
                        let sendPost = await this._post.sendPost(post)
                        return sendPost
                    }
                    return faild(403, 'Access Denied', '')
                }
                return faild(404, 'User Not Found', '')
            }
            return faild(404, 'Channel Not Found', '')
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
        return crypto.createHash("sha256").update(string, "binary").digest();
    }
}