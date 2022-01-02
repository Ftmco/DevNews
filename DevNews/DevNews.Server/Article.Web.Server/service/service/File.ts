import { SaveFile } from "../../model/channel";
import IFile from "../rule/IFile";
import * as crypto from 'crypto'
import * as fs from 'fs'
import { log } from "console";

export default class File implements IFile {

    crateFileAddress(fileName: string, path: string) {
        return `http://192.168.43.198:2050/files/${path}/${fileName}`
    }

    saveFile(file: SaveFile) {
        if (file.base64 != "") {
            try {
                const type = file.base64.split(';')[0].split('/')[1];
                let imageName = crypto.randomUUID() + Date.now() + `.${type}`;
                let path = `public/files/${file.path}/` + imageName;
                const base64Data = file.base64.replace(/^data:([A-Za-z+/]+);base64,/, '');
                fs.writeFileSync(path, base64Data, { encoding: "base64" })
                return imageName;
            } catch {

                return "null.png";
            }
        }
        return "null.png";
    }
}