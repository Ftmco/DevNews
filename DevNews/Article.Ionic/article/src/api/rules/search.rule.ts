
export default interface ISearchRule {
    search(q: string): any

    autoComplete(patenr: string): any
}