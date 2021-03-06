import { IncomingHttpHeaders } from "http";
import { ChannelModel } from "../../model/channel";
import { PostModel } from "../../model/post";


export default interface IChannel {
    getChannels(): any;

    getUserChannels(header: IncomingHttpHeaders): any;

    getTemporaryChannelItems(header: IncomingHttpHeaders): any;

    createChannel(channel: ChannelModel, header: IncomingHttpHeaders): any

    addChannelUser(userId: string, channelId: string): any

    getChannel(token: string, header: IncomingHttpHeaders): any

    followChannel(token: string, header: IncomingHttpHeaders): any

    getChannelByToken(token: string): any

    getChannelPosts(token: string): any

    sendPost(post: PostModel, headers: IncomingHttpHeaders): any

    leaveChannel(token: string, headers: IncomingHttpHeaders): any

    getChannelById(id: string): any
}