import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import ICagetoryRule from "../rules/category.rule";

export default class CategoryService implements ICagetoryRule {

    private readonly _axois: AxiosInstance;

    constructor(apiCall: AxiosInstance) {
        this._axois = apiCall
    }

    async getCategories() {
        try {
            const request = await this._axois.get("Group/Get")
            return await request.data
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}