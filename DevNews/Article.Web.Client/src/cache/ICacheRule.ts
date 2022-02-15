
export default interface ICacheRules {
    cacheData(key: string, value: any): any

    getCache(key: string): any
}