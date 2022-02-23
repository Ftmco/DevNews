import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import IApplicationRules from "../rules/application.rules";


export default class ApplicationService implements IApplicationRules {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }

    async getLanguages() {
        try {
            const request = await this._axios.get("Application/GetLanguages")
            const response = await request.data;
            return response
        }
        catch (e:any) {
            return messages.netWorkError(e.message)
        }
    }

}