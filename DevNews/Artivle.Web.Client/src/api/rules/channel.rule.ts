import { Channel } from "../models/channel.model"

export default interface IChannelRule {
    getChannels(): any

    creatChannel(channel:Channel):any

}