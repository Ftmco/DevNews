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
class Search {
    constructor() {
        this._groupBase = new Base_1.default(context_1.default, "Group");
        this._channelBase = new Base_1.default(context_1.default, "Channel");
        this._articleBase = new Base_1.default(context_1.default, "Article");
    }
    search(q) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let channels = yield this._channelBase.getAll({
                    where: {
                        [sequelize_1.Op.or]: {
                            name: {
                                [sequelize_1.Op.like]: `%${q}%`
                            },
                            link: {
                                [sequelize_1.Op.like]: `%${q}%`
                            }
                        }
                    }
                });
                let groups = yield this._groupBase.getAll({
                    where: {
                        [sequelize_1.Op.or]: {
                            name: {
                                [sequelize_1.Op.like]: `%${q}%`
                            },
                            title: {
                                [sequelize_1.Op.like]: `%${q}%`
                            }
                        }
                    }
                });
                let articles = yield this._articleBase.getAll({
                    where: {
                        [sequelize_1.Op.or]: {
                            title: {
                                [sequelize_1.Op.like]: `%${q}%`
                            },
                            shortDescription: {
                                [sequelize_1.Op.like]: `%${q}%`
                            },
                            tags: {
                                [sequelize_1.Op.like]: `%${q}%`
                            },
                            text: {
                                [sequelize_1.Op.like]: `%${q}%`
                            }
                        }
                    }
                });
                return (0, api_1.success)('Search', '', {
                    channels,
                    groups,
                    articles
                });
            }
            catch (e) {
                return (0, api_1.exception)(e.message);
            }
        });
    }
}
exports.default = Search;
//# sourceMappingURL=Search.js.map