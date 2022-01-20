import { Channel } from "../models/channel.model"

export default interface IChannelRule {
    getChannels(): any

    createChannel(channel: Channel): any

    getChannel(token: string): any

    followChannel(token: string): any

    getChannelPosts(token: string): any

    sendMessage(post: any): any

    leave(token: string): any
}