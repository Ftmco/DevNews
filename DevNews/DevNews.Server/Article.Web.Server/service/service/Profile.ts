import { IncomingHttpHeaders } from "http2";
import { exception, faild, success } from "../../model/api";
import IAccount from "../rule/IAccount";
import IProfile from "../rule/IProfile";
import Account from "./Account";

export default class Profile implements IProfile {

	private readonly _account: IAccount;

	constructor() {
		this._account = new Account();
	}

	async get(headers: IncomingHttpHeaders) {
		try {
			let user = await this._account.getUserBySession(headers)
			if (user != null) {
				return success('Profile', '', user)
			}
			return faild(404, 'User Not Found', '')
		} catch (e) {
			return exception(e.message)
		}
	}

}