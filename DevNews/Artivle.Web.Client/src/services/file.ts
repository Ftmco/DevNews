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