import { SaveFile } from "../../model/channel";


export default interface IFile {
    crateFileAddress(fileName: string, path: string): string

    saveFile(file: SaveFile): string

}