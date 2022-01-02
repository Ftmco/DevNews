import { IncomingHttpHeaders } from "http2";
import { ProfileModel } from "../../model/account";


export default interface IProfile {
    get(headers: IncomingHttpHeaders): any;

    update(header: IncomingHttpHeaders, profile: ProfileModel): any;
}