import { IncomingHttpHeaders } from "http2";


export default interface IProfile {
    get(headers: IncomingHttpHeaders): any;
}