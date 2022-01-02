import { IncomingHttpHeaders } from "http";


export default interface IChannel {
    getChannels(): any;

    getUserChannels(header: IncomingHttpHeaders): any;

    getTemporaryChannelItems(header: IncomingHttpHeaders): any;
}