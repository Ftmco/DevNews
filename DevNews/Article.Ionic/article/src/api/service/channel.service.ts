import { messages } from "@/constants";
import { decrypt, encrypt } from "@/services/api/enc";
import { keyMaker } from "@/services/api/keyMaker";
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
            const request = await this._axios.get(`Channel/Articles?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getMyChannels() {
        try {
            const request = await this._axios.get("Channel/AdminChannels")
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async createArticle(article: any) {
        try {
            const request = await this._axios.post("Channel/CreateArticle", article)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async leave(token: string) {
        try {
            const request = await this._axios.get(`Channel/Leave?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async sendMessage(post: any) {
        try {
            const request = await this._axios.post("Channel/SendPost", post)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getChannelPosts(token: string) {
        try {
            const request = await this._axios.get(`Channel/Posts?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async followChannel(token: string) {
        try {
            const request = await this._axios.post("Channel/Follow", {
                token: token
            })
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getChannel(token: string) {
        try {
            const request = await this._axios.get(`Channel/Channel?token=${token}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async createChannel(channel: Channel) {
        try {
            const key = keyMaker("/api/Channel/CreateEnc")
            const encData = encrypt({
                text:JSON.stringify(channel),
                key:key
            })
            const request = await this._axios.post("Channel/CreateEnc", {data:encData})
            const encResponse = await request.data
            const response = JSON.parse(decrypt({
                text:encResponse.data,
                key:key
            }))
            return response
        }
        catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async getChannels() {
        try {
            const key = keyMaker("/api/Channel/GetEnc")
            const request = await this._axios.get("Channel/GetEnc")
            const encResponse = await request.data
            const response = JSON.parse(
                decrypt({
                    text: encResponse.data,
                    key: key
                })
            )
            return response
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}