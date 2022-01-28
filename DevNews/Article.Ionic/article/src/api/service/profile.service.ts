import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import { Profile } from "../models/profile.model";
import IProfileRules from "../rules/profile.rules";

export default class ProfileService implements IProfileRules {

    private readonly _axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }

    async getProfile() {
        try {
            const request = await this._axios.get("Profile/Get")
            const response = await request.data
            return response
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

    async updateProfile(profile: Profile) {
        try {
            const request = await this._axios.post("Profile/Update", profile)
            return await request.data;
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}