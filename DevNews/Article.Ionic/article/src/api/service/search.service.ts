import { messages } from "@/constants";
import { decrypt } from "@/services/api/enc";
import { keyMaker } from "@/services/api/keyMaker";
import { AxiosInstance } from "axios";
import ISearchRule from "../rules/search.rule";

export default class SearchService implements ISearchRule {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios
    }

    async search(q: string) {
        try {
            const key = keyMaker("/api/Search/SearchEnc")
            const request = await this._axios.get(`Search/SearchEnc?q=${q}`)
            const encResponse = await request.data
            const response = JSON.parse(decrypt({
                text: encResponse.data,
                key: key
            }))
            return response
        } catch (e: any) {
            console.log(e);

            return messages.netWorkError(e.message)
        }
    }

    async autoComplete(patern: string) {
        try {
            const request = await this._axios.get(`Search/AutoComplete?q=${patern}`)
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }
}