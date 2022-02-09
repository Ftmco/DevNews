export const keyMaker = (requestUrl: string) => {
    const enc = new TextEncoder()
    const utf8 = enc.encode(requestUrl)
    return utf8;
}