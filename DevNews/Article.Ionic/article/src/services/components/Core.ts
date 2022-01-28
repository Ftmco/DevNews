import { loadingController } from "@ionic/core"


export const openLoading = async (message = "Please Wait...") => {
    const loading = await loadingController.create({
        message: message,
        spinner: 'bubbles',
    })
    loading.present()
    return loading
}

export const closeLoading = (loading: HTMLIonLoadingElement) => {
    loading.dismiss()
}