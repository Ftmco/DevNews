import { baseUrl } from "@/constants"

export const convertToBase64File = (file: any) => {
    return new Promise((resolve, reject) => {
        try {
            if (file != null) {
                let fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    resolve({
                        base64: fileReader.result?.toString(),
                        type: file.type,
                        ogName: file.name
                    })
                }
            }
            else
                resolve(null)
        } catch (e) {
            reject(e)
        }
    })
}

export const createFileAddress = (file: fileModel): string => {
    file = { ...file }
    return `${baseUrl}${file.directory}/${file.name}`
}

export type fileModel = {
    directory: string;
    name: string;
}