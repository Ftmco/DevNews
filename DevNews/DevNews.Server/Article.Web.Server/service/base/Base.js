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
class Base {
    constructor(sequelize, model) {
        this._db = sequelize;
        this._dbSet = model;
    }
    getAllEntity() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.models[this._dbSet].findAll();
        });
    }
    upsert(values, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.models[this._dbSet].upsert(values, options);
        });
    }
    findOne(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.models[this._dbSet].findOne(where);
        });
    }
    getAll(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.models[this._dbSet].findAll(where);
        });
    }
}
exports.default = Base;
//# sourceMappingURL=Base.js.map