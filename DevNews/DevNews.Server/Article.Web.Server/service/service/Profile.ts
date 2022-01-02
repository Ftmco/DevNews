import { log } from "console";
import { IncomingHttpHeaders } from "http2";
import sequelize from "../../data base/context";
import { ProfileModel } from "../../model/account";
import { exception, faild, success } from "../../model/api";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IAccount from "../rule/IAccount";
import IFile from "../rule/IFile";
import IProfile from "../rule/IProfile";
import Account from "./Account";
import File from "./File";

export default class Profile implements IProfile {

    private readonly _account: IAccount;

    private readonly _file: IFile;

    private readonly _userBase: IBase;

    constructor() {
        this._account = new Account();
        this._file = new File()
        this._userBase = new Base(sequelize, "User")
    }

    async update(header: IncomingHttpHeaders, profile: ProfileModel) {
        try {
            let user = await this._account.getUserBySession(header)
            if (user != null) {
                user = user.get()
                user.fullName = profile.fullName
                if (profile.image.indexOf("http") == -1) {
                    user.image = this._file.saveFile({
                        base64: profile.image,
                        path: 'profile'
                    })
                }

                await this._userBase.upsert(user)
                let getProfile = await this.get(header)
                return success('Profile Changed Successfully', '', getProfile.result)
            }
            return faild(404, 'User Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    async get(headers: IncomingHttpHeaders) {
        try {
            let user = await this._account.getUserBySession(headers)
            if (user != null) {
                let profile: ProfileModel = {
                    email: user.email,
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    userName: user.userName,
                    image: this._file.crateFileAddress(user.image, "profile")
                }
                return success('Profile', '', profile)
            }
            return faild(404, 'User Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

}