import ICacheRules from "./ICacheRule";

export default class CacheService implements ICacheRules {
    getCache(key: string) {
        const items = localStorage.getItem(key)
        if (items != null) {
            const json = JSON.parse(items?.toString() ?? "")
            return json
        }
        return null
    }

    cacheData(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
        return value
    }

}