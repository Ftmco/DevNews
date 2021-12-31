import { messages } from "~/constants";
import { apiCall } from "../apiCall";
import { Login } from "../models";

export default {
    async login(login: Login) {
        try {
            let request = await apiCall.post("Account/Login", login)
            return await request.data;
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }
}