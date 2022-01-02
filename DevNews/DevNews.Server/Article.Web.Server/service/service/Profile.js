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
const context_1 = require("../../data base/context");
const api_1 = require("../../model/api");
const Base_1 = require("../base/Base");
const Account_1 = require("./Account");
const File_1 = require("./File");
class Profile {
    constructor() {
        this._account = new Account_1.default();
        this._file = new File_1.default();
        this._userBase = new Base_1.default(context_1.default, "User");
    }
    update(header, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._account.getUserBySession(header);
                if (user != null) {
                    user = user.get();
                    user.fullName = profile.fullName;
                    if (profile.image.indexOf("http") == -1) {
                        user.image = this._file.saveFile({
                            base64: profile.image,
                            path: 'profile'
                        });
                    }
                    yield this._userBase.upsert(user);
                    let getProfile = yield this.get(header);
                    return (0, api_1.success)('Profile Changed Successfully', '', getProfile.result);
                }
                return (0, api_1.faild)(404, 'User Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
    get(headers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._account.getUserBySession(headers);
                if (user != null) {
                    let profile = {
                        email: user.email,
                        fullName: user.fullName,
                        phoneNumber: user.phoneNumber,
                        userName: user.userName,
                        image: this._file.crateFileAddress(user.image, "profile")
                    };
                    return (0, api_1.success)('Profile', '', profile);
                }
                return (0, api_1.faild)(404, 'User Not Found', '');
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
}
exports.default = Profile;
//# sourceMappingURL=Profile.js.map