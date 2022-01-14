import { SaveChannelFile } from "../../model/channel";


export default interface IChannelFile {
    saveFile(file: SaveChannelFile): any

    getFiles(objId: string): any
}