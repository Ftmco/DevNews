import { IncomingHttpHeaders } from "http";
import { ChannelModel } from "../../model/channel";


export default interface IChannel {
    getChannels(): any;

    getUserChannels(header: IncomingHttpHeaders): any;

    getTemporaryChannelItems(header: IncomingHttpHeaders): any;

    createChannel(channel: ChannelModel): any
}