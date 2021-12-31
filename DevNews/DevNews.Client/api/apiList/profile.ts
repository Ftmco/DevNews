import { messages } from "~/constants"
import { apiCall } from "../apiCall"


export default {
    async getProfile() {
        try {
            let request = await apiCall.get('/Profile/GetProfile')
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }
}