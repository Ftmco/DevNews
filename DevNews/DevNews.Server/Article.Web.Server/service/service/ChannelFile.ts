import { log } from "console";
import sequelize from "../../data base/context";
import { SaveChannelFile } from "../../model/channel";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IChannelFile from "../rule/IChannelFile";
import IFile from "../rule/IFile";
import File from "./File";


export default class ChannelFile implements IChannelFile {

    private readonly _channelFile: IBase;

    private readonly _file: IFile;

    constructor() {
        this._channelFile = new Base(sequelize, "ApFile")
        this._file = new File()
    }

    async getFiles(objId: string) {
        try {
            let files = await this._channelFile.getAll({
                where: {
                    objId: objId
                }
            })
            let result = []
            files.forEach((file) => {
                file.name = this._file.crateFileAddress(file.name, "channelPost")
                result.push(file)
            })
            return result
        } catch (e) {
            return null
        }
    }

    async saveFile(file: SaveChannelFile) {
        try {
            let fileModel = {
                objId: file.objId,
                name: await this._file.saveFile({
                    base64: file.file.base64,
                    path: "channelPost"
                }),
                orginalName: file.file.ogName,
                type: file.file.type
            }
            let insert = await this._channelFile.upsert(fileModel)
            let data = insert[0]
            return data.get()
        } catch (e) {
            return ""
        }
    }

}