import { AxiosInstance } from "axios";
import { messages } from "@/constants";
import { Login, SignUp, Activation } from "../models/account.model";
import IAccountRule from "../rules/account.rule";
import { changeConfigHeader } from "..";
import { keyMaker } from "@/services/api/keyMaker";
import { decrypt, encrypt } from "@/services/api/enc";
import { getOs } from "@/services/browser";
import { ApiModel } from "../models/api.response";

export default class AccountServiec implements IAccountRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }


    async Acivation(active: Activation) {
        try {
            const request = await this._axios.post("/Account/Activation", active)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async SignUp(signUp: SignUp) {
        try {
            const request = await this._axios.post("Account/SignUp", signUp)
            return await request.data;
        } catch (e: any) {
            return messages.netWorkError(e.message);
        }
    }

    async Login(login: Login) {
        try {
            const key = keyMaker("/api/Account/LoginEnc")
            const data = encrypt({
                text: JSON.stringify({
                    ...login,
                    platform: getOs(),
                    userClient: navigator.userAgent
                }),
                key: key
            })
            const request = await this._axios.post("Account/LoginEnc", { data: data })
            const dataResponse = await request.data
            const response = JSON.parse(decrypt({
                text: dataResponse.data,
                key: key
            }))
            if (response.Status) {
                localStorage.setItem(response.Result.Key, response.Result.Value)
                changeConfigHeader(response.Result.Key, response.Result.Value)
            }
            return response
        }
        catch (e: any) {
            console.log(e);

            return messages.netWorkError(e.message);
        }
    }

    async LogOut() {
        try {
            const request = await this._axios.get("Account/Logout")
            const response = await request.data
            return response
        } catch (e: any) {
            return messages.netWorkError(e.message);
        }
        finally {
            localStorage.removeItem('Token')
        }
    }
}