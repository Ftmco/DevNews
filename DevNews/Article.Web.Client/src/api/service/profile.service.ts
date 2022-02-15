import CacheService from "@/cache/CacheService";
import ICacheRules from "@/cache/ICacheRule";
import { messages } from "@/constants";
import { AxiosInstance } from "axios";
import { Profile } from "../models/profile.model";
import IProfileRules from "../rules/profile.rules";

export default class ProfileService implements IProfileRules {

    private readonly _axios: AxiosInstance;

    private readonly _cache: ICacheRules;

    constructor(axios: AxiosInstance) {
        this._axios = axios;
        this._cache = new CacheService()
    }

    async getProfile() {
        try {
            let cached = this._cache.getCache('profile')
            if (cached == null) {
                let request = await this._axios.get("Profile/Get")
                let response = await request.data
                cached = this._cache.cacheData('profile', response)
            }
            return cached as any
        } catch (e: any) {
            console.log(e);
            
            return messages.netWorkError(e.message)
        }
    }

    async updateProfile(profile: Profile) {
        try {
            let request = await this._axios.post("Profile/Update", profile)
            return await request.data;
        } catch (e: any) {
            return messages.netWorkError(e.message)
        }
    }

}