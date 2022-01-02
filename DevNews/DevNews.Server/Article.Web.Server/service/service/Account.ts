import { DATE, Op } from "sequelize";
import sequelize from "../../data base/context";
import { Activation, Login, SignUp } from "../../model/account";
import { exception, faild, success } from "../../model/api";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IAccount from "../rule/IAccount";
import * as crypto from 'crypto'
import { log } from "console";
import { IncomingHttpHeaders } from "http2";

export default class Account implements IAccount {

    private readonly _userBase: IBase;

    private readonly _sessionBase: IBase;

    constructor() {
        this._userBase = new Base(sequelize, "User")
        this._sessionBase = new Base(sequelize, "Session")
    }

    async getUserBySession(header: IncomingHttpHeaders) {
        let sessionValue = header["token"]
        if (sessionValue != undefined) {
            let session = await this._sessionBase.findOne({
                where: {
                    value: sessionValue
                }
            })
            if (session != null) {
                let user = await this._userBase.findOne({
                    where: {
                        id: session.UserId
                    }
                })
                return user
            }
            return null
        }
        return null;
    }

    async activation(activation: Activation) {
        try {
            let user = await this.getUserByUserName(activation.userName)
            if (user != null) {
                user = user.get()
                if (user.activeCode == activation.activeCode) {
                    user.isActive = true
                    await this._userBase.upsert(user)
                    return success('Account is actived', '', { activation })
                }
            }
            return faild(403, 'User not found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    async signUp(signup: SignUp) {
        try {
            let user = await this.getUserByUserName(signup.userName)
            user = await this.getUserByUserName(signup.phoneNumber)
            user = await this.getUserByUserName(signup.email)
            if (user == null) {
                let newUser = {
                    fullName: signup.fullName,
                    email: signup.email,
                    phoneNumber: signup.phoneNumber,
                    userName: signup.userName,
                    isActive: false,
                    activeCode: this.createActiveCode(),
                    emailActive: false,
                    phoneActive: false,
                    password: this.createHash(signup.password),
                    registerDate: Date.now()
                }
                await this._userBase.upsert(newUser)
                return success('Success To Register', '', { user: newUser })
            }
            return faild(403, 'User Exist', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    async getUserByUserName(userName: string) {
        let user = await this._userBase.findOne({
            where: {
                [Op.or]: {
                    userName: userName,
                    phoneNumber: userName,
                    email: userName
                }
            }
        })
        return user
    }

    async login(login: Login) {
        try {
            let user = await this.getUserByUserName(login.userName)

            if (user != null) {
                user = user.get()
                if (user.isActive && user.password == this.createHash(login.password)) {
                    let session = {
                        key: 'Token',
                        value: this.createSession(),
                        UserId: user.id,
                        date: Date.now(),
                        expireDate: Date.now() + 1
                    }

                    await this._sessionBase.upsert(session)
                    return success('Login Succes', '', { key: session.key, value: session.value })
                }
                return faild(403, 'Please Active Your Account', '')
            }
            return faild(404, 'User Not Found', '')
        } catch (e) {
            return exception(e.message)
        }
    }

    createHash(string: string) {
        return crypto.createHash("sha256").update(string, "binary").digest("base64");
    }

    createSession() {
        let newId = crypto.randomUUID() + "-" + crypto.randomUUID();
        let hashSession = this.createHash(newId);
        return hashSession;
    }

    createActiveCode() {
        let random = crypto.randomUUID().toString().replace("-", "");
        return random.substr(0, 7);
    }
}