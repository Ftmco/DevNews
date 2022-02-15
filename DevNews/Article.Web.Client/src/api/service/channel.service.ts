import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import { Channel } from "../models/channel.model";
import IChannelRule from "../rules/channel.rule";

export default class ChannelService implements IChannelRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }

    async getChannelArticles(token: string) {
        try {
            let request = await this._axios.get(`Channel/Articles?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getMyChannels() {
        try {
            let request = await this._axios.get("Channel/AdminChannels")
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async createArticle(article: any) {
        try {
            let request = await this._axios.post("Channel/CreateArticle", article)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async leave(token: string) {
        try {
            let request = await this._axios.get(`Channel/Leave?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async sendMessage(post: any) {
        try {
            let request = await this._axios.post("Channel/SendPost", post)
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
            let request = await this._axios.get(`Channel/Subscribe?token=${token}`)
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

    async createChannel(channel: Channel) {
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