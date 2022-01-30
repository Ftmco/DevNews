import { loadingController } from "@ionic/core"


export const openLoading = async (message = "Please Wait..."): Promise<HTMLIonLoadingElement> => {
    return new Promise<HTMLIonLoadingElement>((resolve, reject) => {
        loadingController.create({
            message: message,
            spinner: 'bubbles',
            keyboardClose: true,
        }).then(async (res) => {
            await res.present()
            resolve(res)
        }).catch((e) => reject(e))
    })
}

export const closeLoading = async (loading: HTMLIonLoadingElement) => {
    await loading.dismiss()
}