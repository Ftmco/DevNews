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
class Group {
    constructor() {
        this._groupBase = new Base_1.default(context_1.default, "Group");
    }
    getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let groups = yield this._groupBase.getAllEntity();
                return (0, api_1.success)('Groups', '', groups);
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map