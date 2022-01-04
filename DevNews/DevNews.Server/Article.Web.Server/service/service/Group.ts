import sequelize from "../../data base/context";
import { exception, success } from "../../model/api";
import Base from "../base/Base";
import IBase from "../base/IBase";
import IGroup from "../rule/IGroup";


export default class Group implements IGroup {

    private readonly _groupBase: IBase;

    constructor() {
        this._groupBase = new Base(sequelize, "Group")
    }

    async getGroups() {
        try {
            let groups = await this._groupBase.getAllEntity()
            return success('Groups', '', groups)
        }
        catch (e: any) {
            return exception(e.message)
        }
    }

}