"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const context_1 = require("../../data base/context");
const api_1 = require("../../model/api");
const Base_1 = require("../base/Base");
const crypto = require("crypto");
class Account {
    constructor() {
        this._userBase = new Base_1.default(context_1.default, "User");
        this._sessionBase = new Base_1.default(context_1.default, "Session");
    }
    getUserBySession(header) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionValue = header["token"];
            let session = yield this._sessionBase.findOne({
                where: {
                    value: sessionValue
                }
            });
            if (session != null) {
                let user = yield this._userBase.findOne({
                    where: {
                        id: session.UserId
                    }
                });
                return user;
            }
            return null;
        });
    }
    activation(activation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.getUserByUserName(activation.userName);
                if (user != null) {
                    user = user.get();
                    if (user.activeCode == activation.activeCode) {
                        user.isActive = true;
                        yield this._userBase.upsert(user);
                        return (0, api_1.success)('Account is actived', '', { activation });
                    }
                }
                return (0, api_1.faild)(403, 'User not found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    signUp(signup) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.getUserByUserName(signup.userName);
                user = yield this.getUserByUserName(signup.phoneNumber);
                user = yield this.getUserByUserName(signup.email);
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
                    };
                    yield this._userBase.upsert(newUser);
                    return (0, api_1.success)('Success To Register', '', { user: newUser });
                }
                return (0, api_1.faild)(403, 'User Exist', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    getUserByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this._userBase.findOne({
                where: {
                    [sequelize_1.Op.or]: {
                        userName: userName,
                        phoneNumber: userName,
                        email: userName
                    }
                }
            });
            return user;
        });
    }
    login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.getUserByUserName(login.userName);
                if (user != null) {
                    user = user.get();
                    if (user.isActive && user.password == this.createHash(login.password)) {
                        let session = {
                            key: 'Token',
                            value: this.createSession(),
                            UserId: user.id,
                            date: Date.now(),
                            expireDate: Date.now() + 1
                        };
                        yield this._sessionBase.upsert(session);
                        return (0, api_1.success)('Login Succes', '', { key: session.key, value: session.value });
                    }
                    return (0, api_1.faild)(403, 'Please Active Your Account', '');
                }
                return (0, api_1.faild)(404, 'User Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    createHash(string) {
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
exports.default = Account;
//# sourceMappingURL=Account.js.map