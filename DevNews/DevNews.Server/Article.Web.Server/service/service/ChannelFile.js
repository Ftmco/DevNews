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
const Base_1 = require("../base/Base");
const File_1 = require("./File");
class ChannelFile {
    constructor() {
        this._channelFile = new Base_1.default(context_1.default, "ApFile");
        this._file = new File_1.default();
    }
    getFiles(objId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let files = yield this._channelFile.getAll({
                    where: {
                        objId: objId
                    }
                });
                let result = [];
                files.forEach((file) => {
                    file.name = this._file.crateFileAddress(file.name, "channelPost");
                    result.push(file);
                });
                return result;
            }
            catch (e) {
                return null;
            }
        });
    }
    saveFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileModel = {
                    objId: file.objId,
                    name: yield this._file.saveFile({
                        base64: file.file.base64,
                        path: "channelPost"
                    }),
                    orginalName: file.file.ogName,
                    type: file.file.type
                };
                let insert = yield this._channelFile.upsert(fileModel);
                let data = insert[0];
                return data.get();
            }
            catch (e) {
                return "";
            }
        });
    }
}
exports.default = ChannelFile;
//# sourceMappingURL=ChannelFile.js.map