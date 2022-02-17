
export const getCache = (key: string) => {
    const items = localStorage.getItem(key)
    if (items != null) {
        const json = JSON.parse(items?.toString() ?? "")
        return json
    }
    return null
}

export const cacheData = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    return value
}

export const removeCache = (key: string) => {
    localStorage.removeItem(key)
}

export const clearCache = () => {
    localStorage.clear()
}