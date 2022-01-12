import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import { Channel } from "../models/channel.model";
import IChannelRule from "../rules/channel.rule";

export default class ChannelService implements IChannelRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }

    async sendMessage(post: any) {
        try {
            let request = await this._axios.post("Channel/SendMessage",post)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getChannelPosts(token: string) {
        try {
            let request = await this._axios.get(`Channel/Posts?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async followChannel(token: string) {
        try {
            let request = await this._axios.post("Channel/Follow", {
                token: token
            })
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getChannel(token: string) {
        try {
            let request = await this._axios.get(`Channel/Channel?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async creatChannel(channel: Channel) {
        try {
            let request = await this._axios.post("Channel/Create", channel)
            return await request.data
        }
        catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getChannels() {
        try {
            let request = await this._axios.get("Channel/Get")
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}