"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("fs");
class File {
    crateFileAddress(fileName, path) {
        return `http://192.168.43.198:2050/files/${path}/${fileName}`;
    }
    saveFile(file) {
        if (file.base64 != "") {
            try {
                const type = file.base64.split(';')[0].split('/')[1];
                let imageName = crypto.randomUUID() + Date.now() + `.${type}`;
                let path = `public/files/${file.path}/` + imageName;
                const base64Data = file.base64.replace(/^data:([A-Za-z+/]+);base64,/, '');
                fs.writeFileSync(path, base64Data, { encoding: "base64" });
                return imageName;
            }
            catch (_a) {
                return "null.png";
            }
        }
        return "null.png";
    }
}
exports.default = File;
//# sourceMappingURL=File.js.map