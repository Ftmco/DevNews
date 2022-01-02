import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import IChannelRule from "../rules/channel.rule";

export default class ChannelService implements IChannelRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }

    async getChannels() {
        try {
            let request = await this._axios.get("Channels/Get")
            return await request.data
        } catch (e) {
            return messages.netWorkError(e.message)
        }
    }

}