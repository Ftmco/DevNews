import { apiCall } from "@/api";
import ISearchRule from "@/api/rules/search.rule";
import SearchService from "@/api/service/search.service";

const _search: ISearchRule = new SearchService(apiCall)

export function autoComplete(e: any) {
    return new Promise((resolcve, reject) => {
        try {
            const target = e.target;
            const value = target.value;
            if (value.trim() != "") {
                _search.autoComplete(value).then((res: any) => {
                    resolcve(res);
                }).catch((e: any) => reject(e))
            }
        }
        catch (e) {
            reject(e);
        }
    });
}