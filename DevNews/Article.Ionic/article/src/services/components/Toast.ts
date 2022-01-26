import { toastController } from "@ionic/vue"

export const showToast = async (message: string) => {
    const toast = await toastController.create({
        message: message,
        duration: 2500,
        color: 'dark',
        buttons: [
            {
                text: 'Close',
                role: 'cancel',
                icon: 'close',
                handler: () => {
                    toast.dismiss()
                }
            }
        ]
    })
    return toast.present()
}