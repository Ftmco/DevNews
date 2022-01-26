import { AxiosInstance } from "axios";
import { messages } from "@/constants";
import { Login, SignUp, Activation } from "../models/account.model";
import IAccountRule from "../rules/account.rule";
import { changeConfigHeader } from "..";

export default class AccountServiec implements IAccountRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }


    async Acivation(active: Activation) {
        try {
            let request = await this._axios.post("/Account/Activation", active)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async SignUp(signUp: SignUp) {
        try {
            let request = await this._axios.post("Account/SignUp", signUp)
            return await request.data;
        } catch (e: any) {
            return messages.netWorkError(e.message);
        }
    }

    async Login(login: Login) {
        try {
            let request = await this._axios.post("Account/Login", {
                ...login,
                platform: navigator.platform.toString(),
                userClient: navigator.userAgent
            })
            let response = await request.data
            if (response.status) {
                localStorage.setItem(response.result.key, response.result.value)
                changeConfigHeader(response.result.key, response.result.value)
            }
            return response
        }
        catch (e: any) {
            return messages.netWorkError(e.message);
        }
    }

    async LogOut() {
        try {
            let request = await this._axios.get("Account/Logout")
            let response = await request.data
            return response
        } catch (e: any) {
            return messages.netWorkError(e.message);
        }
        finally {
            localStorage.removeItem('Token')
        }
    }
}