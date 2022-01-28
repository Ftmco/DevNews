import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import ISearchRule from "../rules/search.rule";

export default class SearchService implements ISearchRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios
    }

    async search(q: string) {
        try {
            const request = await this._axios.get(`Search/Get?q=${q}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async autoComplete(patern:string){
        try {
            const request = await this._axios.get(`Search/AutoComplete?q=${patern}`)
            return await request.data
        } catch (e:any) {
            return messages.netWorkError(e.message)
        }
    }
}