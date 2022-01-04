import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import { Channel } from "../models/channel.model";
import IChannelRule from "../rules/channel.rule";

export default class ChannelService implements IChannelRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
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
            let request = await this._axios.get("Channels/Get")
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}